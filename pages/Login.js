import { PageTemplate } from "../lib/PageTemplate.js";
import config from '../config.js';

class PageLogin extends PageTemplate {
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'auth';
        this.pageJSfileName = 'login';
    }

    mainHTML() {
        const isDev = config.name === 'dev';
        const formValues = {
            email: isDev ? 'chuck@norris.com' : '',
            pass: isDev ? 'chuck@norris.com' : '',
        }
        return `<div class="row">
                    <h1>Login</h1>
                    <p>Login to get exited!</p>
                    <form class="form" action="/api/account" method="POST">
                        <div class="notifications"></div>
                        <label for="email">Email</label>
                        <input id="email" name="email" data-validation="email" type="email" placeholder="Enter value..."
                                autocomplete="email" required value="${formValues.email}">
                        <label for="pass">Password</label>
                        <input id="pass" name="pass" data-validation="password" type="password" placeholder="Enter value..."
                                autocomplete="new-password" required value="${formValues.pass}">
                        <button type="submit">Login</button>
                    </form>
                </div>`;
    }
}

export { PageLogin };