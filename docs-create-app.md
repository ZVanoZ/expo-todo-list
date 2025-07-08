# [create-app.md](create-app.md)

Этот документ посвящен вопросам создание приложения.

## По инструкции от Gemini

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

```text
{
  "expo": {
    "name": "expo-todo-list",
    "slug": "expo-todo-list"
    // <-- Вот ваш слаг проекта
    // ... другие настройки
  }
}
```

В этом примере слаг — expo-todo-list.

---

3. Настройка Google Cloud Project (самый важный шаг вне кода)

<details>
  <summary>Итог</summary>

```text
Project name  : "expo-todo-list"
Project ID    : "expo-todo-list-463604"
Project number: "635246637398"

web-client-1    : 635246637398-rdqqaeg51p90l9e4h9pfp9ce8v5okgoe.apps.googleusercontent.com  
android-client-1: 635246637398-8ageqa47u6p7atgfsf18n0096h0qgius.apps.googleusercontent.com  
```

* Базовая информация о проекте в Google Services  [Project name; Project ID; Project number]  
  https://console.cloud.google.com/iam-admin/settings?project=expo-todo-list-463604&inv=1&invt=Ab1u3Q

* Секреты  
  [.SECRET/google.md](.SECRET/google.md)


</details>

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

Добавьте URI перенаправления Expo. 
Это https://auth.expo.io/@your-expo-username/your-project-slug 
(замените @your-expo-username и your-project-slug на свои значения). 
Узнать свой project-slug можно из app.json ("slug": "expo-todo-list").
!!

!! У меня получилось так: https://auth.expo.io/@zvanoz/expo-todo-list
!! Регистрацию в Expo и создание проекта дописал выше.
!! НО! Указывать нужно только "https://auth.expo.io"
!! Этот момент Gemini просрал.
!!
!! https://nishant-kr.medium.com/implementing-google-auth-with-react-native-expo-app-48005897ab21
!!> Create client ID for web application
!!>> For local development, add:
!!>> “http://localhost:<YOUR_APPLICATION_PORT>”
!!>> as Authorized JavaScript origins & Authorized redirect URIs.
!!>> Ex: if you application is running on port 8081, URI would be http://localhost:8081

Authorized JavaScript origins: "https://auth.expo.io"

*** Authorized redirect URIs: 

Добавьте тот же URI перенаправления.

Authorized redirect URIs: "https://auth.expo.io/@zvanoz/expo-todo-list"

*** Для "Android":

> Name:                           "android-client-1"
> Package name:                   "com.zvanoz.expotodolist"
>  SHA-1 certificate fingerprint: "D7:4E:55:71:58:49:2A:E4:42:3F:B7:BA:A7:9F:27:B9:3F:69:72:DB"

Вам понадобится Package name (из app.json, android.package) и SHA-1 сертификата.
SHA-1: В режиме разработки можно использовать SHA-1 отладочного ключа Expo. 
Чтобы его получить, ...
```

<details>                                            
  <summary>Вариант 1 от Gemini (неверен) ...</summary>       

выполните в терминале в корне вашего проекта:

```shell
npx expo fetch:android:hashes
```

Результат такой

```text
$ npx expo fetch:android:hashes
$ expo fetch:android:hashes is not supported in the local CLI, please use eas credentials instead
```

Задаю вопрос Gemini. Оказалось что это решение устарело.

```text
> Вопрос:
Выполняю команду `npx expo fetch:android:hashes` и получаю:
$ expo fetch:android:hashes is not supported in the local CLI, please use eas credentials instead

> Ответ Gemini:
Вы совершенно правы! Приношу извинения за устаревшую информацию. 
Сообщение об ошибке ясно указывает на изменение в инструментарии Expo:
expo fetch:android:hashes is not supported in the local CLI, please use eas credentials instead
Это означает, что команда expo fetch:android:hashes устарела и была заменена командой из EAS CLI (eas-cli).
```

</details>


<details open>
  <summary>Вариант 2 от Gemini (верный)...</summary>

1. Убедитесь, что у вас установлен EAS CLI:

```shell
npm install -g eas-cli
```

либо

```shell
yarn global add eas-cli
```

<details>
  <summary>от себя ...</summary>

Почему-то при запуске из терминала пишет, что версия устарела

```text
eas-cli@16.13.1 is now available.
To upgrade, run:
npm install -g eas-cli
```

```shell
npm install -g eas-cli
```

</details> 

2. Войдите в свой аккаунт Expo (если еще не вошли):

```shell
npx eas login
```

3. Получите информацию о ключах Android (включая SHA-1):
   Перейдите в корневую директорию вашего проекта expo-todo-list и выполните следующую команду:

```shell
npx eas credentials
```

<details>                                            
  <summary>мой коммент...</summary>       

```text
Появится диалог в котором выбираем "Android", "development"
Получим полотнище текста с информацией о ключах
3.1 Задаем вопрос Gemini
Сгенерированные ключи скопированы в облако Expo 
https://expo.dev/accounts/zvanoz/projects/expo-todo-list/credentials/android/com.zvanoz.expotodolist
Перейдя по ссылке видим список ключей. Там же можно скопировать нужный нам "SHA-1 Fingerprint".
```

</details>

<details>
  <summary>Поиск решения в Gemini...</summary>

```text
> Вопрос:
1. Есть ли в выводе, который я указал выше, секретная информация, которую нельзя выкладывать в публичный доступ.
2. Что произошло при выполнении команды? Какие файлы созданы и зачем?
3. Где лежат сгенерированные ключи? 

> Ответ:
1. Есть ли в выводе секретная информация, которую нельзя выкладывать в публичный доступ?

Да, в выводе есть информация, которую НЕЖЕЛАТЕЛЬНО выкладывать в публичный доступ, если вы планируете 
выпускать приложение в Google Play Store.

* Конкретно, это Fingerprints (отпечатки):
MD5 Fingerprint
SHA1 Fingerprint
SHA256 Fingerprint

Хотя сами по себе эти отпечатки не являются "секретным ключом" в прямом смысле, они однозначно 
идентифицируют ваш ключ подписи приложения (keystore).

* Почему это важно?
** Подпись приложения: 
Все Android-приложения должны быть подписаны цифровым ключом. 
Этот ключ подтверждает, кто опубликовал приложение, и гарантирует, что оно не было изменено.
** Идентификация разработчика: 
Google Play Store использует этот ключ для идентификации вас как разработчика и ваших приложений.
** Обновления: 
Чтобы выпустить обновление для своего приложения, вы должны подписать его тем же самым ключом.
** Безопасность: 
Если кто-то получит доступ к вашему keystore-файлу (или к паролям от него), он сможет 
подписывать вредоносные приложения вашим именем и выпускать их как обновления к вашему существующему 
приложению в Google Play.

SHA1 Fingerprint используется Google для различных сервисов, включая Google Sign-In и Google Maps API. 
Если злоумышленник узнает ваш SHA1 и сможет создать приложение с таким же SHA1 (что крайне 
маловероятно без вашего приватного ключа), он мог бы пытаться выдавать себя за ваше 
приложение в некоторых контекстах API.

* В данном конкретном случае:
** Вы только что сгенерировали новые Build Credentials (Build Credentials XoAlBO7iFK). 
Это ваш отладочный (или новый релизный, если вы его так настроили) ключ.
** Старые "Configuration: 
Build Credentials 4PwLJRi-9A (Default)", "9jf2BTGlcj", "n8rBmNZyhs" — это тоже отпечатки ключей, 
которые, возможно, были сгенерированы ранее.

Вывод: Эти отпечатки сами по себе не являются паролями или приватными ключами, но они служат 
публичным идентификатором вашего приватного ключа. 
Раскрытие их широкой публике уменьшает общую "поверхность атаки", но гораздо более критично не 
потерять и не раскрыть сам файл keystore и его пароли.

Однако, если вы делитесь этим публично (например, на GitHub), это снижает уровень безопасности. 
Для Google Sign-In в Google Cloud Console вы должны были использовать именно тот SHA1, который вы 
хотите связать с этим конкретным приложением.


2. Что произошло при выполнении команды? Какие файлы созданы и зачем?

При выполнении команды npx eas credentials и выборе опции Set up a new keystore, произошло следующее:
* EAS CLI создал для вас новый Android Keystore: 
Это файл с расширением .jks или .keystore. Он содержит ваш приватный ключ подписи.
* EAS CLI загрузил этот keystore в облако Expo (EAS Build): 
Keystore теперь надежно хранится на серверах Expo. 
Это ключевое преимущество EAS Build – вам не нужно управлять keystore'ом локально и 
беспокоиться о его потере или компрометации на вашем компьютере. 
EAS будет использовать его для подписи ваших Android-сборок.
* EAS CLI создал запись о новых "Build Credentials": 
Это то, что вы видите в выводе как Configuration: Build Credentials XoAlBO7iFK. 
Каждому keystore в EAS присваивается уникальный ID и имя.
* EAS CLI обновил (или создал) ваш файл eas.json:
В корне вашего проекта (expo-todo-list/eas.json) EAS автоматически добавил (или обновил) конфигурацию, 
чтобы она ссылалась на только что созданные или выбранные учетные данные. 
Этот файл используется EAS Build для определения, какие ключи использовать при сборке вашего приложения.

Пример того, что могло быть добавлено в eas.json:
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildCredentials": "Build Credentials XoAlBO7iFK" // Имя, которое вы присвоили
      }
    },
    "preview": {
      "android": {
        "buildCredentials": "Build Credentials XoAlBO7iFK"
      }
    },
    "production": {
      "android": {
        "buildCredentials": "Build Credentials XoAlBO7iFK"
      }
    }
  }
}
    (Имена профилей development, preview, production могут отличаться или быть созданы по запросу).

Зачем это нужно?

Это необходимо для процесса подписи вашего Android-приложения. 
Без действительного ключа подписи, Android не позволит установить приложение на устройство, а 
Google Play Store не позволит его опубликовать. 
EAS Build автоматизирует этот сложный процесс, управляя вашими ключами в облаке.


Отлично! Теперь команда npx eas credentials сработала так, как нужно. 
Это означает, что вы на правильном пути.

Давайте разберем ваш вывод и ответим на вопросы.
1. Есть ли в выводе секретная информация, которую нельзя выкладывать в публичный доступ?

Да, в выводе есть информация, которую НЕЖЕЛАТЕЛЬНО выкладывать в публичный доступ, если вы 
планируете выпускать приложение в Google Play Store.

Конкретно, это Fingerprints (отпечатки):

    MD5 Fingerprint
    SHA1 Fingerprint
    SHA256 Fingerprint

Хотя сами по себе эти отпечатки не являются "секретным ключом" в прямом смысле, они однозначно 
идентифицируют ваш ключ подписи приложения (keystore).

Почему это важно?

* Подпись приложения: 
Все Android-приложения должны быть подписаны цифровым ключом. 
Этот ключ подтверждает, кто опубликовал приложение, и гарантирует, что оно не было изменено.
* Идентификация разработчика: 
Google Play Store использует этот ключ для идентификации вас как разработчика и ваших приложений.
* Обновления: 
Чтобы выпустить обновление для своего приложения, вы должны подписать его тем же самым ключом.
* Безопасность: 
Если кто-то получит доступ к вашему keystore-файлу (или к паролям от него), он сможет подписывать 
вредоносные приложения вашим именем и выпускать их как обновления к вашему существующему 
приложению в Google Play.

SHA1 Fingerprint используется Google для различных сервисов, включая Google Sign-In и Google Maps API. 
Если злоумышленник узнает ваш SHA1 и сможет создать приложение с таким же SHA1 (что крайне 
маловероятно без вашего приватного ключа), он мог бы пытаться выдавать себя за ваше 
приложение в некоторых контекстах API.

В данном конкретном случае:
* Вы только что сгенерировали новые Build Credentials (Build Credentials XoAlBO7iFK). 
Это ваш отладочный (или новый релизный, если вы его так настроили) ключ.
* Старые "Configuration: 
Build Credentials 4PwLJRi-9A (Default)", "9jf2BTGlcj", "n8rBmNZyhs" — это тоже отпечатки ключей, 
которые, возможно, были сгенерированы ранее.

Вывод: Эти отпечатки сами по себе не являются паролями или приватными ключами, но они 
служат публичным идентификатором вашего приватного ключа. 
Раскрытие их широкой публике уменьшает общую "поверхность атаки", но гораздо более 
критично не потерять и не раскрыть сам файл keystore и его пароли.

Однако, если вы делитесь этим публично (например, на GitHub), это снижает уровень безопасности. 
Для Google Sign-In в Google Cloud Console вы должны были использовать именно тот SHA1, 
который вы хотите связать с этим конкретным приложением.

2. Что произошло при выполнении команды? Какие файлы созданы и зачем?

При выполнении команды npx eas credentials и выборе опции Set up a new keystore, 
произошло следующее:
* EAS CLI создал для вас новый Android Keystore: 
Это файл с расширением .jks или .keystore. Он содержит ваш приватный ключ подписи.
* EAS CLI загрузил этот keystore в облако Expo (EAS Build): 
Keystore теперь надежно хранится на серверах Expo. 
Это ключевое преимущество EAS Build – вам не нужно управлять keystore'ом локально и 
беспокоиться о его потере или компрометации на вашем компьютере. 
EAS будет использовать его для подписи ваших Android-сборок.
* EAS CLI создал запись о новых "Build Credentials": 
Это то, что вы видите в выводе как Configuration: Build Credentials XoAlBO7iFK. 
Каждому keystore в EAS присваивается уникальный ID и имя.

EAS CLI обновил (или создал) ваш файл eas.json:
В корне вашего проекта (expo-todo-list/eas.json) EAS автоматически добавил (или обновил) 
конфигурацию, чтобы она ссылалась на только что созданные или выбранные учетные данные. 
Этот файл используется EAS Build для определения, какие ключи использовать при сборке 
вашего приложения.

Пример того, что могло быть добавлено в eas.json:
JSON
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildCredentials": "Build Credentials XoAlBO7iFK" // Имя, которое вы присвоили
      }
    },
    "preview": {
      "android": {
        "buildCredentials": "Build Credentials XoAlBO7iFK"
      }
    },
    "production": {
      "android": {
        "buildCredentials": "Build Credentials XoAlBO7iFK"
      }
    }
  }
}

(Имена профилей development, preview, production могут отличаться или быть созданы по запросу).

Зачем это нужно?

Это необходимо для процесса подписи вашего Android-приложения. 
Без действительного ключа подписи, Android не позволит установить приложение на устройство, а 
Google Play Store не позволит его опубликовать. EAS Build автоматизирует этот сложный процесс, 
управляя вашими ключами в облаке.


3. Где лежат сгенерированные ключи?
* Локально: Когда EAS CLI генерирует новый keystore для вас, он обычно временно сохраняет его 
локально для отправки на серверы Expo. 
После успешной загрузки в облако, вам не нужно беспокоиться о его локальном хранении, и обычно 
EAS CLI не сохраняет его постоянно в легкодоступном месте для вас. 
Крайне не рекомендуется пытаться найти и сохранить этот файл вручную, так как это нарушает 
принцип безопасности EAS.
* В облаке Expo (EAS Build): Ваш сгенерированный keystore (.jks файл) и связанные с ним пароли надежно и 
зашифровано хранятся на серверах Expo (EAS Build). 
Вы можете управлять ими через дашборд Expo.

Чтобы просмотреть или удалить свои учетные данные в EAS:

* Перейдите в https://expo.dev/accounts.
* Выберите свой аккаунт.
* Перейдите в раздел "Credentials" (Учетные данные).
* Здесь вы увидите список всех ваших Android и iOS учетных данных, включая те, 
что были только что сгенерированы. 
Вы можете просмотреть их MD5/SHA1/SHA256 отпечатки или удалить их.

Таким образом, ключ сгенерирован и безопасно хранится в облаке Expo, что значительно упрощает процесс сборки для вас.
```

</details>

</details>

<details>
  <summary>Поиск решения в Google...</summary>

@TODO: перенести в архив, ибо выше уже нашли ответ при помощи Gemini (это может понадобиться для локальной сборки без
облака Expo)

```shell
eas credentials -p android
```

```shell
npx expo credentials:manager
```

```shell
expo credentials:manager
```

!! На странице Google указана команда.
!! Use this command to get the fingerprint.

```shell
keytool -keystore path-to-debug-or-production-keystore -list -v
```

</details>

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

```text
Внимание!
Несколько дней мучился в поисках нужного раздела!!!

Правильный алгоритм такой: 
1. В меню "APIs & Services" -> "OAuth consent screen".
Появляется дашбоард с метриками.
2. В списке слева кликаем ссылку "Data Access"
В центральной части страницы появится кнопка "Add or remove scopes", а под ней
три грида ["Your non-sensitive scopes"; "Your sensitive scopes"; "Your restricted scopes"]
3. Нажимаем "Add or remove scopes"
Справа выедет панель с перечнем доступов (4 страницы).
4. Листаем страницы и находим ".../auth/drive.file".
Отмечаем галкой.
5. Жамкаем кнопку "Update", которая находится внизу.
6. В гриде "Your non-sensitive scopes" появится строчка "Google Drive API"
------------------------------------------------------------------------------- 
API              | Scope               | User-facing description
------------------------------------------------------------------------------- 
Google Drive API | .../auth/drive.file | See, edit, create, and delete only the specific 
                 |                     |  Google Drive files you use with this app
-------------------------------------------------------------------------------
```

** Добавьте тестовых пользователей (для тестирования до публикации приложения).

4. Создание файла конфигурации API

# !!!----------------------- @TODO: ПРОДОЛЖИТЬ ТУТ -----------------------------------!!!

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
