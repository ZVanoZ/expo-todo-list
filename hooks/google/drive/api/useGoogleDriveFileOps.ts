import {useState, useCallback} from 'react';
import {GoogleDriveFileOpsState} from "@/hooks/google/drive/api/GoogleDriveFileOpsState";

export const useGoogleDriveFileOps = (): GoogleDriveFileOpsState => {
    console.log('useNativeGoogleApi.ts/useGoogleDriveFileOps/BEG');

    const [fileContent, setFileContent] = useState('');
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    const [foundFileId, setFoundFileId] = useState<string | null>(null);

    // Функция для выполнения запросов к Google Drive API
    const driveApiFetch = useCallback(
        async (accessToken: string, url: string, options?: RequestInit) => {
            console.log('useNativeGoogleApi.ts/useGoogleDriveFileOps/driveApiFetch');

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                ...(options?.headers || {}),
            };
            const response = await fetch(url, {...options, headers});
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error: ${response.status} - ${response.statusText} - ${errorText}`);
            }
            return response;
        },
        []
    );

    // --- Поиск или создание файла ---
    const findOrCreateFile = useCallback(
        async (accessToken: string, fileName: string): Promise<string | null> => {
            console.log('useNativeGoogleApi.ts/useGoogleDriveFileOps/findOrCreateFile');

            setIsLoadingFile(true);
            setFileError(null);
            try {
                // 1. Поиск файла
                const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and trashed=false and mimeType='text/plain'`;
                const searchResponse = await driveApiFetch(accessToken, searchUrl);
                const searchData = await searchResponse.json();

                if (searchData.files && searchData.files.length > 0) {
                    const fileId = searchData.files[0].id;
                    setFoundFileId(fileId);
                    setIsLoadingFile(false);
                    return fileId;
                } else {
                    // 2. Если файл не найден, создать его
                    const createUrl = 'https://www.googleapis.com/drive/v3/files';
                    const createOptions: RequestInit = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: fileName,
                            mimeType: 'text/plain',
                        }),
                    };
                    const createResponse = await driveApiFetch(accessToken, createUrl, createOptions);
                    const createData = await createResponse.json();
                    const fileId = createData.id;
                    setFoundFileId(fileId);
                    setIsLoadingFile(false);
                    return fileId;
                }
            } catch (err: any) {
                console.error("Error finding/creating file:", err);
                setFileError(err.message || 'Ошибка при поиске/создании файла.');
                setIsLoadingFile(false);
                return null;
            }
        },
        [driveApiFetch]
    );


    // --- Чтение файла ---
    const readFile = useCallback(
        async (accessToken: string, fileId: string) => {
            console.log('useNativeGoogleApi.ts/useGoogleDriveFileOps/readFile');
            setIsLoadingFile(true);
            setFileError(null);
            try {
                const response = await driveApiFetch(accessToken, `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
                const textContent = await response.text();
                setFileContent(textContent);
                setIsLoadingFile(false);
            } catch (err: any) {
                console.error("Error reading file:", err);
                setFileError(err.message || 'Ошибка при чтении файла.');
                setIsLoadingFile(false);
            }
        },
        [driveApiFetch]
    );

    // --- Запись файла ---
    // Для обеспечения целостности, Google Drive API рекомендует использовать
    // условное обновление, но для простых текстовых файлов и без сложного merge
    // это сложнее реализовать. Для вашей задачи, простое обновление будет приемлемо,
    // но потенциально может привести к перезаписи при одновременном изменении.
    // Если требуется строгая целостность, необходимо реализовать логику ETag.
    // В данном примере будет простое обновление.
    const writeFile = useCallback(
        async (accessToken: string, fileId: string, content: string) => {
            console.log('useNativeGoogleApi.ts/useGoogleDriveFileOps/writeFile');
            setIsLoadingFile(true);
            setFileError(null);
            try {
                // Для текстовых файлов используем метод "upload" с type=media
                const uploadResponse = await driveApiFetch(
                    accessToken,
                    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
                    {
                        method: 'PATCH', // Используем PATCH для обновления содержимого
                        headers: {
                            'Content-Type': 'text/plain', // Важно для текстовых файлов
                        },
                        body: content,
                    }
                );
                // Если запрос успешен, response.ok будет true, но может не быть JSON
                if (uploadResponse.ok) {
                    // Можно прочитать ответ, если API что-то возвращает (например, метаданные)
                    // const updatedFileMeta = await uploadResponse.json();
                    console.log('Файл успешно обновлен!');
                    setFileContent(content); // Обновим состояние после успешной записи
                    setIsLoadingFile(false);
                } else {
                    const errorBody = await uploadResponse.text();
                    throw new Error(`Ошибка записи файла: ${uploadResponse.status} - ${errorBody}`);
                }

            } catch (err: any) {
                console.error("Error writing file:", err);
                setFileError(err.message || 'Ошибка при записи файла.');
                setIsLoadingFile(false);
            }
        },
        [driveApiFetch]
    );
    
    console.log('useNativeGoogleApi.ts/useGoogleDriveFileOps/END');
    return {
        fileContent,
        isLoadingFile,
        fileError,
        readFile,
        writeFile,
        foundFileId,
        findOrCreateFile
    };
};