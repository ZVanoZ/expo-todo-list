[google-drive-api.md](google-drive-api.md)

---

# Google Drive Api

## Документация из сторонних источников

* How to publish to the Google Workspace Marketplace  
  https://www.youtube.com/watch?v=OpGsJl6QQHQ

## Документация Google

* Информация о продукте

  https://console.cloud.google.com/marketplace/product/google/drive.googleapis.com?q=search&referrer=search&inv=1&invt=Ab1u3Q&project=expo-todo-list-463604

* Руководства

    * Краткое руководство по JavaScript
  
      https://developers.google.com/workspace/drive/api/quickstart/js?hl=ru
  
* Интеграция входа в Google в ваше веб-приложение (HTML + JS)  
  https://developers.google.com/identity/sign-in/web/sign-in?hl=ru

### Документация Google Drive API

* API reference

  https://developers.google.com/workspace/drive/api/reference/rest/v3?hl=ru

* Обзор API Google  

  https://developers.google.com/workspace/drive/api/guides/about-sdk?hl=ru

* https://www.googleapis.com

  Базовый URL (Конечная точка службы)

* https://www.googleapis.com/discovery/v1/apis/drive/v3/rest

  Документация по Google Drive API

* https://www.googleapis.com/drive/v3/about

  <details>
    <summary>Документ обнаружения (Discovery Document)</summary>

  Документ обнаружения (Discovery Document) — это машиночитаемая спецификация для
  описания и использования REST API.
  <pre>
  GET   https://www.googleapis.com/drive/v3/about     Получает информацию о пользователе, его Диске и возможностях системы. 
  </pre>
  </details>

### API v3

---

**Внимание!**
1. Можно работать с нативным Google Drive API.  
   Этот вариант для изучения API (чтобы понимать, как это работает, какие ограничения).
2. Можно использовать готовые библиотеки  
   **Лучше использовать этот вариант для реальных приложений**  
   Например эти:
   ```text
    "googleapis"; 
    "expo-auth-session"; 
    "google-auth-library-nodejs"; 
    "@google-cloud/drive"
   ```

---

* **Работа с файлами**

    * **Ресурс REST:** `v3.files`

      https://developers.google.com/workspace/drive/api/reference/rest/v3/files?hl=ru
      <details>
        <summary>JSON</summary>

        ```js
        {
          "exportLinks": {
            string: string,
            ...
          },
          "parents": [
            string
          ],
          "owners": [
            {
              object (User)
            }
          ],
          "permissions": [
            {
              object (Permission)
            }
          ],
          "spaces": [
            string
          ],
          "properties": {
            string: value,
            ...
          },
          "appProperties": {
            string: value,
            ...
          },
          "permissionIds": [
            string
          ],
          "contentRestrictions": [
            {
              object (ContentRestriction)
            }
          ],
          "kind": string,
          "driveId": string,
          "fileExtension": string,
          "copyRequiresWriterPermission": boolean,
          "md5Checksum": string,
          "contentHints": {
            "indexableText": string,
            "thumbnail": {
              "image": string,
              "mimeType": string
            }
          },
          "writersCanShare": boolean,
          "viewedByMe": boolean,
          "mimeType": string,
          "thumbnailLink": string,
          "iconLink": string,
          "shared": boolean,
          "lastModifyingUser": {
            object (User)
          },
          "headRevisionId": string,
          "sharingUser": {
              object (User)
          },
          "webViewLink": string,
          "webContentLink": string,
          "size": string,
          "viewersCanCopyContent": boolean,
          "hasThumbnail": boolean,
          "folderColorRgb": string,
          "id": string,
          "name": string,
          "description": string,
          "starred": boolean,
          "trashed": boolean,
          "explicitlyTrashed": boolean,
          "createdTime": string,
          "modifiedTime": string,
          "modifiedByMeTime": string,
          "viewedByMeTime": string,
          "sharedWithMeTime": string,
          "quotaBytesUsed": string,
          "version": string,
          "originalFilename": string,
          "ownedByMe": boolean,
          "fullFileExtension": string,
          "isAppAuthorized": boolean,
          "teamDriveId": string,
          "capabilities": {
            "canChangeViewersCanCopyContent": boolean,
            "canMoveChildrenOutOfDrive": boolean,
            "canReadDrive": boolean,
            "canEdit": boolean,
            "canCopy": boolean,
            "canComment": boolean,
            "canAddChildren": boolean,
            "canDelete": boolean,
            "canDownload": boolean,
            "canListChildren": boolean,
            "canRemoveChildren": boolean,
            "canRename": boolean,
            "canTrash": boolean,
            "canReadRevisions": boolean,
            "canReadTeamDrive": boolean,
            "canMoveTeamDriveItem": boolean,
            "canChangeCopyRequiresWriterPermission": boolean,
            "canMoveItemIntoTeamDrive": boolean,
            "canUntrash": boolean,
            "canModifyContent": boolean,
            "canMoveItemWithinTeamDrive": boolean,
            "canMoveItemOutOfTeamDrive": boolean,
            "canDeleteChildren": boolean,
            "canMoveChildrenOutOfTeamDrive": boolean,
            "canMoveChildrenWithinTeamDrive": boolean,
            "canTrashChildren": boolean,
            "canMoveItemOutOfDrive": boolean,
            "canAddMyDriveParent": boolean,
            "canRemoveMyDriveParent": boolean,
            "canMoveItemWithinDrive": boolean,
            "canShare": boolean,
            "canMoveChildrenWithinDrive": boolean,
            "canModifyContentRestriction": boolean,
            "canAddFolderFromAnotherDrive": boolean,
            "canChangeSecurityUpdateEnabled": boolean,
            "canAcceptOwnership": boolean,
            "canReadLabels": boolean,
            "canModifyLabels": boolean,
            "canModifyEditorContentRestriction": boolean,
            "canModifyOwnerContentRestriction": boolean,
            "canRemoveContentRestriction": boolean,
            "canDisableInheritedPermissions": boolean,
            "canEnableInheritedPermissions": boolean,
            "canChangeItemDownloadRestriction": boolean
          },
          "hasAugmentedPermissions": boolean,
          "trashingUser": {
              object (User)
          },
          "thumbnailVersion": string,
          "trashedTime": string,
          "modifiedByMe": boolean,
          "imageMediaMetadata": {
            "flashUsed": boolean,
            "meteringMode": string,
            "sensor": string,
            "exposureMode": string,
            "colorSpace": string,
            "whiteBalance": string,
            "width": integer,
            "height": integer,
            "location": {
              "latitude": number,
              "longitude": number,
              "altitude": number
            },
            "rotation": integer,
            "time": string,
            "cameraMake": string,
            "cameraModel": string,
            "exposureTime": number,
            "aperture": number,
            "focalLength": number,
            "isoSpeed": integer,
            "exposureBias": number,
            "maxApertureValue": number,
            "subjectDistance": integer,
            "lens": string
          },
          "videoMediaMetadata": {
            "width": integer,
            "height": integer,
            "durationMillis": string
          },
          "shortcutDetails": {
            "targetId": string,
            "targetMimeType": string,
            "targetResourceKey": string
          },
          "resourceKey": string,
          "linkShareMetadata": {
            "securityUpdateEligible": boolean,
            "securityUpdateEnabled": boolean
          },
          "labelInfo": {
            "labels": [
              {
                  object (Label)
              }
            ]
          },
          "sha1Checksum": string,
          "sha256Checksum": string,
          "inheritedPermissionsDisabled": boolean,
          "downloadRestrictions": {
              object (DownloadRestrictionsMetadata)
          }
        }
        ```
      </details>

      https://developers.google.com/workspace/drive/api/reference/rest/v3?hl=ru#rest-resource:-v3.files
      ```text
      Действие      Метод   Запрос                                 Описание
      ------------------------------------------------------------------------------------------------------------------------
      copy          POST    /drive/v3/files/{fileId}/copy          Создает копию файла и применяет все запрошенные обновления с семантикой исправлений.
      create        POST    /drive/v3/files                        Создает файл.
                    POST    /upload/drive/v3/files                 @TODO: разобраться зачем дан альтернативный URL
      delete        DELETE  /drive/v3/files/{fileId}               Навсегда удаляет файл, принадлежащий пользователю, не перемещая его в корзину.
      download      POST    /drive/v3/files/{fileId}/download      Загружает содержимое файла.
      emptyTrash    DELETE  /drive/v3/files/trash                  Навсегда удаляет все удаленные пользователем файлы.
      export        GET     /drive/v3/files/{fileId}/export        Экспортирует документ Google Workspace в запрошенный тип MIME и возвращает экспортированное байтовое содержимое.
      generateIds   GET     /drive/v3/files/generateIds            Генерирует набор идентификаторов файлов, которые могут быть предоставлены в запросах на создание или копирование.
      get           GET     /drive/v3/files/{fileId}               Получает метаданные или содержимое файла по идентификатору.
      list          GET     /drive/v3/files                        Список файлов пользователя.
      listLabels    GET     /drive/v3/files/{fileId}/listLabels    Выводит список меток файла.
      modifyLabels  POST    /drive/v3/files/{fileId}/modifyLabels  Изменяет набор меток, примененных к файлу.
      update        PATCH   /drive/v3/files/{fileId}               Обновляет метаданные, содержимое или и то, и другое файла.
                    PATCH   /upload/drive/v3/files/{fileId}        @TODO: разобраться зачем дан альтернативный URL
      watch         POST    /drive/v3/files/{fileId}/watch         Подписывается на изменения в файле. 
      ```

    * **Ресурс REST:** `v3.revisions`

      https://developers.google.com/workspace/drive/api/reference/rest/v3/revisions?hl=ru
      <details>
        <summary>JSON-пример</summary>

        ```js
        {
          "exportLinks": {
            string: string,
            //...
          },
          "id": string,
          "mimeType": string,
          "kind": string,
          "published": boolean,
          "keepForever": boolean,
          "md5Checksum": string,
          "modifiedTime": string,
          "publishAuto": boolean,
          "publishedOutsideDomain": boolean,
          "publishedLink": string,
          "size": string,
          "originalFilename": string,
          "lastModifyingUser": {
            object (User)
          }
        }
        ```
      </details>

      https://developers.google.com/workspace/drive/api/reference/rest/v3?hl=ru#rest-resource:-v3.revisions
      ```text
      Действие     Метод    Запрос                                           Описание
      ------------------------------------------------------------------------------------------------------------------------
      delete       DELETE   /drive/v3/files/{fileId}/revisions/{revisionId}  Безвозвратное удаление версии файла.
      get          GET      /drive/v3/files/{fileId}/revisions/{revisionId}  Получает метаданные или содержимое ревизии по идентификатору.
      list         GET      /drive/v3/files/{fileId}/revisions               Список версий файла.
      update       PATCH    /drive/v3/files/{fileId}/revisions/{revisionId}  Обновляет ревизию с использованием семантики патча.
      ```


* **Работа с диском**

  * **Ресурс REST:** `v3.drives`

    https://developers.google.com/workspace/drive/api/reference/rest/v3/drives?hl=ru
    <details>
      <summary>JSON-пример</summary>

      ```json
      ```
    </details>
      
    https://developers.google.com/workspace/drive/api/reference/rest/v3?hl=ru#rest-resource:-v3.drives
    ```text
    Действие  Метод   Запрос                             Описание
    ------------------------------------------------------------------------------------------------------------------------
    create    POST    /drive/v3/drives                   Создает общий диск.
    delete    DELETE  /drive/v3/drives/{driveId}         Безвозвратно удаляет общий диск, organizer которого является пользователь.
    get       GET     /drive/v3/drives/{driveId}         Получает метаданные общего диска по идентификатору.
    hide      POST    /drive/v3/drives/{driveId}/hide    Скрывает общий диск из представления по умолчанию.
    list      GET     /drive/v3/drives                   Список общих дисков пользователя.
    unhide    POST    /drive/v3/drives/{driveId}/unhide  Восстанавливает вид общего диска по умолчанию.
    update    PATCH   /drive/v3/drives/{driveId}         Обновляет метаданные для общего диска.
    ```  

* **@TODO**

    * **Ресурс REST:** `v3.accessproposals` (он же "AccessProposal")

      https://developers.google.com/workspace/drive/api/reference/rest/v3/accessproposals?hl=ru
      <details>
        <summary>JSON-пример</summary>

        ```json
        ```
      </details>

      https://developers.google.com/workspace/drive/api/reference/rest/v3?hl=ru#rest-resource:-v3.accessproposals

    * ~~**Ресурс REST:** `v3.apps`~~

      https://developers.google.com/workspace/drive/api/reference/rest/v3/apps?hl=ru

    * ~~**Ресурс REST:** `v3.changes`~~

      https://developers.google.com/workspace/drive/api/reference/rest/v3/changes?hl=ru

    * ... и т.д.

---
