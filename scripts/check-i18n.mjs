import fs from "node:fs";
import path from "node:path";

const MESSAGES_DIR = "./messages";

function getAllKeys(obj, prefix = "") {
  return Object.keys(obj).reduce((keys, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
    return keys;
  }, []);
}

const files = fs.readdirSync(MESSAGES_DIR).filter((file) => file.endsWith(".json"));
const translations = files.map((file) => ({
  name: file,
  keys: getAllKeys(JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf-8"))),
}));

let hasError = false;

for (let i = 0; i < translations.length; i++) {
  for (let j = 0; j < translations.length; j++) {
    if (i === j) continue;

    const missingKeys = translations[i].keys.filter((key) => !translations[j].keys.includes(key));

    if (missingKeys.length > 0) {
      console.error(`\x1b[31mError: Keys found in ${translations[i].name} but missing in ${translations[j].name}:\x1b[0m`);
      missingKeys.forEach((key) => console.error(` - ${key}`));
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log("\x1b[32mAll translation files are synchronized!\x1b[0m");
  process.exit(0);
}
