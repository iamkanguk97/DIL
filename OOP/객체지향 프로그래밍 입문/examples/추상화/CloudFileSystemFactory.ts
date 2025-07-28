import { BoxFileSystem } from './Box/BoxFileSystem';
import { DropboxFileSystem } from './Dropbox/DropboxFileSystem';
import { ECloudId } from './common/enums/cloud-id.enum';
import { ICloudFileSystem } from './common/interfaces/cloud-file-system.interface';

export class CloudFileSystemFactory {
    /**
     * FileSystem 인스턴스 반환 팩터리 메서드
     */
    static getFileSystem(cloudId: ECloudId): ICloudFileSystem {
        switch (cloudId) {
            case ECloudId.DROPBOX:
                return new DropboxFileSystem();
            case ECloudId.BOX:
                return new BoxFileSystem();
            // case ECloudId.SCLOUD:
            //     return;
            // case ECloudId.DCLOUD:
            //     return;
            // case ECloudId.NCLOUD:
            //     return;
            default:
                throw new Error('Invalid cloud ID');
        }
    }
}
