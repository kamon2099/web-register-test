import {test, expect} from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseUrl = "https://reqres.in/api"

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/user/2`)
    })
})