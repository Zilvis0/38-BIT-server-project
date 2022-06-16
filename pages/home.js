import { PageTemplate } from "../lib/PageTemplate.js";

class PageHome extends PageTemplate {
    constructor(data) {
        super(data);
    }

    mainHTML() {
        return `<h1>Home page 🎅</h1>`;
    }
}

export { PageHome };