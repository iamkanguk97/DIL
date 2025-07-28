import { ICloudFileSystem } from '../common/interfaces/cloud-file-system.interface';
import { ICloudFile } from '../common/interfaces/cloud-file.interface';

export class BoxFileSystem implements ICloudFileSystem {
    getFileList(): ICloudFile[] {
        return [];
    }
}
