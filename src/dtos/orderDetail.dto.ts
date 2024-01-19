export class OrderDetailDto {

    private _itemId: string;
    private _qty: number;
    private _amount:number;


    constructor(itemId: string, qty: number, amount: number) {
        this._itemId = itemId;
        this._qty = qty;
        this._amount = amount;
    }


    get itemId(): string {
        return this._itemId;
    }

    set itemId(value: string) {
        this._itemId = value;
    }

    get qty(): number {
        return this._qty;
    }

    set qty(value: number) {
        this._qty = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    toJSON(){
        return {
            itemId:this.itemId,
            qty:this.qty,
            amount:this.amount
        }
    }
}