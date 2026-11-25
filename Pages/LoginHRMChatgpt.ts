
import { Locator, Page } from '@playwright/test';

export class LoginOrangeHRM {

    readonly page: Page;
    readonly url: string;

    readonly usernametxt: Locator;
    readonly passwordtxt: Locator;

    readonly username: Locator;
    readonly password: Locator;

    readonly submitBtn: Locator;

    constructor(page: Page) {

        this.page = page;

        this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

        // Text displayed on the login page
        this.usernametxt = page.locator("//div/p[text()='Username : Admin']");
        this.passwordtxt = page.locator("//div/p[text()='Password : admin123']");

        // Login input fields
        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');

        // Login button
        this.submitBtn = page.getByRole('button', { name: 'Login' });
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto(this.url);
    }

    async getUser(): Promise<string> {

        const text = await this.usernametxt.textContent();

        return text?.split(':')[1].trim() ?? '';
    }

    async getPassword(): Promise<string> {

        const text = await this.passwordtxt.textContent();

        return text?.split(':')[1].trim() ?? '';
    }

    async login(): Promise<void> {

        const user = await this.getUser();
        const pass = await this.getPassword();

        await this.username.fill(user);
        await this.password.fill(pass);

        await this.submitBtn.click();
    }
}
