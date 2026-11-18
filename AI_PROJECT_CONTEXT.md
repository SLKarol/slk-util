# AI_PROJECT_CONTEXT.md — Контекст проекта slk-utils-electron

## 1. Краткое описание проекта

**slk-utils-electron** — это Electron-приложение (версия 1.2.0), разработанное Stanislav Karol. Проект представляет собой утилиту с несколькими функциональными модулями:
- **StihiTracker** — трекер сайта stihi.ru (мониторинг стихов, бан авторов, отзывы)
- **Reddit интеграция** — парсинг и отправка постов из Reddit в Telegram
- **Telegram Bot** — бот для отправки контента в группы
- **Ollama AI** — интеграция с локальными LLM-моделями Ollama
- **WireGuard Tunnel** — настройка WireGuard туннелей
- **YaPlakal** — парсинг Яндекс.Плакаль

Проект использует современный стек технологий и следует архитектурным принципам Feature-Sliced Design (FSD).

---

## 2. Стек технологий

| Технология | Версия/Тип |
|------------|------------|
| Electron | 45.3.4 |
| React | 19.3.1 |
| TypeScript | ~4.8.4 |
| MobX | 7.1.7 |
| Vite | 8.3.8 |
| Mantine UI | 9.8.1 |
| React Router | 7.18.5 |
| Telegraf (Telegram Bot) | 4.16.3 |
| Snoowrap (Reddit API) | 1.23.0 |
| Ollama SDK | 0.6.4 |

**Инструменты сборки:**
- Electron Forge 8.0.1
- ESLint + Prettier
- PostCSS

---

## 3. Дерево FSD (слои и ключевые слайсы)

```
src/
├── main.ts                          # Точка входа main процесса
├── preload.ts                       # Точка входа preload
├── renderer.ts                      # Точка входа renderer процесса
│
├── main/                            # Electron main процесс (backend)
│   ├── features/                    # Бизнес-логика, IPC-хендлеры
│   │   ├── ipc/                     # IPC-хендлеры по доменам
│   │   │   ├── banAutor.ts
│   │   │   ├── holidays.ts
│   │   │   ├── media.ts
│   │   │   ├── ollama.ts
│   │   │   ├── reddit.ts
│   │   │   ├── request.ts
│   │   │   ├── settings.ts          # Сервис настроек (читает/пишет JSON-файл)
│   │   │   ├── stihiRu.ts
│   │   │   ├── telegram.ts
│   │   │   ├── wireGuardTunnel.ts
│   │   │   └── yaplakal.ts
│   │
│   ├── entities/                    # Сущности (доменная модель)
│   │   └── TODO: Заполнить доменными сущностями
│   │
│   └── shared/                      # Общий код для main процесса
│
├── preload/                        # Preload скрипт (требование electron-forge)
│   ├── handlers.ts                 # Общий экспорт хендлеров
│   ├── lib/
│   │   ├── error/
│   │   │   └── error-handler.ts
│   │   ├── holidays/
│   │   │   └── holidays-handlers.ts
│   │   ├── media/
│   │   │   └── media-handler.ts
│   │   ├── menu/
│   │   │   └── menu-handlers.ts.ts
│   │   ├── messages/
│   │   │   └── messages-handlers.ts
│   │   ├── ollama/
│   │   │   └── ollama-handlers.ts
│   │   ├── reddit/
│   │   │   └── reddit-handlers.ts
│   │   ├── request/
│   │   │   └── request-handlers.ts
│   │   ├── settings/
│   │   │   ├── settings-handlers.ts
│   │   │   └── settings-tunnel-handlers.ts
│   │   ├── stihiru/
│   │   │   └── stihiru-handlers.ts
│   │   ├── telegram/
│   │   │   └── index.ts
│   │   └── yaplakal/
│   │       └── yaplakal-handlers.ts
│   └── TODO: Документировать организацию preload-хендлеров
│
├── ui/                              # Electron renderer процесс (frontend)
│   ├── pages/                       # Страницы (routes)
│   │   ├── Home/
│   │   │   ├── HomePage.tsx
│   │   │   └── lib/routeConstants.ts
│   │   ├── Ollama/OllamaPage.tsx
│   │   ├── RedditPage/
│   │   ├── Settings/
│   │   ├── StihiRu/StihiRu.tsx
│   │   ├── WireguardTunnel/
│   │   └── YaPage/
│   │
│   ├── widgets/                     # Компоненты (reusable UI)
│   │   ├── holidays/
│   │   ├── ollama/
│   │   ├── reddit/
│   │   ├── settings/
│   │   ├── stihi-ru/
│   │   ├── wire-guard-tunnel/
│   │   └── yaplakal/
│   │
│   ├── features/                    # Фичи (доменные модули)
│   │   ├── model/                   # MobX store-объекты
│   │   ├── ui/                      # UI-компоненты фич
│   │   ├── lib/                     # Бизнес-логика
│   │   └── config/                  # Конфигурация
│   │
│   ├── providers/                   # React контекстные провайдеры
│   │   ├── ollama/
│   │   ├── reddit/
│   │   ├── stihi-ru/
│   │   ├── wire-guard-tunnel/
│   │   └── ya-plakal/
│   │
│   └── shared/                      # Общий код для renderer
│       └── lib/
│           ├── config.ts
│           ├── dateTime.ts
│           ├── formatBytes.ts
│           ├── getImageSizeFromDataURL.ts
│           ├── string.ts
│           └── types/
│
└── shared/                          # Общий код для обоих процессов
    └── lib/
        ├── constants.ts
        ├── helpers/
        │   ├── execPromise.ts
        │   ├── generateUrlStihiListForDate.ts
        │   ├── getGroupPoemsFromHtmlString.ts
        │   ├── getPoemsFromHtmlDoc.ts
        │   ├── parseStringToHTML.ts
        │   ├── randomInt.ts
        │   └── wait.ts
        └── types/
            ├── app-settings.ts
            ├── common.ts
            ├── electron-api.ts
            ├── htmlPageInfo.ts
            ├── media.ts
            ├── ollama.ts
            ├── sendFile.ts
            ├── settings.type.ts
            ├── stihi.types.ts
            ├── stihiru.types.ts
            └── tunnel.ts
```

---

## 4. Правила FSD, которым следует проект

### 4.1 Слои (Layers)
- **main/** — backend логика (Electron main процесс)
- **ui/** — frontend логика (Electron renderer процесс)
- **shared/** — общий код, доступный обоим процессам

### 4.2 Сегменты (Segments) внутри слайсов
- **model/** — state management (MobX store-объекты)
- **ui/** — React-компоненты
- **lib/** — бизнес-логика, хендлеры
- **config/** — конфигурация (константы, настройки)
- **helpers/** — вспомогательные функции
- **types/** — TypeScript типы
- **providers/** — React контекстные провайдеры

### 4.3 Правило импортов
Импорты идут **только вниз по слоям**:
- `main` → `shared` (общий код для backend)
- `ui` → `pages`, `widgets`, `features`, `providers`, `shared` (frontend слои)
- Внутри `features`: `model` → `lib` → `config`

**Кросс-импорты между слайсами одного слоя запрещены.**

### 4.4 @x-нотация для импорта
```typescript
@main/*          → ./src/main/*
@preload/*       → ./src/preload/*
@shared/*        → ./src/shared/*
@pages/*         → ./src/ui/pages/*
@renderer-features/* → ./src/ui/features/*
@renderer-shared/*  → ./src/ui/shared/*
@widgets/*       → ./src/ui/widgets/*
```

---

## 5. Правила сохранения файлов

| Тип файла | Куда сохранять | Пример пути |
|-----------|----------------|-------------|
| Новый компонент (React) | `src/ui/widgets/\u003cимя\u003e/ui/` | `src/ui/widgets/new-feature/ui/NewFeature.tsx` |
| Новая фича (действие) | `src/ui/features/\u003cимя\u003e/lib/` и `ui/` | `src/ui/features/new-feature/lib/handler.ts`, `src/ui/features/new-feature/ui/NewFeaturePage.tsx` |
| Новая сущность (доменная модель) | `src/main/entities/` или `src/ui/features/\u003cимя\u003e/model/` | `src/main/entities/user/UserEntity.ts`, `src/ui/features/stihi/model/stihi-store.ts` |
| Общая инфраструктура/UI-кит/утилиты | `src/shared/lib/` | `src/shared/lib/utils/helper.ts` |
| Используется одной страницей | В слайс этой страницы | `src/ui/pages/Home/components/HomeSpecificComponent.tsx` |
| Конфигурация | Сегмент `config` соответствующего слоя или через сервис настроек `src/main/features/ipc/settings.ts` (хранится в JSON-файле) | `src/ui/features/new-feature/config/constants.ts` |
| Типы (TypeScript) | Сегмент `types` соответствующего слоя | `src/shared/lib/types/new-type.ts` |
| Хелперы/утилиты | Сегмент `helpers` соответствующего слоя | `src/ui/shared/lib/helpers/formatDate.ts` |
| IPC-хендлеры (Electron) | `src/main/features/ipc/` или `src/preload/lib/\u003cдомен\u003e/` | `src/main/features/ipc/media.ts`, `src/preload/lib/stihi/stihi-handlers.ts` |
| Меню Electron | `src/main/menu/` | `src/main/menu/index.ts` |
| Preload-хендлеры | `src/preload/lib/\u003cдомен\u003e/` | См. [`preload/ORGANIZATION.md`](./preload/ORGANIZATION.md) |

---

## 6. Примечания к архитектуре

- **`src/main/entities/`** — пока пуст, планируется заполнение доменными сущностями
- **Конфигурация** — приходит через сервис настроек: `src/main/features/ipc/settings.ts`, данные хранятся в JSON-файле `app.getPath("userData") + "settings.json"` (путь: `C:\Users\{User}\AppData\Roaming\slk-utils\settings.json`)
- **Вы работаете в слоях `features`**, а не в `entities`
- **`preload.ts`** — требование electron-forge, документация организации хендлеров в [`preload/ORGANIZATION.md`](./preload/ORGANIZATION.md)
- **`src/main/menu/`** — единственное место для Electron-меню (`menu/index.ts`)

---

## 7. Список прочитанных ключевых файлов

| Файл | Путь | Назначение |
|------|------|------------|
| README.md | `D:\source\slk-utils-electron\README.md` | Краткое описание проекта |
| package.json | `D:\source\slk-utils-electron\package.json` | Зависимости, скрипты, алиасы |
| tsconfig.json | `D:\source\slk-utils-electron\tsconfig.json` | Настройки TypeScript, алиасы импорта |
| FSD.txt | `D:\source\slk-utils-electron\FSD.txt` | Документация FSD-структуры (напоминание) |
| vite.renderer.config.ts | `D:\source\slk-utils-electron\vite.renderer.config.ts` | Vite конфиг для renderer с алиасами |
| src/shared/lib/index.ts | `src/shared/lib/index.ts` | Экспорт общих утилит |
| src/ui/shared/lib/index.ts | `src/ui/shared/lib/index.ts` | Экспорт UI-утилит |
| src/ui/features/model/root-store.ts | `src/ui/features/model/root-store.ts` | Корневой MobX стор |
| src/main/features/ipc/settings.ts | `src/main/features/ipc/settings.ts` | Сервис настроек (JSON-файл) |

---

## 8. Контакты и лицензия

**Автор:** Stanislav Karol  
**Email:** slsinitsin@gmail.com  
**Лицензия:** MIT  

---

*Файл создан: \`(текущая дата)\`*  
*Версия проекта: 1.2.0*
