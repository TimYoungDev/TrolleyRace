"Use Strict"

class DatabaseResult {
    /**
     * Database callback result constructor.
     * @param hasError Error indicator
     * @param message Error message (if hasError is true)
     * @param data Result data if successful
     */
    constructor (hasError, message, data) {
        this._hasError = hasError;
        this._message = message;
        this._data = data;
    }
    get hasError() { return this._hasError; }
    get message() { return this._message; }
    get data() { return this._data; }
}

module.exports = DatabaseResult;
