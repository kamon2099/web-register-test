import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class HomePage extends AbstractPage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchBox: Locator
  readonly linkFeedback: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('#feedback')
    //dotenv.config()
  }

  async visit(baseUrl?) {
    baseUrl = baseUrl ?? this.baseUrl 
    await this.page.goto(baseUrl)
  }


  async clickOnSignIn() {
    await this.signInButton.click()
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click()
  }

  async searchFor(phrase: string) {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
  }
}
