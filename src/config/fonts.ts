import { Geist_Mono, Montserrat, Lexend } from "next/font/google"

const fontHeading = Lexend({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const fonts = {
  heading: fontHeading,
  sans: fontSans,
  mono: fontMono,
}

export const fontVariables = `${fontHeading.variable} ${fontSans.variable} ${fontMono.variable}`
