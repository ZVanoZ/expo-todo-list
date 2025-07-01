# [build-app.md](build-app.md)

Этот документ посвящен сборке проекта под разные платформы

---

## Сборка проекта для Android

@TODO: довести до конца

Документация:

* [How to build .aab bundle instead .apk file with react native EXPO locally?](https://stackoverflow.com/questions/77960925/how-to-build-aab-bundle-instead-apk-file-with-react-native-expo-locally)

Инструкция:

1. Создаем приложение.  
   Уже сделано. См. выше.
2. Делаем "prebuild"
```shell
npx expo prebuild
```
Результат
```text
$ npx expo prebuild
› Apple bundle identifier: com.zvanoz.expotodolist
✔ Created native directories
✔ Updated package.json
✔ Finished prebuild
✔ Skipped installing CocoaPods because operating system is not on macOS.
```
Появится директория [android](android) в которой много всего.  
Команда сгенерирует исходники на языке Kotlin и разместит в "android/app/src/main/java/com/zvanoz/expotodolist"
3. Почитать инструкции  
   @TODO: Разобраться

```text
I'm following these instructions
Production builds locally
https://docs.expo.dev/deploy/build-project/#production-builds-locally
Publishing to Google Play Store
https://reactnative.dev/docs/signed-apk-android
```
4. Генерация ключей при помощи keytool  
   @TODO: Разобраться
5. Внести изменения в "android/gradle.properties"  
   @TODO: Разобраться
6. Внести изменения в "android/app/build.gradle"
   @TODO: Разобраться
7. Создание "*.apk" файла
   @TODO: Разобраться

```shell
npx expo run:android --variant release
```

```text
$ npx expo run:android --variant release
Failed to resolve the Android SDK path. Default install location not found: /home/ivan/Android/sdk. Use ANDROID_HOME to set the Android SDK location.
Failed to resolve the Android SDK path. Default install location not found: /home/ivan/Android/sdk. Use ANDROID_HOME to set the Android SDK location.
Error: spawn adb ENOENT
Error: spawn adb ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:286:19)
    at onErrorNT (node:internal/child_process:484:16)
    at processTicksAndRejections (node:internal/process/task_queues:90:21)
```