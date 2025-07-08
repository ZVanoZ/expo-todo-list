import {useState, useEffect, useCallback} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {GOOGLE_CLIENT_ID_WEB, GOOGLE_CLIENT_ID_ANDROID} from '@/constants/apiKeys'; // Adjust path
import {Platform} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// SCOPES for Google Drive API
// drive.file: Allows access to files created or opened by the app.
// drive: Allows full, permissive scope to access all of a user's files. Use with caution.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

interface GoogleDriveState {
    isSignedIn: boolean;
    accessToken: string | null;
    isLoadingAuth: boolean;
    error: string | null;
    signIn: () => void;
    signOut: () => void;
}

export const useGoogleDriveAuth = (): GoogleDriveState => {
    console.log('useGoogleDrive.ts/useGoogleDriveAuth/BEG');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    const clientId = Platform.select({
        web: GOOGLE_CLIENT_ID_WEB,
        android: GOOGLE_CLIENT_ID_ANDROID,
        default: GOOGLE_CLIENT_ID_WEB, // Fallback for other platforms
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: clientId,
        scopes: SCOPES,
    });

    useEffect(
        () => {
            console.log('useGoogleDrive.ts/useGoogleDriveAuth/useEffect');
            if (response?.type === 'success') {
                setAccessToken(response.authentication?.accessToken || null);
                setError(null);
            } else if (response?.type === 'error') {
                setError('Ошибка аутентификации: ' + response.error?.message);
                console.error('Auth error:', response.error);
            }
        },
        [response]
    );

    const signIn = useCallback(
        () => {
            console.log('useGoogleDrive.ts/useGoogleDriveAuth/signIn');

            setError(null);
            promptAsync();
        },
        [promptAsync]
    );

    const signOut = useCallback(
        () => {
            console.log('useGoogleDrive.ts/useGoogleDriveAuth/signOut');
            setAccessToken(null);
            // В реальном приложении здесь может быть вызов API для отзыва токена
            setError(null);
        },
        []
    );

    console.log('useGoogleDrive.ts/useGoogleDriveAuth/END');
    return {
        isSignedIn: !!accessToken,
        accessToken,
        isLoadingAuth: !response && !!request, // Simple loading state
        error,
        signIn,
        signOut,
    };
};

interface GoogleDriveFileOpsState {
    fileContent: string;
    isLoadingFile: boolean;
    fileError: string | null;
    readFile: (accessToken: string, fileId: string) => Promise<void>;
    writeFile: (accessToken: string, fileId: string, content: string) => Promise<void>;
    // Добавим поле для хранения ID файла, если его нужно найти
    foundFileId: string | null;
    findOrCreateFile: (accessToken: string, fileName: string) => Promise<string | null>;
}

export const useGoogleDriveFileOps = (): GoogleDriveFileOpsState => {
    console.log('useGoogleDrive.ts/useGoogleDriveFileOps/BEG');

    const [fileContent, setFileContent] = useState('');
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    const [foundFileId, setFoundFileId] = useState<string | null>(null);


    // Функция для выполнения запросов к Google Drive API
    const driveApiFetch = useCallback(
        async (accessToken: string, url: string, options?: RequestInit) => {
            console.log('useGoogleDrive.ts/useGoogleDriveFileOps/driveApiFetch');

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
            console.log('useGoogleDrive.ts/useGoogleDriveFileOps/findOrCreateFile');

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
            console.log('useGoogleDrive.ts/useGoogleDriveFileOps/readFile');
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
            console.log('useGoogleDrive.ts/useGoogleDriveFileOps/writeFile');
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

    console.log('useGoogleDrive.ts/useGoogleDriveFileOps/END');
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