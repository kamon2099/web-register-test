import {test, expect} from '@playwright/test'
import { RegisterPage } from '../../page-object/register/RegisterPage'
import { LoginPage } from '../../page-object/register/LoginPage'


let lp: LoginPage
let rp: RegisterPage

test.beforeEach(async ({ page }) => {
    rp = new RegisterPage(page)
    lp = new LoginPage(page)
    
})

//this test is test on https://uat.tks.co.th/ClientPortal/Register/empeo
test.describe('Hooks',() => {
    test.only('[empeo] success register e2e in uat',async () => {
        await rp.pageEmpeo()
        test.setTimeout(60000)
        await rp.inputEmailRegister('empeo')
        await rp.OtherCompanyinput()
        await rp.usecoupon()
        await rp.checkpolicybox()
        await rp.page.waitForTimeout(300)
        await rp.selectdropdownregister()
        await rp.page.waitForTimeout(600)
        await rp.selectItemcompany()
        await rp.page.waitForTimeout(600)
        await rp.selectdropdownexp()
        await rp.inputotp()
        await rp.page.waitForTimeout(5000)
        await rp.passwordcorrect()
        await rp.page.waitForTimeout(10000)
        await rp.buttongetstart()
        await rp.page.waitForTimeout(6000)
        await rp.inputLogin('empeo')
        await rp.page.waitForTimeout(6000)
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
    })

    test('[venio] success register e2e in uat',async () => {
        await rp.pageVenio()
        test.setTimeout(60000)
        await rp.inputEmailRegister('venio')
        await rp.OtherCompanyinput()
        await rp.usecoupon()
        await rp.checkpolicybox()
        await rp.selectdropdownregister()
        await rp.selectItemcompany()
        await rp.page.waitForTimeout(300)
        await rp.selectdropdownexp()
        await rp.inputotp()
        await rp.page.waitForTimeout(5000)
        await rp.passwordcorrect()
        await rp.page.waitForTimeout(10000)
        await rp.buttongetstart()
        await rp.page.waitForTimeout(6000)
        await rp.inputLogin('venio')
        await rp.page.waitForTimeout(6000)
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
    })

    test('[salebear] success register e2e in uat',async () => {
        await rp.pageSalesbear()
        test.setTimeout(60000)
        await rp.inputEmailRegister('salesbear')
        await rp.OtherCompanyinput()
        await rp.usecoupon()
        await rp.checkpolicybox()
        await rp.selectdropdownregister()
        await rp.selectItemcompany()
        await rp.selectdropdownexp()
        await rp.inputotp()
        await rp.page.waitForTimeout(5000)
        await rp.passwordcorrect()
        await rp.page.waitForTimeout(10000)
        await rp.buttongetstart()
        await rp.page.waitForTimeout(6000)
        await rp.inputLogin('salesbear')
        await rp.page.waitForTimeout(6000)
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
    })

})
