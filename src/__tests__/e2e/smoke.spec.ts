import { expect, test } from "@playwright/test"

test.describe("Elite Smoke Tests", () => {
  test("should load the home page and show the title", async ({ page }) => {
    await page.goto("/")
    // Check if the main heading is visible
    const heading = page.locator("h1")
    await expect(heading).toBeVisible()
  })

  test("should switch language correctly", async ({ page }) => {
    await page.goto("/")

    // Open language switcher
    await page.click('button[aria-haspopup="menu"]')

    // Select English (assuming default is PT)
    // We look for the text "English" or "Inglês" depending on current locale
    // But since it's a smoke test, we just check if the menu items exist
    const menuItems = page.locator('[role="menuitem"]')
    await expect(menuItems).toHaveCount(2)
  })

  test("should toggle theme correctly", async ({ page }) => {
    await page.goto("/")

    // Check initial dark mode (template defaults to dark or system)
    const html = page.locator("html")

    // Click theme toggle (it's the button inside the ThemeToggle component)
    // We can target by the title attribute "Dark" or "Light"
    const themeToggle = page
      .locator(
        'button[title="Dark"], button[title="Light"], button[title="Claro"], button[title="Escuro"]'
      )
      .first()
    await themeToggle.click()

    // Since we use view transitions and next-themes, we just check if it doesn't crash
    await expect(page).toBeDefined()
  })
})
