"Use Strict"

class DatabaseResult {
    /**
     * Database callback result constructor.
     * @param hasError Error indicator
     * @param message Error message (if hasError is true)
     * @param data Result data if successful
     */
    constructor (hasError, message, data) {
        this.hasError = hasError;
        this.message = message;
        this.data = data;
    }
    get getHasError() { return this.hasError; }
    get getMessage() { return this.message; }
    get getData() { return this.data; }
}

module.exports = DatabaseResult;
