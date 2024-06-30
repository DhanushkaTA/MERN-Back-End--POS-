"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor(status, message, data, totalRecodes, totalPages) {
        this._status = status;
        this._message = message;
        this._data = data;
        this._totalRecodes = totalRecodes;
        this._totalPages = totalPages;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    get totalPages() {
        return this._totalPages;
    }
    set totalPages(value) {
        this._totalPages = value;
    }
    get totalRecodes() {
        return this._totalRecodes;
    }
    set totalRecodes(value) {
        this._totalRecodes = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    toJSON() {
        return {
            status: this.status,
            message: this.message,
            data: this.data,
            totalRecodes: this.totalRecodes,
            totalPages: this.totalPages
        };
    }
}
exports.CustomResponse = CustomResponse;
//# sourceMappingURL=custom.response.js.map