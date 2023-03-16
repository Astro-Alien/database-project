class ViewModel {
    #actionHandler;
    #dbWorker;

    async connectedCallback() {
        await this.load();
    }

    load() {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                const worker = new Worker("./src/database/database-worker.js");
                this.#dbWorker = worker;
                //action type handler
                this.#actionHandler = this.#actionType.bind(this);
                document.addEventListener("dataTransfer", this.#actionHandler);
                resolve();
            });
        });
    }

    async disconnectedCallback() {
        this.#actionHandler = null;
        this.#dbWorker.terminate();
        this.#dbWorker = null;
        document.removeEventListener("dataTransfer", this.#actionHandler);
    }

    async #actionType(event) {
        const data = event.detail;
        this.#dbWorker.postMessage(data);
        event.stopPropagation();
    }
}

globalThis.viewModel = new ViewModel();
await globalThis.viewModel.connectedCallback();
