export interface GoogleDriveState {
    isSignedIn: boolean;
    accessToken: string | null;
    isLoadingAuth: boolean;
    error: string | null;
    signIn: () => void;
    signOut: () => void;
}
