// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import LabeledTextInput from '@/components/LabeledTextInput';
import {useGoogleDriveAuth} from "@/hooks/google/auth/useGoogleDriveAuth";
import {useGoogleDriveFileOps} from "@/hooks/google/drive/api/useGoogleDriveFileOps"; // Путь к вашему компоненту
//import { useGoogleDriveAuth, useGoogleDriveFileOps } from '@/hooks/useNativeGoogleApi'; // Путь к вашим хукам

const TARGET_FILE_NAME = 'my-drive-text-file.txt'; // Имя целевого текстового файла

export default function DriveTextScreen() {
  // Измененная деструктуризация: 'request' удален, так как он не экспортируется из useGoogleDriveAuth
  const { isSignedIn, accessToken, isLoadingAuth, error: authError, signIn, signOut } = useGoogleDriveAuth();
  const {
    fileContent,
    isLoadingFile,
    fileError,
    readFile,
    writeFile,
    foundFileId,
    findOrCreateFile
  } = useGoogleDriveFileOps();

  const [currentText, setCurrentText] = useState('');
  const [editingFileId, setEditingFileId] = useState<string | null>(null);

  // Установка начального текста из файла
  useEffect(() => {
    if (!isLoadingFile && !fileError) {
      setCurrentText(fileContent);
    }
  }, [fileContent, isLoadingFile, fileError]);

  // Поиск или создание файла при успешной аутентификации
  useEffect(() => {
    const initFile = async () => {
      if (isSignedIn && accessToken && !foundFileId && !isLoadingFile) {
        const id = await findOrCreateFile(accessToken, TARGET_FILE_NAME);
        if (id) {
          setEditingFileId(id);
          // После нахождения/создания файла, сразу читаем его
          await readFile(accessToken, id);
        }
      }
    };
    initFile();
  }, [isSignedIn, accessToken, foundFileId, isLoadingFile, findOrCreateFile, readFile]);


  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    setEditingFileId(null);
    setFileContent('');
    setCurrentText('');
  };

  const handleReadFile = async () => {
    if (isSignedIn && accessToken && editingFileId) {
      await readFile(accessToken, editingFileId);
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, войдите и убедитесь, что ID файла известен.');
    }
  };

  const handleWriteFile = async () => {
    if (isSignedIn && accessToken && editingFileId) {
      await writeFile(accessToken, editingFileId, currentText);
      Alert.alert('Успех', 'Текст успешно записан на Google Диск.');
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, войдите и убедитесь, что ID файла известен.');
    }
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Google Drive Text Editor</Text>

        {isLoadingAuth && <ActivityIndicator size="large" color="#0000ff" />}
        {authError && <Text style={styles.errorText}>Auth Error: {authError}</Text>}

        {!isSignedIn ? (
            // Исправлено: удалено '|| !request', так как 'request' не передается из useGoogleDriveAuth
            <Button title="Войти через Google" onPress={handleSignIn} disabled={isLoadingAuth} />
        ) : (
            <View style={styles.authContainer}>
              <Text style={styles.statusText}>Вы вошли в систему!</Text>
              <Button title="Выйти" onPress={handleSignOut} />
            </View>
        )}

        {isSignedIn && (
            <View style={styles.fileContainer}>
              <Text style={styles.fileName}>Файл: {TARGET_FILE_NAME}</Text>
              {isLoadingFile ? (
                  <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                  fileError ? (
                      <Text style={styles.errorText}>Файловая ошибка: {fileError}</Text>
                  ) : (
                      <>
                        <LabeledTextInput
                            label="Содержимое файла:"
                            placeholder="Введите текст..."
                            value={currentText}
                            onChangeText={setCurrentText}
                            multiline={true} // Многострочное поле ввода
                            numberOfLines={10} // Высота для многострочного поля
                            style={styles.textInputArea}
                        />
                        <View style={styles.buttonGroup}>
                          <Button title="Прочитать файл" onPress={handleReadFile} disabled={!editingFileId} />
                          <Button title="Записать файл" onPress={handleWriteFile} disabled={!editingFileId} />
                        </View>
                      </>
                  )
              )}
            </View>
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  authContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'green',
  },
  fileContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  textInputArea: {
    minHeight: 150, // Минимальная высота для текстовой области
    textAlignVertical: 'top', // Выравнивание текста вверху для multiline
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '90%'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});