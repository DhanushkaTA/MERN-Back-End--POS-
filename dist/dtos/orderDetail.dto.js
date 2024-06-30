"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailDto = void 0;
class OrderDetailDto {
    constructor(itemId, qty, amount, unitPrice) {
        this._itemId = itemId;
        this._qty = qty;
        this._unitPrice = unitPrice;
        this._amount = amount;
    }
    get itemId() {
        return this._itemId;
    }
    set itemId(value) {
        this._itemId = value;
    }
    get qty() {
        return this._qty;
    }
    set qty(value) {
        this._qty = value;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
    }
    get unitPrice() {
        return this._unitPrice;
    }
    set unitPrice(value) {
        this._unitPrice = value;
    }
    toJSON() {
        return {
            itemId: this.itemId,
            qty: this.qty,
            unitPrice: this._unitPrice,
            amount: this.amount
        };
    }
}
exports.OrderDetailDto = OrderDetailDto;
//# sourceMappingURL=orderDetail.dto.js.map