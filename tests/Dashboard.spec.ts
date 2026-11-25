import { expect, test, Page } from '@playwright/test';
import { Dashboard } from '../Pages/Dashboard';
import { LoginOrangeHRM } from '../Pages/LoginHRMChatgpt';

test.describe(() => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        const loginOrangeHRMPortal = new LoginOrangeHRM(page);
        await loginOrangeHRMPortal.navigateToURL();
        await loginOrangeHRMPortal.login();
        await expect(page).toHaveURL(/dashboard/);
    });
    test('Verify Dashboard Search Functionality', async ({ page }) => {
        const dashboard = new Dashboard(page);
        await dashboard.searchAndClick('Dashboard');
        await expect(page).toHaveURL(/dashboard/);
    });
});