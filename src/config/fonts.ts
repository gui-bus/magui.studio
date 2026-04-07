import { Geist_Mono, Montserrat, Outfit } from "next/font/google"

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
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
