import { expect, FrameLocator, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import { LoginPage } from './LoginPage'


export class RegisterPage extends AbstractPage{
    readonly selectdropdown: Locator
    readonly selectItemDropdown: Locator
    readonly InputEmail : Locator
    readonly buttontry : Locator
    readonly radioOther: Locator
    readonly companyother: Locator
    readonly inputphone: Locator
    readonly fullname: Locator
    readonly buttonnext: Locator
    readonly coupon: Locator
    readonly inputcoupon: Locator
    readonly applycoupon: Locator
    readonly policycheck: Locator
    readonly btnstart: Locator
    readonly selectitemdropdowninput: Locator
    readonly emaillogin: Locator
    readonly btnPassStart: Locator
    readonly ddRegisCT: Locator
    readonly selectHM: Locator
    readonly ddRegisExp: Locator
    readonly inputOTP: Locator
    readonly buttonOTP: Locator
    readonly inputPass: Locator 
    readonly inputPassConf: Locator
    readonly buttonPassConf: Locator
    lp: LoginPage

    test: string

    constructor(page:Page){
        super(page)
        this.lp = new LoginPage(page)
        this.InputEmail = page.getByTestId('input_textfield_input_\'textfield_text_registration_email\'')
        this.companyother = page.getByTestId('input_textfield_input_textfield_text_registration_register_company_name')
        this.inputphone = page.locator('#phone')
        this.fullname = page.getByTestId('input_textfield_input_textfield_text_registration_full_name')
        this.inputPass = page.getByTestId('input_password_crate_password_password')
        this.inputPassConf = page.getByTestId('input_password_crate_password_confirm_password')
        this.inputcoupon = page.getByTestId('input_text_registration_coupon_code')
        this.inputOTP = page.getByTestId('input_text_registration_otp_Config')
        //select and dropdown
        this.selectdropdown = page.locator('.go5-dropdown-selection')
        this.selectItemDropdown = page.locator('go5-dropdown-item')
        this.selectitemdropdowninput = page.locator('go5-dropdown-content-selection')
        this.ddRegisCT = page.getByTestId('dropdown_selection_registration_company_type')
        this.selectHM = page.getByTestId('button_button_registration_register_how_many_people')
        this.ddRegisExp = page.getByTestId('dropdown_selection_registration_experience')
        this.radioOther = page.getByTestId('input_radio_registration_company_others').locator('#undefined')
        this.coupon = page.getByTestId('input_button_registration_register_ticket_got_coupon')
        this.applycoupon = page.getByTestId('input_button_registration_btn_apply')
        this.policycheck = page.getByTestId('input_checkbox_registration_checkbox')
        //button
        this.buttontry = page.getByTestId('button_button_registration_try_for_free')
        this.buttonnext = page.getByTestId('button_button_registration_btn_next')
        this.btnstart = page.getByTestId('button_button_registration_btn_lets_get_started')
        this.btnPassStart = page.getByTestId('button_button_create_password_btn_lets_get_started')
        this.buttonOTP = page.getByTestId('button_button_registration_verify')
        this.buttonPassConf = page.getByTestId('button_button_create_password_btn_next')
        
    }
    //when user need to register on website
    async inputEmailRegister(k:string){
        const minute = 1000 * 60 * 5
        this.test = k+this.currDate
        await this.InputEmail.type("qa.learn."+k+this.currDate+"@gmail.com")
        await this.buttontry.click()
    }
    //use for login 
    async inputLogin(k:string){
        const minute = 1000 * 60 * 5
        let date = Math.round(Date.now() / minute)
        await this.lp.usernameInput.type("qa.learn."+this.test+"@gmail.com")
        await this.lp.passwordInput.type('Gogo55')
        await this.lp.submitButton.click()
    }
    //when user didn't have taxid 
    async OtherCompanyinput(){
        await this.radioOther.click()
        const minute = 1000 
        let date = Math.round(Date.now() / minute);
        await this.companyother.type("Othercompany"+date)
        await this.fullname.type("test")
        await this.inputphone.type("0967690708")
    }
    //when user need to use a coupon use this function 
    async usecoupon(){
        await this.coupon.click()
        await this.inputcoupon.type('Gofive555')
        await this.applycoupon.click()
    }
    //policy check box and go to next page
    async checkpolicybox(){
        await this.policycheck.check()
        await this.buttonnext.click()
    }
    //dropdown company type
    async selectdropdownregister(){
        await this.ddRegisCT.click()
        await this.selectItemDropdown.nth(await this.randomNumberTypeNumber(6)).click()
    }
    //select a people who use 
    async selectItemcompany(){ 
        await this.selectHM.nth(await this.randomNumberTypeNumber(5)).click()
    }
    //dropdown experience
    async selectdropdownexp(){
        await this.ddRegisExp.click()
        await this.selectItemDropdown.nth(await this.randomNumberTypeNumber(2)).click()
        await this.btnstart.click()
    }
    //Otp 
    async inputotp(){
        await this.inputOTP.type('123456')
        await this.buttonOTP.click() 
    }
    //create password
    async passwordcorrect(){
        await this.inputPass.type('Gogo55')
        await this.inputPassConf.type('Gogo55')
        await this.buttonPassConf.click()
    }
    //go to Start page
    async buttongetstart(){
        await this.btnPassStart.click()
    }

    //go to page Empeo with framelocator
    async pageEmpeo(){
        await this.page.goto('https://uat.tks.co.th/ClientPortal/Register/empeo')
    }
    //go to page Venio with framelocator
    async pageVenio(){
        await this.page.goto('https://uat.tks.co.th/ClientPortal/Register/venio')
    }
    //go to page salesbear with framelocator
    async pageSalesbear(){
        await this.page.goto('https://uat.tks.co.th/ClientPortal/Register/salesbear')
    }

}