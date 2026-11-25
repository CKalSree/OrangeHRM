import { expect, Page, test } from '@playwright/test';
import { AddAdminUser } from '../Pages/AddAdminUser';
import { LoginOrangeHRM } from '../Pages/LoginHRMChatgpt';

test.describe(() => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        const loginOrangeHRMPortal = new LoginOrangeHRM(page);
        await loginOrangeHRMPortal.navigateToURL();
        await loginOrangeHRMPortal.login();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('TestAdmin User ', async ({ page }) => {
        test.skip();
        const addAdminUser = new AddAdminUser(page);
        await addAdminUser.adminMenu.click();
        await addAdminUser.addBtn.click();
        await addAdminUser.selectUserRoles('Admin');
        await addAdminUser.selectStatus('Enabled');
        await addAdminUser.setEmployeeName('James');
        await addAdminUser.setUserName('James Bond122');
        await addAdminUser.setNewPassword('P@ssword12');
        await addAdminUser.setConfirmPassword('P@ssword12');
        await addAdminUser.saveBtn.click();
        await expect(page).toHaveURL(/viewSystemUsers/, {
            timeout: 5000
        });

    });

    test('Verify user record in the results table', async ({ page }) => {
        const addAdminUser = new AddAdminUser(page);
        await addAdminUser.adminMenu.click();
        await addAdminUser.setUserName('James Bond122');
        await addAdminUser.selectUserRoles('Admin');
        await addAdminUser.selectStatus('Enabled');
        // await addAdminUser.setEmployeeName('James');
        await addAdminUser.clickSearchBtn();

        // Locate the row using a unique username
        const userRow = page.getByRole('row')
            .filter({ hasText: 'James Bond122' });

        // Verify that the record exists
        await expect(userRow).toBeVisible();

        // Verify individual column values
        await expect(userRow).toContainText('James Bond122');
        await expect(userRow).toContainText('Admin');
        await expect(userRow).toContainText('James Butler');
        await expect(userRow).toContainText('Enabled');

    });


});