import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    constructor() {
        super();
        this.title = '404 | Server';
    }

    mainHTML() {
        return `<h1>404 page 🎅</h1>`;
    }
}

export { Page404 };