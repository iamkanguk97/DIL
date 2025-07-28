export class DbFile {
    private id!: string;
    private fileUrl!: string;
    private name!: string;

    constructor(id: string, fileUrl: string, name: string) {
        this.id = id;
        this.fileUrl = fileUrl;
        this.name = name;
    }

    getId(): string {
        return this.id;
    }

    getFileUrl(): string {
        return this.fileUrl;
    }

    getName(): string {
        return this.name;
    }
}
