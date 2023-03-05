class ViewModel {
    #actionHandler;

    async connectedCallback() {
        await this.load();
    }

    load() {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                const worker = new Worker("./src/database/database-worker.js");
                globalThis.dbWorker = worker;
                //action type handler
                this.#actionHandler = this.#actionType.bind(this);
                document.addEventListener("dataTransfer", this.#actionHandler);
                resolve();
            });
        });
    }

    async disconnectedCallback() {
        this.#actionHandler = null;
        globalThis.dbWorker.terminate();
        document.removeEventListener("dataTransfer", this.#actionHandler);
    }

    async #actionType(event) {
        const data = event.detail;
        dbWorker.postMessage(data);
    }
}

globalThis.viewModel = new ViewModel();
await globalThis.viewModel.connectedCallback();
