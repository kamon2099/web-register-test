import { expect, FullConfig, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  // readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    // this.page = page
    super(page)
    this.usernameInput = page.locator('[name="Email"]')
    this.passwordInput = page.locator('[name="Password"]')
    this.submitButton = page.locator('#byEmail')
    // this.submitButton = page.locator('text=Remember me Forgot your password? Sign in >> button[name="provider"]')
    this.errorMessage = page.locator('#frmEmail >> text=Invalid username or password')
  }

  // Define login page methods
  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
  }
  // Define login page methods
  async logout(baseUrl?:string) {
    if(baseUrl){
      await this.page.click('[data-testid="dropdown_single_itemvalue"] div')
      await Promise.all([this.page.waitForNavigation(), this.page.locator('.sDropdown-item').nth(4).click()])
    }else{
      await this.page.locator('#navbarSupportedContent go5-dropdown-popup span').click()
      await Promise.all([this.page.waitForNavigation(), this.selectItemDropdown.nth(4).click()])
    }
  }

  async assertErrorMessage() {
    await this.page.pause()
    await expect(this.errorMessage).toContainText('Invalid username or password')
  }

  async load(baseUrl:string = this.baseUrl) {
    await this.page.goto(baseUrl,{timeout : 0})
  }

  async logInUserAdmin() {
    await this.load()
    await this.usernameInput.type(this.userAdmin)
    await this.passwordInput.type(this.passAdmin)
    await this.submitButton.click()
  }
  async logInUserStaff() {
    await this.load()
    await this.usernameInput.type(this.userStaff)
    await this.passwordInput.type(this.passStaff)
    await this.submitButton.click()
  }
  async logInUserSupervisor() {
    await this.load()
    await this.usernameInput.type(this.userSup)
    await this.passwordInput.type(this.passSup)
    await this.submitButton.click()
  }
  async loginpage(){
    await this.page.goto('https://uat.veniocrm.com/')
  }

  // async logInUserAdminDEV() {
  //   await this.load('https://dev.tks.co.th/Venio4/')
  //   await this.usernameInput.type(this.userAdminDEV)
  //   await this.passwordInput.type(this.passAdminDEV)
  //   await this.submitButton.click()
  // }
}
