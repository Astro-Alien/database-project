importScripts("./database.js");
/**
 * @class DatabaseWorker - Worker for database wrapper class
 *
 * feature:
 * @method #create {object} - creates a record in the store by calling the globalThis.database.create method
 * @method #read {string/integer}- reads a record from the store by calling the globalThis.database.read method
 * @method #update {object}- updates a record in the store by calling the globalThis.database.update method
 * @method #deleteRecord {string/integer}- deletes a record from the store by calling the globalThis.database.deleteRecord method

 */
class DatabaseWorker{
    /**
     * @method #create - It creates a record
     * @param record - The record to be created.
     * @returns The return value of the create method of the database object.
     */
    async #create(record) {
        return globalThis.database.create(record);
    }

    /**
     * @method #read - "Read a record from the database."
     * @param id - The id of the record to read.
     * @returns The read method is being returned.
     */
    async #read(id) {
        return globalThis.database.read(id);
    }

    /**
     * @method #update - It updates a record in the database.
     * @param record - The record to update.
     * @returns The return value of the update() method of the database object.
     */
    async #update(record) {
        return globalThis.database.update(record);
    }

    /**
     * @method #getAll - This function returns all the data in the database
     * @returns The getAll() function from the database.js file.
     */
    async #getAll() {
        return globalThis.database.getAll();
    }

    /**
     * @method #deleteRecord - This function deletes a record from the database
     * @param id - The id of the record to delete.
     * @returns The result of the deleteRecord function.
     */
    async #deleteRecord(id) {
        return globalThis.database.deleteRecord(parseInt(id));
    }

    /**
     * @method createPosting - This function creates a new postMessage object and sends it to the main thread.
     * @param data - The message to send
     */
    async createPosting(data) {
        const id = await this.#create(data);
        const record = await this.#read(id);
        self.postMessage(record);
    }

    /**
     * @method readPosting - This function filters records from the database. and creates a new postMessage object and sends it to the main thread.
     * @param data - The data that is being read.
     */
    async readPosting(data) {
        const record = await this.#read(data);
        self.postMessage(record);
    }

    /**
     * @method updatePosting - This function updates a record in the database and creates a new postMessage object and sends it to the main thread.
     * @param data - The data to be updated.
     */
    async updatePosting(data) {
        await this.#update(data);
    }

    /**
     * @method getAllPosting - It gets all the records from the IndexedDB and sends them back to the main thread
     * @param data - The data passed from the main thread.
     */
    async getAllPosting(data) {
        const record = await this.#getAll();
        self.postMessage(record);
    }

    /**
     * @method deletePosting - This function deletes a posting from the database and creates a new postMessage object and sends it to the main thread.
     * @param data - The data to be deleted.
     */
    async deletePosting(data) {
        await this.#deleteRecord(data);
    }
}

self.onmessage = async (event) => {
    const dbWorker = new DatabaseWorker();
    const {action, data} = event.data;

    if (dbWorker[`${action}Posting`]) {
        await initDB();
        await dbWorker[`${action}Posting`](data);
    }
}

async function initDB() {
    const db = new Database();
    return new Promise(resolve => {
        db.connectToDB().then(database => {
            globalThis.database = database;
            resolve();
        })
    })
}