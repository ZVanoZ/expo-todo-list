import {GoogleDriveState} from "@/hooks/google/auth/GoogleDriveState";
import {useCallback, useEffect, useState} from "react";
import {Platform} from "react-native";
import {useAuthRequest} from 'expo-auth-session/providers/google';
import {maybeCompleteAuthSession} from 'expo-web-browser';
import {GOOGLE_CLIENT_ID_ANDROID, GOOGLE_CLIENT_ID_WEB, GOOGLE_DRIVE_SCOPES} from "@/constants/google";

maybeCompleteAuthSession();

export const useGoogleDriveAuth = (): GoogleDriveState => {
    console.log('useNativeGoogleApi/useGoogleDriveAuth/BEG');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Добавляем новое состояние для отслеживания, идет ли процесс авторизации
    const [isAuthInProgress, setIsAuthInProgress] = useState(false);

    const clientId = Platform.select({
        web: GOOGLE_CLIENT_ID_WEB,
        android: GOOGLE_CLIENT_ID_ANDROID,
        default: GOOGLE_CLIENT_ID_WEB, // Fallback for other platforms
    });

    // SCOPES for Google Drive API
    // drive.file: Allows access to files created or opened by the app.
    // drive: Allows full, permissive scope to access all of a user's files. Use with caution.

    const [request, response, promptAsync] = useAuthRequest({
        clientId: clientId,
        scopes: GOOGLE_DRIVE_SCOPES,
    });

    useEffect(
        () => {
            console.log('useNativeGoogleApi/useGoogleDriveAuth/useEffect');
            if (response) { // Только если response определен
                setIsAuthInProgress(false); // Процесс завершен (успех/ошибка/отмена)
                if (response.type === 'success') {
                    setAccessToken(response.authentication?.accessToken || null);
                    setError(null);
                } else if (response.type === 'error') {
                    setError('Ошибка аутентификации: ' + response.error?.message);
                    console.error('Auth error:', response.error);
                }
            }
        },
        [response]
    );

    const signIn = useCallback(
        () => {
            console.log('useNativeGoogleApi/useGoogleDriveAuth/signIn');
            setError(null);
            setIsAuthInProgress(true); // Устанавливаем в true перед вызовом promptAsync
            promptAsync();
        },
        [promptAsync]
    );

    const signOut = useCallback(
        () => {
            console.log('useNativeGoogleApi/useGoogleDriveAuth/signOut');
            setAccessToken(null);
            // В реальном приложении здесь может быть вызов API для отзыва токена
            setError(null);
        },
        []
    );

    console.log('useNativeGoogleApi/useGoogleDriveAuth/END');
    return {
        isSignedIn: !!accessToken,
        accessToken,
        isLoadingAuth: isAuthInProgress, // Теперь isLoadingAuth будет отражать реальный статус
        error,
        signIn,
        signOut,
    };
};
