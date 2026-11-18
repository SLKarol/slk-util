# Организация preload-хендлеров

## 1. Общая структура

```
src/preload/
├── handlers.ts                 # Общий экспорт всех хендлеров
└── lib/                        # Хендлеры по доменам
    ├── error/
    │   └── error-handler.ts
    ├── holidays/
    │   └── holidays-handlers.ts
    ├── media/
    │   └── media-handler.ts
    ├── menu/
    │   └── menu-handlers.ts.ts
    ├── messages/
    │   └── messages-handlers.ts
    ├── ollama/
    │   └── ollama-handlers.ts
    ├── reddit/
    │   └── reddit-handlers.ts
    ├── request/
    │   └── request-handlers.ts
    ├── settings/
    │   ├── settings-handlers.ts
    │   └── settings-tunnel-handlers.ts
    ├── stihiru/
    │   └── stihiru-handlers.ts
    ├── telegram/
    │   └── index.ts
    └── yaplakal/
        └── yaplakal-handlers.ts
```

## 2. Паттерн организации

Каждый домен (Reddit, Telegram, Ollama и т.д.) имеет свою папку в `lib/` с файлом хендлеров:
- `<домен>-handlers.ts` — обработчики IPC для этого домена
- `<домен>-tunnel-handlers.ts` — обработчики для туннелей (если есть)

## 3. Пример создания нового хендлера

```typescript
// src/preload/lib/new-feature/new-feature-handlers.ts
import { ipcRenderer } from 'electron';

export const newFeatureHandlers = {
  onNewFeatureAction: async (event, data) => {
    // Обработка действия
  },
};

export default newFeatureHandlers;
```

## 4. Экспорт в handlers.ts

В `src/preload/handlers.ts` экспортируются все хендлеры:

```typescript
import * as redditHandlers from './lib/reddit/reddit-handlers';
import * as telegramHandlers from './lib/telegram';
// ... другие модули

export { redditHandlers };
export { telegramHandlers };
// ...
```

## 5. Настройки

Настройки хранятся в JSON-файле:
- **Путь:** `app.getPath("userData") + "settings.json"`
- **Расположение:** `C:\Users\{User}\AppData\Roaming\slk-utils\settings.json`
- **Валидация:** Не требуется

## 6. Ссылки

- [AI_PROJECT_CONTEXT.md](../../AI_PROJECT_CONTEXT.md) — основной контекст проекта
- [FSD.txt](../../FSD.txt) — устаревшее напоминание (можно удалить)
