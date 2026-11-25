import { test, expect, Page } from '@playwright/test';
import { TimeSheet } from '../Pages/TimeSheet';
import { LoginOrangeHRM } from '../Pages/LoginHRMChatgpt';

test.describe(() => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        const loginOrangeHRMPortal = new LoginOrangeHRM(page);
        await loginOrangeHRMPortal.navigateToURL();
        await loginOrangeHRMPortal.login();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Verify TimeSheet for Employee', async ({ page }) => {
        const timeSheet = new TimeSheet(page);
        await timeSheet.viewTimeSheet('Johnedit doe');
    });
});