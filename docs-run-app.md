# [run-app.md](run-app.md)

Этот документ посвящен вопросам по запуску приложения под разные платформы 

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
