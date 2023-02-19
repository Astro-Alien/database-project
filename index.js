class ViewModel {
   async connectedCallback() {

   }

    async disconnectedCallback() {

    }

}

globalThis.viewModel = new ViewModel();
await globalThis.viewModel.connectedCallback();
