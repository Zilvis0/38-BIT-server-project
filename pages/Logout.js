import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogout extends PageTemplate {
    constructor(data) {
        super(data);
    }

    mainHTML() {
        return `<div class="row">
                    <h1>Logout page 🎅</h1>
                </div>`;
    }
}

export { PageLogout };