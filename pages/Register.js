import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor(data) {
        super(data);
    }

    mainHTML() {
        return `<div class="row">
                    <h1>Register</h1>
                    <p>Register to get exited!</p>
                    <form action="/api/account" method="POST">
                        <label>Fullname</label>
                        <input>
                        <label>Email</label>
                        <input>
                        <label>Password</label>
                        <input>
                        <label>Repeat password</label>
                        <input>
                        <button type="submit">Register</button>
                    </form>
                </div>`;
    }
}

export { PageRegister };