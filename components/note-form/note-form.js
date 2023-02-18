class NoteForm extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        await this.load();
    }

    load() {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                //initialise resources here
                resolve();
            });
        });
    }

    async disconnectedCallback() {

    }
}

customElements.define("note-form", NoteForm);