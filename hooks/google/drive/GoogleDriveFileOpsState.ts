export interface GoogleDriveFileOpsState {
    fileContent: string;
    isLoadingFile: boolean;
    fileError: string | null;
    readFile: (accessToken: string, fileId: string) => Promise<void>;
    writeFile: (accessToken: string, fileId: string, content: string) => Promise<void>;
    // Добавим поле для хранения ID файла, если его нужно найти
    foundFileId: string | null;
    findOrCreateFile: (accessToken: string, fileName: string) => Promise<string | null>;
}
