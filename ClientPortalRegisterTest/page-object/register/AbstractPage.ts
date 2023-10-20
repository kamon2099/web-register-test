import { expect, FileChooser, Locator, Page } from '@playwright/test'
import moment from 'moment'

export class AbstractPage {
  readonly page: Page

  readonly currDate
  readonly year
  readonly month
  readonly day

  readonly baseUrl
  readonly userStaff
  readonly passStaff
  readonly userSup
  readonly passSup
  readonly userAdmin
  readonly passAdmin
  readonly userAdminDEV
  readonly passAdminDEV
  readonly phonenumber
  readonly empeourl
  readonly empeoflurl

  readonly exitSidebar
  readonly selectdropdown: Locator
  readonly selectItemDropdownSdropdown: Locator
  readonly selectItemDropdown: Locator
  readonly searchDropdown: Locator
  readonly selectItemAllGoFive: Locator
  readonly selectItemDropdownFilter: Locator

  readonly rejectRemarkTextarea: Locator
  readonly confirmRejectButton: Locator

  readonly inputFiles: Locator

  readonly selectThisDropdown: Locator
  readonly openDropdown: Locator

  readonly openSidebar: Locator

  public chooseYearMonth
  public dateMonthCell
  public dateTable
  public hourInput
  public minuteInput
  public setDateTimeButton

  constructor(page: Page) {
    this.page = page

    this.year = parseInt(moment().format('YYYY'))
    this.month = parseInt(moment().format('MM'))
    this.day = parseInt(moment().format('DD'))
    this.currDate = moment().format('YYMMDDHHmmss')

    this.baseUrl = process.env.BASE_URL as string
    this.userStaff = process.env.USER_STAFF as string
    this.passStaff = process.env.PASS_STAFF as string
    this.userSup = process.env.USER_SUPS as string
    this.passSup = process.env.PASS_SUPS as string
    this.userAdmin = process.env.USER_ADMIN as string
    this.passAdmin = process.env.PASS_ADMIN as string
    this.userAdminDEV = process.env.USER_ADMIN_DEV as string
    this.passAdminDEV = process.env.PASS_ADMIN_DEV as string

    this.empeourl = process.env.URL_EMPEO as string
    this.empeoflurl = process.env.URL_EMPEOFL as string

    

    this.exitSidebar = page.locator('.go5-header-option > .gf-icon-close')
    
    this.selectItemDropdownSdropdown = page.locator('.sDropdown-item')
    this.selectItemDropdown = page.locator('.go5-dropdown-content').locator('go5-dropdown-item')
    this.searchDropdown = page.locator('go5-search input')
    this.selectItemAllGoFive = page.locator('.go5-dropdown-select-all-text')
    this.selectItemDropdownFilter = page.locator('.go5-dropdown-filter-content').locator('go5-dropdown-item')

    this.rejectRemarkTextarea = page.locator('.go5-textarea')
    this.confirmRejectButton = page.locator('app-dialog-master-template button:has-text("Reject")')

    this.inputFiles = page.locator("input[type='file']")

    this.selectThisDropdown = page.locator('.go5-dropdown-back-step-item-select')
    this.openDropdown = page.locator(
      '.ng-star-inserted go5-dropdown-input-selection go5-primary go5-enabled go5-open'
    )

    this.openSidebar = page.locator('go5-sidebar')

    this.variableFillDateTime()
  }

  async wait(time) {
    await this.page.waitForTimeout(time)
  }

  async expectToast(title: string, description: string) {
    await this.page.locator('.go5-toast-description').getByText(description).waitFor({state : 'visible', timeout: 60000 })
    const locatorTitle = await this.page.locator('.go5-toast-title').getByText(title)
    const locatorDescription = await this.page.locator('.go5-toast-description').getByText(description)
    await expect(locatorTitle).toHaveText(title, { timeout: 0 })
    await expect(locatorDescription).toHaveText(description, { timeout: 0 })
    await locatorTitle.waitFor({state : 'hidden', timeout: 60000 })
  }

  async closeSidebar() {
    await this.exitSidebar.click()
  }

  async variableFillDateTime() {
    this.chooseYearMonth = this.page.locator('[aria-label="Choose month and year"]')
    this.dateMonthCell = this.page.locator('.owl-dt-calendar-cell >> span')
    this.dateTable = this.page.locator('.owl-dt-calendar-table')
    this.hourInput = this.page.locator('text=HourMinute >> input').first()
    this.minuteInput = this.page.locator('text=HourMinute >> input').nth(1)
    this.setDateTimeButton = this.page.locator('button:has-text("Set")')
  }

  async fillDateTime(
    numYear: number,
    numMonth: number,
    numDay: number,
    hour?: number,
    minute?: number
  ) {
    let date = new Date(numYear, numMonth - 1, numDay)
    let day: string = date.getDate().toString()
    let longMonth: string = date.toLocaleString('en-us', { month: 'long' })
    let shortMonth = date.toLocaleString('en-us', { month: 'short' })
    let year: string = date.getFullYear().toString()
    await this.chooseYearMonth.click()
    await this.dateMonthCell.locator(`text=${year}`).click() //select year
    await this.dateMonthCell.locator(`text=${shortMonth}`).click() //select month
    await this.dateTable.locator(`[aria-label="${longMonth} ${day}, ${year}"]`).click() //select day
    if (hour) {
      await this.hourInput.dblclick()
      await this.hourInput.type(hour.toString())
    }
    if (minute) {
      await this.minuteInput.dblclick()
      await this.minuteInput.type(minute.toString())
    }
    await this.setDateTimeButton.click()
    await this.wait(2000)
  }
    

  async fillDateTimeGofive(
    numYear: number,
    numMonth: number,
    numDay: number,
    hour?: number,
    minute?: number
  ) {
    numMonth == 0 ? numMonth = numMonth : numMonth = numMonth-1
    let date = new Date(numYear, numMonth, numDay)
    let day: string = date.getDate().toString()
    let longMonth: string = date.toLocaleString('en-us', { month: 'long' })
    let shortMonth = date.toLocaleString('en-us', { month: 'short' })
    let year: string = date.getFullYear().toString()
    if (hour) {
      // await this.hourInput.dblclick()
      await this.page.locator('go5-durationpicker').getByRole('textbox').first().clear()
      await this.page.locator('go5-durationpicker').getByRole('textbox').first().type(hour.toString())
    }
    if (minute) {
      // await this.minuteInput.dblclick()
      await this.page.locator('go5-durationpicker').getByRole('textbox').nth(1).clear()
      await this.page.locator('go5-durationpicker').getByRole('textbox').nth(1).type(minute.toString())
    }
    await this.page.locator('.go5-datepicker-header-year').click()
    await this.loop(numYear)
    await this.page.locator('.go5-datepicker-text').getByText(numYear.toString()).click()
    await this.page.locator('.go5-datepicker-header-month').click()
    await this.page.locator(`.go5-monthpicker-content-body`).nth(numMonth).click() //select month
    await this.page.locator('.go5-datepicker-text').nth(numDay).click() //select day
    await this.wait(2000)

  }
  
  async loop(numYear:number) {
    await this.wait(1000)
    if(await this.page.locator('.go5-datepicker-text').getByText(numYear.toString()).isVisible() == false && await this.page.locator('.go5-yearpicker-selected').locator('.go5-datepicker-text').getByText(numYear.toString()).isVisible() == false){
      if(numYear < this.year){
        await this.page.locator('.gf-icon-left').click()
        await this.loop(numYear)
      }else{
        await this.page.locator('.gf-icon-right').click()
        await this.loop(numYear)
      }
    }
  }
  async randomNumberTypeString(number: number, numberFrom: number = 1, type: string = 'integer') {
    //decimal
    let num
    if (type == 'integer') {
      num = Math.floor(Math.random() * number)
    } else {
      num = Math.random() * number
    }
    return String(num + numberFrom)
  }

  async randomNumberTypeNumber(numberTo: number, numberFrom: number = 0, type: string = 'integer') {
    //decimal
    let num
    if (type == 'integer') {
      num = Math.floor(Math.random() * numberTo)
    } else {
      num = Math.random() * numberTo
    }
    return num + numberFrom
  }

  async button(name: string) {
    await this.wait(1000)
    await this.page.locator('button:has-text("' + name + '")').click()
  }
  async buttonGofive(name: string) {
    await this.wait(1000)
    await this.page.locator('go5-button').locator('button:has-text("' + name + '")').click()
  }
  async isOpenSidebarVisible() {
    // await this.openSidebar.waitFor({ state: 'detached' });
    return await this.openSidebar.isVisible()
  }

  async discardChange(URL: string, click: string = 'Discard') {
    await this.button('Cancel')
    if (click == 'Discard') {
      await this.button('Discard')
      const regex = new RegExp(`.*${URL}.*`)
      await expect(this.page).toHaveURL(regex)
    } else {
      await this.button('Keep Editing')
    }
  }
  async discardChangeSidebar(click: string = 'Discard') {
    await this.button('Cancel')
    if (click == 'Discard') {
      await this.button('Discard')
      await this.isOpenSidebarVisible() == true ?? await this.discardChangeSidebar()
    } else {
      await this.button('Keep Editing')
    }
  }
  async addFiles(files:string []) {
    await this.page.on('filechooser', (fileChooser: FileChooser) => {
      fileChooser.setFiles(files)
    })
  }
  async checkItemDropdown(locator) {
    if(await this.selectItemDropdown.isHidden()){
      await locator.click()
      await this.checkItemDropdown(locator)
    }
  }

  async clickClearTypeInput(locator,text?:string) {
    await locator.click()
    await locator.clear()
    await locator.type(text)
  }

  async waitApi200(wait:number = 0) {
    await this.page.waitForResponse(req => req.status() == 200,{timeout: 0})
    await this.wait(wait)
  }
  
  async randomString(){
    let key 
    const data ={
      0 : 'a',
      1 :'b',
      2 : 'c',
      3 : 'd',
      4 : 'e',
      5 : 'f',
      6 : 'g',
      7 : 'h',
      8 : 'i',
      9 : 'j',
      10 : 'k',
      11 : 'l',
      12 : 'm',
      13 : 'n',
      14: 'o',
      15 : 'p',
      16 : 'q',
      17 : 'r',
      18 : 's',
      19 : 't',
      20 : 'u',
      21 : 'v',
      22 : 'w',
      23 : 'x',
      24 : 'y',
      25 : 'z',
      26 : '@',
      27 : '1'
      ,
    }
  return await data[await this.randomNumberTypeNumber(26)]

      
  }
}
