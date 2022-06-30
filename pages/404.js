import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = '404 | Server';
    }

    mainHTML() {
        return `<div class="row">
                    <h1>404 page 🎅</h1>
                </div>`;
    }
}

export { Page404 };