import { expect, Locator, Page } from '@playwright/test';

export class AddAdminUser {
    readonly page: Page;
    readonly adminMenu: Locator;
    readonly addBtn: Locator;
    readonly userRoles: Locator;
    readonly status: Locator;
    readonly employeeName: Locator;
    readonly userName: Locator;
    readonly newPassword: Locator;
    readonly confirmPassword: Locator;
    readonly saveBtn: Locator;
    readonly searchUser: Locator;
    readonly searchBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.locator("//span[text()='Admin']");
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.userRoles = page.locator('.oxd-select-text-input').nth(0);
        this.status = page.locator('.oxd-select-text-input').nth(1);
        this.employeeName = page.locator("//input[@placeholder='Type for hints...']");
        this.userName = page.locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .locator('input');
        //this.userName = page.locator('.oxd-input--active[data-v-1f99f73c]').nth(1);
        this.newPassword = page.locator("//input[@type='password']").nth(0);
        this.confirmPassword = page.locator("//input[@type='password']").nth(1);
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.searchUser = page.locator('//input[@class="oxd-input oxd-input--active"]').nth(1);
        this.searchBtn = page.getByRole('button', { name: 'Search' });
    }
    async selectUserRoles(role: string): Promise<void> {
        await this.userRoles.click();
        await this.page.locator('.oxd-select-option')
            .getByText(role, { exact: true })
            .click();

    }
    async selectStatus(status: string): Promise<void> {
        await this.status.click();
        await this.page.locator('.oxd-select-option')
            .getByText(status, { exact: true })
            .click();

    }
    // async setEmployeeName(employeeName: string): Promise<void> {
    //     await this.employeeName.fill(employeeName);
    //     await this.page.keyboard.press('ArrowDown');
    //     await this.page.keyboard.press('Enter');
    // }

    async setEmployeeName(employeeName: string): Promise<void> {

        await this.employeeName.fill(employeeName);

        // Wait for autocomplete suggestions
        const suggestions = this.page.locator(
            '.oxd-autocomplete-option'
        );

        await expect(suggestions.first()).toBeVisible({
            timeout: 15000
        });

        // Print available suggestions
        const employeeList = await suggestions.allTextContents();

        console.log('Available Employees:', employeeList);

        // Select the first matching suggestion
        const matchingEmployee = suggestions.filter({
            hasText: employeeName
        });

        await expect(matchingEmployee.first()).toBeVisible();

        await matchingEmployee.first().click();

        // Verify selected employee
        await expect(this.employeeName).not.toHaveValue('');

    }

    async setUserName(userName: string): Promise<void> {
        await this.userName.fill(userName);
    }
    async setNewPassword(password: string): Promise<void> {
        await this.newPassword.fill(password);
    }
    async setConfirmPassword(password: string): Promise<void> {
        await this.confirmPassword.fill(password);
    }
    async saveDetails(): Promise<void> {
        await this.saveBtn.click();

    }
    async searchUserName(usertxt: string) {
        await this.searchUser.click();
        await this.searchUser.fill(usertxt);
    }
    async clickSearchBtn(): Promise<void> {
        await this.searchBtn.click();
    }





}