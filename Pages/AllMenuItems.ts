import { expect, Locator, Page } from "@playwright/test";

export class AllMenuItems {
    readonly page: Page;
    readonly adminMenu: Locator;
    readonly pimMenu: Locator;
    readonly leaveMenu: Locator;
    readonly timeMenu: Locator;
    readonly recruitmentMenu: Locator;
    readonly myInfoMenu: Locator;
    readonly performanceMenu: Locator;
    readonly dashboardMenu: Locator;
    readonly directoryMenu: Locator;
    readonly maintenanceMenu: Locator;
    readonly buzzMenu: Locator;
    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.locator("//span[text()='Admin']");
        this.pimMenu = page.locator("//span[text()='PIM']");
        this.leaveMenu = page.locator("//span[text()='Leave']");
        this.timeMenu = page.locator("//span[text()='Time']");
        this.recruitmentMenu = page.locator("//span[text()='Recruitment']");
        this.myInfoMenu = page.locator("//span[text()='My Info']");
        this.performanceMenu = page.locator("//span[text()='Performance']");
        this.dashboardMenu = page.locator("//span[text()='Dashboard']");
        this.directoryMenu = page.locator("//span[text()='Directory']");
        this.maintenanceMenu = page.locator("//span[text()='Maintenance']");
        this.buzzMenu = page.locator("//span[text()='Buzz']");
    }
    async VerifyAllMenuItems(): Promise<void> {
        await expect(this.adminMenu).toBeVisible();
        await expect(this.pimMenu).toBeVisible();
        await expect(this.leaveMenu).toBeVisible();
        await expect(this.timeMenu).toBeVisible();
        await expect(this.recruitmentMenu).toBeVisible();
        await expect(this.myInfoMenu).toBeVisible();
        await expect(this.performanceMenu).toBeVisible();
        await expect(this.dashboardMenu).toBeVisible();
        await expect(this.directoryMenu).toBeVisible();
        await expect(this.maintenanceMenu).toBeVisible();
        await expect(this.buzzMenu).toBeVisible();
    }
}