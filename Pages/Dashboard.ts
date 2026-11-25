import { Locator, Page, expect } from "@playwright/test";

export class Dashboard {
    readonly page: Page
    readonly GlobalSearch: Locator;
    readonly GlobalSearchText: Locator;
    readonly DashboardMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.GlobalSearch = page.locator("//input[@placeholder='Search']");
        this.GlobalSearchText = page.locator("//div[@class='oxd-autocomplete-option']");
        this.DashboardMenu = page.locator("//span[text()='Dashboard']");
    }

    async searchAndClick(searchText: string): Promise<void> {
        await this.GlobalSearch.fill(searchText);
        await this.page.waitForTimeout(3000);
        //const searchResult = this.GlobalSearchText.filter({ hasText: searchText });
        //await expect(searchResult).toBeVisible();
        await this.DashboardMenu.click();
    }
}