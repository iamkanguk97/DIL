import { DbFile } from '../DbFile';

export class DropBoxClient {
    private static STORAGE = [
        new DbFile('1', 'https://www.dropbox.com/file1', 'file1'),
        new DbFile('2', 'https://www.dropbox.com/file2', 'file2'),
        new DbFile('3', 'https://www.dropbox.com/file3', 'file3'),
        new DbFile('4', 'https://www.dropbox.com/file4', 'file4')
    ];

    getFileList(): DbFile[] {
        return DropBoxClient.STORAGE;
    }

    deleteFile(fileId: string): void {
        DropBoxClient.STORAGE = DropBoxClient.STORAGE.filter((file) => file.getId() !== fileId);
    }
}
