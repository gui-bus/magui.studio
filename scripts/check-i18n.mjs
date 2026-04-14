import fs from "node:fs"
import path from "node:path"

const MESSAGES_DIR = "./messages"
const suspiciousPatterns = [
  { pattern: /\uFFFD/, reason: "replacement character" },
  { pattern: /[A-Za-zÀ-ÿ]\?[A-Za-zÀ-ÿ]/, reason: "question mark inside a word" },
  { pattern: /Ã[\x80-\xBF]/, reason: "UTF-8 mojibake sequence" },
  { pattern: /Â[\x80-\xBF]/, reason: "UTF-8 mojibake sequence" },
]

function getAllKeys(obj, prefix = "") {
  return Object.keys(obj).reduce((keys, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }

    return keys
  }, [])
}

function findSuspiciousStrings(value, keyPath = "") {
  if (typeof value === "string") {
    return suspiciousPatterns
      .filter(({ pattern }) => pattern.test(value))
      .map(({ reason }) => ({ keyPath, reason, value }))
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      findSuspiciousStrings(item, `${keyPath}[${index}]`)
    )
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      findSuspiciousStrings(nestedValue, keyPath ? `${keyPath}.${key}` : key)
    )
  }

  return []
}

const files = fs.readdirSync(MESSAGES_DIR).filter((file) => file.endsWith(".json"))
const translations = files.map((file) => {
  const content = fs.readFileSync(path.join(MESSAGES_DIR, file), "utf-8")
  const parsed = JSON.parse(content)

  return {
    name: file,
    keys: getAllKeys(parsed),
    suspiciousStrings: findSuspiciousStrings(parsed),
  }
})

let hasError = false

for (let i = 0; i < translations.length; i++) {
  for (let j = 0; j < translations.length; j++) {
    if (i === j) continue

    const missingKeys = translations[i].keys.filter(
      (key) => !translations[j].keys.includes(key)
    )

    if (missingKeys.length > 0) {
      console.error(
        `\x1b[31mError: Keys found in ${translations[i].name} but missing in ${translations[j].name}:\x1b[0m`
      )
      missingKeys.forEach((key) => console.error(` - ${key}`))
      hasError = true
    }
  }
}

for (const translation of translations) {
  if (translation.suspiciousStrings.length === 0) {
    continue
  }

  console.error(
    `\x1b[31mError: Suspicious translation text found in ${translation.name}:\x1b[0m`
  )

  translation.suspiciousStrings.forEach(({ keyPath, reason, value }) => {
    console.error(` - ${keyPath}: ${reason} -> "${value}"`)
  })

  hasError = true
}

if (hasError) {
  process.exit(1)
}

console.log("\x1b[32mAll translation files are synchronized!\x1b[0m")
