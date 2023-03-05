class NoteForm extends HTMLElement {
    #buttonClickHandler;
    #note;
    #title;
    #actionMethods = Object.freeze({
        "create": this.#createNote.bind(this),
        "update": this.#updateNote.bind(this),
        "delete": this.#deleteNote.bind(this)
    });

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
                this.#note = this.shadowRoot.querySelector("#note");
                this.#title = this.shadowRoot.querySelector("#title");

                //button click handler
                this.#buttonClickHandler = this.#buttonActionType.bind(this);
                this.shadowRoot.addEventListener("click", this.#buttonClickHandler);
                resolve();
            });
        });
    }

    async disconnectedCallback() {
        this.shadowRoot.removeEventListener("click", this.#buttonClickHandler);
        this.#buttonClickHandler = null;
        this.#actionMethods = null;
        this.#title = null;
        this.#note = null;
    }

    async #buttonActionType(event) {
        const action = event.target.dataset.action
        if (this.#actionMethods[action] != null) {
            await this.#actionMethods[action](event);
        }
    }

    async #createNote(event) {
        const data = {"title": this.#title.value, "note": this.#note.value}
        const noteObject = {"action": "create", data};

        await this.#dispatchEvents(noteObject);
        await this.#resetForm(this.#note.value, this.#title.value);
    }

    async #updateNote(event) {
        //Todo: add in update functionality
    }

    async #deleteNote(event) {
        //Todo: add in delete functionality
    }

    async #resetForm(note, title) {
        note != null && (note.value = "");
        title != null && (title.value = "");
    }

    async #dispatchEvents(data) {
        this.shadowRoot.dispatchEvent(new CustomEvent("dataTransfer", {detail: data, bubbles: true, composed: true}));
    }

}

customElements.define("note-form", NoteForm);