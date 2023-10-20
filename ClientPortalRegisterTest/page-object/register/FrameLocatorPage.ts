import { expect, FrameLocator, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import { LoginPage } from './LoginPage'

//use enum for choose product to test
export enum PRODUCTNAME {
    empeo = 'empeo',
    venio = 'venio',
    salesbear = 'salesbear',
  }


export class FrameLocatorPage extends AbstractPage{
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
    readonly selectitemdropdowninputexp: Locator
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
    readonly fl: FrameLocator
    readonly date: number

    lp: LoginPage


    constructor(page:Page, productName : PRODUCTNAME){
        super(page)
        this.lp = new LoginPage(page)
        //use switch case to choose product on test page
        switch (productName) {
            case PRODUCTNAME.empeo:
                this.fl = page.frameLocator('#empeoRegister')
                break;
            case PRODUCTNAME.venio:
                this.fl = page.frameLocator('#venioRegister')
                break;
            case PRODUCTNAME.salesbear:
                this.fl = page.frameLocator('iframe')
                break;
        }
        //input
        this.InputEmail = this.fl.getByTestId('input_textfield_input_\'textfield_text_registration_email\'')
        this.companyother =  this.fl.getByTestId('input_textfield_input_textfield_text_registration_register_company_name')
        this.inputphone = this.fl.locator('#phone')
        this.fullname = this.fl.getByTestId('input_textfield_input_textfield_text_registration_full_name')
        this.inputPass = this.fl.getByTestId('input_password_crate_password_password')
        this.inputPassConf = this.fl.getByTestId('input_password_crate_password_confirm_password')
        this.inputcoupon = this.fl.getByTestId('input_text_registration_coupon_code')
        this.inputOTP = this.fl.getByTestId('input_text_registration_otp_Config')
        //select and dropdown
        this.selectdropdown = this.fl.locator('.go5-dropdown-selection')
        this.selectItemDropdown = this.fl.locator('go5-dropdown-item')
        this.selectitemdropdowninputexp = this.fl.locator('go5-dropdown-content-selection')
        this.ddRegisCT = this.fl.getByTestId('dropdown_selection_registration_company_type')
        this.selectHM = this.fl.getByTestId('button_button_registration_register_how_many_people')
        this.ddRegisExp = this.fl.getByTestId('dropdown_selection_registration_experience')
        this.radioOther = this.fl.getByTestId('input_radio_registration_company_others').locator('#undefined')
        this.coupon = this.fl.getByTestId('input_button_registration_register_ticket_got_coupon')
        this.applycoupon = this.fl.getByTestId('input_button_registration_btn_apply')
        this.policycheck = this.fl.getByTestId('input_checkbox_registration_checkbox')
        //button
        this.buttontry = this.fl.getByTestId('button_button_registration_try_for_free')
        this.buttonnext = this.fl.getByTestId('button_button_registration_btn_next')
        this.btnstart = this.fl.getByTestId('button_button_registration_btn_lets_get_started')
        this.btnPassStart = this.fl.getByTestId('button_button_create_password_btn_lets_get_started')
        this.buttonOTP = this.fl.getByTestId('button_button_registration_verify')
        this.buttonPassConf = this.fl.getByTestId('button_button_create_password_btn_next')
        
    }
    //when user need to register on website
    async inputEmailRegister(k:string){
        const minute = 1000 * 60 * 5
        let date = Math.round(Date.now() / minute)
        await this.InputEmail.type("qa.learn."+k+date+"@gmail.com")
        await this.buttontry.click()
    }
    //use for login 
    async inputLogin(k:string){
        const minute = 1000 * 60 * 5
        let date = Math.round(Date.now() / minute)
        await this.lp.usernameInput.type("qa.learn."+k+date+"@gmail.com")
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
    async pageEmpeofl(){
        await this.page.goto('https://www.empeo.com/uat-register/')
    }
    //go to page Venio with framelocator
    async pageVeniofl(){
        await this.page.goto('https://www.veniocrm.com/uat-register/')
    }
    //go to page salesbear with framelocator
    async pageSalesbear(){
        await this.page.goto('https://www.salesbear.com/uat-register/ ')
    }

    
    
}