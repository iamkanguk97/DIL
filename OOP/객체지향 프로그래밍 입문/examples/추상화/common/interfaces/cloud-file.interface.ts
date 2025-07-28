export interface ICloudFile {
    getId(): string;

    hasUrl(): boolean;

    getUrl(): string;

    getName(): string;

    delete(): void;
}
