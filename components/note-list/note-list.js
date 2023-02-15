class NoteList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
    }

    async load() {

    }

    async disconnectedCallback() {

    }
}
customElements.define("note-list", NoteList);