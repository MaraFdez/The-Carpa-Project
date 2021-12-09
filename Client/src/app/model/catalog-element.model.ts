export class CatalogElement {

    constructor(
        private _id: number,
        private _username: string,
        private _projectName: string,
        private _description: string,
        private _image: string,
        private _price: number,
        private _publicationDate: Date,
        private _data: File
    ) { }
    
    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get username(): string {
        return this._username;
    }
    
    public set username(value: string) {
        this._username = value;
    }

    public get projectName(): string {
        return this._projectName;
    }

    public set projectName(value: string) {
        this._projectName = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get image(): string {
        return this._image;
    }

    public set image(value: string) {
        this._image = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get publicationDate(): Date {
        return this._publicationDate;
    }
    
    public set publicationDate(value: Date) {
        this._publicationDate = value;
    }

    public get data(): File {
        return this._data;
    }
    
    public set data(value: File) {
        this._data = value;
    }

}