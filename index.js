class ViewModel {

   async connectedCallback() {
       const worker = new Worker("./src/database/database-worker.js");

       globalThis.dbWorker = worker;
   }

    async disconnectedCallback() {
    }

}

globalThis.viewModel = new ViewModel();
await globalThis.viewModel.connectedCallback();
