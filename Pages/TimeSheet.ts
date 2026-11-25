import { Locator, Page, expect } from "@playwright/test";

export class TimeSheet {
    readonly page: Page;
    readonly timeMenu: Locator;
    readonly timeSheetMenu: Locator;
    readonly employeeName: Locator;
    readonly viewBtn: Locator;
    readonly employeeNameInput: Locator;
    readonly timeSheetTableHeader: Locator;
    readonly timeSheetTable: Locator;

    constructor(page: Page) {
        this.page = page;

        this.timeMenu = page.locator("//span[text()='Time']");
        this.timeSheetMenu = page.locator("//a[text()='Timesheets']");
        this.employeeName = page.locator("//input[@placeholder='Type for hints...']");
        //this.viewBtn = page.getByRole('button', { name: 'View' });
        //button[@type='submit' and normalize-space()='View']
        this.viewBtn = page.locator("//button[@type='submit' and normalize-space()='View']");
        this.employeeNameInput = page.locator("//input[@placeholder='Type for hints...']");
        this.timeSheetTableHeader = page.locator("//div/h6[text()='Actions Performed on the Timesheet']");
        this.timeSheetTable = page.locator("//div[@class='oxd-table']");
    }
    // async setEmployeeName(employeeName: string): Promise<void> {
    //     await this.employeeName.fill(employeeName);
    //     // Wait for autocomplete suggestions
    //     const suggestions = this.page.locator(
    //         '.oxd-autocomplete-option'
    //     );
    //     await expect(suggestions.first()).toBeVisible({
    //         timeout: 15000
    //     });
    // }
    async viewTimeSheet(employeeName: string): Promise<void> {
        await this.timeMenu.click();
        //await this.timeSheetMenu.waitFor({ state: 'visible', timeout: 3000 });
        await this.employeeNameInput.fill(employeeName);
        await this.page.waitForTimeout(3000); // Wait for suggestions to appear
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for the input to be processed
        await this.viewBtn.click();
        await this.timeSheetTableHeader.waitFor({ state: 'visible', timeout: 10000 });
        expect(await this.timeSheetTableHeader.isVisible()).toBeTruthy();
        const userRow = this.page.getByRole('row')
            .filter({ hasText: 'Submitted' });

        // Verify that the record exists
        await expect(userRow).toBeVisible();


    }

};     