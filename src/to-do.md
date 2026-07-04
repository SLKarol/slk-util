туду

- src\main\features\lib\helpers\downloadFileToCacheDir.ts обработать ошибки
- Сделать кнопку "Очистить выбранное"
- Сделать выбор каналов, куда отправить
- Очищать яп-стор при уходе со страницы. Что-то не работает
- todo: после смены настройки реддита сделать переподключение. Для переподключения используй REDDIT_RECONNECT (я еще не написал такое) и метод Reddit.reConnect
- Для ЯП сделать заголовки: src\main\features\lib\helpers\downloadFileToCacheDir.ts
- reddit: Видео выводится обложкой. Научить воспроизводить. Ну или отправлять на адрес
- Когда перехожу на вкладку "отправить" в реддите, варнинги идут
- Выдать оповещение: что отправляется в телегу. Желательно ещё подержать какое-то время дизейбленным.

Prop
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    media-src https:;
    connect-src 'self' ws: http: https:;
  "
/>
