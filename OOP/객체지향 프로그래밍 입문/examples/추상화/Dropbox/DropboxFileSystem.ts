import { DropBoxCloudFile } from './DropboxCloudFile';
import { DropBoxClient } from './DropboxClient';
import { ICloudFile } from '../common/interfaces/cloud-file.interface';
import { ICloudFileSystem } from './../common/interfaces/cloud-file-system.interface';

export class DropboxFileSystem implements ICloudFileSystem {
    private dbClient: DropBoxClient = new DropBoxClient();

    /**
     * 파일 목록 조회
     */
    getFileList(): ICloudFile[] {
        const dbFiles = this.dbClient.getFileList();
        const results: ICloudFile[] = [];

        for (const file of dbFiles) {
            results.push(new DropBoxCloudFile(file, this.dbClient));
        }

        return results;
    }
}
