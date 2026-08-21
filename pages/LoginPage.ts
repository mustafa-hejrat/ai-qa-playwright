import { Page, Locator } from '@playwright/test';

export class LoginPage {
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    constructor(private page: Page){
      this.usernameInput = page.getByPlaceholder('Username');
      this.passwordInput = page.getByPlaceholder('Password');
      this.loginButton = page.getByRole('button', { name: 'Login' });  
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}