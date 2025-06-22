# Создание приложения

1. Создаем заготовку из стандартного приложения.

Шаблон tabs@latest сразу включает Expo Router и базовую структуру с вкладками, что удобно для начала.
```shell
npx create-expo-app expo-todo-list --template tabs@latest
cd expo-todo-list
```

2. Установка необходимых зависимостей

Нам понадобятся expo-auth-session для аутентификации и expo-web-browser (часто идет в комплекте с auth-session) для 
открытия окна браузера для входа.

```shell
npx expo install expo-auth-session expo-web-browser
```

---

**Регистрация приложения в Expo**

* Регистрируемся в https://expo.dev/signup (если еще не сделали)
```text
Как зарегистрироваться в Expo?

Для использования сервисов Expo, таких как EAS Build (для компиляции APK) и для 
настройки проекта в Google Cloud Console (получения your-expo-username и 
your-project-slug для expo-auth-session), вам нужно зарегистрироваться на 
официальном сайте Expo:

1. Перейдите на страницу регистрации Expo:
Откройте ваш веб-браузер и перейдите по адресу:
https://expo.dev/signup

2. Заполните форму регистрации:
На этой странице вы увидите поля для:
* Email: Ваш адрес электронной почты.
* Username: 
Уникальное имя пользователя Expo. 
Это будет то самое @your-expo-username, которое используется в URI перенаправления для Google Cloud.
* Password: Ваш пароль.
* Confirm password: Подтверждение пароля.
* Agreement: Согласитесь с Условиями обслуживания и Политикой конфиденциальности.

3. Нажмите "Sign Up" (Зарегистрироваться).

После успешной регистрации у вас будет аккаунт Expo. Вы сможете:

* Войти через Expo CLI: 
Выполнить npx expo login в терминале в вашем проекте Expo и  использовать свои учетные данные Expo для входа. 
Это необходимо для использования EAS Build.

* Использовать @your-expo-username: 
Ваш выбранный Username будет частью redirect URI для настройки OAuth-клиента в Google Cloud Console. 
Например, если ваше имя пользователя mydev, а слаг проекта my-todo-app, то 
redirect URI будет https://auth.expo.io/@mydev/my-todo-app.

* Управлять сборками через дашборд EAS: 
Переходить на https://expo.dev/accounts и видеть свои проекты и статусы сборок EAS.

Итак, запомните: expo.dev/signup для регистрации, а auth.expo.io - это служебный адрес для OAuth-перенаправлений.
```

* Авторизируемся в терминале и собираем приложение

```text
Важно понимать, что команды npx (например, npx expo login или npx expo publish) не 
используются для "регистрации проекта в Expo" в том смысле, что они создают запись о вашем
проекте на серверах Expo без вашего участия.

Команда npx create-expo-app создает локальный проект на вашем компьютере.
Когда вы впервые используете EAS Build (npx eas build) или публикуете (npx expo publish) свой проект, 
только тогда Expo "узнаёт" о вашем проекте, и он появляется в вашем дашборде на expo.dev. 
Для этого вам нужно быть залогиненным через Expo CLI (npx expo login).

Таким образом, "регистрация проекта в Expo" происходит не через отдельную 
команду "npx register-project", а при первом взаимодействии с облачными 
сервисами Expo (например, при первой сборке или публикации) после того, как вы создали 
локальный проект и вошли в CLI под своим аккаунтом.
```
```shell
npx expo login
```
```shell
npx eas build
```
```text
$ npx eas build
✔ Select platform › Android
✔ Generated eas.json. Learn more: https://docs.expo.dev/build-reference/eas-json/
EAS project not configured.
✔ Would you like to automatically create an EAS project for @zvanoz/expo-todo-list? … yes
✔ Created @zvanoz/expo-todo-list: https://expo.dev/accounts/zvanoz/projects/expo-todo-list on EAS
✔ Linked local project to EAS project f987f0c2-039b-43af-89dd-172d70fd7261
Resolved "production" environment for the build. Learn more: https://docs.expo.dev/eas/environment-variables/#setting-the-environment-for-your-builds
No environment variables with visibility "Plain text" and "Sensitive" found for the "production" environment on EAS.

📝  Android application id Learn more: https://expo.fyi/android-package
✔ What would you like your Android application id to be? … com.zvanoz.expotodolist
No remote versions are configured for this project, versionCode will be initialized based on the value from the local project.
✔ Incremented versionCode from 1 to 2.
✔ Using remote Android credentials (Expo server)
✔ Generate a new Android Keystore? … yes
✔ Created keystore

Compressing project files and uploading to EAS Build. Learn more: https://expo.fyi/eas-build-archive
✔ Uploaded to EAS 1s
✔ Computed project fingerprint

Build details: https://expo.dev/accounts/zvanoz/projects/expo-todo-list/builds/da8f88f8-6fcf-4eea-91e1-1615d0a2c4e4

Waiting for build to complete. You can press Ctrl+C to exit.
✔ Build finished

🤖 Android app:
https://expo.dev/artifacts/eas/sZmkHSDQCkuBQVYxtFTWpf.aab
```

После этого:

> * в Dashboard появится проект с названием "expo-todo-list"  
> Идем в Dashboard https://expo.dev/accounts/zvanoz и смотрим.
> * Запросы https://auth.expo.io/@zvanoz/expo-todo-list перестанут возвращать ошибку 404  
> Это даст возможность прописать URL в настройках проекта Google Cloud Console (см. ниже)
> * Это даст возможность запустить приложение на Android



* Получите свой "слаг" проекта и имя пользователя Expo
```text
Имя пользователя Expo (<ваше-имя-пользователя-expo>):
После входа в систему через npx expo login, ваше имя пользователя Expo будет отображено в терминале. 
Вы также можете найти его, зайдя на https://expo.dev/accounts и посмотрев в профиле. 
Это имя пользователя, которое начинается с @.
```

* Слаг проекта (<слаг-вашего-проекта>):
 
Слаг проекта берется из вашего файла app.json (или app.config.js) в корневой директории проекта.

Откройте app.json и найдите поле "slug".

Пример app.json:
```json
{
  "expo": {
    "name": "expo-todo-list",
    "slug": "expo-todo-list", // <-- Вот ваш слаг проекта
    // ... другие настройки
  }
}
```
В этом примере слаг — expo-todo-list.

* 

---

3. Настройка Google Cloud Project (самый важный шаг вне кода)

```text
Это критически важно для работы с Google API:

1. Перейдите в Google Cloud Console: console.cloud.google.com.

2. Создайте новый проект: Или выберите существующий.

> Чтобы создать новый проект с названием "expo-todo-list" в Google Cloud Console, выполните следующие шаги:
> 1. Перейдите в Google Cloud Console
> 
> Откройте свой веб-браузер и перейдите по адресу: https://console.cloud.google.com/
> 
> Убедитесь, что вы вошли в аккаунт Google, который хотите использовать для управления проектами Google Cloud.
> 
> 2. Откройте страницу "Создать проект"
> 
> В верхней части страницы Google Cloud Console найдите раскрывающийся список "Select a project" (Выбрать проект). 
> Обычно он расположен рядом с логотипом Google Cloud.
> 
> Нажмите на этот раскрывающийся список. 
> В появившемся диалоговом окне нажмите кнопку "New Project" (Новый проект) или "Create Project".
>
> 3. Заполните данные нового проекта
> 
> На странице "New Project" вы увидите следующие поля:
> * Project name (Имя проекта): Введите желаемое имя для вашего проекта. В вашем случае это будет expo-todo-list.
> Примечание: Это отображаемое имя проекта. Google Cloud также автоматически сгенерирует 
> уникальный Project ID (идентификатор проекта), который будет использоваться внутри системы. 
> Вы можете изменить предложенный Project ID, если вам нужен конкретный, но обычно автоматический подходит.
> * Location (Местоположение): Это необязательное поле. 
> Если вы работаете в рамках организации, вы можете выбрать организацию и папку, в которой будет находиться проект. 
> Для личных проектов обычно это поле можно оставить без изменений.
> 
> После того как вы ввели имя проекта, нажмите кнопку "CREATE" (Создать).
> 4. Ожидайте создания проекта
> 
> Google Cloud начнет процесс создания вашего проекта. Это может занять несколько секунд. 
> Вы увидите уведомление в правом верхнем углу консоли о прогрессе.
> 
> Как только проект будет создан, вы сможете выбрать его из раскрывающегося списка проектов в верхней 
> части страницы, чтобы начать работать с ним, включать API и настраивать учетные данные.
> 
> Теперь ваш проект expo-todo-list готов к использованию в Google Cloud Console!


3. Включите Google Drive API: 

В меню слева перейдите в "APIs & Services" -> "Enabled APIs & services". 
Нажмите "+ ENABLE APIS AND SERVICES" и найдите "Google Drive API", затем включите его.

4. Создайте учетные данные OAuth:

* В меню слева перейдите в "APIs & Services" -> "Credentials".


Нажмите "+ CREATE CREDENTIALS" -> "OAuth client ID".

!! Тут пришлось перейти к п5 т.к. не было пункта "CREATE CREDENTIALS"
!! После выполнения п.5 вернулся к п4.  
!! В верхней части центрального блока появились:
!! * комбик синего цвета "+ Create credentials". 
!! * задизейбленный пункт "Delete"
!! * ссылка с иконкой синего цвета "Restore deleted credentials"
!! Жмем "+ Create credentials", выбираем "OAuth client ID"
!!
!! Документация:
!! * Create credentials to access your enabled APIs. Learn more https://cloud.google.com/docs/authentication
!! * https://developers.google.com/identity?hl=ru


* Тип приложения: 

Выберите "Web application" для веб-версии и "Android" для Android-версии.

** Для "Web application":

*** Authorized JavaScript origins: 

!!!-----------------------   @TODO: ПРОДОЛЖИТЬ ТУТ -----------------------------------!!!
!!
!! У меня получилось так: https://auth.expo.io/@zvanoz/expo-todo-list
!! Регистрацию в Expo и создание проекта ДОписал выше.
!!

Добавьте URI перенаправления Expo. 
Это https://auth.expo.io/@your-expo-username/your-project-slug 
(замените @your-expo-username и your-project-slug на свои значения). 
Узнать свой project-slug можно из app.json ("slug": "expo-todo-list").


*** Authorized redirect URIs: 

Добавьте тот же URI перенаправления.

*** Для "Android":

Вам понадобится Package name (из app.json, android.package) и SHA-1 сертификата.
SHA-1: В режиме разработки можно использовать SHA-1 отладочного ключа Expo. Чтобы его получить, выполните в терминале в корне вашего проекта:
---Bash
    npx expo fetch:android:hashes
---
Скопируйте SHA-1 certificate fingerprint.

* Сохраните Client ID и Client Secret: 

После создания учетных данных, Google предоставит вам Client ID (для Web и Android) и 
Client Secret (только для Web). 
Сохраните их! Они будут использоваться в коде.


5. Настройте экран согласия OAuth (OAuth consent screen):

** В меню "APIs & Services" -> "OAuth consent screen".

** Выберите "External" (если вы не являетесь частью организации Google Workspace).

** Заполните необходимые поля (название приложения, email поддержки).

** Scopes: Добавьте скоупы для Google Drive API.
 
Для чтения и записи вам нужен https://www.googleapis.com/auth/drive.file (доступ к файлам, 
созданным приложением) или https://www.googleapis.com/auth/drive (полный доступ к файлам пользователя, 
будьте осторожны с этим, так как это очень широкий доступ). 
drive.file обычно достаточен.

** Добавьте тестовых пользователей (для тестирования до публикации приложения).
```

4. Создание файла конфигурации API

Создайте файл constants/apiKeys.ts (или .js) для хранения ваших Client ID.
```TypeScript
// constants/apiKeys.ts
export const GOOGLE_CLIENT_ID_WEB = 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com';
export const GOOGLE_CLIENT_ID_ANDROID = 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com';
// Замените YOUR_WEB_CLIENT_ID и YOUR_ANDROID_CLIENT_ID на ваши реальные Client ID из Google Cloud
```

5. Реализация функционала Google Диска (hooks/useGoogleDrive.ts)

Создайте новый файл hooks/useGoogleDrive.ts. 
Здесь будет логика аутентификации и взаимодействия с API.
@see [useGoogleDrive.ts](hooks/useGoogleDrive.ts)

6. Создание компонента `LabeledTextInput` (`components/LabeledTextInput.tsx`)

@see [LabeledTextInput.tsx](components/LabeledTextInput.tsx)


7. Создание основного экрана приложения (app/(tabs)/index.tsx)

Теперь соберем все это на одном экране. 
Используем вкладку index.tsx как наш основной экран.


**Важные замечания и потенциальные улучшения**

```text
* Google Drive API V3: В этом примере используется v3 API Google Drive.

* Условное обновление (ETag) для целостности: 

Как мы обсуждали, для полной целостности при совместном доступе необходимо реализовать условное обновление с использованием ETag. 
В приведенном примере для записи используется простой PATCH, который может привести к перезаписи при одновременных изменениях. 

Для более надежной работы с ETag вам потребуется:
1. При чтении файла, помимо содержимого, получать и сохранять ETag (это поле etag в метаданных файла).
2. При записи файла, отправлять заголовок If-Match: "ВАШ_ETAG" вместе с PATCH запросом.
3.  Обрабатывать ответ 412 Precondition Failed: если вы получили такую ошибку, значит, файл был изменен, и вам 
нужно перезагрузить его, получить новый ETag, и предложить пользователю разрешить конфликт или повторить операцию.

* Обработка ошибок: 

В примере есть базовая обработка ошибок, но в реальном приложении нужно более детально обрабатывать различные коды ошибок API.

* Имя файла: 

В примере имя файла жестко задано (TARGET_FILE_NAME). 
Вы можете сделать его динамическим или позволить пользователю выбирать файл.

* UX/UI: Это базовый интерфейс. 

Вы можете улучшить его с помощью более сложных компонентов и дизайна.

* Доступ к файлу по ссылке: 

В текущей реализации мы полагаемся на TARGET_FILE_NAME для поиска файла. 
Если вы хотите использовать именно ссылку на файл для идентификации, вам нужно будет распарсить эту ссылку, чтобы 
получить fileId (который обычно находится в URL после /d/).

* Развертывание: 

Не забудьте обновить app.json с вашим android.package и expo.scheme для Android, а 
также web.bundler для веб-версии, если вы еще этого не сделали.
```

---

## Запуск проекта на Android

* На компьютере, где разрабатываем приложение
```shell
npm run start
```
Появится QR-код
```text
$ npm run start

> expo-todo-list@1.0.0 start
> expo start

Starting project at /home/ivan/zim/work/github-ZVanoZ/expo-todo-list
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄▄▄ ▀ ▀█▄█ ▄▄▄▄▄ █
█ █   █ ██▄▀ █  ▀▀█ █   █ █
█ █▄▄▄█ ██▀▄ ▄█▀█▀█ █▄▄▄█ █
█▄▄▄▄▄▄▄█ ▀▄█ ▀▄█▄█▄▄▄▄▄▄▄█
█▄ ▀▄▄▀▄█▀▄▀█▄▀█ ▀█▄█▀█▀▀▄█
█████▄▀▄▀█▄██▄▄▄▄ ▀███▄▀▀ █
█▀▄ ▄██▄█▀  █▀█▄ █ ▄▀▀█▀ ██
█ ▄▀ ██▄▀ █▀█▀▄▀ ▄▀ ██▄▀  █
█▄█▄██▄▄▄▀▀  ▄▄ █ ▄▄▄  ▄▀▄█
█ ▄▄▄▄▄ ██▄█▀▄  █ █▄█ ███ █
█ █   █ █  █▄ ▀█▄ ▄  ▄ █▀▀█
█ █▄▄▄█ █▀▀▄ ▀█▄ ▄█▀▀▄█   █
█▄▄▄▄▄▄▄█▄▄▄▄██▄▄▄▄█▄▄███▄█

› Metro waiting on exp://192.168.10.15:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8081

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
```


* На устройстве с Android
  * Устанавливаем приложение "Expo Go", если еще не установлено
    * открываем ссылку https://expo.dev//new/develop
    * Устанавливаем приложение "Expo Go"
      https://play.google.com/store/apps/details?id=host.exp.exponent
  * Запускаем наше приложение при помощи "Expo Go" 
    * Открываем приложение "Expo Go"
    * Выбираем "Scan QR code"
    * Направляем камеру на QR код, который появился при запуске приложения на компьютере (см. предыдущий шаг)
    ```text
    Произойдет магия и приложение запустится в Android.
    При внесении изменений в проект на компьютере, приложение на Android будет перезагружаться.
    
    @TODO: разобраться как работает этот механизм. 
    @TODO: разобраться куда идут запросы и какова архитектура всей этой магии
    ```