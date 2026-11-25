import { test, expect } from '@playwright/test';
import { AllMenuItems } from '../Pages/AllMenuItems';
import { LoginOrangeHRM } from '../Pages/LoginHRMChatgpt';

test.describe('Verify All Menu Items', () => {

    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        const loginOrangeHRMPortal = new LoginOrangeHRM(page);
        await loginOrangeHRMPortal.navigateToURL();
        await loginOrangeHRMPortal.login();
        await expect(page).toHaveURL(/dashboard/, {
            timeout: 5000
        });
        // Wait until dashboard is completely loaded
        await page.waitForLoadState('domcontentloaded');

        // Verify dashboard heading
        await expect(page.getByRole('heading', {
            name: 'Dashboard'
        })).toBeVisible();
    });

    test('Verify All Menu Items', async ({ page }) => {
        const allMenuItems = new AllMenuItems(page);
        await allMenuItems.VerifyAllMenuItems();
    });
});