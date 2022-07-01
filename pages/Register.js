import { PageTemplate } from "../lib/PageTemplate.js";
import config from '../config.js';

class PageRegister extends PageTemplate {
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'auth';
        this.pageJSfileName = 'register';
    }

    mainHTML() {
        const isDev = config.name === 'dev';
        const formValues = {
            fullname: isDev ? 'Chuck Norris' : '',
            email: isDev ? 'chuck@norris.com' : '',
            pass: isDev ? 'chuck@norris.com' : '',
            repass: isDev ? 'chuck@norris.com2' : '',
        }
        return `<div class="row">
                    <h1>Register</h1>
                    <p>Register to get exited!</p>
                    <form class="form" action="/api/account" method="POST">
                        <div class="notifications"></div>
                        <label for="fullname">Fullname</label>
                        <input id="fullname" name="fullname" data-validation="fullname" type="text" placeholder="Enter value..."
                                autocomplete="name" required autofocus value="${formValues.fullname}">
                        
                        <label for="email">Email</label>
                        <input id="email" name="email" data-validation="email" type="email" placeholder="Enter value..."
                                autocomplete="email" required value="${formValues.email}">
                        <label for="pass">Password</label>
                        <input id="pass" name="pass" data-validation="password" type="password" placeholder="Enter value..."
                                autocomplete="new-password" required value="${formValues.pass}">
                        <label for="repass">Repeat password</label>
                        <input id="repass" name="repass" data-validation="password" type="password" placeholder="Enter value..."
                                autocomplete="new-password" required value="${formValues.repass}">
                        <input type="checkbox" name="tos" id="tos" required>
                        <label for="tos">Agree to terms and service conditions</label>
                        <button type="submit">Register</button>
                    </form>
                </div>`;
    }
}

export { PageRegister };