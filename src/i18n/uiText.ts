import type { BuiltInResumeLanguageCode, InterfaceLanguageCode } from "../types/resume";

export interface UIText {
  appName: string;
  appTitle: string;
  appLead: string;
  interfaceLanguage: string;
  interfaceLanguageMenuLabel: string;
  switchToDarkTheme: string;
  switchToLightTheme: string;
  workspace: string;
  navEditor: string;
  navVersions: string;
  navVacancy: string;
  navPreview: string;
  navControl: string;
  navQuality: string;
  headerDescription: string;
  summaryDescription: string;
  experienceDescription: string;
  educationDescription: string;
  certificatesDescription: string;
  languagesDescription: string;
  skillsDescription: string;
  resumeLanguage: string;
  resumeLanguageHint: string;
  addResumeLanguage: string;
  duplicateResumeLanguage: string;
  renameResumeLanguage: string;
  deleteResumeLanguage: string;
  createResumeLanguageTitle: string;
  duplicateResumeLanguageTitle: string;
  renameResumeLanguageTitle: string;
  resumeLanguageName: string;
  resumeLanguageNamePlaceholder: string;
  createResumeLanguage: string;
  duplicateResumeLanguageConfirm: string;
  renameResumeLanguageConfirm: string;
  duplicateResumeLanguageDefaultName: (label: string) => string;
  versionsTitle: string;
  versionsDescription: string;
  saveVersion: string;
  saveVersionTitle: string;
  saveVersionConfirm: string;
  renameVersionTitle: string;
  renameVersionConfirm: string;
  versionName: string;
  versionNamePlaceholder: string;
  versionDefaultName: (label: string) => string;
  activeResumeLanguage: string;
  applyVersion: string;
  overwriteVersion: string;
  renameVersion: string;
  deleteVersion: string;
  deleteVersionConfirm: (label: string) => string;
  overwriteVersionConfirm: (label: string) => string;
  versionUpdatedAt: (value: string) => string;
  noVersionsTitle: string;
  noVersionsDescription: string;
  versionsCompareTitle: string;
  versionsCompareDescription: string;
  compareSourceVersion: string;
  compareTargetVersion: string;
  versionDiffChanged: string;
  versionDiffSkillsAdded: string;
  versionDiffSkillsRemoved: string;
  versionDiffChangedSections: string;
  versionDiffAddedJobs: string;
  versionDiffRemovedJobs: string;
  versionDiffUpdatedJobs: string;
  versionDiffNoChangesTitle: string;
  versionDiffNoChangesDescription: string;
  fieldProgress: (completed: number, total: number) => string;
  vacancyTitle: string;
  vacancyDescription: string;
  vacancyRole: string;
  vacancyCompany: string;
  vacancyCoverage: string;
  vacancyInput: string;
  vacancyInputHint: string;
  vacancyNotes: string;
  vacancyExtractedKeywords: string;
  vacancyMatchedKeywords: string;
  vacancyMissingKeywords: string;
  vacancyNoMatches: string;
  vacancyAllKeywordsCovered: string;
  vacancyEmptyTitle: string;
  vacancyEmptyDescription: string;
  vacancySuggestions: string;
  vacancySuggestionKeywords: string;
  vacancySuggestionLeadership: string;
  vacancySuggestionScale: string;
  vacancySuggestionStrong: string;
  controlTitle: string;
  controlDescription: string;
  controlStateTitle: string;
  controlStateDescription: string;
  controlSummaryTitle: string;
  controlSummaryDescription: string;
  files: string;
  filesDescription: string;
  import: string;
  export: string;
  importTargetTitle: string;
  exportTargetTitle: string;
  importResume: (label: string) => string;
  importSkills: string;
  exportResume: (label: string) => string;
  exportSkills: string;
  reset: string;
  closeModal: string;
  generate: string;
  pdfFileName: string;
  pdfFileNameHint: string;
  pdfTemplate: string;
  pdfTemplateHint: string;
  templateClassic: string;
  templateClassicDescription: string;
  templateCompact: string;
  templateCompactDescription: string;
  templateMinimal: string;
  templateMinimalDescription: string;
  generating: string;
  downloadPdf: (languageLabel: string) => string;
  previewTitle: string;
  previewDescription: string;
  previewRefresh: string;
  previewOpenInNewTab: string;
  previewExpand: string;
  previewRefreshing: string;
  previewUpdatedAt: (value: string) => string;
  previewWaiting: string;
  previewFrameTitle: string;
  previewWaitingTitle: string;
  previewWaitingDescription: string;
  previewError: (error: string) => string;
  qualityTitle: string;
  qualityDescription: string;
  qualityScore: string;
  qualityStrong: string;
  qualityNeedsAttention: string;
  qualityIssues: string;
  qualitySuggestions: string;
  qualityNoIssuesTitle: string;
  qualityNoIssuesDescription: string;
  qualityDraftTitle: string;
  qualityDraftDescription: string;
  qualityDraftChecklistTitle: string;
  qualityDraftHintRole: string;
  qualityDraftHintSummary: string;
  qualityDraftHintExperience: string;
  qualityDraftHintSkills: string;
  qualityIssueMissingRoleTitle: string;
  qualityIssueMissingRoleDescription: string;
  qualityIssueFewContactsTitle: string;
  qualityIssueFewContactsDescription: string;
  qualityIssueSummaryShortTitle: string;
  qualityIssueSummaryShortDescription: string;
  qualityIssueSummaryLongTitle: string;
  qualityIssueSummaryLongDescription: string;
  qualityIssueFewJobsTitle: string;
  qualityIssueFewJobsDescription: string;
  qualityIssueMissingMetricsTitle: string;
  qualityIssueMissingMetricsDescription: string;
  qualityIssueSkillsOverloadTitle: string;
  qualityIssueSkillsOverloadDescription: string;
  qualityIssueSkillsLowTitle: string;
  qualityIssueSkillsLowDescription: string;
  qualityIssueEnglishTitle: string;
  qualityIssueEnglishDescription: string;
  qualityIssueJobBulletsTitle: (company: string) => string;
  qualityIssueJobBulletsDescription: string;
  qualitySuggestionMetrics: string;
  qualitySuggestionSummary: string;
  qualitySuggestionSkills: string;
  qualitySuggestionEnglish: string;
  qualitySuggestionBullets: string;
  autosave: string;
  autosaveSaved: string;
  lastAction: string;
  snapshot: string;
  jobs: string;
  education: string;
  skills: string;
  addSkill: string;
  skillsColumns: string;
  addSkillRow: string;
  removeEmptySkillRow: string;
  skillCell: (index: number) => string;
  certificates: string;
  addCertificate: string;
  certificateEntry: (index: number) => string;
  deleteCertificate: string;
  hideEntry: string;
  restoreEntry: string;
  hiddenEducation: string;
  hiddenEducationHelp: string;
  addHiddenEducation: string;
  deleteHiddenEducation: string;
  hiddenCertificates: string;
  hiddenCertificatesHelp: string;
  addHiddenCertificate: string;
  deleteHiddenCertificate: string;
  header: string;
  name: string;
  role: string;
  contacts: string;
  addContact: string;
  contact: (index: number) => string;
  deleteContact: string;
  summary: string;
  sectionTitle: string;
  summaryText: string;
  experience: string;
  addJob: string;
  job: (index: number) => string;
  removeJob: string;
  moveUp: string;
  moveDown: string;
  dragToReorder: string;
  hideJob: string;
  hiddenJobs: string;
  hiddenJobsHelp: string;
  addHiddenJob: string;
  restoreJob: string;
  deleteHiddenJob: string;
  hiddenBadge: string;
  title: string;
  company: string;
  period: string;
  bullet: (index: number) => string;
  deleteBullet: string;
  addBullet: string;
  hideBullet: string;
  restoreBullet: string;
  hiddenBullets: string;
  hiddenBulletsHelp: string;
  addHiddenBullet: string;
  deleteHiddenBullet: string;
  notes: string;
  addEntry: string;
  entry: (index: number) => string;
  deleteEntry: string;
  languages: string;
  addLanguage: string;
  languageName: string;
  languageLevel: string;
  deleteLanguage: string;
  levelPlaceholder: string;
  column: (index: number) => string;
  statusReady: string;
  loadedInto: (file: string, languageLabel: string) => string;
  loaded: (file: string) => string;
  failedImport: (file: string, error: string) => string;
  downloaded: (file: string) => string;
  resetConfirm: string;
  resetDone: string;
  resumeLanguageAdded: (label: string) => string;
  resumeLanguageDuplicated: (label: string) => string;
  resumeLanguageExists: (label: string) => string;
  resumeLanguageRenamed: (label: string) => string;
  resumeLanguageDeleted: (label: string) => string;
  versionSaved: (label: string) => string;
  versionRenamed: (label: string) => string;
  versionApplied: (label: string) => string;
  versionDeleted: (label: string) => string;
  versionOverwritten: (label: string) => string;
  cannotDeleteLastResumeLanguage: string;
  deleteResumeLanguageConfirm: (label: string) => string;
  pdfDownloaded: (filename: string) => string;
  pdfFailed: (error: string) => string;
  unknownError: string;
  templateLabel: (templateId: "classic" | "compact" | "minimal") => string;
}

const ruText: UIText = {
    appName: "cv-maker",
    appTitle: "Локальный редактор для твоего PDF-шаблона",
    appLead:
      "Работает целиком в браузере. Импортируй приватные JSON с диска, редактируй всё локально и скачивай PDF без бэкенда.",
    interfaceLanguage: "Язык приложения",
    interfaceLanguageMenuLabel: "Выбрать язык приложения",
    switchToDarkTheme: "Включить тёмную тему",
    switchToLightTheme: "Включить светлую тему",
    workspace: "Режимы",
    navEditor: "Редактор",
    navVersions: "Версии",
    navVacancy: "Вакансия",
    navPreview: "Просмотр",
    navControl: "Управление",
    navQuality: "Проверка",
    headerDescription: "Имя, роль и контакты, которые попадут в шапку PDF.",
    summaryDescription: "Короткое позиционирование: стек, опыт, фокус и то, что ищешь.",
    experienceDescription: "Основные места работы, достижения, скрытые пункты и заметки.",
    educationDescription: "Основное образование и дополнительные записи для этой версии резюме.",
    certificatesDescription: "Курсы и сертификаты, которые хочешь хранить в текущем CV.",
    languagesDescription: "Языки и уровни владения для итогового блока в PDF.",
    skillsDescription: "Сетка навыков в том порядке, в котором они попадут в шаблон.",
    resumeLanguage: "Языки резюме и прогресс",
    resumeLanguageHint: "Нажми на язык, чтобы переключиться на него в редакторе, или добавь новый через +.",
    addResumeLanguage: "Добавить язык резюме",
    duplicateResumeLanguage: "Дублировать язык резюме",
    renameResumeLanguage: "Переименовать язык резюме",
    deleteResumeLanguage: "Удалить язык резюме",
    createResumeLanguageTitle: "Новый язык резюме",
    duplicateResumeLanguageTitle: "Дублировать язык резюме",
    renameResumeLanguageTitle: "Переименовать язык резюме",
    resumeLanguageName: "Название языка",
    resumeLanguageNamePlaceholder: "Например: Deutsch или Serbian",
    createResumeLanguage: "Добавить",
    duplicateResumeLanguageConfirm: "Дублировать",
    renameResumeLanguageConfirm: "Сохранить",
    duplicateResumeLanguageDefaultName: (label) => `${label} копия`,
    versionsTitle: "Версии и пресеты",
    versionsDescription:
      "Сохраняй готовые снимки текущего резюме, чтобы быстро переключаться между базовой версией и адаптациями под вакансии.",
    saveVersion: "Сохранить версию",
    saveVersionTitle: "Сохранить текущую версию",
    saveVersionConfirm: "Сохранить",
    renameVersionTitle: "Переименовать версию",
    renameVersionConfirm: "Сохранить",
    versionName: "Название версии",
    versionNamePlaceholder: "Например: Germany frontend / Startup",
    versionDefaultName: (label) => `${label} base`,
    activeResumeLanguage: "Активный язык резюме",
    applyVersion: "Применить",
    overwriteVersion: "Обновить",
    renameVersion: "Переименовать",
    deleteVersion: "Удалить",
    deleteVersionConfirm: (label) => `Удалить версию «${label}»?`,
    overwriteVersionConfirm: (label) =>
      `Перезаписать версию «${label}» текущим состоянием редактора?`,
    versionUpdatedAt: (value) => `Обновлено: ${value}`,
    noVersionsTitle: "Пока нет сохранённых версий",
    noVersionsDescription:
      "Сохрани текущую конфигурацию как пресет и используй её как отправную точку под разные вакансии.",
    versionsCompareTitle: "Сравнение версий",
    versionsCompareDescription:
      "Сравни две сохранённые версии и быстро посмотри, что изменилось в структуре, опыте, навыках и PDF-настройках.",
    compareSourceVersion: "Исходная версия",
    compareTargetVersion: "Сравнить с",
    versionDiffChanged: "Изменилось",
    versionDiffSkillsAdded: "Добавлено навыков",
    versionDiffSkillsRemoved: "Убрано навыков",
    versionDiffChangedSections: "Изменённые секции",
    versionDiffAddedJobs: "Добавленные места работы",
    versionDiffRemovedJobs: "Удалённые места работы",
    versionDiffUpdatedJobs: "Обновлённые места работы",
    versionDiffNoChangesTitle: "Версии совпадают",
    versionDiffNoChangesDescription:
      "Между выбранными версиями пока не видно заметных различий. Попробуй выбрать другую пару.",
    fieldProgress: (completed, total) => `${completed}/${total}`,
    vacancyTitle: "Vacancy mode",
    vacancyDescription:
      "Вставь текст вакансии и быстро проверь, какие ключевые слова уже покрыты текущей версией резюме, а какие стоит усилить.",
    vacancyRole: "Роль / заголовок вакансии",
    vacancyCompany: "Компания",
    vacancyCoverage: "Покрытие",
    vacancyInput: "Текст вакансии",
    vacancyInputHint:
      "Сюда можно вставить полное описание вакансии. Подсветка будет опираться на текущую активную версию резюме.",
    vacancyNotes: "Заметки по вакансии",
    vacancyExtractedKeywords: "Извлечённые ключевые слова",
    vacancyMatchedKeywords: "Уже покрыто",
    vacancyMissingKeywords: "Стоит усилить",
    vacancyNoMatches: "Пока нет явных совпадений.",
    vacancyAllKeywordsCovered: "Ключевые слова выглядят покрытыми.",
    vacancyEmptyTitle: "Пока нечего анализировать",
    vacancyEmptyDescription:
      "Добавь роль или вставь описание вакансии, и здесь появятся совпадения, пробелы и рекомендации.",
    vacancySuggestions: "Что бы я усилил",
    vacancySuggestionKeywords:
      "Добавь недостающие стек-ключевые слова в summary, skills или релевантные bullets по опыту.",
    vacancySuggestionLeadership:
      "Подсвети ownership, mentoring, code review или архитектурные решения, если вакансия явно ждёт senior-сигналы.",
    vacancySuggestionScale:
      "Усиль техническую глубину: производительность, сложные интеграции, системный дизайн и масштаб.",
    vacancySuggestionStrong:
      "Покрытие уже выглядит сильным. Дальше имеет смысл только подзеркалить язык вакансии в 1-2 bullets.",
    controlTitle: "Файлы, экспорт и сводка",
    controlDescription:
      "Отдельный режим для импорта и экспорта данных, генерации PDF и общей сводки по текущей версии резюме.",
    controlStateTitle: "Состояние текущей версии",
    controlStateDescription:
      "Работаешь с активным языком резюме. Здесь можно проверить имя PDF, автосохранение и скачать файл.",
    controlSummaryTitle: "Сводка по текущей версии",
    controlSummaryDescription:
      "Количество заполненных сущностей в активном резюме: контакты, опыт, образование, сертификаты, языки и навыки.",
    files: "Файлы",
    filesDescription:
      "Импорт возвращает JSON-данные в редактор, а экспорт сохраняет текущую версию резюме и навыков во внешние файлы.",
    import: "Импорт",
    export: "Экспорт",
    importTargetTitle: "Что импортировать?",
    exportTargetTitle: "Что экспортировать?",
    importResume: (label) => `Импортировать ${label}`,
    importSkills: "Навыки",
    exportResume: (label) => `Экспортировать ${label}`,
    exportSkills: "Skills JSON",
    reset: "Вернуть шаблон",
    closeModal: "Закрыть",
    generate: "Генерация",
    pdfFileName: "Имя PDF-файла",
    pdfFileNameHint: "Можно изменить имя перед скачиванием. Расширение .pdf добавится автоматически.",
    pdfTemplate: "PDF-шаблон",
    pdfTemplateHint:
      "Классический оставляет текущую плотность. Компактный помогает уместить больше текста. Минималистичный добавляет воздуха и упрощает подачу.",
    templateClassic: "Классический",
    templateClassicDescription: "Базовая верстка с привычным балансом плотности и акцентов.",
    templateCompact: "Компактный",
    templateCompactDescription: "Более плотная раскладка для длинных версий резюме.",
    templateMinimal: "Минималистичный",
    templateMinimalDescription: "Больше воздуха, спокойнее шапка и более чистая подача.",
    generating: "Генерирую PDF...",
    downloadPdf: (languageLabel) => `Скачать PDF (${languageLabel})`,
    previewTitle: "Просмотр PDF",
    previewDescription:
      "Экран для быстрой проверки итоговой вёрстки, выбора шаблона и экспорта текущей версии резюме.",
    previewRefresh: "Обновить сейчас",
    previewOpenInNewTab: "Открыть отдельно",
    previewExpand: "Развернуть превью",
    previewRefreshing: "Обновляю превью...",
    previewUpdatedAt: (value) => `Последнее обновление: ${value}`,
    previewWaiting: "Ожидаю первый рендер PDF...",
    previewFrameTitle: "PDF preview",
    previewWaitingTitle: "Превью готовится",
    previewWaitingDescription: "После первого рендера здесь появится встраиваемый PDF.",
    previewError: (error) => `Не удалось обновить превью: ${error}`,
    qualityTitle: "Проверка качества",
    qualityDescription:
      "Локальный чек-лист по текущей версии резюме: структура, полнота, глубина bullets и общая рыночная читаемость.",
    qualityScore: "Общий score",
    qualityStrong: "Сильные зоны",
    qualityNeedsAttention: "Нужно усилить",
    qualityIssues: "Что стоит поправить",
    qualitySuggestions: "Что бы я усилил дальше",
    qualityNoIssuesTitle: "Явных проблем не найдено",
    qualityNoIssuesDescription:
      "Текущая версия выглядит собранной. Дальше уже имеет смысл адаптировать её под конкретную вакансию.",
    qualityDraftTitle: "Пока рано оценивать качество",
    qualityDraftDescription:
      "Эта версия пока больше похожа на черновик. Сначала заполни базовые блоки, и тогда появится осмысленная проверка качества.",
    qualityDraftChecklistTitle: "Что стоит заполнить сначала",
    qualityDraftHintRole: "Укажи роль в шапке.",
    qualityDraftHintSummary: "Добавь summary на 2-4 строки.",
    qualityDraftHintExperience: "Заполни хотя бы одно место работы и несколько bullets.",
    qualityDraftHintSkills: "Добавь ведущие навыки и стек.",
    qualityIssueMissingRoleTitle: "Не хватает роли в шапке",
    qualityIssueMissingRoleDescription:
      "Укажи роль в header, чтобы рекрутер сразу понял позиционирование.",
    qualityIssueFewContactsTitle: "Слишком мало контактов",
    qualityIssueFewContactsDescription:
      "Добавь хотя бы 3 контакта: локацию, почту, мессенджер или LinkedIn/GitHub.",
    qualityIssueSummaryShortTitle: "Слишком короткий summary",
    qualityIssueSummaryShortDescription:
      "Summary должен быстро объяснять стек, опыт, домены и текущий фокус.",
    qualityIssueSummaryLongTitle: "Summary перегружен",
    qualityIssueSummaryLongDescription:
      "Лучше сократить вводный блок и оставить только самые сильные сигналы.",
    qualityIssueFewJobsTitle: "Слишком мало мест работы",
    qualityIssueFewJobsDescription:
      "Старайся показывать хотя бы 2 заметных опыта, чтобы профиль выглядел стабильнее.",
    qualityIssueMissingMetricsTitle: "В опыте не хватает метрик",
    qualityIssueMissingMetricsDescription:
      "Добавь числа, проценты, время или масштаб, чтобы bullets выглядели сильнее.",
    qualityIssueSkillsOverloadTitle: "Слишком много навыков",
    qualityIssueSkillsOverloadDescription:
      "Список навыков лучше держать короче и чище, без визуального шума.",
    qualityIssueSkillsLowTitle: "Слишком мало навыков",
    qualityIssueSkillsLowDescription:
      "Добавь ведущий стек и несколько supporting технологий для ATS и recruiter search.",
    qualityIssueEnglishTitle: "Неочевиден уровень английского",
    qualityIssueEnglishDescription:
      "Добавь English с уровнем хотя бы B2, если планируешь международный рынок.",
    qualityIssueJobBulletsTitle: (company) =>
      `Мало сильных bullets${company ? ` в ${company}` : ""}`,
    qualityIssueJobBulletsDescription:
      "На каждое заметное место работы лучше показать минимум 3 содержательных результата.",
    qualitySuggestionMetrics:
      "Усиль bullets цифрами: скорость, проценты, users, data volume или business impact.",
    qualitySuggestionSummary:
      "Перепиши summary так, чтобы за 2-4 строки было понятно, кто ты и что ищешь.",
    qualitySuggestionSkills:
      "Почисти стек и оставь только технологии, которые реально усиливают позиционирование.",
    qualitySuggestionEnglish:
      "Укажи английский с уровнем, если целишься в международные компании.",
    qualitySuggestionBullets:
      "Проверь каждое место работы по формуле: что сделал, зачем, результат, масштаб.",
    autosave: "Автосохранение",
    autosaveSaved: "Сохранено локально",
    lastAction: "Последнее действие",
    snapshot: "Сводка",
    jobs: "Места работы",
    education: "Образование",
    skills: "Навыки",
    addSkill: "Добавить",
    skillsColumns: "Количество колонок",
    addSkillRow: "Добавить",
    removeEmptySkillRow: "Убрать пустую строку",
    skillCell: (index) => `Навык ${index + 1}`,
    certificates: "Курсы и сертификаты",
    addCertificate: "Добавить",
    certificateEntry: (index) => `${index + 1}.`,
    deleteCertificate: "Удалить",
    hideEntry: "Скрыть",
    restoreEntry: "Восстановить",
    hiddenEducation: "Скрытые записи образования",
    hiddenEducationHelp: "Не попадают в PDF, но остаются в JSON",
    addHiddenEducation: "Добавить",
    deleteHiddenEducation: "Удалить",
    hiddenCertificates: "Скрытые записи курсов и сертификатов",
    hiddenCertificatesHelp: "Хранятся отдельно и не попадают в PDF",
    addHiddenCertificate: "Добавить",
    deleteHiddenCertificate: "Удалить",
    header: "Шапка",
    name: "Имя",
    role: "Роль",
    contacts: "Контакты",
    addContact: "Добавить",
    contact: (index) => `Контакт ${index + 1}`,
    deleteContact: "Удалить",
    summary: "Обо мне",
    sectionTitle: "Заголовок секции",
    summaryText: "Текст summary",
    experience: "Опыт",
    addJob: "Добавить",
    job: (index) => `${index + 1}.`,
    removeJob: "Удалить",
    moveUp: "Вверх",
    moveDown: "Вниз",
    dragToReorder: "Перетащить",
    hideJob: "Скрыть",
    hiddenJobs: "Скрытые места работы",
    hiddenJobsHelp: "Хранятся в JSON, но не рендерятся в PDF",
    addHiddenJob: "Добавить",
    restoreJob: "Восстановить",
    deleteHiddenJob: "Удалить",
    hiddenBadge: "скрыто",
    title: "Должность",
    company: "Компания",
    period: "Период",
    bullet: (index) => `${index + 1}.`,
    deleteBullet: "Удалить",
    addBullet: "Добавить",
    hideBullet: "Скрыть",
    restoreBullet: "Восстановить",
    hiddenBullets: "Скрытые пункты",
    hiddenBulletsHelp: "Не попадают в PDF, но остаются в JSON",
    addHiddenBullet: "Добавить",
    deleteHiddenBullet: "Удалить",
    notes: "Заметки",
    addEntry: "Добавить",
    entry: (index) => `${index + 1}.`,
    deleteEntry: "Удалить",
    languages: "Языки",
    addLanguage: "Добавить",
    languageName: "Язык",
    languageLevel: "Уровень",
    deleteLanguage: "Удалить",
    levelPlaceholder: "Выбери уровень",
    column: (index) => `Колонка ${index + 1}`,
    statusReady: "Готово к работе. Локальные изменения сохраняются в браузере.",
    loadedInto: (file, languageLabel) => `Импортировано в ${languageLabel}: ${file}.`,
    loaded: (file) => `Импортирован файл: ${file}.`,
    failedImport: (file, error) => `Не удалось импортировать ${file}: ${error}`,
    downloaded: (file) => `Скачан файл: ${file}.`,
    resetConfirm:
      "Вернуть редактор к шаблонным данным? Локальное состояние в браузере будет заменено.",
    resetDone: "Шаблонные данные восстановлены.",
    resumeLanguageAdded: (label) => `Добавлен язык резюме: ${label}.`,
    resumeLanguageDuplicated: (label) => `Создан дубликат языка резюме: ${label}.`,
    resumeLanguageExists: (label) => `Язык резюме уже существует: ${label}.`,
    resumeLanguageRenamed: (label) => `Язык резюме переименован: ${label}.`,
    resumeLanguageDeleted: (label) => `Удалён язык резюме: ${label}.`,
    versionSaved: (label) => `Сохранена версия: ${label}.`,
    versionRenamed: (label) => `Переименована версия: ${label}.`,
    versionApplied: (label) => `Применена версия: ${label}.`,
    versionDeleted: (label) => `Удалена версия: ${label}.`,
    versionOverwritten: (label) => `Обновлена версия: ${label}.`,
    cannotDeleteLastResumeLanguage: "Нельзя удалить последний язык резюме.",
    deleteResumeLanguageConfirm: (label) => `Удалить язык резюме «${label}»?`,
    pdfDownloaded: (filename) => `PDF сохранён: ${filename}.`,
    pdfFailed: (error) => `Не удалось сгенерировать PDF: ${error}`,
    unknownError: "Неизвестная ошибка",
    templateLabel: (templateId) => {
      if (templateId === "compact") {
        return "Компактный";
      }

      if (templateId === "minimal") {
        return "Минималистичный";
      }

      return "Классический";
    },
};

const enText: UIText = {
    appName: "cv-maker",
    appTitle: "Local editor for your PDF template",
    appLead:
      "Runs entirely in the browser. Import private JSON files from disk, edit everything locally, and download PDF files without a backend.",
    interfaceLanguage: "Interface language",
    interfaceLanguageMenuLabel: "Choose interface language",
    switchToDarkTheme: "Switch to dark theme",
    switchToLightTheme: "Switch to light theme",
    workspace: "Workspace",
    navEditor: "Editor",
    navVersions: "Versions",
    navVacancy: "Vacancy",
    navPreview: "Preview",
    navControl: "Control",
    navQuality: "Quality",
    headerDescription: "Name, role, and contacts that will appear in the PDF header.",
    summaryDescription: "Short positioning: stack, experience, focus, and what you are looking for.",
    experienceDescription: "Main jobs, achievement bullets, hidden items, and working notes.",
    educationDescription: "Core education and extra entries for this resume version.",
    certificatesDescription: "Courses and certificates you want to keep in this CV version.",
    languagesDescription: "Languages and proficiency levels for the final PDF block.",
    skillsDescription: "Skill grid in the same order it will appear in the template.",
    resumeLanguage: "Resume languages and progress",
    resumeLanguageHint: "Click a language to switch the editor to it, or add a new one with +.",
    addResumeLanguage: "Add resume language",
    duplicateResumeLanguage: "Duplicate resume language",
    renameResumeLanguage: "Rename resume language",
    deleteResumeLanguage: "Delete resume language",
    createResumeLanguageTitle: "New resume language",
    duplicateResumeLanguageTitle: "Duplicate resume language",
    renameResumeLanguageTitle: "Rename resume language",
    resumeLanguageName: "Language name",
    resumeLanguageNamePlaceholder: "For example: Deutsch or Serbian",
    createResumeLanguage: "Add",
    duplicateResumeLanguageConfirm: "Duplicate",
    renameResumeLanguageConfirm: "Save",
    duplicateResumeLanguageDefaultName: (label) => `${label} copy`,
    versionsTitle: "Versions and presets",
    versionsDescription:
      "Save named snapshots of the current resume so you can jump between your base version and vacancy-specific adaptations.",
    saveVersion: "Save version",
    saveVersionTitle: "Save current version",
    saveVersionConfirm: "Save",
    renameVersionTitle: "Rename version",
    renameVersionConfirm: "Save",
    versionName: "Version name",
    versionNamePlaceholder: "For example: Germany frontend / Startup",
    versionDefaultName: (label) => `${label} base`,
    activeResumeLanguage: "Active resume language",
    applyVersion: "Apply",
    overwriteVersion: "Overwrite",
    renameVersion: "Rename",
    deleteVersion: "Delete",
    deleteVersionConfirm: (label) => `Delete version "${label}"?`,
    overwriteVersionConfirm: (label) =>
      `Overwrite version "${label}" with the current editor state?`,
    versionUpdatedAt: (value) => `Updated: ${value}`,
    noVersionsTitle: "No saved versions yet",
    noVersionsDescription:
      "Save the current configuration as a preset and reuse it as a starting point for different roles or companies.",
    versionsCompareTitle: "Version diff",
    versionsCompareDescription:
      "Compare two saved versions and quickly see what changed in structure, experience, skills, and PDF settings.",
    compareSourceVersion: "Source version",
    compareTargetVersion: "Compare to",
    versionDiffChanged: "Changed",
    versionDiffSkillsAdded: "Skills added",
    versionDiffSkillsRemoved: "Skills removed",
    versionDiffChangedSections: "Changed sections",
    versionDiffAddedJobs: "Jobs added",
    versionDiffRemovedJobs: "Jobs removed",
    versionDiffUpdatedJobs: "Jobs updated",
    versionDiffNoChangesTitle: "No meaningful changes",
    versionDiffNoChangesDescription:
      "The selected versions look identical so far. Try another pair to compare.",
    fieldProgress: (completed, total) => `${completed}/${total}`,
    vacancyTitle: "Vacancy mode",
    vacancyDescription:
      "Paste a job description and quickly see which keywords are already covered by the current resume and which ones should be strengthened.",
    vacancyRole: "Role / job title",
    vacancyCompany: "Company",
    vacancyCoverage: "Coverage",
    vacancyInput: "Vacancy text",
    vacancyInputHint:
      "Paste the full vacancy text here. Matching is calculated against the current active resume version.",
    vacancyNotes: "Vacancy notes",
    vacancyExtractedKeywords: "Extracted keywords",
    vacancyMatchedKeywords: "Already covered",
    vacancyMissingKeywords: "Worth strengthening",
    vacancyNoMatches: "No obvious matches yet.",
    vacancyAllKeywordsCovered: "The key terms look covered.",
    vacancyEmptyTitle: "Nothing to analyze yet",
    vacancyEmptyDescription:
      "Add a role or paste the vacancy text, and this page will show matches, gaps, and suggestions.",
    vacancySuggestions: "What I would strengthen",
    vacancySuggestionKeywords:
      "Add the missing stack keywords to the summary, skills, or relevant experience bullets.",
    vacancySuggestionLeadership:
      "Highlight ownership, mentoring, code review, or architecture decisions if the role expects senior signals.",
    vacancySuggestionScale:
      "Add more technical depth around performance, integrations, scale, or system design.",
    vacancySuggestionStrong:
      "Coverage already looks strong. At this point, mirror the vacancy wording in one or two bullets only.",
    controlTitle: "Files, export, and overview",
    controlDescription:
      "A dedicated mode for importing and exporting data, generating PDFs, and reviewing the current resume version at a glance.",
    controlStateTitle: "Current version state",
    controlStateDescription:
      "You are working with the active resume language. Check the PDF filename, autosave status, and download the file here.",
    controlSummaryTitle: "Current version overview",
    controlSummaryDescription:
      "Counts of filled entities in the active resume: contacts, jobs, education, certificates, languages, and skills.",
    files: "Files",
    filesDescription:
      "Import loads JSON data back into the editor, while export saves the current resume version and skills to external files.",
    import: "Import",
    export: "Export",
    importTargetTitle: "What do you want to import?",
    exportTargetTitle: "What do you want to export?",
    importResume: (label) => `Import ${label}`,
    importSkills: "Skills",
    exportResume: (label) => `Export ${label}`,
    exportSkills: "Skills JSON",
    reset: "Restore template",
    closeModal: "Close",
    generate: "Generate",
    pdfFileName: "PDF file name",
    pdfFileNameHint: "You can change the filename before download. The .pdf extension will be added automatically.",
    pdfTemplate: "PDF template",
    pdfTemplateHint:
      "Classic keeps the current density. Compact helps fit more content. Minimal adds more breathing room and simplifies the top section.",
    templateClassic: "Classic",
    templateClassicDescription: "Balanced baseline layout with the current visual rhythm.",
    templateCompact: "Compact",
    templateCompactDescription: "Tighter layout for longer resume versions.",
    templateMinimal: "Minimal",
    templateMinimalDescription: "More whitespace, calmer header, and cleaner presentation.",
    generating: "Generating PDF...",
    downloadPdf: (languageLabel) => `Download PDF (${languageLabel})`,
    previewTitle: "PDF Preview",
    previewDescription:
      "A focused screen for checking the final layout, switching templates, and exporting the current resume version.",
    previewRefresh: "Refresh now",
    previewOpenInNewTab: "Open separately",
    previewExpand: "Expand preview",
    previewRefreshing: "Refreshing preview...",
    previewUpdatedAt: (value) => `Last update: ${value}`,
    previewWaiting: "Waiting for the first PDF render...",
    previewFrameTitle: "PDF preview",
    previewWaitingTitle: "Preview is being prepared",
    previewWaitingDescription: "The embedded PDF will appear here after the first render.",
    previewError: (error) => `Failed to refresh preview: ${error}`,
    qualityTitle: "Quality checks",
    qualityDescription:
      "A local checklist for the current resume version: structure, completeness, bullet depth, and overall market readability.",
    qualityScore: "Overall score",
    qualityStrong: "Strong areas",
    qualityNeedsAttention: "Needs attention",
    qualityIssues: "What should be improved",
    qualitySuggestions: "What I would strengthen next",
    qualityNoIssuesTitle: "No obvious problems found",
    qualityNoIssuesDescription:
      "The current version already looks fairly solid. The next step is adapting it to a specific vacancy.",
    qualityDraftTitle: "Too early to assess quality",
    qualityDraftDescription:
      "This version still looks more like a draft. Fill in the core sections first, and then the quality check will become meaningful.",
    qualityDraftChecklistTitle: "What to fill in first",
    qualityDraftHintRole: "Add a role in the header.",
    qualityDraftHintSummary: "Write a 2-4 line summary.",
    qualityDraftHintExperience: "Fill in at least one job and a few bullets.",
    qualityDraftHintSkills: "Add your leading skills and stack.",
    qualityIssueMissingRoleTitle: "Missing role in the header",
    qualityIssueMissingRoleDescription:
      "Add a clear role so a recruiter understands your positioning immediately.",
    qualityIssueFewContactsTitle: "Too few contacts",
    qualityIssueFewContactsDescription:
      "Add at least 3 contact points: location, email, messenger, or LinkedIn/GitHub.",
    qualityIssueSummaryShortTitle: "Summary is too short",
    qualityIssueSummaryShortDescription:
      "The summary should quickly explain your stack, experience, domains, and current focus.",
    qualityIssueSummaryLongTitle: "Summary is overloaded",
    qualityIssueSummaryLongDescription:
      "Shorten the intro block and leave only the strongest signals.",
    qualityIssueFewJobsTitle: "Too few job entries",
    qualityIssueFewJobsDescription:
      "Try to show at least 2 meaningful roles so the profile looks more stable.",
    qualityIssueMissingMetricsTitle: "Experience lacks metrics",
    qualityIssueMissingMetricsDescription:
      "Add numbers, percentages, time, or scale so the bullets feel stronger.",
    qualityIssueSkillsOverloadTitle: "Too many skills",
    qualityIssueSkillsOverloadDescription:
      "The skills list should stay tighter and cleaner, without unnecessary noise.",
    qualityIssueSkillsLowTitle: "Too few skills",
    qualityIssueSkillsLowDescription:
      "Add your leading stack and a few supporting technologies for ATS and recruiter search.",
    qualityIssueEnglishTitle: "English level is not obvious",
    qualityIssueEnglishDescription:
      "Add English with at least a B2 level if you are targeting the international market.",
    qualityIssueJobBulletsTitle: (company) =>
      `Not enough strong bullets${company ? ` for ${company}` : ""}`,
    qualityIssueJobBulletsDescription:
      "A meaningful role should usually show at least 3 substantive achievement bullets.",
    qualitySuggestionMetrics:
      "Strengthen bullets with numbers: speed, percentages, users, data volume, or business impact.",
    qualitySuggestionSummary:
      "Rewrite the summary so it clearly explains who you are and what you are looking for in 2-4 lines.",
    qualitySuggestionSkills:
      "Trim the stack and keep only the technologies that reinforce your positioning.",
    qualitySuggestionEnglish:
      "Add English with a clear level if you are targeting international companies.",
    qualitySuggestionBullets:
      "Review each job with the formula: what you built, why, the outcome, and the scale.",
    autosave: "Autosave",
    autosaveSaved: "Saved locally",
    lastAction: "Last action",
    snapshot: "Snapshot",
    jobs: "Jobs",
    education: "Education",
    skills: "Skills",
    addSkill: "Add",
    skillsColumns: "Columns",
    addSkillRow: "Add",
    removeEmptySkillRow: "Remove empty row",
    skillCell: (index) => `Skill ${index + 1}`,
    certificates: "Courses and certificates",
    addCertificate: "Add",
    certificateEntry: (index) => `${index + 1}.`,
    deleteCertificate: "Delete",
    hideEntry: "Hide",
    restoreEntry: "Restore",
    hiddenEducation: "Hidden education entries",
    hiddenEducationHelp: "Stored in JSON but excluded from the PDF",
    addHiddenEducation: "Add",
    deleteHiddenEducation: "Delete",
    hiddenCertificates: "Hidden course and certificate entries",
    hiddenCertificatesHelp: "Stored separately and excluded from the PDF",
    addHiddenCertificate: "Add",
    deleteHiddenCertificate: "Delete",
    header: "Header",
    name: "Name",
    role: "Role",
    contacts: "Contacts",
    addContact: "Add",
    contact: (index) => `Contact ${index + 1}`,
    deleteContact: "Delete",
    summary: "Summary",
    sectionTitle: "Section title",
    summaryText: "Summary text",
    experience: "Experience",
    addJob: "Add",
    job: (index) => `${index + 1}.`,
    removeJob: "Delete",
    moveUp: "Up",
    moveDown: "Down",
    dragToReorder: "Drag to reorder",
    hideJob: "Hide",
    hiddenJobs: "Hidden jobs",
    hiddenJobsHelp: "Stored in JSON but not rendered in the PDF",
    addHiddenJob: "Add",
    restoreJob: "Restore",
    deleteHiddenJob: "Delete",
    hiddenBadge: "hidden",
    title: "Title",
    company: "Company",
    period: "Period",
    bullet: (index) => `${index + 1}.`,
    deleteBullet: "Delete",
    addBullet: "Add",
    hideBullet: "Hide",
    restoreBullet: "Restore",
    hiddenBullets: "Hidden items",
    hiddenBulletsHelp: "Excluded from the PDF, but kept in JSON",
    addHiddenBullet: "Add",
    deleteHiddenBullet: "Delete",
    notes: "Notes",
    addEntry: "Add",
    entry: (index) => `${index + 1}.`,
    deleteEntry: "Delete",
    languages: "Languages",
    addLanguage: "Add",
    languageName: "Language",
    languageLevel: "Level",
    deleteLanguage: "Delete",
    levelPlaceholder: "Select level",
    column: (index) => `Column ${index + 1}`,
    statusReady: "Ready. Local changes are stored in your browser.",
    loadedInto: (file, languageLabel) => `Imported into ${languageLabel}: ${file}.`,
    loaded: (file) => `Imported file: ${file}.`,
    failedImport: (file, error) => `Failed to import ${file}: ${error}`,
    downloaded: (file) => `Downloaded file: ${file}.`,
    resetConfirm:
      "Restore the editor to template data? Local browser state will be replaced.",
    resetDone: "Template data restored.",
    resumeLanguageAdded: (label) => `Added resume language: ${label}.`,
    resumeLanguageDuplicated: (label) => `Duplicated resume language: ${label}.`,
    resumeLanguageExists: (label) => `Resume language already exists: ${label}.`,
    resumeLanguageRenamed: (label) => `Renamed resume language: ${label}.`,
    resumeLanguageDeleted: (label) => `Deleted resume language: ${label}.`,
    versionSaved: (label) => `Saved version: ${label}.`,
    versionRenamed: (label) => `Renamed version: ${label}.`,
    versionApplied: (label) => `Applied version: ${label}.`,
    versionDeleted: (label) => `Deleted version: ${label}.`,
    versionOverwritten: (label) => `Updated version: ${label}.`,
    cannotDeleteLastResumeLanguage: "You cannot delete the last resume language.",
    deleteResumeLanguageConfirm: (label) => `Delete resume language "${label}"?`,
    pdfDownloaded: (filename) => `Saved PDF: ${filename}.`,
    pdfFailed: (error) => `Failed to generate PDF: ${error}`,
    unknownError: "Unknown error",
    templateLabel: (templateId) => {
      if (templateId === "compact") {
        return "Compact";
      }

      if (templateId === "minimal") {
        return "Minimal";
      }

      return "Classic";
    },
};

const deText: UIText = {
  ...enText,
  interfaceLanguage: "Sprache der Anwendung",
  interfaceLanguageMenuLabel: "Sprache der Anwendung wählen",
  switchToDarkTheme: "Dunkles Design aktivieren",
  switchToLightTheme: "Helles Design aktivieren",
  headerDescription: "Name, Rolle und Kontakte, die in den PDF-Kopfbereich übernommen werden.",
  summaryDescription:
    "Kurze Positionierung: Stack, Erfahrung, Fokus und wonach du suchst.",
  experienceDescription:
    "Wichtige Stationen, Ergebnisse, ausgeblendete Punkte und Arbeitsnotizen.",
  educationDescription:
    "Ausbildung und zusätzliche Einträge für diese Version des Lebenslaufs.",
  certificatesDescription:
    "Kurse und Zertifikate, die du in dieser CV-Version behalten möchtest.",
  languagesDescription: "Sprachen und Niveaus für den finalen PDF-Block.",
  skillsDescription:
    "Skill-Grid in genau der Reihenfolge, in der es ins Template übernommen wird.",
  resumeLanguage: "Sprachen des Lebenslaufs und Fortschritt",
  resumeLanguageHint:
    "Klicke auf eine Sprache, um im Editor zu ihr zu wechseln, oder füge mit + eine neue hinzu.",
  addResumeLanguage: "Sprache des Lebenslaufs hinzufügen",
  deleteResumeLanguage: "Sprache des Lebenslaufs löschen",
  createResumeLanguageTitle: "Neue Sprache des Lebenslaufs",
  resumeLanguageName: "Sprachname",
  resumeLanguageNamePlaceholder: "Zum Beispiel: Deutsch oder Serbisch",
  createResumeLanguage: "Hinzufügen",
  fieldProgress: (completed, total) => `${completed}/${total}`,
  files: "Dateien",
  import: "Importieren",
  export: "Exportieren",
  importTargetTitle: "Was möchtest du importieren?",
  exportTargetTitle: "Was möchtest du exportieren?",
  importResume: (label) => `${label} importieren`,
  exportResume: (label) => `${label} exportieren`,
  reset: "Vorlage wiederherstellen",
  closeModal: "Schließen",
  generate: "Generierung",
  pdfFileName: "PDF-Dateiname",
  pdfFileNameHint:
    "Du kannst den Dateinamen vor dem Download ändern. Die Endung .pdf wird automatisch hinzugefügt.",
  generating: "PDF wird generiert...",
  pdfTemplate: "PDF-Template",
  pdfTemplateHint:
    "Klassisch behält die aktuelle Dichte. Kompakt hilft, mehr Inhalt unterzubringen. Minimal schafft mehr Luft und eine ruhigere Präsentation.",
  templateClassic: "Klassisch",
  templateClassicDescription: "Basislayout mit vertrautem Gleichgewicht bei Dichte und Akzenten.",
  templateCompact: "Kompakt",
  templateCompactDescription: "Dichtere Anordnung für längere Lebenslauf-Versionen.",
  templateMinimal: "Minimal",
  templateMinimalDescription: "Mehr Luft, ruhigere Kopfzeile und klarere Darstellung.",
  downloadPdf: (languageLabel) => `PDF herunterladen (${languageLabel})`,
  qualityTitle: "Qualitätscheck",
  qualityDescription:
    "Lokale Checkliste für die aktuelle Lebenslauf-Version: Struktur, Vollständigkeit, Tiefe der Bullets und allgemeine Lesbarkeit.",
  snapshot: "Übersicht",
  jobs: "Positionen",
  education: "Ausbildung",
  skills: "Fähigkeiten",
  addSkill: "Hinzufügen",
  skillsColumns: "Anzahl der Spalten",
  addSkillRow: "Hinzufügen",
  removeEmptySkillRow: "Leere Zeile entfernen",
  skillCell: (index) => `Fähigkeit ${index + 1}`,
  certificates: "Kurse und Zertifikate",
  addCertificate: "Hinzufügen",
  certificateEntry: (index) => `${index + 1}.`,
  deleteCertificate: "Löschen",
  hideEntry: "Ausblenden",
  restoreEntry: "Wiederherstellen",
  hiddenEducation: "Versteckte Ausbildungseinträge",
  hiddenEducationHelp: "Werden im JSON gespeichert, aber nicht im PDF angezeigt",
  addHiddenEducation: "Hinzufügen",
  deleteHiddenEducation: "Löschen",
  hiddenCertificates: "Versteckte Kurs- und Zertifikatseinträge",
  hiddenCertificatesHelp: "Werden getrennt gespeichert und nicht im PDF angezeigt",
  addHiddenCertificate: "Hinzufügen",
  deleteHiddenCertificate: "Löschen",
  header: "Kopfbereich",
  role: "Rolle",
  contacts: "Kontakte",
  addContact: "Hinzufügen",
  contact: (index) => `Kontakt ${index + 1}`,
  deleteContact: "Löschen",
  summary: "Über mich",
  sectionTitle: "Abschnittstitel",
  summaryText: "Summary-Text",
  experience: "Erfahrung",
  addJob: "Hinzufügen",
  job: (index) => `${index + 1}.`,
  removeJob: "Löschen",
  moveUp: "Nach oben",
  moveDown: "Nach unten",
  hideJob: "Ausblenden",
  hiddenJobs: "Versteckte Positionen",
  hiddenJobsHelp: "Werden im JSON gespeichert, aber nicht im PDF gerendert",
  addHiddenJob: "Hinzufügen",
  restoreJob: "Wiederherstellen",
  deleteHiddenJob: "Löschen",
  hiddenBadge: "versteckt",
  company: "Unternehmen",
  period: "Zeitraum",
  bullet: (index) => `${index + 1}.`,
  deleteBullet: "Löschen",
  addBullet: "Hinzufügen",
  hideBullet: "Ausblenden",
  restoreBullet: "Wiederherstellen",
  hiddenBullets: "Versteckte Punkte",
  hiddenBulletsHelp: "Werden nicht ins PDF übernommen, bleiben aber im JSON",
  addHiddenBullet: "Hinzufügen",
  deleteHiddenBullet: "Löschen",
  notes: "Notizen",
  addEntry: "Hinzufügen",
  entry: (index) => `${index + 1}.`,
  deleteEntry: "Löschen",
  languages: "Sprachen",
  addLanguage: "Hinzufügen",
  languageName: "Sprache",
  languageLevel: "Niveau",
  deleteLanguage: "Löschen",
  levelPlaceholder: "Niveau wählen",
  column: (index) => `Spalte ${index + 1}`,
  statusReady: "Bereit. Lokale Änderungen werden im Browser gespeichert.",
  loadedInto: (file, languageLabel) => `Importiert in ${languageLabel}: ${file}.`,
  loaded: (file) => `Datei importiert: ${file}.`,
  failedImport: (file, error) => `Import von ${file} fehlgeschlagen: ${error}`,
  downloaded: (file) => `Datei heruntergeladen: ${file}.`,
  resetConfirm:
    "Editor auf Vorlagendaten zurücksetzen? Der lokale Browser-Status wird ersetzt.",
  resetDone: "Vorlagendaten wurden wiederhergestellt.",
  resumeLanguageAdded: (label) => `Sprache des Lebenslaufs hinzugefügt: ${label}.`,
  resumeLanguageExists: (label) => `Sprache des Lebenslaufs existiert bereits: ${label}.`,
  resumeLanguageDeleted: (label) => `Sprache des Lebenslaufs gelöscht: ${label}.`,
  cannotDeleteLastResumeLanguage:
    "Die letzte Sprache des Lebenslaufs kann nicht gelöscht werden.",
  deleteResumeLanguageConfirm: (label) => `Sprache des Lebenslaufs „${label}“ löschen?`,
  pdfDownloaded: (filename) => `PDF gespeichert: ${filename}.`,
  pdfFailed: (error) => `PDF konnte nicht generiert werden: ${error}`,
  unknownError: "Unbekannter Fehler",
};

const esText: UIText = {
  ...enText,
  interfaceLanguage: "Idioma de la aplicación",
  interfaceLanguageMenuLabel: "Elegir idioma de la aplicación",
  switchToDarkTheme: "Activar tema oscuro",
  switchToLightTheme: "Activar tema claro",
  headerDescription: "Nombre, rol y contactos que aparecerán en la cabecera del PDF.",
  summaryDescription:
    "Posicionamiento corto: stack, experiencia, foco y lo que estás buscando.",
  experienceDescription:
    "Principales trabajos, logros, elementos ocultos y notas de trabajo.",
  educationDescription:
    "Formación principal y registros adicionales para esta versión del CV.",
  certificatesDescription:
    "Cursos y certificados que quieres conservar en esta versión del CV.",
  languagesDescription: "Idiomas y niveles para el bloque final del PDF.",
  skillsDescription:
    "Cuadrícula de habilidades en el mismo orden en que aparecerán en la plantilla.",
  resumeLanguage: "Idiomas del CV y progreso",
  resumeLanguageHint:
    "Haz clic en un idioma para cambiar el editor a ese idioma o añade uno nuevo con +.",
  addResumeLanguage: "Añadir idioma del CV",
  deleteResumeLanguage: "Eliminar idioma del CV",
  createResumeLanguageTitle: "Nuevo idioma del CV",
  resumeLanguageName: "Nombre del idioma",
  resumeLanguageNamePlaceholder: "Por ejemplo: Deutsch o Serbian",
  createResumeLanguage: "Añadir",
  fieldProgress: (completed, total) => `${completed}/${total}`,
  files: "Archivos",
  import: "Importar",
  export: "Exportar",
  importTargetTitle: "¿Qué quieres importar?",
  exportTargetTitle: "¿Qué quieres exportar?",
  importResume: (label) => `Importar ${label}`,
  exportResume: (label) => `Exportar ${label}`,
  reset: "Restaurar plantilla",
  closeModal: "Cerrar",
  generate: "Generación",
  pdfFileName: "Nombre del archivo PDF",
  pdfFileNameHint:
    "Puedes cambiar el nombre del archivo antes de descargarlo. La extensión .pdf se añadirá automáticamente.",
  generating: "Generando PDF...",
  pdfTemplate: "Plantilla PDF",
  pdfTemplateHint:
    "Clásica mantiene la densidad actual. Compacta ayuda a meter más contenido. Minimalista añade aire y simplifica la presentación.",
  templateClassic: "Clásica",
  templateClassicDescription: "Maquetación base con un equilibrio familiar de densidad y acentos.",
  templateCompact: "Compacta",
  templateCompactDescription: "Distribución más densa para versiones largas del CV.",
  templateMinimal: "Minimalista",
  templateMinimalDescription: "Más aire, cabecera más calmada y presentación más limpia.",
  downloadPdf: (languageLabel) => `Descargar PDF (${languageLabel})`,
  qualityTitle: "Revisión de calidad",
  qualityDescription:
    "Checklist local para la versión actual del CV: estructura, completitud, profundidad de los bullets y legibilidad general.",
  snapshot: "Resumen",
  jobs: "Experiencia",
  education: "Educación",
  skills: "Habilidades",
  addSkill: "Añadir",
  skillsColumns: "Cantidad de columnas",
  addSkillRow: "Añadir",
  removeEmptySkillRow: "Quitar fila vacía",
  skillCell: (index) => `Habilidad ${index + 1}`,
  certificates: "Cursos y certificados",
  addCertificate: "Añadir",
  certificateEntry: (index) => `${index + 1}.`,
  deleteCertificate: "Eliminar",
  hideEntry: "Ocultar",
  restoreEntry: "Restaurar",
  hiddenEducation: "Entradas ocultas de educación",
  hiddenEducationHelp: "Se guardan en JSON pero no aparecen en el PDF",
  addHiddenEducation: "Añadir",
  deleteHiddenEducation: "Eliminar",
  hiddenCertificates: "Entradas ocultas de cursos y certificados",
  hiddenCertificatesHelp: "Se guardan por separado y no aparecen en el PDF",
  addHiddenCertificate: "Añadir",
  deleteHiddenCertificate: "Eliminar",
  header: "Cabecera",
  role: "Rol",
  contacts: "Contactos",
  addContact: "Añadir",
  contact: (index) => `Contacto ${index + 1}`,
  deleteContact: "Eliminar",
  summary: "Sobre mí",
  sectionTitle: "Título de la sección",
  summaryText: "Texto del resumen",
  experience: "Experiencia",
  addJob: "Añadir",
  job: (index) => `${index + 1}.`,
  removeJob: "Eliminar",
  moveUp: "Arriba",
  moveDown: "Abajo",
  hideJob: "Ocultar",
  hiddenJobs: "Puestos ocultos",
  hiddenJobsHelp: "Se guardan en JSON pero no se renderizan en el PDF",
  addHiddenJob: "Añadir",
  restoreJob: "Restaurar",
  deleteHiddenJob: "Eliminar",
  hiddenBadge: "oculto",
  company: "Empresa",
  period: "Periodo",
  bullet: (index) => `${index + 1}.`,
  deleteBullet: "Eliminar",
  addBullet: "Añadir",
  hideBullet: "Ocultar",
  restoreBullet: "Restaurar",
  hiddenBullets: "Puntos ocultos",
  hiddenBulletsHelp: "No aparecen en el PDF, pero permanecen en el JSON",
  addHiddenBullet: "Añadir",
  deleteHiddenBullet: "Eliminar",
  notes: "Notas",
  addEntry: "Añadir",
  entry: (index) => `${index + 1}.`,
  deleteEntry: "Eliminar",
  languages: "Idiomas",
  addLanguage: "Añadir",
  languageName: "Idioma",
  languageLevel: "Nivel",
  deleteLanguage: "Eliminar",
  levelPlaceholder: "Selecciona nivel",
  column: (index) => `Columna ${index + 1}`,
  statusReady: "Listo. Los cambios locales se guardan en el navegador.",
  loadedInto: (file, languageLabel) => `Importado en ${languageLabel}: ${file}.`,
  loaded: (file) => `Archivo importado: ${file}.`,
  failedImport: (file, error) => `No se pudo importar ${file}: ${error}`,
  downloaded: (file) => `Archivo descargado: ${file}.`,
  resetConfirm:
    "¿Restaurar el editor a los datos de plantilla? El estado local del navegador será reemplazado.",
  resetDone: "Se restauraron los datos de plantilla.",
  resumeLanguageAdded: (label) => `Idioma del CV añadido: ${label}.`,
  resumeLanguageExists: (label) => `El idioma del CV ya existe: ${label}.`,
  resumeLanguageDeleted: (label) => `Idioma del CV eliminado: ${label}.`,
  cannotDeleteLastResumeLanguage: "No puedes eliminar el último idioma del CV.",
  deleteResumeLanguageConfirm: (label) => `¿Eliminar el idioma del CV "${label}"?`,
  pdfDownloaded: (filename) => `PDF guardado: ${filename}.`,
  pdfFailed: (error) => `No se pudo generar el PDF: ${error}`,
  unknownError: "Error desconocido",
};

const itText: UIText = {
  ...enText,
  interfaceLanguage: "Lingua dell'applicazione",
  interfaceLanguageMenuLabel: "Scegli la lingua dell'applicazione",
  switchToDarkTheme: "Attiva tema scuro",
  switchToLightTheme: "Attiva tema chiaro",
  headerDescription: "Nome, ruolo e contatti che compariranno nell'intestazione del PDF.",
  summaryDescription:
    "Posizionamento breve: stack, esperienza, focus e ciò che stai cercando.",
  experienceDescription:
    "Principali esperienze, risultati, elementi nascosti e note di lavoro.",
  educationDescription:
    "Formazione principale e voci aggiuntive per questa versione del CV.",
  certificatesDescription:
    "Corsi e certificati che vuoi mantenere in questa versione del CV.",
  languagesDescription: "Lingue e livelli per il blocco finale del PDF.",
  skillsDescription:
    "Griglia delle competenze nello stesso ordine in cui entreranno nel template.",
  resumeLanguage: "Lingue del CV e progresso",
  resumeLanguageHint:
    "Fai clic su una lingua per passare a quella lingua nell'editor oppure aggiungine una nuova con +.",
  addResumeLanguage: "Aggiungi lingua del CV",
  deleteResumeLanguage: "Elimina lingua del CV",
  createResumeLanguageTitle: "Nuova lingua del CV",
  resumeLanguageName: "Nome della lingua",
  resumeLanguageNamePlaceholder: "Per esempio: Deutsch o Serbian",
  createResumeLanguage: "Aggiungi",
  fieldProgress: (completed, total) => `${completed}/${total}`,
  files: "File",
  import: "Importa",
  export: "Esporta",
  importTargetTitle: "Cosa vuoi importare?",
  exportTargetTitle: "Cosa vuoi esportare?",
  importResume: (label) => `Importa ${label}`,
  exportResume: (label) => `Esporta ${label}`,
  reset: "Ripristina modello",
  closeModal: "Chiudi",
  generate: "Generazione",
  pdfFileName: "Nome del file PDF",
  pdfFileNameHint:
    "Puoi cambiare il nome del file prima del download. L'estensione .pdf verrà aggiunta automaticamente.",
  generating: "Generazione PDF in corso...",
  pdfTemplate: "Template PDF",
  pdfTemplateHint:
    "Classico mantiene la densità attuale. Compatto aiuta a far entrare più contenuto. Minimal aggiunge respiro e semplifica la presentazione.",
  templateClassic: "Classico",
  templateClassicDescription: "Layout base con un equilibrio familiare tra densità e accenti.",
  templateCompact: "Compatto",
  templateCompactDescription: "Impaginazione più densa per versioni lunghe del CV.",
  templateMinimal: "Minimal",
  templateMinimalDescription: "Più spazio, header più calmo e presentazione più pulita.",
  downloadPdf: (languageLabel) => `Scarica PDF (${languageLabel})`,
  qualityTitle: "Controllo qualità",
  qualityDescription:
    "Checklist locale per la versione corrente del CV: struttura, completezza, profondità dei bullet e leggibilità complessiva.",
  snapshot: "Panoramica",
  jobs: "Esperienza",
  education: "Istruzione",
  skills: "Competenze",
  addSkill: "Aggiungi",
  skillsColumns: "Numero di colonne",
  addSkillRow: "Aggiungi",
  removeEmptySkillRow: "Rimuovi riga vuota",
  skillCell: (index) => `Competenza ${index + 1}`,
  certificates: "Corsi e certificati",
  addCertificate: "Aggiungi",
  certificateEntry: (index) => `${index + 1}.`,
  deleteCertificate: "Elimina",
  hideEntry: "Nascondi",
  restoreEntry: "Ripristina",
  hiddenEducation: "Voci di istruzione nascoste",
  hiddenEducationHelp: "Salvate nel JSON ma escluse dal PDF",
  addHiddenEducation: "Aggiungi",
  deleteHiddenEducation: "Elimina",
  hiddenCertificates: "Voci nascoste di corsi e certificati",
  hiddenCertificatesHelp: "Salvate separatamente ed escluse dal PDF",
  addHiddenCertificate: "Aggiungi",
  deleteHiddenCertificate: "Elimina",
  header: "Intestazione",
  role: "Ruolo",
  contacts: "Contatti",
  addContact: "Aggiungi",
  contact: (index) => `Contatto ${index + 1}`,
  deleteContact: "Elimina",
  summary: "Su di me",
  sectionTitle: "Titolo della sezione",
  summaryText: "Testo del summary",
  experience: "Esperienza",
  addJob: "Aggiungi",
  job: (index) => `${index + 1}.`,
  removeJob: "Elimina",
  moveUp: "Su",
  moveDown: "Giù",
  hideJob: "Nascondi",
  hiddenJobs: "Ruoli nascosti",
  hiddenJobsHelp: "Salvati nel JSON ma non renderizzati nel PDF",
  addHiddenJob: "Aggiungi",
  restoreJob: "Ripristina",
  deleteHiddenJob: "Elimina",
  hiddenBadge: "nascosto",
  company: "Azienda",
  period: "Periodo",
  bullet: (index) => `${index + 1}.`,
  deleteBullet: "Elimina",
  addBullet: "Aggiungi",
  hideBullet: "Nascondi",
  restoreBullet: "Ripristina",
  hiddenBullets: "Punti nascosti",
  hiddenBulletsHelp: "Non compaiono nel PDF ma restano nel JSON",
  addHiddenBullet: "Aggiungi",
  deleteHiddenBullet: "Elimina",
  notes: "Note",
  addEntry: "Aggiungi",
  entry: (index) => `${index + 1}.`,
  deleteEntry: "Elimina",
  languages: "Lingue",
  addLanguage: "Aggiungi",
  languageName: "Lingua",
  languageLevel: "Livello",
  deleteLanguage: "Elimina",
  levelPlaceholder: "Seleziona livello",
  column: (index) => `Colonna ${index + 1}`,
  statusReady: "Pronto. Le modifiche locali vengono salvate nel browser.",
  loadedInto: (file, languageLabel) => `Importato in ${languageLabel}: ${file}.`,
  loaded: (file) => `File importato: ${file}.`,
  failedImport: (file, error) => `Impossibile importare ${file}: ${error}`,
  downloaded: (file) => `File scaricato: ${file}.`,
  resetConfirm:
    "Ripristinare l'editor ai dati del modello? Lo stato locale del browser verrà sostituito.",
  resetDone: "I dati del modello sono stati ripristinati.",
  resumeLanguageAdded: (label) => `Lingua del CV aggiunta: ${label}.`,
  resumeLanguageExists: (label) => `La lingua del CV esiste già: ${label}.`,
  resumeLanguageDeleted: (label) => `Lingua del CV eliminata: ${label}.`,
  cannotDeleteLastResumeLanguage: "Non puoi eliminare l'ultima lingua del CV.",
  deleteResumeLanguageConfirm: (label) => `Eliminare la lingua del CV "${label}"?`,
  pdfDownloaded: (filename) => `PDF salvato: ${filename}.`,
  pdfFailed: (error) => `Impossibile generare il PDF: ${error}`,
  unknownError: "Errore sconosciuto",
};

const ptText: UIText = {
  ...enText,
  interfaceLanguage: "Idioma da aplicação",
  interfaceLanguageMenuLabel: "Escolher idioma da aplicação",
  switchToDarkTheme: "Ativar tema escuro",
  switchToLightTheme: "Ativar tema claro",
  headerDescription:
    "Nome, função e contactos que vão aparecer no cabeçalho do PDF.",
  summaryDescription:
    "Posicionamento curto: stack, experiência, foco e o que procuras.",
  experienceDescription:
    "Principais experiências, resultados, elementos ocultos e notas de trabalho.",
  educationDescription:
    "Educação principal e registos extra para esta versão do currículo.",
  certificatesDescription:
    "Cursos e certificados que queres manter nesta versão do CV.",
  languagesDescription: "Idiomas e níveis para o bloco final do PDF.",
  skillsDescription:
    "Grelha de competências na mesma ordem em que aparecerão no template.",
  resumeLanguage: "Idiomas do currículo e progresso",
  resumeLanguageHint:
    "Clica num idioma para mudar o editor para ele ou adiciona um novo com +.",
  addResumeLanguage: "Adicionar idioma do currículo",
  deleteResumeLanguage: "Eliminar idioma do currículo",
  createResumeLanguageTitle: "Novo idioma do currículo",
  resumeLanguageName: "Nome do idioma",
  resumeLanguageNamePlaceholder: "Por exemplo: Deutsch ou Serbian",
  createResumeLanguage: "Adicionar",
  fieldProgress: (completed, total) => `${completed}/${total}`,
  files: "Ficheiros",
  import: "Importar",
  export: "Exportar",
  importTargetTitle: "O que queres importar?",
  exportTargetTitle: "O que queres exportar?",
  importResume: (label) => `Importar ${label}`,
  exportResume: (label) => `Exportar ${label}`,
  reset: "Restaurar modelo",
  closeModal: "Fechar",
  generate: "Geração",
  pdfFileName: "Nome do ficheiro PDF",
  pdfFileNameHint:
    "Podes alterar o nome do ficheiro antes de o descarregar. A extensão .pdf será adicionada automaticamente.",
  generating: "A gerar PDF...",
  pdfTemplate: "Template PDF",
  pdfTemplateHint:
    "Clássico mantém a densidade atual. Compacto ajuda a encaixar mais conteúdo. Minimal cria mais respiro e simplifica a apresentação.",
  templateClassic: "Clássico",
  templateClassicDescription: "Layout base com um equilíbrio familiar entre densidade e acentos.",
  templateCompact: "Compacto",
  templateCompactDescription: "Disposição mais densa para versões longas do currículo.",
  templateMinimal: "Minimal",
  templateMinimalDescription: "Mais ar, cabeçalho mais calmo e apresentação mais limpa.",
  downloadPdf: (languageLabel) => `Descarregar PDF (${languageLabel})`,
  qualityTitle: "Verificação de qualidade",
  qualityDescription:
    "Checklist local para a versão atual do currículo: estrutura, completude, profundidade dos bullets e legibilidade geral.",
  snapshot: "Resumo",
  jobs: "Experiência",
  education: "Educação",
  skills: "Competências",
  addSkill: "Adicionar",
  skillsColumns: "Quantidade de colunas",
  addSkillRow: "Adicionar",
  removeEmptySkillRow: "Remover linha vazia",
  skillCell: (index) => `Competência ${index + 1}`,
  certificates: "Cursos e certificados",
  addCertificate: "Adicionar",
  certificateEntry: (index) => `${index + 1}.`,
  deleteCertificate: "Eliminar",
  hideEntry: "Ocultar",
  restoreEntry: "Restaurar",
  hiddenEducation: "Entradas ocultas de educação",
  hiddenEducationHelp: "Guardadas no JSON, mas excluídas do PDF",
  addHiddenEducation: "Adicionar",
  deleteHiddenEducation: "Eliminar",
  hiddenCertificates: "Entradas ocultas de cursos e certificados",
  hiddenCertificatesHelp: "Guardadas separadamente e excluídas do PDF",
  addHiddenCertificate: "Adicionar",
  deleteHiddenCertificate: "Eliminar",
  header: "Cabeçalho",
  role: "Função",
  contacts: "Contactos",
  addContact: "Adicionar",
  contact: (index) => `Contacto ${index + 1}`,
  deleteContact: "Eliminar",
  summary: "Sobre mim",
  sectionTitle: "Título da secção",
  summaryText: "Texto do resumo",
  experience: "Experiência",
  addJob: "Adicionar",
  job: (index) => `${index + 1}.`,
  removeJob: "Eliminar",
  moveUp: "Para cima",
  moveDown: "Para baixo",
  hideJob: "Ocultar",
  hiddenJobs: "Posições ocultas",
  hiddenJobsHelp: "Guardadas no JSON, mas não renderizadas no PDF",
  addHiddenJob: "Adicionar",
  restoreJob: "Restaurar",
  deleteHiddenJob: "Eliminar",
  hiddenBadge: "oculto",
  company: "Empresa",
  period: "Período",
  bullet: (index) => `${index + 1}.`,
  deleteBullet: "Eliminar",
  addBullet: "Adicionar",
  hideBullet: "Ocultar",
  restoreBullet: "Restaurar",
  hiddenBullets: "Pontos ocultos",
  hiddenBulletsHelp: "Não aparecem no PDF, mas permanecem no JSON",
  addHiddenBullet: "Adicionar",
  deleteHiddenBullet: "Eliminar",
  notes: "Notas",
  addEntry: "Adicionar",
  entry: (index) => `${index + 1}.`,
  deleteEntry: "Eliminar",
  languages: "Idiomas",
  addLanguage: "Adicionar",
  languageName: "Idioma",
  languageLevel: "Nível",
  deleteLanguage: "Eliminar",
  levelPlaceholder: "Seleciona o nível",
  column: (index) => `Coluna ${index + 1}`,
  statusReady: "Pronto. As alterações locais são guardadas no navegador.",
  loadedInto: (file, languageLabel) => `Importado para ${languageLabel}: ${file}.`,
  loaded: (file) => `Ficheiro importado: ${file}.`,
  failedImport: (file, error) => `Falha ao importar ${file}: ${error}`,
  downloaded: (file) => `Ficheiro descarregado: ${file}.`,
  resetConfirm:
    "Restaurar o editor para os dados do modelo? O estado local do navegador será substituído.",
  resetDone: "Os dados do modelo foram restaurados.",
  resumeLanguageAdded: (label) => `Idioma do currículo adicionado: ${label}.`,
  resumeLanguageExists: (label) => `O idioma do currículo já existe: ${label}.`,
  resumeLanguageDeleted: (label) => `Idioma do currículo eliminado: ${label}.`,
  cannotDeleteLastResumeLanguage: "Não podes eliminar o último idioma do currículo.",
  deleteResumeLanguageConfirm: (label) => `Eliminar o idioma do currículo "${label}"?`,
  pdfDownloaded: (filename) => `PDF guardado: ${filename}.`,
  pdfFailed: (error) => `Falha ao gerar o PDF: ${error}`,
  unknownError: "Erro desconhecido",
};

const srText: UIText = {
  ...enText,
  interfaceLanguage: "Језик апликације",
  interfaceLanguageMenuLabel: "Изабери језик апликације",
  switchToDarkTheme: "Укључи тамну тему",
  switchToLightTheme: "Укључи светлу тему",
  headerDescription: "Име, улога и контакти који ће ући у заглавље PDF-а.",
  summaryDescription:
    "Кратко позиционирање: стек, искуство, фокус и оно што тражиш.",
  experienceDescription:
    "Главна радна места, резултати, сакривене ставке и радне белешке.",
  educationDescription:
    "Основно образовање и додатни записи за ову верзију резимеа.",
  certificatesDescription:
    "Курсеви и сертификати које желиш да задржиш у овој верзији CV-а.",
  languagesDescription: "Језици и нивои за финални PDF блок.",
  skillsDescription:
    "Мрежа вештина у истом редоследу у ком ће ући у шаблон.",
  resumeLanguage: "Језици резимеа и напредак",
  resumeLanguageHint:
    "Кликни на језик да пребациш едитор на њега или додај нови помоћу +.",
  addResumeLanguage: "Додај језик резимеа",
  deleteResumeLanguage: "Обриши језик резимеа",
  createResumeLanguageTitle: "Нови језик резимеа",
  resumeLanguageName: "Назив језика",
  resumeLanguageNamePlaceholder: "На пример: Deutsch или Serbian",
  createResumeLanguage: "Додај",
  fieldProgress: (completed, total) => `${completed}/${total}`,
  files: "Датотеке",
  import: "Увези",
  export: "Извези",
  importTargetTitle: "Шта желиш да увезеш?",
  exportTargetTitle: "Шта желиш да извезеш?",
  importResume: (label) => `Увези ${label}`,
  exportResume: (label) => `Извези ${label}`,
  reset: "Врати шаблон",
  closeModal: "Затвори",
  generate: "Генерисање",
  pdfFileName: "Име PDF датотеке",
  pdfFileNameHint:
    "Можеш да промениш име датотеке пре преузимања. Екстензија .pdf ће бити додата аутоматски.",
  generating: "Генеришем PDF...",
  pdfTemplate: "PDF шаблон",
  pdfTemplateHint:
    "Класичан задржава тренутну густину. Компактан помаже да стане више садржаја. Минималистички додаје више ваздуха и мирнију презентацију.",
  templateClassic: "Класичан",
  templateClassicDescription: "Основни распоред са познатим балансом густине и акцената.",
  templateCompact: "Компактан",
  templateCompactDescription: "Гушћи распоред за дуже верзије резимеа.",
  templateMinimal: "Минималистички",
  templateMinimalDescription: "Више ваздуха, мирније заглавље и чистија презентација.",
  downloadPdf: (languageLabel) => `Преузми PDF (${languageLabel})`,
  qualityTitle: "Провера квалитета",
  qualityDescription:
    "Локална чек-листа за тренутну верзију резимеа: структура, потпуност, дубина bullets и општа читљивост.",
  snapshot: "Преглед",
  jobs: "Радна места",
  education: "Образовање",
  skills: "Вештине",
  addSkill: "Додај",
  skillsColumns: "Број колона",
  addSkillRow: "Додај",
  removeEmptySkillRow: "Уклони празан ред",
  skillCell: (index) => `Вештина ${index + 1}`,
  certificates: "Курсеви и сертификати",
  addCertificate: "Додај",
  certificateEntry: (index) => `${index + 1}.`,
  deleteCertificate: "Обриши",
  hideEntry: "Сакриј",
  restoreEntry: "Врати",
  hiddenEducation: "Сакривени записи образовања",
  hiddenEducationHelp: "Чувају се у JSON-у, али се не приказују у PDF-у",
  addHiddenEducation: "Додај",
  deleteHiddenEducation: "Обриши",
  hiddenCertificates: "Сакривени записи курсева и сертификата",
  hiddenCertificatesHelp: "Чувају се одвојено и не приказују се у PDF-у",
  addHiddenCertificate: "Додај",
  deleteHiddenCertificate: "Обриши",
  header: "Заглавље",
  name: "Име",
  role: "Улога",
  contacts: "Контакти",
  addContact: "Додај",
  contact: (index) => `Контакт ${index + 1}`,
  deleteContact: "Обриши",
  summary: "О мени",
  sectionTitle: "Наслов секције",
  summaryText: "Текст сажетка",
  experience: "Искуство",
  addJob: "Додај",
  job: (index) => `${index + 1}.`,
  removeJob: "Обриши",
  moveUp: "Горе",
  moveDown: "Доле",
  hideJob: "Сакриј",
  hiddenJobs: "Сакривена радна места",
  hiddenJobsHelp: "Чувају се у JSON-у, али се не рендерују у PDF",
  addHiddenJob: "Додај",
  restoreJob: "Врати",
  deleteHiddenJob: "Обриши",
  hiddenBadge: "сакривено",
  title: "Позиција",
  company: "Компанија",
  period: "Период",
  bullet: (index) => `${index + 1}.`,
  deleteBullet: "Обриши",
  addBullet: "Додај",
  hideBullet: "Сакриј",
  restoreBullet: "Врати",
  hiddenBullets: "Сакривене ставке",
  hiddenBulletsHelp: "Не улазе у PDF, али остају у JSON-у",
  addHiddenBullet: "Додај",
  deleteHiddenBullet: "Обриши",
  notes: "Белешке",
  addEntry: "Додај",
  entry: (index) => `${index + 1}.`,
  deleteEntry: "Обриши",
  languages: "Језици",
  addLanguage: "Додај",
  languageName: "Језик",
  languageLevel: "Ниво",
  deleteLanguage: "Обриши",
  levelPlaceholder: "Изабери ниво",
  column: (index) => `Колона ${index + 1}`,
  statusReady: "Спремно. Локалне измене се чувају у прегледачу.",
  loadedInto: (file, languageLabel) => `Увезено у ${languageLabel}: ${file}.`,
  loaded: (file) => `Увезена датотека: ${file}.`,
  failedImport: (file, error) => `Није успело увожење ${file}: ${error}`,
  downloaded: (file) => `Преузета датотека: ${file}.`,
  resetConfirm:
    "Вратити едитор на шаблонске податке? Локално стање у прегледачу биће замењено.",
  resetDone: "Шаблонски подаци су враћени.",
  resumeLanguageAdded: (label) => `Додат је језик резимеа: ${label}.`,
  resumeLanguageExists: (label) => `Језик резимеа већ постоји: ${label}.`,
  resumeLanguageDeleted: (label) => `Обрисан је језик резимеа: ${label}.`,
  cannotDeleteLastResumeLanguage: "Не можеш да обришеш последњи језик резимеа.",
  deleteResumeLanguageConfirm: (label) => `Обрисати језик резимеа „${label}“?`,
  pdfDownloaded: (filename) => `PDF је сачуван: ${filename}.`,
  pdfFailed: (error) => `Није успело генерисање PDF-а: ${error}`,
  unknownError: "Непозната грешка",
};

const frText: UIText = {
  ...enText,
  interfaceLanguage: "Langue de l'application",
  interfaceLanguageMenuLabel: "Choisir la langue de l'application",
  switchToDarkTheme: "Activer le thème sombre",
  switchToLightTheme: "Activer le thème clair",
  headerDescription: "Nom, rôle et contacts qui seront affichés dans l'en-tête du PDF.",
  summaryDescription:
    "Positionnement court : stack, expérience, focus et ce que tu recherches.",
  experienceDescription:
    "Principaux postes, réalisations, éléments masqués et notes de travail.",
  educationDescription:
    "Formation principale et entrées supplémentaires pour cette version du CV.",
  certificatesDescription:
    "Cours et certifications que tu veux conserver dans ce CV.",
  languagesDescription: "Langues et niveaux pour le bloc final du PDF.",
  skillsDescription:
    "Grille de compétences dans l'ordre où elles apparaîtront dans le modèle.",
  resumeLanguage: "Langues du CV et progression",
  resumeLanguageHint:
    "Clique sur une langue pour l'ouvrir dans l'éditeur, ou ajoute-en une nouvelle avec +.",
  addResumeLanguage: "Ajouter une langue de CV",
  duplicateResumeLanguage: "Dupliquer la langue du CV",
  renameResumeLanguage: "Renommer la langue du CV",
  deleteResumeLanguage: "Supprimer la langue du CV",
  createResumeLanguageTitle: "Nouvelle langue du CV",
  duplicateResumeLanguageTitle: "Dupliquer la langue du CV",
  renameResumeLanguageTitle: "Renommer la langue du CV",
  resumeLanguageName: "Nom de la langue",
  resumeLanguageNamePlaceholder: "Par exemple : Français ou Ukrainian",
  createResumeLanguage: "Ajouter",
  duplicateResumeLanguageConfirm: "Dupliquer",
  renameResumeLanguageConfirm: "Enregistrer",
  duplicateResumeLanguageDefaultName: (label) => `${label} copie`,
  files: "Fichiers",
  import: "Importer",
  export: "Exporter",
  importTargetTitle: "Que veux-tu importer ?",
  exportTargetTitle: "Que veux-tu exporter ?",
  importResume: (label) => `Importer ${label}`,
  importSkills: "Compétences",
  exportResume: (label) => `Exporter ${label}`,
  closeModal: "Fermer",
  generate: "Génération",
  pdfFileName: "Nom du fichier PDF",
  pdfFileNameHint:
    "Tu peux modifier le nom avant le téléchargement. L'extension .pdf sera ajoutée automatiquement.",
  generating: "Génération du PDF...",
  pdfTemplate: "Modèle PDF",
  pdfTemplateHint:
    "Classique garde la densité actuelle. Compact aide à faire tenir plus de contenu. Minimal ajoute de l'air et une présentation plus calme.",
  templateClassic: "Classique",
  templateClassicDescription: "Mise en page de base avec un équilibre familier entre densité et accents.",
  templateCompact: "Compact",
  templateCompactDescription: "Disposition plus dense pour les versions longues du CV.",
  templateMinimal: "Minimaliste",
  templateMinimalDescription: "Plus d'air, un en-tête plus calme et une présentation plus propre.",
  downloadPdf: (languageLabel) => `Télécharger le PDF (${languageLabel})`,
  qualityTitle: "Vérification qualité",
  qualityDescription:
    "Checklist locale pour la version actuelle du CV : structure, complétude, profondeur des bullets et lisibilité générale.",
  autosave: "Sauvegarde auto",
  autosaveSaved: "Enregistré localement",
  lastAction: "Dernière action",
  snapshot: "Aperçu",
  jobs: "Postes",
  education: "Formation",
  skills: "Compétences",
  addSkill: "Ajouter",
  skillsColumns: "Nombre de colonnes",
  addSkillRow: "Ajouter",
  removeEmptySkillRow: "Supprimer la ligne vide",
  skillCell: (index) => `Compétence ${index + 1}`,
  certificates: "Cours et certifications",
  addCertificate: "Ajouter",
  deleteCertificate: "Supprimer",
  hideEntry: "Masquer",
  restoreEntry: "Restaurer",
  hiddenEducation: "Entrées de formation masquées",
  hiddenEducationHelp: "Conservées dans le JSON mais exclues du PDF",
  addHiddenEducation: "Ajouter",
  deleteHiddenEducation: "Supprimer",
  hiddenCertificates: "Entrées de cours et certifications masquées",
  hiddenCertificatesHelp: "Conservées séparément et exclues du PDF",
  addHiddenCertificate: "Ajouter",
  deleteHiddenCertificate: "Supprimer",
  header: "En-tête",
  name: "Nom",
  role: "Rôle",
  contacts: "Contacts",
  addContact: "Ajouter",
  contact: (index) => `Contact ${index + 1}`,
  deleteContact: "Supprimer",
  summary: "À propos",
  sectionTitle: "Titre de la section",
  summaryText: "Texte du résumé",
  experience: "Expérience",
  addJob: "Ajouter",
  removeJob: "Supprimer",
  moveUp: "Monter",
  moveDown: "Descendre",
  dragToReorder: "Glisser pour réordonner",
  hideJob: "Masquer",
  hiddenJobs: "Postes masqués",
  hiddenJobsHelp: "Conservés dans le JSON mais non affichés dans le PDF",
  addHiddenJob: "Ajouter",
  restoreJob: "Restaurer",
  deleteHiddenJob: "Supprimer",
  hiddenBadge: "masqué",
  title: "Intitulé",
  company: "Entreprise",
  period: "Période",
  deleteBullet: "Supprimer",
  addBullet: "Ajouter",
  hideBullet: "Masquer",
  restoreBullet: "Restaurer",
  hiddenBullets: "Éléments masqués",
  hiddenBulletsHelp: "Exclus du PDF mais conservés dans le JSON",
  addHiddenBullet: "Ajouter",
  deleteHiddenBullet: "Supprimer",
  notes: "Notes",
  addEntry: "Ajouter",
  deleteEntry: "Supprimer",
  languages: "Langues",
  addLanguage: "Ajouter",
  languageName: "Langue",
  languageLevel: "Niveau",
  deleteLanguage: "Supprimer",
  levelPlaceholder: "Choisir un niveau",
  column: (index) => `Colonne ${index + 1}`,
  statusReady: "Prêt. Les modifications locales sont enregistrées dans le navigateur.",
  loadedInto: (file, languageLabel) => `Importé dans ${languageLabel} : ${file}.`,
  loaded: (file) => `Fichier importé : ${file}.`,
  failedImport: (file, error) => `Échec de l'import de ${file} : ${error}`,
  downloaded: (file) => `Fichier téléchargé : ${file}.`,
  resetConfirm:
    "Revenir aux données du modèle ? L'état local du navigateur sera remplacé.",
  resetDone: "Les données du modèle ont été restaurées.",
  resumeLanguageAdded: (label) => `Langue du CV ajoutée : ${label}.`,
  resumeLanguageDuplicated: (label) => `Langue du CV dupliquée : ${label}.`,
  resumeLanguageExists: (label) => `Cette langue du CV existe déjà : ${label}.`,
  resumeLanguageRenamed: (label) => `Langue du CV renommée : ${label}.`,
  resumeLanguageDeleted: (label) => `Langue du CV supprimée : ${label}.`,
  cannotDeleteLastResumeLanguage: "Impossible de supprimer la dernière langue du CV.",
  deleteResumeLanguageConfirm: (label) => `Supprimer la langue du CV « ${label} » ?`,
  pdfDownloaded: (filename) => `PDF enregistré : ${filename}.`,
  pdfFailed: (error) => `Impossible de générer le PDF : ${error}`,
  unknownError: "Erreur inconnue",
};

const plText: UIText = {
  ...enText,
  interfaceLanguage: "Język aplikacji",
  interfaceLanguageMenuLabel: "Wybierz język aplikacji",
  switchToDarkTheme: "Włącz ciemny motyw",
  switchToLightTheme: "Włącz jasny motyw",
  headerDescription: "Imię, rola i kontakty, które trafią do nagłówka PDF.",
  summaryDescription: "Krótki opis: stack, doświadczenie, fokus i to, czego szukasz.",
  experienceDescription: "Główne miejsca pracy, osiągnięcia, ukryte elementy i notatki.",
  educationDescription: "Główne wykształcenie i dodatkowe wpisy dla tej wersji CV.",
  certificatesDescription: "Kursy i certyfikaty, które chcesz przechowywać w tym CV.",
  languagesDescription: "Języki i poziomy do końcowego bloku w PDF.",
  skillsDescription: "Siatka umiejętności w kolejności, w jakiej trafi do szablonu.",
  resumeLanguage: "Języki CV i postęp",
  resumeLanguageHint:
    "Kliknij język, aby przełączyć edytor, albo dodaj nowy przez +.",
  addResumeLanguage: "Dodaj język CV",
  duplicateResumeLanguage: "Duplikuj język CV",
  renameResumeLanguage: "Zmień nazwę języka CV",
  deleteResumeLanguage: "Usuń język CV",
  createResumeLanguageTitle: "Nowy język CV",
  duplicateResumeLanguageTitle: "Duplikuj język CV",
  renameResumeLanguageTitle: "Zmień nazwę języka CV",
  resumeLanguageName: "Nazwa języka",
  resumeLanguageNamePlaceholder: "Na przykład: Polski albo French",
  createResumeLanguage: "Dodaj",
  duplicateResumeLanguageConfirm: "Duplikuj",
  renameResumeLanguageConfirm: "Zapisz",
  duplicateResumeLanguageDefaultName: (label) => `${label} kopia`,
  files: "Pliki",
  import: "Import",
  export: "Eksport",
  importTargetTitle: "Co chcesz zaimportować?",
  exportTargetTitle: "Co chcesz wyeksportować?",
  importResume: (label) => `Importuj ${label}`,
  importSkills: "Umiejętności",
  exportResume: (label) => `Eksportuj ${label}`,
  closeModal: "Zamknij",
  generate: "Generowanie",
  pdfFileName: "Nazwa pliku PDF",
  pdfFileNameHint:
    "Możesz zmienić nazwę przed pobraniem. Rozszerzenie .pdf zostanie dodane automatycznie.",
  generating: "Generuję PDF...",
  pdfTemplate: "Szablon PDF",
  pdfTemplateHint:
    "Klasyczny zachowuje obecną gęstość. Kompaktowy pomaga zmieścić więcej treści. Minimalistyczny dodaje więcej oddechu i prostszą prezentację.",
  templateClassic: "Klasyczny",
  templateClassicDescription: "Bazowy układ z oswojonym balansem gęstości i akcentów.",
  templateCompact: "Kompaktowy",
  templateCompactDescription: "Gęstszy układ dla dłuższych wersji CV.",
  templateMinimal: "Minimalistyczny",
  templateMinimalDescription: "Więcej przestrzeni, spokojniejszy nagłówek i czystsza prezentacja.",
  downloadPdf: (languageLabel) => `Pobierz PDF (${languageLabel})`,
  qualityTitle: "Kontrola jakości",
  qualityDescription:
    "Lokalna checklista dla bieżącej wersji CV: struktura, kompletność, głębia bulletów i ogólna czytelność.",
  autosave: "Autozapis",
  autosaveSaved: "Zapisano lokalnie",
  lastAction: "Ostatnia akcja",
  snapshot: "Podsumowanie",
  jobs: "Miejsca pracy",
  education: "Edukacja",
  skills: "Umiejętności",
  addSkill: "Dodaj",
  skillsColumns: "Liczba kolumn",
  addSkillRow: "Dodaj",
  removeEmptySkillRow: "Usuń pusty wiersz",
  skillCell: (index) => `Umiejętność ${index + 1}`,
  certificates: "Kursy i certyfikaty",
  addCertificate: "Dodaj",
  deleteCertificate: "Usuń",
  hideEntry: "Ukryj",
  restoreEntry: "Przywróć",
  hiddenEducation: "Ukryte wpisy edukacji",
  hiddenEducationHelp: "Pozostają w JSON, ale nie trafiają do PDF",
  addHiddenEducation: "Dodaj",
  deleteHiddenEducation: "Usuń",
  hiddenCertificates: "Ukryte wpisy kursów i certyfikatów",
  hiddenCertificatesHelp: "Przechowywane osobno i wykluczone z PDF",
  addHiddenCertificate: "Dodaj",
  deleteHiddenCertificate: "Usuń",
  header: "Nagłówek",
  name: "Imię",
  role: "Rola",
  contacts: "Kontakty",
  addContact: "Dodaj",
  contact: (index) => `Kontakt ${index + 1}`,
  deleteContact: "Usuń",
  summary: "O mnie",
  sectionTitle: "Tytuł sekcji",
  summaryText: "Tekst podsumowania",
  experience: "Doświadczenie",
  addJob: "Dodaj",
  removeJob: "Usuń",
  moveUp: "W górę",
  moveDown: "W dół",
  dragToReorder: "Przeciągnij, aby zmienić kolejność",
  hideJob: "Ukryj",
  hiddenJobs: "Ukryte miejsca pracy",
  hiddenJobsHelp: "Pozostają w JSON, ale nie są renderowane w PDF",
  addHiddenJob: "Dodaj",
  restoreJob: "Przywróć",
  deleteHiddenJob: "Usuń",
  hiddenBadge: "ukryte",
  title: "Stanowisko",
  company: "Firma",
  period: "Okres",
  deleteBullet: "Usuń",
  addBullet: "Dodaj",
  hideBullet: "Ukryj",
  restoreBullet: "Przywróć",
  hiddenBullets: "Ukryte punkty",
  hiddenBulletsHelp: "Nie trafiają do PDF, ale zostają w JSON",
  addHiddenBullet: "Dodaj",
  deleteHiddenBullet: "Usuń",
  notes: "Notatki",
  addEntry: "Dodaj",
  deleteEntry: "Usuń",
  languages: "Języki",
  addLanguage: "Dodaj",
  languageName: "Język",
  languageLevel: "Poziom",
  deleteLanguage: "Usuń",
  levelPlaceholder: "Wybierz poziom",
  column: (index) => `Kolumna ${index + 1}`,
  statusReady: "Gotowe. Lokalne zmiany są zapisywane w przeglądarce.",
  loadedInto: (file, languageLabel) => `Zaimportowano do ${languageLabel}: ${file}.`,
  loaded: (file) => `Zaimportowano plik: ${file}.`,
  failedImport: (file, error) => `Nie udało się zaimportować ${file}: ${error}`,
  downloaded: (file) => `Pobrano plik: ${file}.`,
  resetConfirm:
    "Przywrócić dane szablonu? Lokalny stan w przeglądarce zostanie zastąpiony.",
  resetDone: "Dane szablonu zostały przywrócone.",
  resumeLanguageAdded: (label) => `Dodano język CV: ${label}.`,
  resumeLanguageDuplicated: (label) => `Zduplikowano język CV: ${label}.`,
  resumeLanguageExists: (label) => `Taki język CV już istnieje: ${label}.`,
  resumeLanguageRenamed: (label) => `Zmieniono nazwę języka CV: ${label}.`,
  resumeLanguageDeleted: (label) => `Usunięto język CV: ${label}.`,
  cannotDeleteLastResumeLanguage: "Nie możesz usunąć ostatniego języka CV.",
  deleteResumeLanguageConfirm: (label) => `Usunąć język CV „${label}”?`,
  pdfDownloaded: (filename) => `PDF zapisany: ${filename}.`,
  pdfFailed: (error) => `Nie udało się wygenerować PDF: ${error}`,
  unknownError: "Nieznany błąd",
};

const ukText: UIText = {
  ...enText,
  interfaceLanguage: "Мова застосунку",
  interfaceLanguageMenuLabel: "Вибрати мову застосунку",
  switchToDarkTheme: "Увімкнути темну тему",
  switchToLightTheme: "Увімкнути світлу тему",
  headerDescription: "Ім’я, роль і контакти, які потраплять у шапку PDF.",
  summaryDescription: "Коротке позиціонування: стек, досвід, фокус і те, що ти шукаєш.",
  experienceDescription: "Основні місця роботи, досягнення, приховані пункти та нотатки.",
  educationDescription: "Основна освіта й додаткові записи для цієї версії резюме.",
  certificatesDescription: "Курси й сертифікати, які ти хочеш зберігати в цьому CV.",
  languagesDescription: "Мови та рівні володіння для фінального блоку в PDF.",
  skillsDescription: "Сітка навичок у тому порядку, у якому вони потраплять у шаблон.",
  resumeLanguage: "Мови резюме та прогрес",
  resumeLanguageHint:
    "Натисни на мову, щоб переключити редактор, або додай нову через +.",
  addResumeLanguage: "Додати мову резюме",
  duplicateResumeLanguage: "Дублювати мову резюме",
  renameResumeLanguage: "Перейменувати мову резюме",
  deleteResumeLanguage: "Видалити мову резюме",
  createResumeLanguageTitle: "Нова мова резюме",
  duplicateResumeLanguageTitle: "Дублювати мову резюме",
  renameResumeLanguageTitle: "Перейменувати мову резюме",
  resumeLanguageName: "Назва мови",
  resumeLanguageNamePlaceholder: "Наприклад: Français або Polish",
  createResumeLanguage: "Додати",
  duplicateResumeLanguageConfirm: "Дублювати",
  renameResumeLanguageConfirm: "Зберегти",
  duplicateResumeLanguageDefaultName: (label) => `${label} копія`,
  files: "Файли",
  import: "Імпорт",
  export: "Експорт",
  importTargetTitle: "Що імпортувати?",
  exportTargetTitle: "Що експортувати?",
  importResume: (label) => `Імпортувати ${label}`,
  importSkills: "Навички",
  exportResume: (label) => `Експортувати ${label}`,
  closeModal: "Закрити",
  generate: "Генерація",
  pdfFileName: "Назва PDF-файлу",
  pdfFileNameHint:
    "Можна змінити назву перед завантаженням. Розширення .pdf додасться автоматично.",
  generating: "Генерую PDF...",
  pdfTemplate: "PDF-шаблон",
  pdfTemplateHint:
    "Класичний зберігає поточну щільність. Компактний допомагає вмістити більше контенту. Мінімалістичний додає більше повітря й спокійнішу подачу.",
  templateClassic: "Класичний",
  templateClassicDescription: "Базова верстка зі звичним балансом щільності та акцентів.",
  templateCompact: "Компактний",
  templateCompactDescription: "Щільніший макет для довших версій резюме.",
  templateMinimal: "Мінімалістичний",
  templateMinimalDescription: "Більше повітря, спокійніша шапка та чистіша подача.",
  downloadPdf: (languageLabel) => `Завантажити PDF (${languageLabel})`,
  qualityTitle: "Перевірка якості",
  qualityDescription:
    "Локальний чек-лист для поточної версії резюме: структура, повнота, глибина bullets і загальна читабельність.",
  autosave: "Автозбереження",
  autosaveSaved: "Збережено локально",
  lastAction: "Остання дія",
  snapshot: "Зведення",
  jobs: "Місця роботи",
  education: "Освіта",
  skills: "Навички",
  addSkill: "Додати",
  skillsColumns: "Кількість колонок",
  addSkillRow: "Додати",
  removeEmptySkillRow: "Прибрати порожній рядок",
  skillCell: (index) => `Навичка ${index + 1}`,
  certificates: "Курси та сертифікати",
  addCertificate: "Додати",
  deleteCertificate: "Видалити",
  hideEntry: "Сховати",
  restoreEntry: "Відновити",
  hiddenEducation: "Приховані записи освіти",
  hiddenEducationHelp: "Зберігаються в JSON, але не потрапляють у PDF",
  addHiddenEducation: "Додати",
  deleteHiddenEducation: "Видалити",
  hiddenCertificates: "Приховані записи курсів і сертифікатів",
  hiddenCertificatesHelp: "Зберігаються окремо й не потрапляють у PDF",
  addHiddenCertificate: "Додати",
  deleteHiddenCertificate: "Видалити",
  header: "Шапка",
  name: "Ім’я",
  role: "Роль",
  contacts: "Контакти",
  addContact: "Додати",
  contact: (index) => `Контакт ${index + 1}`,
  deleteContact: "Видалити",
  summary: "Про мене",
  sectionTitle: "Заголовок секції",
  summaryText: "Текст summary",
  experience: "Досвід",
  addJob: "Додати",
  removeJob: "Видалити",
  moveUp: "Вгору",
  moveDown: "Вниз",
  dragToReorder: "Перетягни для зміни порядку",
  hideJob: "Сховати",
  hiddenJobs: "Приховані місця роботи",
  hiddenJobsHelp: "Зберігаються в JSON, але не рендеряться у PDF",
  addHiddenJob: "Додати",
  restoreJob: "Відновити",
  deleteHiddenJob: "Видалити",
  hiddenBadge: "приховано",
  title: "Посада",
  company: "Компанія",
  period: "Період",
  deleteBullet: "Видалити",
  addBullet: "Додати",
  hideBullet: "Сховати",
  restoreBullet: "Відновити",
  hiddenBullets: "Приховані пункти",
  hiddenBulletsHelp: "Не потрапляють у PDF, але залишаються в JSON",
  addHiddenBullet: "Додати",
  deleteHiddenBullet: "Видалити",
  notes: "Нотатки",
  addEntry: "Додати",
  deleteEntry: "Видалити",
  languages: "Мови",
  addLanguage: "Додати",
  languageName: "Мова",
  languageLevel: "Рівень",
  deleteLanguage: "Видалити",
  levelPlaceholder: "Обери рівень",
  column: (index) => `Колонка ${index + 1}`,
  statusReady: "Готово. Локальні зміни зберігаються у браузері.",
  loadedInto: (file, languageLabel) => `Імпортовано в ${languageLabel}: ${file}.`,
  loaded: (file) => `Імпортовано файл: ${file}.`,
  failedImport: (file, error) => `Не вдалося імпортувати ${file}: ${error}`,
  downloaded: (file) => `Завантажено файл: ${file}.`,
  resetConfirm:
    "Повернути дані шаблону? Локальний стан у браузері буде замінено.",
  resetDone: "Шаблонні дані відновлено.",
  resumeLanguageAdded: (label) => `Додано мову резюме: ${label}.`,
  resumeLanguageDuplicated: (label) => `Дубльовано мову резюме: ${label}.`,
  resumeLanguageExists: (label) => `Така мова резюме вже існує: ${label}.`,
  resumeLanguageRenamed: (label) => `Мову резюме перейменовано: ${label}.`,
  resumeLanguageDeleted: (label) => `Мову резюме видалено: ${label}.`,
  cannotDeleteLastResumeLanguage: "Не можна видалити останню мову резюме.",
  deleteResumeLanguageConfirm: (label) => `Видалити мову резюме «${label}»?`,
  pdfDownloaded: (filename) => `PDF збережено: ${filename}.`,
  pdfFailed: (error) => `Не вдалося згенерувати PDF: ${error}`,
  unknownError: "Невідома помилка",
};

const featureTextOverrides = {
  de: {
    workspace: "Modi",
    navEditor: "Editor",
    navVersions: "Versionen",
    navVacancy: "Stelle",
    navPreview: "Vorschau",
    navControl: "Verwaltung",
    duplicateResumeLanguage: "Sprache des Lebenslaufs duplizieren",
    renameResumeLanguage: "Sprache des Lebenslaufs umbenennen",
    duplicateResumeLanguageTitle: "Sprache des Lebenslaufs duplizieren",
    renameResumeLanguageTitle: "Sprache des Lebenslaufs umbenennen",
    duplicateResumeLanguageConfirm: "Duplizieren",
    renameResumeLanguageConfirm: "Speichern",
    duplicateResumeLanguageDefaultName: (label: string) => `${label} Kopie`,
    versionsTitle: "Versionen und Presets",
    versionsDescription:
      "Speichere benannte Snapshots des aktuellen Lebenslaufs, um schnell zwischen der Basisversion und Anpassungen für konkrete Stellen zu wechseln.",
    saveVersion: "Version speichern",
    saveVersionTitle: "Aktuelle Version speichern",
    saveVersionConfirm: "Speichern",
    renameVersionTitle: "Version umbenennen",
    renameVersionConfirm: "Speichern",
    versionName: "Versionsname",
    versionNamePlaceholder: "Zum Beispiel: Deutschland Frontend / Startup",
    versionDefaultName: (label: string) => `${label} Basis`,
    activeResumeLanguage: "Aktive Sprache des Lebenslaufs",
    applyVersion: "Anwenden",
    overwriteVersion: "Überschreiben",
    renameVersion: "Umbenennen",
    deleteVersion: "Löschen",
    deleteVersionConfirm: (label: string) => `Version „${label}“ löschen?`,
    overwriteVersionConfirm: (label: string) =>
      `Version „${label}“ mit dem aktuellen Stand des Editors überschreiben?`,
    versionUpdatedAt: (value: string) => `Aktualisiert: ${value}`,
    noVersionsTitle: "Noch keine gespeicherten Versionen",
    noVersionsDescription:
      "Speichere die aktuelle Konfiguration als Preset und verwende sie als Ausgangspunkt für verschiedene Rollen oder Unternehmen.",
    versionsCompareTitle: "Versionsvergleich",
    versionsCompareDescription:
      "Vergleiche zwei gespeicherte Versionen und prüfe schnell, was sich in Struktur, Erfahrung, Skills und PDF-Einstellungen geändert hat.",
    compareSourceVersion: "Ausgangsversion",
    compareTargetVersion: "Vergleichen mit",
    versionDiffChanged: "Geändert",
    versionDiffSkillsAdded: "Skills hinzugefügt",
    versionDiffSkillsRemoved: "Skills entfernt",
    versionDiffChangedSections: "Geänderte Bereiche",
    versionDiffAddedJobs: "Hinzugefügte Positionen",
    versionDiffRemovedJobs: "Entfernte Positionen",
    versionDiffUpdatedJobs: "Aktualisierte Positionen",
    versionDiffNoChangesTitle: "Keine sichtbaren Unterschiede",
    versionDiffNoChangesDescription:
      "Zwischen den ausgewählten Versionen sind bisher keine deutlichen Unterschiede zu sehen.",
    vacancyTitle: "Stellenmodus",
    vacancyDescription:
      "Füge eine Stellenbeschreibung ein und prüfe schnell, welche Schlüsselwörter bereits vom aktuellen Lebenslauf abgedeckt werden und welche noch verstärkt werden sollten.",
    vacancyRole: "Rolle / Stellentitel",
    vacancyCompany: "Unternehmen",
    vacancyCoverage: "Abdeckung",
    vacancyInput: "Text der Stelle",
    vacancyInputHint:
      "Füge hier die vollständige Stellenbeschreibung ein. Der Abgleich wird mit der aktuell aktiven Version des Lebenslaufs berechnet.",
    vacancyNotes: "Notizen zur Stelle",
    vacancyExtractedKeywords: "Extrahierte Schlüsselwörter",
    vacancyMatchedKeywords: "Bereits abgedeckt",
    vacancyMissingKeywords: "Sollte verstärkt werden",
    vacancyNoMatches: "Noch keine eindeutigen Treffer.",
    vacancyAllKeywordsCovered: "Die wichtigsten Begriffe wirken abgedeckt.",
    vacancyEmptyTitle: "Noch nichts zu analysieren",
    vacancyEmptyDescription:
      "Füge eine Rolle hinzu oder kopiere den Text der Stelle ein. Diese Seite zeigt dann Treffer, Lücken und Empfehlungen.",
    vacancySuggestions: "Was ich verstärken würde",
    vacancySuggestionKeywords:
      "Fehlende Stack-Schlüsselwörter im Summary, im Skills-Block oder in passenden Experience-Bullets ergänzen.",
    vacancySuggestionLeadership:
      "Ownership, Mentoring, Code Review oder Architekturentscheidungen hervorheben, wenn die Rolle Senior-Signale erwartet.",
    vacancySuggestionScale:
      "Mehr technische Tiefe zu Performance, Integrationen, Skalierung oder System Design ergänzen.",
    vacancySuggestionStrong:
      "Die Abdeckung sieht bereits stark aus. Jetzt reicht es, die Formulierungen der Stelle in ein oder zwei Bullets gezielt zu spiegeln.",
    controlTitle: "Dateien, Export und Überblick",
    controlDescription:
      "Eigener Modus für Import und Export der Daten, PDF-Generierung und einen schnellen Überblick über die aktuelle Version des Lebenslaufs.",
    filesDescription:
      "Import lädt JSON-Daten zurück in den Editor, während Export die aktuelle Version des Lebenslaufs und die Skills in externe Dateien speichert.",
    controlStateTitle: "Status der aktuellen Version",
    controlStateDescription:
      "Du arbeitest mit der aktiven Sprache des Lebenslaufs. Hier kannst du den PDF-Dateinamen prüfen, den Autosave sehen und die Datei herunterladen.",
    controlSummaryTitle: "Überblick der aktuellen Version",
    controlSummaryDescription:
      "Anzahl der ausgefüllten Elemente im aktiven Lebenslauf: Kontakte, Erfahrung, Ausbildung, Zertifikate, Sprachen und Skills.",
    previewTitle: "PDF-Vorschau",
    previewDescription:
      "Ein eigener Bildschirm, um das finale Layout schnell zu prüfen, das Template zu wechseln und die aktuelle Version des Lebenslaufs zu exportieren.",
    previewRefresh: "Jetzt aktualisieren",
    previewOpenInNewTab: "Separat öffnen",
    previewExpand: "Vorschau vergrößern",
    previewRefreshing: "Vorschau wird aktualisiert...",
    previewUpdatedAt: (value: string) => `Letzte Aktualisierung: ${value}`,
    previewWaiting: "Warte auf das erste PDF-Rendering...",
    previewFrameTitle: "PDF-Vorschau",
    previewWaitingTitle: "Vorschau wird vorbereitet",
    previewWaitingDescription: "Nach dem ersten Render erscheint hier das eingebettete PDF.",
    previewError: (error: string) => `Vorschau konnte nicht aktualisiert werden: ${error}`,
    versionSaved: (label: string) => `Version gespeichert: ${label}.`,
    versionRenamed: (label: string) => `Version umbenannt: ${label}.`,
    versionApplied: (label: string) => `Version angewendet: ${label}.`,
    versionDeleted: (label: string) => `Version gelöscht: ${label}.`,
    versionOverwritten: (label: string) => `Version aktualisiert: ${label}.`,
  },
  es: {
    workspace: "Modos",
    navEditor: "Editor",
    navVersions: "Versiones",
    navVacancy: "Vacante",
    navPreview: "Vista previa",
    navControl: "Control",
    duplicateResumeLanguage: "Duplicar idioma del CV",
    renameResumeLanguage: "Renombrar idioma del CV",
    duplicateResumeLanguageTitle: "Duplicar idioma del CV",
    renameResumeLanguageTitle: "Renombrar idioma del CV",
    duplicateResumeLanguageConfirm: "Duplicar",
    renameResumeLanguageConfirm: "Guardar",
    duplicateResumeLanguageDefaultName: (label: string) => `${label} copia`,
    versionsTitle: "Versiones y presets",
    versionsDescription:
      "Guarda snapshots con nombre del CV actual para cambiar rápido entre la versión base y adaptaciones para vacantes concretas.",
    saveVersion: "Guardar versión",
    saveVersionTitle: "Guardar versión actual",
    saveVersionConfirm: "Guardar",
    renameVersionTitle: "Renombrar versión",
    renameVersionConfirm: "Guardar",
    versionName: "Nombre de la versión",
    versionNamePlaceholder: "Por ejemplo: Alemania frontend / Startup",
    versionDefaultName: (label: string) => `${label} base`,
    activeResumeLanguage: "Idioma activo del CV",
    applyVersion: "Aplicar",
    overwriteVersion: "Sobrescribir",
    renameVersion: "Renombrar",
    deleteVersion: "Eliminar",
    deleteVersionConfirm: (label: string) => `¿Eliminar la versión "${label}"?`,
    overwriteVersionConfirm: (label: string) =>
      `¿Sobrescribir la versión "${label}" con el estado actual del editor?`,
    versionUpdatedAt: (value: string) => `Actualizado: ${value}`,
    noVersionsTitle: "Todavía no hay versiones guardadas",
    noVersionsDescription:
      "Guarda la configuración actual como preset y reutilízala como punto de partida para distintos puestos o empresas.",
    versionsCompareTitle: "Diferencia entre versiones",
    versionsCompareDescription:
      "Compara dos versiones guardadas y mira rápido qué cambió en estructura, experiencia, skills y ajustes del PDF.",
    compareSourceVersion: "Versión base",
    compareTargetVersion: "Comparar con",
    versionDiffChanged: "Cambios",
    versionDiffSkillsAdded: "Skills añadidas",
    versionDiffSkillsRemoved: "Skills eliminadas",
    versionDiffChangedSections: "Secciones modificadas",
    versionDiffAddedJobs: "Experiencias añadidas",
    versionDiffRemovedJobs: "Experiencias eliminadas",
    versionDiffUpdatedJobs: "Experiencias actualizadas",
    versionDiffNoChangesTitle: "No hay cambios visibles",
    versionDiffNoChangesDescription:
      "Entre las versiones elegidas todavía no se ven diferencias importantes.",
    vacancyTitle: "Modo vacante",
    vacancyDescription:
      "Pega una vacante y comprueba rápido qué palabras clave ya cubre el CV actual y cuáles conviene reforzar.",
    vacancyRole: "Rol / puesto",
    vacancyCompany: "Empresa",
    vacancyCoverage: "Cobertura",
    vacancyInput: "Texto de la vacante",
    vacancyInputHint:
      "Pega aquí el texto completo de la vacante. La coincidencia se calcula con la versión activa del CV.",
    vacancyNotes: "Notas sobre la vacante",
    vacancyExtractedKeywords: "Palabras clave extraídas",
    vacancyMatchedKeywords: "Ya cubiertas",
    vacancyMissingKeywords: "Conviene reforzar",
    vacancyNoMatches: "Todavía no hay coincidencias claras.",
    vacancyAllKeywordsCovered: "Los términos clave parecen cubiertos.",
    vacancyEmptyTitle: "Aún no hay nada que analizar",
    vacancyEmptyDescription:
      "Añade un rol o pega el texto de la vacante y esta página mostrará coincidencias, huecos y sugerencias.",
    vacancySuggestions: "Qué reforzaría",
    vacancySuggestionKeywords:
      "Añade las palabras clave del stack que faltan al summary, a habilidades o a los bullets de experiencia relevantes.",
    vacancySuggestionLeadership:
      "Destaca ownership, mentoring, code review o decisiones de arquitectura si la vacante espera señales senior.",
    vacancySuggestionScale:
      "Añade más profundidad técnica sobre rendimiento, integraciones, escala o system design.",
    vacancySuggestionStrong:
      "La cobertura ya se ve fuerte. En este punto basta con reflejar el lenguaje de la vacante en uno o dos bullets.",
    controlTitle: "Archivos, exportación y resumen",
    controlDescription:
      "Modo dedicado para importar y exportar datos, generar PDF y revisar de un vistazo la versión actual del CV.",
    filesDescription:
      "Importar devuelve los datos JSON al editor, mientras que exportar guarda la versión actual del CV y las skills en archivos externos.",
    controlStateTitle: "Estado de la versión actual",
    controlStateDescription:
      "Estás trabajando con el idioma activo del CV. Aquí puedes revisar el nombre del PDF, el autosave y descargar el archivo.",
    controlSummaryTitle: "Resumen de la versión actual",
    controlSummaryDescription:
      "Cantidad de entidades completadas en el CV activo: contactos, experiencia, educación, certificados, idiomas y habilidades.",
    previewTitle: "Vista previa PDF",
    previewDescription:
      "Pantalla dedicada para revisar rápidamente la maquetación final, cambiar la plantilla y exportar la versión actual del CV.",
    previewRefresh: "Actualizar ahora",
    previewOpenInNewTab: "Abrir aparte",
    previewExpand: "Ampliar vista previa",
    previewRefreshing: "Actualizando vista previa...",
    previewUpdatedAt: (value: string) => `Última actualización: ${value}`,
    previewWaiting: "Esperando el primer render del PDF...",
    previewFrameTitle: "Vista previa PDF",
    previewWaitingTitle: "La vista previa se está preparando",
    previewWaitingDescription: "El PDF incrustado aparecerá aquí después del primer render.",
    previewError: (error: string) => `No se pudo actualizar la vista previa: ${error}`,
    versionSaved: (label: string) => `Versión guardada: ${label}.`,
    versionRenamed: (label: string) => `Versión renombrada: ${label}.`,
    versionApplied: (label: string) => `Versión aplicada: ${label}.`,
    versionDeleted: (label: string) => `Versión eliminada: ${label}.`,
    versionOverwritten: (label: string) => `Versión actualizada: ${label}.`,
  },
  it: {
    workspace: "Modalità",
    navEditor: "Editor",
    navVersions: "Versioni",
    navVacancy: "Vacancy",
    navPreview: "Anteprima",
    navControl: "Controllo",
    duplicateResumeLanguage: "Duplica lingua del CV",
    renameResumeLanguage: "Rinomina lingua del CV",
    duplicateResumeLanguageTitle: "Duplica lingua del CV",
    renameResumeLanguageTitle: "Rinomina lingua del CV",
    duplicateResumeLanguageConfirm: "Duplica",
    renameResumeLanguageConfirm: "Salva",
    duplicateResumeLanguageDefaultName: (label: string) => `${label} copia`,
    versionsTitle: "Versioni e preset",
    versionsDescription:
      "Salva snapshot con nome del CV corrente per passare rapidamente tra la versione base e gli adattamenti per vacancy specifiche.",
    saveVersion: "Salva versione",
    saveVersionTitle: "Salva versione corrente",
    saveVersionConfirm: "Salva",
    renameVersionTitle: "Rinomina versione",
    renameVersionConfirm: "Salva",
    versionName: "Nome della versione",
    versionNamePlaceholder: "Per esempio: Germania frontend / Startup",
    versionDefaultName: (label: string) => `${label} base`,
    activeResumeLanguage: "Lingua attiva del CV",
    applyVersion: "Applica",
    overwriteVersion: "Sovrascrivi",
    renameVersion: "Rinomina",
    deleteVersion: "Elimina",
    deleteVersionConfirm: (label: string) => `Eliminare la versione "${label}"?`,
    overwriteVersionConfirm: (label: string) =>
      `Sovrascrivere la versione "${label}" con lo stato attuale dell'editor?`,
    versionUpdatedAt: (value: string) => `Aggiornata: ${value}`,
    noVersionsTitle: "Nessuna versione salvata",
    noVersionsDescription:
      "Salva la configurazione corrente come preset e riusala come punto di partenza per ruoli o aziende diversi.",
    versionsCompareTitle: "Differenza tra versioni",
    versionsCompareDescription:
      "Confronta due versioni salvate e vedi rapidamente cosa è cambiato in struttura, esperienza, skills e impostazioni PDF.",
    compareSourceVersion: "Versione di partenza",
    compareTargetVersion: "Confronta con",
    versionDiffChanged: "Modifiche",
    versionDiffSkillsAdded: "Skills aggiunte",
    versionDiffSkillsRemoved: "Skills rimosse",
    versionDiffChangedSections: "Sezioni modificate",
    versionDiffAddedJobs: "Esperienze aggiunte",
    versionDiffRemovedJobs: "Esperienze rimosse",
    versionDiffUpdatedJobs: "Esperienze aggiornate",
    versionDiffNoChangesTitle: "Nessuna differenza evidente",
    versionDiffNoChangesDescription:
      "Tra le versioni selezionate non si vedono ancora differenze significative.",
    vacancyTitle: "Modalità vacancy",
    vacancyDescription:
      "Incolla una vacancy e controlla rapidamente quali keyword sono già coperte dal CV corrente e quali conviene rafforzare.",
    vacancyRole: "Ruolo / job title",
    vacancyCompany: "Azienda",
    vacancyCoverage: "Copertura",
    vacancyInput: "Testo della vacancy",
    vacancyInputHint:
      "Incolla qui il testo completo della vacancy. Il matching viene calcolato rispetto alla versione attiva del CV.",
    vacancyNotes: "Note sulla vacancy",
    vacancyExtractedKeywords: "Keyword estratte",
    vacancyMatchedKeywords: "Già coperte",
    vacancyMissingKeywords: "Da rafforzare",
    vacancyNoMatches: "Ancora nessuna corrispondenza evidente.",
    vacancyAllKeywordsCovered: "I termini chiave sembrano coperti.",
    vacancyEmptyTitle: "Ancora niente da analizzare",
    vacancyEmptyDescription:
      "Aggiungi un ruolo o incolla il testo della vacancy e questa pagina mostrerà match, gap e suggerimenti.",
    vacancySuggestions: "Cosa rafforzerei",
    vacancySuggestionKeywords:
      "Aggiungi le keyword mancanti dello stack nel summary, nelle skills o nei bullet di esperienza più rilevanti.",
    vacancySuggestionLeadership:
      "Evidenzia ownership, mentoring, code review o decisioni architetturali se il ruolo richiede segnali senior.",
    vacancySuggestionScale:
      "Aggiungi più profondità tecnica su performance, integrazioni, scala o system design.",
    vacancySuggestionStrong:
      "La copertura sembra già forte. A questo punto basta rispecchiare il wording della vacancy in uno o due bullet.",
    controlTitle: "File, export e panoramica",
    controlDescription:
      "Modalità dedicata all'import/export dei dati, alla generazione del PDF e a una panoramica rapida della versione corrente del CV.",
    filesDescription:
      "Importa riporta i dati JSON nell'editor, mentre esporta salva la versione corrente del CV e le skills in file esterni.",
    controlStateTitle: "Stato della versione corrente",
    controlStateDescription:
      "Stai lavorando con la lingua attiva del CV. Qui puoi controllare il nome del PDF, l'autosave e scaricare il file.",
    controlSummaryTitle: "Panoramica della versione corrente",
    controlSummaryDescription:
      "Numero di entità compilate nel CV attivo: contatti, esperienza, istruzione, certificati, lingue e competenze.",
    previewTitle: "Anteprima PDF",
    previewDescription:
      "Schermata dedicata per controllare rapidamente il layout finale, cambiare template ed esportare la versione corrente del CV.",
    previewRefresh: "Aggiorna ora",
    previewOpenInNewTab: "Apri separatamente",
    previewExpand: "Espandi anteprima",
    previewRefreshing: "Aggiornamento anteprima...",
    previewUpdatedAt: (value: string) => `Ultimo aggiornamento: ${value}`,
    previewWaiting: "In attesa del primo render del PDF...",
    previewFrameTitle: "Anteprima PDF",
    previewWaitingTitle: "Anteprima in preparazione",
    previewWaitingDescription: "Il PDF incorporato apparirà qui dopo il primo render.",
    previewError: (error: string) => `Impossibile aggiornare l'anteprima: ${error}`,
    versionSaved: (label: string) => `Versione salvata: ${label}.`,
    versionRenamed: (label: string) => `Versione rinominata: ${label}.`,
    versionApplied: (label: string) => `Versione applicata: ${label}.`,
    versionDeleted: (label: string) => `Versione eliminata: ${label}.`,
    versionOverwritten: (label: string) => `Versione aggiornata: ${label}.`,
  },
  pt: {
    workspace: "Modos",
    navEditor: "Editor",
    navVersions: "Versões",
    navVacancy: "Vaga",
    navPreview: "Pré-visualização",
    navControl: "Controlo",
    duplicateResumeLanguage: "Duplicar idioma do currículo",
    renameResumeLanguage: "Renomear idioma do currículo",
    duplicateResumeLanguageTitle: "Duplicar idioma do currículo",
    renameResumeLanguageTitle: "Renomear idioma do currículo",
    duplicateResumeLanguageConfirm: "Duplicar",
    renameResumeLanguageConfirm: "Guardar",
    duplicateResumeLanguageDefaultName: (label: string) => `${label} cópia`,
    versionsTitle: "Versões e presets",
    versionsDescription:
      "Guarda snapshots com nome do currículo atual para alternar rapidamente entre a versão base e adaptações para vagas específicas.",
    saveVersion: "Guardar versão",
    saveVersionTitle: "Guardar versão atual",
    saveVersionConfirm: "Guardar",
    renameVersionTitle: "Renomear versão",
    renameVersionConfirm: "Guardar",
    versionName: "Nome da versão",
    versionNamePlaceholder: "Por exemplo: Alemanha frontend / Startup",
    versionDefaultName: (label: string) => `${label} base`,
    activeResumeLanguage: "Idioma ativo do currículo",
    applyVersion: "Aplicar",
    overwriteVersion: "Substituir",
    renameVersion: "Renomear",
    deleteVersion: "Eliminar",
    deleteVersionConfirm: (label: string) => `Eliminar a versão "${label}"?`,
    overwriteVersionConfirm: (label: string) =>
      `Substituir a versão "${label}" pelo estado atual do editor?`,
    versionUpdatedAt: (value: string) => `Atualizada: ${value}`,
    noVersionsTitle: "Ainda não há versões guardadas",
    noVersionsDescription:
      "Guarda a configuração atual como preset e reutiliza-a como ponto de partida para diferentes funções ou empresas.",
    versionsCompareTitle: "Diferença entre versões",
    versionsCompareDescription:
      "Compara duas versões guardadas e vê rapidamente o que mudou em estrutura, experiência, skills e definições do PDF.",
    compareSourceVersion: "Versão base",
    compareTargetVersion: "Comparar com",
    versionDiffChanged: "Alterações",
    versionDiffSkillsAdded: "Skills adicionadas",
    versionDiffSkillsRemoved: "Skills removidas",
    versionDiffChangedSections: "Secções alteradas",
    versionDiffAddedJobs: "Experiências adicionadas",
    versionDiffRemovedJobs: "Experiências removidas",
    versionDiffUpdatedJobs: "Experiências atualizadas",
    versionDiffNoChangesTitle: "Sem diferenças visíveis",
    versionDiffNoChangesDescription:
      "Ainda não há diferenças significativas entre as versões selecionadas.",
    vacancyTitle: "Modo vaga",
    vacancyDescription:
      "Cola uma vaga e vê rapidamente que palavras-chave já estão cobertas pelo currículo atual e quais ainda vale a pena reforçar.",
    vacancyRole: "Função / título",
    vacancyCompany: "Empresa",
    vacancyCoverage: "Cobertura",
    vacancyInput: "Texto da vaga",
    vacancyInputHint:
      "Cola aqui o texto completo da vaga. A correspondência é calculada com a versão ativa do currículo.",
    vacancyNotes: "Notas da vaga",
    vacancyExtractedKeywords: "Palavras-chave extraídas",
    vacancyMatchedKeywords: "Já cobertas",
    vacancyMissingKeywords: "Vale a pena reforçar",
    vacancyNoMatches: "Ainda não há correspondências evidentes.",
    vacancyAllKeywordsCovered: "Os termos principais parecem cobertos.",
    vacancyEmptyTitle: "Ainda não há nada para analisar",
    vacancyEmptyDescription:
      "Adiciona uma função ou cola o texto da vaga e esta página mostrará correspondências, lacunas e sugestões.",
    vacancySuggestions: "O que eu reforçaria",
    vacancySuggestionKeywords:
      "Adiciona as palavras-chave do stack que faltam no summary, nas skills ou nos bullets de experiência relevantes.",
    vacancySuggestionLeadership:
      "Destaca ownership, mentoring, code review ou decisões de arquitetura se a vaga espera sinais de senioridade.",
    vacancySuggestionScale:
      "Adiciona mais profundidade técnica sobre performance, integrações, escala ou system design.",
    vacancySuggestionStrong:
      "A cobertura já parece forte. Neste ponto basta espelhar a linguagem da vaga em um ou dois bullets.",
    controlTitle: "Ficheiros, exportação e visão geral",
    controlDescription:
      "Modo dedicado para importar e exportar dados, gerar PDFs e rever rapidamente a versão atual do currículo.",
    filesDescription:
      "Importar volta a carregar os dados JSON no editor, enquanto exportar guarda a versão atual do currículo e as skills em ficheiros externos.",
    controlStateTitle: "Estado da versão atual",
    controlStateDescription:
      "Estás a trabalhar com o idioma ativo do currículo. Aqui podes verificar o nome do PDF, o autosave e descarregar o ficheiro.",
    controlSummaryTitle: "Resumo da versão atual",
    controlSummaryDescription:
      "Quantidade de entidades preenchidas no currículo ativo: contactos, experiência, educação, certificados, idiomas e competências.",
    previewTitle: "Pré-visualização PDF",
    previewDescription:
      "Ecrã dedicado para verificar rapidamente o layout final, mudar o template e exportar a versão atual do currículo.",
    previewRefresh: "Atualizar agora",
    previewOpenInNewTab: "Abrir em separado",
    previewExpand: "Expandir pré-visualização",
    previewRefreshing: "A atualizar a pré-visualização...",
    previewUpdatedAt: (value: string) => `Última atualização: ${value}`,
    previewWaiting: "À espera do primeiro render do PDF...",
    previewFrameTitle: "Pré-visualização PDF",
    previewWaitingTitle: "A pré-visualização está a ser preparada",
    previewWaitingDescription: "O PDF incorporado aparecerá aqui após o primeiro render.",
    previewError: (error: string) => `Não foi possível atualizar a pré-visualização: ${error}`,
    versionSaved: (label: string) => `Versão guardada: ${label}.`,
    versionRenamed: (label: string) => `Versão renomeada: ${label}.`,
    versionApplied: (label: string) => `Versão aplicada: ${label}.`,
    versionDeleted: (label: string) => `Versão eliminada: ${label}.`,
    versionOverwritten: (label: string) => `Versão atualizada: ${label}.`,
  },
  sr: {
    workspace: "Режими",
    navEditor: "Едитор",
    navVersions: "Верзије",
    navVacancy: "Оглас",
    navPreview: "Преглед",
    navControl: "Контрола",
    duplicateResumeLanguage: "Дуплирај језик резимеа",
    renameResumeLanguage: "Преименуј језик резимеа",
    duplicateResumeLanguageTitle: "Дуплирај језик резимеа",
    renameResumeLanguageTitle: "Преименуј језик резимеа",
    duplicateResumeLanguageConfirm: "Дуплирај",
    renameResumeLanguageConfirm: "Сачувај",
    duplicateResumeLanguageDefaultName: (label: string) => `${label} копија`,
    versionsTitle: "Верзије и пресети",
    versionsDescription:
      "Сачувај именоване снимке тренутног резимеа да би лако прелазио између базне верзије и варијанти за конкретне огласе.",
    saveVersion: "Сачувај верзију",
    saveVersionTitle: "Сачувај тренутну верзију",
    saveVersionConfirm: "Сачувај",
    renameVersionTitle: "Преименуј верзију",
    renameVersionConfirm: "Сачувај",
    versionName: "Назив верзије",
    versionNamePlaceholder: "На пример: Немачка frontend / Startup",
    versionDefaultName: (label: string) => `${label} база`,
    activeResumeLanguage: "Активни језик резимеа",
    applyVersion: "Примени",
    overwriteVersion: "Препиши",
    renameVersion: "Преименуј",
    deleteVersion: "Обриши",
    deleteVersionConfirm: (label: string) => `Обрисати верзију „${label}“?`,
    overwriteVersionConfirm: (label: string) =>
      `Преписати верзију „${label}“ тренутним стањем едитора?`,
    versionUpdatedAt: (value: string) => `Ажурирано: ${value}`,
    noVersionsTitle: "Још нема сачуваних верзија",
    noVersionsDescription:
      "Сачувај тренутну конфигурацију као пресет и користи је као полазну тачку за различите улоге или компаније.",
    versionsCompareTitle: "Разлика између верзија",
    versionsCompareDescription:
      "Упореди две сачуване верзије и брзо види шта се променило у структури, искуству, вештинама и PDF подешавањима.",
    compareSourceVersion: "Полазна верзија",
    compareTargetVersion: "Упореди са",
    versionDiffChanged: "Промењено",
    versionDiffSkillsAdded: "Додате вештине",
    versionDiffSkillsRemoved: "Уклоњене вештине",
    versionDiffChangedSections: "Промењене секције",
    versionDiffAddedJobs: "Додата радна места",
    versionDiffRemovedJobs: "Уклоњена радна места",
    versionDiffUpdatedJobs: "Ажурирана радна места",
    versionDiffNoChangesTitle: "Нема видљивих разлика",
    versionDiffNoChangesDescription:
      "Између изабраних верзија још нема значајних разлика.",
    vacancyTitle: "Режим огласа",
    vacancyDescription:
      "Налепи текст огласа и брзо провери које кључне речи су већ покривене у тренутном резимеу, а које треба појачати.",
    vacancyRole: "Улога / назив позиције",
    vacancyCompany: "Компанија",
    vacancyCoverage: "Покривеност",
    vacancyInput: "Текст огласа",
    vacancyInputHint:
      "Овде налепи цео текст огласа. Подударање се рачуна у односу на тренутно активну верзију резимеа.",
    vacancyNotes: "Белешке о огласу",
    vacancyExtractedKeywords: "Извучене кључне речи",
    vacancyMatchedKeywords: "Већ покривено",
    vacancyMissingKeywords: "Вреди појачати",
    vacancyNoMatches: "Још нема јасних поклапања.",
    vacancyAllKeywordsCovered: "Кључни појмови делују покривено.",
    vacancyEmptyTitle: "Још нема ништа за анализу",
    vacancyEmptyDescription:
      "Додај улогу или налепи текст огласа и ова страница ће показати поклапања, празнине и предлоге.",
    vacancySuggestions: "Шта бих појачао",
    vacancySuggestionKeywords:
      "Додај недостајуће stack кључне речи у summary, skills или релевантне experience bullets.",
    vacancySuggestionLeadership:
      "Истакни ownership, mentoring, code review или архитектурске одлуке ако се за улогу очекују senior сигнали.",
    vacancySuggestionScale:
      "Додај више техничке дубине око перформанси, интеграција, скале или system design-а.",
    vacancySuggestionStrong:
      "Покривеност већ делује јако. У овој фази довољно је да у један или два bullet-а одразиш формулације из огласа.",
    controlTitle: "Датотеке, извоз и преглед",
    controlDescription:
      "Посебан режим за увоз и извоз података, генерисање PDF-а и брз преглед тренутне верзије резимеа.",
    filesDescription:
      "Увоз враћа JSON податке у едитор, а извоз чува тренутну верзију резимеа и skills у спољне датотеке.",
    controlStateTitle: "Стање тренутне верзије",
    controlStateDescription:
      "Радиш са активним језиком резимеа. Овде можеш да провериш име PDF-а, autosave и да преузмеш датотеку.",
    controlSummaryTitle: "Преглед тренутне верзије",
    controlSummaryDescription:
      "Број попуњених ентитета у активном резимеу: контакти, искуство, образовање, сертификати, језици и вештине.",
    previewTitle: "PDF преглед",
    previewDescription:
      "Посебан екран за брзу проверу финалног распореда, избор шаблона и извоз тренутне верзије резимеа.",
    previewRefresh: "Освежи сада",
    previewOpenInNewTab: "Отвори одвојено",
    previewExpand: "Прошири преглед",
    previewRefreshing: "Освежавам преглед...",
    previewUpdatedAt: (value: string) => `Последње ажурирање: ${value}`,
    previewWaiting: "Чекам први PDF render...",
    previewFrameTitle: "PDF преглед",
    previewWaitingTitle: "Преглед се припрема",
    previewWaitingDescription: "Уграђени PDF ће се појавити овде после првог render-а.",
    previewError: (error: string) => `Није успело освежавање прегледа: ${error}`,
    versionSaved: (label: string) => `Сачувана верзија: ${label}.`,
    versionRenamed: (label: string) => `Преименована верзија: ${label}.`,
    versionApplied: (label: string) => `Примењена верзија: ${label}.`,
    versionDeleted: (label: string) => `Обрисана верзија: ${label}.`,
    versionOverwritten: (label: string) => `Ажурирана верзија: ${label}.`,
  },
  fr: {
    workspace: "Modes",
    navEditor: "Éditeur",
    navVersions: "Versions",
    navVacancy: "Offre",
    navPreview: "Aperçu",
    navControl: "Contrôle",
    versionsTitle: "Versions et presets",
    versionsDescription:
      "Enregistre des snapshots nommés du CV actuel pour passer rapidement entre la version de base et des adaptations pour des offres précises.",
    saveVersion: "Enregistrer la version",
    saveVersionTitle: "Enregistrer la version actuelle",
    saveVersionConfirm: "Enregistrer",
    renameVersionTitle: "Renommer la version",
    renameVersionConfirm: "Enregistrer",
    versionName: "Nom de la version",
    versionNamePlaceholder: "Par exemple : Allemagne frontend / Startup",
    versionDefaultName: (label: string) => `${label} base`,
    activeResumeLanguage: "Langue active du CV",
    applyVersion: "Appliquer",
    overwriteVersion: "Écraser",
    renameVersion: "Renommer",
    deleteVersion: "Supprimer",
    deleteVersionConfirm: (label: string) => `Supprimer la version « ${label} » ?`,
    overwriteVersionConfirm: (label: string) =>
      `Écraser la version « ${label} » avec l'état actuel de l'éditeur ?`,
    versionUpdatedAt: (value: string) => `Mis à jour : ${value}`,
    noVersionsTitle: "Aucune version enregistrée pour l'instant",
    noVersionsDescription:
      "Enregistre la configuration actuelle comme preset et réutilise-la comme point de départ pour différents rôles ou entreprises.",
    versionsCompareTitle: "Diff entre versions",
    versionsCompareDescription:
      "Compare deux versions enregistrées et vois rapidement ce qui a changé dans la structure, l'expérience, les skills et les réglages PDF.",
    compareSourceVersion: "Version source",
    compareTargetVersion: "Comparer à",
    versionDiffChanged: "Changements",
    versionDiffSkillsAdded: "Skills ajoutées",
    versionDiffSkillsRemoved: "Skills retirées",
    versionDiffChangedSections: "Sections modifiées",
    versionDiffAddedJobs: "Postes ajoutés",
    versionDiffRemovedJobs: "Postes supprimés",
    versionDiffUpdatedJobs: "Postes mis à jour",
    versionDiffNoChangesTitle: "Aucune différence visible",
    versionDiffNoChangesDescription:
      "Aucune différence importante n'apparaît encore entre les versions sélectionnées.",
    vacancyTitle: "Mode offre",
    vacancyDescription:
      "Colle une offre d'emploi et vois rapidement quels mots-clés sont déjà couverts par le CV actuel et lesquels devraient être renforcés.",
    vacancyRole: "Rôle / intitulé",
    vacancyCompany: "Entreprise",
    vacancyCoverage: "Couverture",
    vacancyInput: "Texte de l'offre",
    vacancyInputHint:
      "Colle ici le texte complet de l'offre. Le matching est calculé par rapport à la version active du CV.",
    vacancyNotes: "Notes sur l'offre",
    vacancyExtractedKeywords: "Mots-clés extraits",
    vacancyMatchedKeywords: "Déjà couverts",
    vacancyMissingKeywords: "À renforcer",
    vacancyNoMatches: "Aucune correspondance évidente pour l'instant.",
    vacancyAllKeywordsCovered: "Les termes clés semblent couverts.",
    vacancyEmptyTitle: "Rien à analyser pour l'instant",
    vacancyEmptyDescription:
      "Ajoute un rôle ou colle le texte de l'offre et cette page affichera les correspondances, les manques et les suggestions.",
    vacancySuggestions: "Ce que je renforcerais",
    vacancySuggestionKeywords:
      "Ajoute les mots-clés stack manquants dans le résumé, les compétences ou les bullets d'expérience pertinents.",
    vacancySuggestionLeadership:
      "Mets en avant l'ownership, le mentoring, la code review ou les décisions d'architecture si le rôle attend des signaux senior.",
    vacancySuggestionScale:
      "Ajoute plus de profondeur technique autour de la performance, des intégrations, de l'échelle ou du system design.",
    vacancySuggestionStrong:
      "La couverture semble déjà solide. À ce stade, reflète simplement le vocabulaire de l'offre dans un ou deux bullets.",
    controlTitle: "Fichiers, export et vue d'ensemble",
    controlDescription:
      "Mode dédié à l'import/export des données, à la génération du PDF et à une vue rapide de la version actuelle du CV.",
    filesDescription:
      "L'import recharge les données JSON dans l'éditeur, tandis que l'export enregistre la version actuelle du CV et les compétences dans des fichiers externes.",
    controlStateTitle: "État de la version actuelle",
    controlStateDescription:
      "Tu travailles avec la langue active du CV. Ici, tu peux vérifier le nom du PDF, l'autosave et télécharger le fichier.",
    controlSummaryTitle: "Vue d'ensemble de la version actuelle",
    controlSummaryDescription:
      "Nombre d'éléments remplis dans le CV actif : contacts, expérience, formation, certificats, langues et compétences.",
    previewTitle: "Aperçu PDF",
    previewDescription:
      "Écran dédié pour vérifier rapidement la mise en page finale, changer de modèle et exporter la version actuelle du CV.",
    previewRefresh: "Actualiser maintenant",
    previewOpenInNewTab: "Ouvrir séparément",
    previewExpand: "Agrandir l’aperçu",
    previewRefreshing: "Actualisation de l'aperçu...",
    previewUpdatedAt: (value: string) => `Dernière mise à jour : ${value}`,
    previewWaiting: "En attente du premier rendu PDF...",
    previewFrameTitle: "Aperçu PDF",
    previewWaitingTitle: "L'aperçu est en préparation",
    previewWaitingDescription: "Le PDF intégré apparaîtra ici après le premier rendu.",
    previewError: (error: string) => `Impossible d'actualiser l'aperçu : ${error}`,
    versionSaved: (label: string) => `Version enregistrée : ${label}.`,
    versionRenamed: (label: string) => `Version renommée : ${label}.`,
    versionApplied: (label: string) => `Version appliquée : ${label}.`,
    versionDeleted: (label: string) => `Version supprimée : ${label}.`,
    versionOverwritten: (label: string) => `Version mise à jour : ${label}.`,
  },
  pl: {
    workspace: "Tryby",
    navEditor: "Edytor",
    navVersions: "Wersje",
    navVacancy: "Oferta",
    navPreview: "Podgląd",
    navControl: "Sterowanie",
    versionsTitle: "Wersje i presety",
    versionsDescription:
      "Zapisuj nazwane snapshoty aktualnego CV, aby szybko przełączać się między wersją bazową a wariantami pod konkretne oferty.",
    saveVersion: "Zapisz wersję",
    saveVersionTitle: "Zapisz bieżącą wersję",
    saveVersionConfirm: "Zapisz",
    renameVersionTitle: "Zmień nazwę wersji",
    renameVersionConfirm: "Zapisz",
    versionName: "Nazwa wersji",
    versionNamePlaceholder: "Na przykład: Niemcy frontend / Startup",
    versionDefaultName: (label: string) => `${label} baza`,
    activeResumeLanguage: "Aktywny język CV",
    applyVersion: "Zastosuj",
    overwriteVersion: "Nadpisz",
    renameVersion: "Zmień nazwę",
    deleteVersion: "Usuń",
    deleteVersionConfirm: (label: string) => `Usunąć wersję „${label}”?`,
    overwriteVersionConfirm: (label: string) =>
      `Nadpisać wersję „${label}” bieżącym stanem edytora?`,
    versionUpdatedAt: (value: string) => `Zaktualizowano: ${value}`,
    noVersionsTitle: "Brak zapisanych wersji",
    noVersionsDescription:
      "Zapisz bieżącą konfigurację jako preset i używaj jej jako punktu startowego dla różnych ról lub firm.",
    versionsCompareTitle: "Różnice między wersjami",
    versionsCompareDescription:
      "Porównaj dwie zapisane wersje i szybko zobacz, co zmieniło się w strukturze, doświadczeniu, umiejętnościach i ustawieniach PDF.",
    compareSourceVersion: "Wersja bazowa",
    compareTargetVersion: "Porównaj z",
    versionDiffChanged: "Zmiany",
    versionDiffSkillsAdded: "Dodane umiejętności",
    versionDiffSkillsRemoved: "Usunięte umiejętności",
    versionDiffChangedSections: "Zmienione sekcje",
    versionDiffAddedJobs: "Dodane miejsca pracy",
    versionDiffRemovedJobs: "Usunięte miejsca pracy",
    versionDiffUpdatedJobs: "Zaktualizowane miejsca pracy",
    versionDiffNoChangesTitle: "Brak widocznych różnic",
    versionDiffNoChangesDescription:
      "Między wybranymi wersjami nie widać jeszcze istotnych zmian.",
    vacancyTitle: "Tryb oferty",
    vacancyDescription:
      "Wklej ofertę pracy i szybko sprawdź, które słowa kluczowe są już pokryte przez aktualne CV, a które warto wzmocnić.",
    vacancyRole: "Rola / stanowisko",
    vacancyCompany: "Firma",
    vacancyCoverage: "Pokrycie",
    vacancyInput: "Treść oferty",
    vacancyInputHint:
      "Wklej tutaj pełną treść oferty. Dopasowanie jest liczone względem aktywnej wersji CV.",
    vacancyNotes: "Notatki do oferty",
    vacancyExtractedKeywords: "Wyodrębnione słowa kluczowe",
    vacancyMatchedKeywords: "Już pokryte",
    vacancyMissingKeywords: "Warto wzmocnić",
    vacancyNoMatches: "Na razie brak wyraźnych dopasowań.",
    vacancyAllKeywordsCovered: "Kluczowe terminy wyglądają na pokryte.",
    vacancyEmptyTitle: "Jeszcze nic do analizy",
    vacancyEmptyDescription:
      "Dodaj rolę albo wklej treść oferty, a ta strona pokaże dopasowania, luki i sugestie.",
    vacancySuggestions: "Co bym wzmocnił",
    vacancySuggestionKeywords:
      "Dodaj brakujące słowa kluczowe stacku do summary, umiejętności albo odpowiednich bulletów doświadczenia.",
    vacancySuggestionLeadership:
      "Podkreśl ownership, mentoring, code review lub decyzje architektoniczne, jeśli oferta oczekuje sygnałów senior.",
    vacancySuggestionScale:
      "Dodaj więcej głębi technicznej wokół wydajności, integracji, skali lub system design.",
    vacancySuggestionStrong:
      "Pokrycie wygląda już mocno. Na tym etapie wystarczy odbić język oferty w jednym lub dwóch bulletach.",
    controlTitle: "Pliki, eksport i przegląd",
    controlDescription:
      "Osobny tryb do importu i eksportu danych, generowania PDF oraz szybkiego podglądu bieżącej wersji CV.",
    filesDescription:
      "Import przywraca dane JSON do edytora, a eksport zapisuje bieżącą wersję CV i umiejętności do zewnętrznych plików.",
    controlStateTitle: "Stan bieżącej wersji",
    controlStateDescription:
      "Pracujesz na aktywnym języku CV. Tutaj możesz sprawdzić nazwę PDF, autosave i pobrać plik.",
    controlSummaryTitle: "Przegląd bieżącej wersji",
    controlSummaryDescription:
      "Liczba wypełnionych elementów w aktywnym CV: kontakty, doświadczenie, edukacja, certyfikaty, języki i umiejętności.",
    previewTitle: "Podgląd PDF",
    previewDescription:
      "Osobny ekran do szybkiego sprawdzania końcowego układu, zmiany szablonu i eksportu bieżącej wersji CV.",
    previewRefresh: "Odśwież teraz",
    previewOpenInNewTab: "Otwórz osobno",
    previewExpand: "Powiększ podgląd",
    previewRefreshing: "Odświeżam podgląd...",
    previewUpdatedAt: (value: string) => `Ostatnia aktualizacja: ${value}`,
    previewWaiting: "Czekam na pierwszy render PDF...",
    previewFrameTitle: "Podgląd PDF",
    previewWaitingTitle: "Podgląd jest przygotowywany",
    previewWaitingDescription: "Osadzony PDF pojawi się tutaj po pierwszym renderze.",
    previewError: (error: string) => `Nie udało się odświeżyć podglądu: ${error}`,
    versionSaved: (label: string) => `Zapisano wersję: ${label}.`,
    versionRenamed: (label: string) => `Zmieniono nazwę wersji: ${label}.`,
    versionApplied: (label: string) => `Zastosowano wersję: ${label}.`,
    versionDeleted: (label: string) => `Usunięto wersję: ${label}.`,
    versionOverwritten: (label: string) => `Zaktualizowano wersję: ${label}.`,
  },
  uk: {
    workspace: "Режими",
    navEditor: "Редактор",
    navVersions: "Версії",
    navVacancy: "Вакансія",
    navPreview: "Прев’ю",
    navControl: "Керування",
    versionsTitle: "Версії та пресети",
    versionsDescription:
      "Зберігай іменовані snapshots поточного резюме, щоб швидко перемикатися між базовою версією та адаптаціями під конкретні вакансії.",
    saveVersion: "Зберегти версію",
    saveVersionTitle: "Зберегти поточну версію",
    saveVersionConfirm: "Зберегти",
    renameVersionTitle: "Перейменувати версію",
    renameVersionConfirm: "Зберегти",
    versionName: "Назва версії",
    versionNamePlaceholder: "Наприклад: Німеччина frontend / Startup",
    versionDefaultName: (label: string) => `${label} база`,
    activeResumeLanguage: "Активна мова резюме",
    applyVersion: "Застосувати",
    overwriteVersion: "Перезаписати",
    renameVersion: "Перейменувати",
    deleteVersion: "Видалити",
    deleteVersionConfirm: (label: string) => `Видалити версію «${label}»?`,
    overwriteVersionConfirm: (label: string) =>
      `Перезаписати версію «${label}» поточним станом редактора?`,
    versionUpdatedAt: (value: string) => `Оновлено: ${value}`,
    noVersionsTitle: "Ще немає збережених версій",
    noVersionsDescription:
      "Збережи поточну конфігурацію як пресет і використовуй її як стартову точку для різних ролей або компаній.",
    versionsCompareTitle: "Різниця між версіями",
    versionsCompareDescription:
      "Порівняй дві збережені версії й швидко побач, що змінилося у структурі, досвіді, навичках і PDF-налаштуваннях.",
    compareSourceVersion: "Базова версія",
    compareTargetVersion: "Порівняти з",
    versionDiffChanged: "Змінено",
    versionDiffSkillsAdded: "Додані навички",
    versionDiffSkillsRemoved: "Прибрані навички",
    versionDiffChangedSections: "Змінені секції",
    versionDiffAddedJobs: "Додані місця роботи",
    versionDiffRemovedJobs: "Видалені місця роботи",
    versionDiffUpdatedJobs: "Оновлені місця роботи",
    versionDiffNoChangesTitle: "Немає помітних відмінностей",
    versionDiffNoChangesDescription:
      "Між вибраними версіями поки що не видно суттєвих змін.",
    vacancyTitle: "Режим вакансії",
    vacancyDescription:
      "Встав текст вакансії й швидко подивись, які ключові слова вже покриті поточним резюме, а які варто підсилити.",
    vacancyRole: "Роль / назва позиції",
    vacancyCompany: "Компанія",
    vacancyCoverage: "Покриття",
    vacancyInput: "Текст вакансії",
    vacancyInputHint:
      "Встав сюди повний текст вакансії. Зіставлення рахується відносно активної версії резюме.",
    vacancyNotes: "Нотатки до вакансії",
    vacancyExtractedKeywords: "Витягнуті ключові слова",
    vacancyMatchedKeywords: "Вже покрито",
    vacancyMissingKeywords: "Варто підсилити",
    vacancyNoMatches: "Поки що немає очевидних збігів.",
    vacancyAllKeywordsCovered: "Ключові терміни виглядають покритими.",
    vacancyEmptyTitle: "Поки нічого аналізувати",
    vacancyEmptyDescription:
      "Додай роль або встав текст вакансії, і ця сторінка покаже збіги, прогалини та підказки.",
    vacancySuggestions: "Що я б підсилив",
    vacancySuggestionKeywords:
      "Додай відсутні stack-ключові слова в summary, skills або релевантні bullets досвіду.",
    vacancySuggestionLeadership:
      "Підсвіти ownership, mentoring, code review або архітектурні рішення, якщо роль очікує senior-сигнали.",
    vacancySuggestionScale:
      "Додай більше технічної глибини навколо performance, інтеграцій, масштабу або system design.",
    vacancySuggestionStrong:
      "Покриття вже виглядає сильним. На цьому етапі достатньо віддзеркалити формулювання вакансії в одному-двох bullets.",
    controlTitle: "Файли, експорт і зведення",
    controlDescription:
      "Окремий режим для імпорту й експорту даних, генерації PDF та швидкого огляду поточної версії резюме.",
    filesDescription:
      "Імпорт повертає JSON-дані в редактор, а експорт зберігає поточну версію резюме й навички у зовнішні файли.",
    controlStateTitle: "Стан поточної версії",
    controlStateDescription:
      "Ти працюєш з активною мовою резюме. Тут можна перевірити назву PDF, autosave і завантажити файл.",
    controlSummaryTitle: "Огляд поточної версії",
    controlSummaryDescription:
      "Кількість заповнених сутностей в активному резюме: контакти, досвід, освіта, сертифікати, мови й навички.",
    previewTitle: "Перегляд PDF",
    previewDescription:
      "Окремий екран для швидкої перевірки фінальної верстки, зміни шаблону та експорту поточної версії резюме.",
    previewRefresh: "Оновити зараз",
    previewOpenInNewTab: "Відкрити окремо",
    previewExpand: "Розгорнути прев’ю",
    previewRefreshing: "Оновлюю прев’ю...",
    previewUpdatedAt: (value: string) => `Останнє оновлення: ${value}`,
    previewWaiting: "Чекаю на перший рендер PDF...",
    previewFrameTitle: "PDF прев’ю",
    previewWaitingTitle: "Прев’ю готується",
    previewWaitingDescription: "Вбудований PDF з’явиться тут після першого рендеру.",
    previewError: (error: string) => `Не вдалося оновити прев’ю: ${error}`,
    versionSaved: (label: string) => `Збережено версію: ${label}.`,
    versionRenamed: (label: string) => `Перейменовано версію: ${label}.`,
    versionApplied: (label: string) => `Застосовано версію: ${label}.`,
    versionDeleted: (label: string) => `Видалено версію: ${label}.`,
    versionOverwritten: (label: string) => `Оновлено версію: ${label}.`,
  },
} as const satisfies Partial<Record<InterfaceLanguageCode, Partial<UIText>>>;

export const uiText: Record<InterfaceLanguageCode, UIText> = {
  ru: ruText,
  en: enText,
  de: { ...deText, ...featureTextOverrides.de },
  es: { ...esText, ...featureTextOverrides.es },
  it: { ...itText, ...featureTextOverrides.it },
  pt: { ...ptText, ...featureTextOverrides.pt },
  sr: { ...srText, ...featureTextOverrides.sr },
  fr: { ...frText, ...featureTextOverrides.fr },
  pl: { ...plText, ...featureTextOverrides.pl },
  uk: { ...ukText, ...featureTextOverrides.uk },
};

const interfaceLanguageMeta = {
  ru: {
    flag: "🇷🇺",
    nativeLabel: "Русский",
  },
  en: {
    flag: "🇬🇧",
    nativeLabel: "English",
  },
  de: {
    flag: "🇩🇪",
    nativeLabel: "Deutsch",
  },
  es: {
    flag: "🇪🇸",
    nativeLabel: "Español",
  },
  it: {
    flag: "🇮🇹",
    nativeLabel: "Italiano",
  },
  pt: {
    flag: "🇵🇹",
    nativeLabel: "Português",
  },
  sr: {
    flag: "🇷🇸",
    nativeLabel: "Српски",
  },
  fr: {
    flag: "🇫🇷",
    nativeLabel: "Français",
  },
  pl: {
    flag: "🇵🇱",
    nativeLabel: "Polski",
  },
  uk: {
    flag: "🇺🇦",
    nativeLabel: "Українська",
  },
} as const satisfies Record<
  InterfaceLanguageCode,
  {
    flag: string;
    nativeLabel: string;
  }
>;

const interfaceLanguageOrder: InterfaceLanguageCode[] = [
  "ru",
  "en",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "sr",
  "uk",
  "pl",
];

const builtInResumeLanguageLabels = {
  ru: {
    ru: "Русский",
    en: "Russian",
    de: "Russisch",
    es: "Ruso",
    it: "Russo",
    pt: "Russo",
    sr: "Руски",
    fr: "Russe",
    pl: "Rosyjski",
    uk: "Російська",
  },
  en: {
    ru: "Английский",
    en: "English",
    de: "Englisch",
    es: "Inglés",
    it: "Inglese",
    pt: "Inglês",
    sr: "Енглески",
    fr: "Anglais",
    pl: "Angielski",
    uk: "Англійська",
  },
} as const satisfies Record<BuiltInResumeLanguageCode, Record<InterfaceLanguageCode, string>>;

export function getLanguageLabel(
  language: BuiltInResumeLanguageCode,
  uiLanguage: InterfaceLanguageCode
): string {
  return builtInResumeLanguageLabels[language][uiLanguage];
}

export function getResumeLanguageLabel(
  language: string,
  uiLanguage: InterfaceLanguageCode,
  customLabels: Record<string, string> = {}
): string {
  const customLabel = String(customLabels[language] ?? "").trim();

  if (customLabel) {
    return customLabel;
  }

  if (language === "ru" || language === "en") {
    return getLanguageLabel(language, uiLanguage);
  }

  return language;
}

export function getInterfaceLanguageOptions(uiLanguage: InterfaceLanguageCode) {
  return interfaceLanguageOrder.map((code) => ({
    code,
    label: interfaceLanguageMeta[code].nativeLabel,
    nativeLabel: interfaceLanguageMeta[code].nativeLabel,
    flag: interfaceLanguageMeta[code].flag,
  }));
}

export function getLanguageLevelOptions(uiLanguage: InterfaceLanguageCode): string[] {
  const nativeLabels: Record<InterfaceLanguageCode, string> = {
    ru: "родной",
    en: "Native",
    de: "Muttersprache",
    es: "Nativo",
    it: "Madrelingua",
    pt: "Nativo",
    sr: "Матерњи",
    fr: "Natif",
    pl: "Ojczysty",
    uk: "Рідна",
  };
  const nativeLabel = nativeLabels[uiLanguage];
  return ["", nativeLabel, "A1", "A2", "B1", "B2", "C1", "C2"];
}
