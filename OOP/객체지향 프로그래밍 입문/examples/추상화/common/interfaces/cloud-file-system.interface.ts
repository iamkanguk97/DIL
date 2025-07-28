import { ICloudFile } from './cloud-file.interface';

export interface ICloudFileSystem {
    getFileList(): ICloudFile[];
}
