import { expect, test } from "@playwright/test";
import { LoginOrangeHRM } from "../Pages/LoginOrangeHRM";

test.describe('First test', () => {

    test('Check Login Flow', async ({ page }) => {

        const loginOrangeHRMPortal = new LoginOrangeHRM(page);
        await loginOrangeHRMPortal.navigateToURL();
        await loginOrangeHRMPortal.login();
        await expect(page).toHaveURL(/dashboard/);
    });

});

