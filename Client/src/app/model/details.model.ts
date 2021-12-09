export class Details {

    constructor(
        private projectName: string,
        private description: string,
        private image: string,
        private price: number
    ) {}

    public get _projectName(): string {
        return this.projectName;
    }

    public set _projectName(value: string) {
        this.projectName = value;
    }

    public get _description(): string {
        return this.description;
    }

    public set _description(value: string) {
        this.description = value;
    }

    public get _image(): string {
        return this.image;
    }

    public set _image(value: string) {
        this.image = value;
    }

    public get _price(): number {
        return this.price;
    }

    public set _price(value: number) {
        this.price = value;
    }
    
}