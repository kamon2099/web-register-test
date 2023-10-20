import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-object/register/LoginPage'
import { FrameLocatorPage, PRODUCTNAME } from '../../page-object/register/FrameLocatorPage'


let empfl: FrameLocatorPage
let lp: LoginPage
let veniofl: FrameLocatorPage
let salesbearfl: FrameLocatorPage

test.beforeEach(async ({ page }) => {
    empfl = new FrameLocatorPage(page,PRODUCTNAME.empeo)
    veniofl = new FrameLocatorPage(page,PRODUCTNAME.venio)
    salesbearfl = new FrameLocatorPage(page,PRODUCTNAME.salesbear)
    lp = new LoginPage(page)
    
})

//this test is test on https://www.empeo.com/uat-register/
test.describe('Hooks',() => {
    test('[empeo] success register e2e in empeo/uat',async () => {
        await empfl.pageEmpeofl()
        test.setTimeout(100000)
        await empfl.inputEmailRegister('empeofl')
        await empfl.OtherCompanyinput()
        await empfl.usecoupon()
        await empfl.checkpolicybox()
        await empfl.selectdropdownregister()
        await empfl.selectItemcompany()
        await empfl.selectdropdownexp()
        await empfl.inputotp()
        await empfl.passwordcorrect()
        await empfl.buttongetstart()
        await empfl.page.waitForTimeout(2000)
        await empfl.inputLogin('empeofl')
        await lp.page.waitForTimeout(6000)
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
    })

    test('[venio] success register e2e in venio/uat',async () => {
        await veniofl.pageVeniofl()
        test.setTimeout(60000)
        await veniofl.inputEmailRegister('veniofl')
        await veniofl.OtherCompanyinput()
        await veniofl.usecoupon()
        await veniofl.checkpolicybox()
        await veniofl.selectdropdownregister()
        await veniofl.selectItemcompany()
        await veniofl.selectdropdownexp()
        await veniofl.inputotp()
        await veniofl.passwordcorrect()
        await veniofl.buttongetstart()
        await veniofl.page.waitForTimeout(2000)
        await veniofl.inputLogin('veniofl')
        await lp.page.waitForTimeout(6000)
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
    })

    test('[salesbear] success register e2e in salesbear/uat',async () => {
        await salesbearfl.pageSalesbear()
        test.setTimeout(60000)
        await salesbearfl.inputEmailRegister('salesbearfl')
        await salesbearfl.OtherCompanyinput()
        await salesbearfl.usecoupon()
        await salesbearfl.checkpolicybox()
        await salesbearfl.selectdropdownregister()
        await salesbearfl.selectItemcompany()
        await salesbearfl.selectdropdownexp()
        await salesbearfl.inputotp()
        await salesbearfl.passwordcorrect()
        await salesbearfl.buttongetstart()
        await salesbearfl.page.waitForTimeout(2000)
        await salesbearfl.inputLogin('salesbearfl')
        await lp.page.waitForTimeout(6000)
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
    })

    test('Verify if a user cannot login with a valid username and an invalid password', async () => {
        await lp.loginpage()
        await lp.login('invalid@email.com', 'invalid password')
        await lp.page.waitForLoadState()
        await lp.assertErrorMessage()
      })
})