import { DbFile } from './../DbFile';
import { ICloudFile } from '../common/interfaces/cloud-file.interface';
import { DropBoxClient } from './DropboxClient';

export class DropBoxCloudFile implements ICloudFile {
    private dbClient: DropBoxClient;
    private dbFile: DbFile;

    constructor(dbFile: DbFile, dbClient: DropBoxClient) {
        this.dbFile = dbFile;
        this.dbClient = dbClient;
    }

    getId(): string {
        return this.dbFile.getId();
    }

    hasUrl(): boolean {
        return true;
    }

    getUrl(): string {
        return this.dbFile.getFileUrl();
    }

    getName(): string {
        return this.dbFile.getName();
    }

    delete(): void {
        this.dbClient.deleteFile(this.dbFile.getId());
    }
}
