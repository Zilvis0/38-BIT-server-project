import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'register';
        this.pageJSfileName = 'register';
    }

    mainHTML() {
        return `<div class="row">
                    <h1>Register</h1>
                    <p>Register to get exited!</p>
                    <form class="form" action="/api/account" method="POST">
                        <div class="notifications"></div>
                        <label for="fullname">Fullname</label>
                        <input id="fullname" name="fullname" data-validation="fullname" type="text" placeholder="Enter value..."
                                autocomplete="name" required autofocus>
                        
                        <label for="email">Email</label>
                        <input id="email" name="email" data-validation="email" type="email" placeholder="Enter value..."
                                autocomplete="email" required>
                        
                        <label for="pass">Password</label>
                        <input id="pass" name="pass" data-validation="password" type="password" placeholder="Enter value..."
                                autocomplete="new-password" required>
                        
                        <label for="repass">Repeat password</label>
                        <input id="repass" name="repass" data-validation="password" type="password" placeholder="Enter value..."
                                autocomplete="new-password" required>
                        <input type="checkbox" name="tos" id="tos" required>
                        <label for="tos">Agree to terms and service conditions</label>
                        
                        <button type="submit">Register</button>
                    </form>
                </div>`;
    }
}

export { PageRegister };