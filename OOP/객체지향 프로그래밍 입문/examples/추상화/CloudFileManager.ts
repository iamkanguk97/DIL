import { CloudFileSystemFactory } from './CloudFileSystemFactory';
import { ECloudId } from './common/enums/cloud-id.enum';
import { ICloudFile } from './common/interfaces/cloud-file.interface';

export class CloudFileManager {
    /**
     * 클라우드 내 파일 리스트 조회
     */
    getFileInfos(cloudId: ECloudId): ICloudFile[] {
        return CloudFileSystemFactory.getFileSystem(cloudId).getFileList();
    }

    /**
     * 다운로드 기능
     */
    download(file: ICloudFile, localTarget: string) {
        // 로컬에 해당 target 경로에 file 다운로드
    }

    // 외에 업로드, 검색 등 ..
}
