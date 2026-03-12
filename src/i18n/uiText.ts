import type { BuiltInResumeLanguageCode, InterfaceLanguageCode } from "../types/resume";

export interface UIText {
  appName: string;
  appTitle: string;
  appLead: string;
  interfaceLanguage: string;
  interfaceLanguageMenuLabel: string;
  switchToDarkTheme: string;
  switchToLightTheme: string;
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
  fieldProgress: (completed: number, total: number) => string;
  files: string;
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
  generating: string;
  downloadPdf: (languageLabel: string) => string;
  autosave: string;
  autosaveSaved: string;
  lastAction: string;
  snapshot: string;
  jobs: string;
  education: string;
  skills: string;
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
  cannotDeleteLastResumeLanguage: string;
  deleteResumeLanguageConfirm: (label: string) => string;
  pdfDownloaded: (filename: string) => string;
  pdfFailed: (error: string) => string;
  unknownError: string;
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
    fieldProgress: (completed, total) => `${completed}/${total}`,
    files: "Файлы",
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
    generating: "Генерирую PDF...",
    downloadPdf: (languageLabel) => `Скачать PDF (${languageLabel})`,
    autosave: "Автосохранение",
    autosaveSaved: "Сохранено локально",
    lastAction: "Последнее действие",
    snapshot: "Сводка",
    jobs: "Места работы",
    education: "Образование",
    skills: "Навыки",
    addSkillRow: "Добавить",
    removeEmptySkillRow: "Убрать пустую строку",
    skillCell: (index) => `Навык ${index + 1}`,
    certificates: "Курсы и сертификаты",
    addCertificate: "Добавить",
    certificateEntry: (index) => `Запись ${index + 1}`,
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
    job: (index) => `Место ${index + 1}`,
    removeJob: "Удалить",
    moveUp: "Вверх",
    moveDown: "Вниз",
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
    bullet: (index) => `Пункт ${index + 1}`,
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
    entry: (index) => `Запись ${index + 1}`,
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
    cannotDeleteLastResumeLanguage: "Нельзя удалить последний язык резюме.",
    deleteResumeLanguageConfirm: (label) => `Удалить язык резюме «${label}»?`,
    pdfDownloaded: (filename) => `PDF сохранён: ${filename}.`,
    pdfFailed: (error) => `Не удалось сгенерировать PDF: ${error}`,
    unknownError: "Неизвестная ошибка",
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
    fieldProgress: (completed, total) => `${completed}/${total}`,
    files: "Files",
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
    generating: "Generating PDF...",
    downloadPdf: (languageLabel) => `Download PDF (${languageLabel})`,
    autosave: "Autosave",
    autosaveSaved: "Saved locally",
    lastAction: "Last action",
    snapshot: "Snapshot",
    jobs: "Jobs",
    education: "Education",
    skills: "Skills",
    addSkillRow: "Add",
    removeEmptySkillRow: "Remove empty row",
    skillCell: (index) => `Skill ${index + 1}`,
    certificates: "Courses and certificates",
    addCertificate: "Add",
    certificateEntry: (index) => `Entry ${index + 1}`,
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
    job: (index) => `Job ${index + 1}`,
    removeJob: "Delete",
    moveUp: "Up",
    moveDown: "Down",
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
    bullet: (index) => `Item ${index + 1}`,
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
    entry: (index) => `Entry ${index + 1}`,
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
    cannotDeleteLastResumeLanguage: "You cannot delete the last resume language.",
    deleteResumeLanguageConfirm: (label) => `Delete resume language "${label}"?`,
    pdfDownloaded: (filename) => `Saved PDF: ${filename}.`,
    pdfFailed: (error) => `Failed to generate PDF: ${error}`,
    unknownError: "Unknown error",
};

const deText: UIText = {
  ...enText,
  interfaceLanguage: "Sprache der Anwendung",
  interfaceLanguageMenuLabel: "Sprache der Anwendung wählen",
  switchToDarkTheme: "Dunkles Design aktivieren",
  switchToLightTheme: "Helles Design aktivieren",
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
  downloadPdf: (languageLabel) => `PDF herunterladen (${languageLabel})`,
  snapshot: "Übersicht",
  jobs: "Positionen",
  education: "Ausbildung",
  skills: "Fähigkeiten",
  addSkillRow: "Hinzufügen",
  removeEmptySkillRow: "Leere Zeile entfernen",
  skillCell: (index) => `Fähigkeit ${index + 1}`,
  certificates: "Kurse und Zertifikate",
  addCertificate: "Hinzufügen",
  certificateEntry: (index) => `Eintrag ${index + 1}`,
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
  job: (index) => `Position ${index + 1}`,
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
  bullet: (index) => `Punkt ${index + 1}`,
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
  entry: (index) => `Eintrag ${index + 1}`,
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
  downloadPdf: (languageLabel) => `Descargar PDF (${languageLabel})`,
  snapshot: "Resumen",
  jobs: "Experiencia",
  education: "Educación",
  skills: "Habilidades",
  addSkillRow: "Añadir",
  removeEmptySkillRow: "Quitar fila vacía",
  skillCell: (index) => `Habilidad ${index + 1}`,
  certificates: "Cursos y certificados",
  addCertificate: "Añadir",
  certificateEntry: (index) => `Entrada ${index + 1}`,
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
  job: (index) => `Puesto ${index + 1}`,
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
  bullet: (index) => `Punto ${index + 1}`,
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
  entry: (index) => `Entrada ${index + 1}`,
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
  downloadPdf: (languageLabel) => `Scarica PDF (${languageLabel})`,
  snapshot: "Panoramica",
  jobs: "Esperienza",
  education: "Istruzione",
  skills: "Competenze",
  addSkillRow: "Aggiungi",
  removeEmptySkillRow: "Rimuovi riga vuota",
  skillCell: (index) => `Competenza ${index + 1}`,
  certificates: "Corsi e certificati",
  addCertificate: "Aggiungi",
  certificateEntry: (index) => `Voce ${index + 1}`,
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
  job: (index) => `Ruolo ${index + 1}`,
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
  bullet: (index) => `Punto ${index + 1}`,
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
  entry: (index) => `Voce ${index + 1}`,
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
  downloadPdf: (languageLabel) => `Descarregar PDF (${languageLabel})`,
  snapshot: "Resumo",
  jobs: "Experiência",
  education: "Educação",
  skills: "Competências",
  addSkillRow: "Adicionar",
  removeEmptySkillRow: "Remover linha vazia",
  skillCell: (index) => `Competência ${index + 1}`,
  certificates: "Cursos e certificados",
  addCertificate: "Adicionar",
  certificateEntry: (index) => `Entrada ${index + 1}`,
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
  job: (index) => `Posição ${index + 1}`,
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
  bullet: (index) => `Ponto ${index + 1}`,
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
  entry: (index) => `Entrada ${index + 1}`,
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
  downloadPdf: (languageLabel) => `Преузми PDF (${languageLabel})`,
  snapshot: "Преглед",
  jobs: "Радна места",
  education: "Образовање",
  skills: "Вештине",
  addSkillRow: "Додај",
  removeEmptySkillRow: "Уклони празан ред",
  skillCell: (index) => `Вештина ${index + 1}`,
  certificates: "Курсеви и сертификати",
  addCertificate: "Додај",
  certificateEntry: (index) => `Запис ${index + 1}`,
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
  job: (index) => `Место ${index + 1}`,
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
  bullet: (index) => `Ставка ${index + 1}`,
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
  entry: (index) => `Запис ${index + 1}`,
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

export const uiText: Record<InterfaceLanguageCode, UIText> = {
  ru: ruText,
  en: enText,
  de: deText,
  es: esText,
  it: itText,
  pt: ptText,
  sr: srText,
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
} as const satisfies Record<
  InterfaceLanguageCode,
  {
    flag: string;
    nativeLabel: string;
  }
>;

const builtInResumeLanguageLabels = {
  ru: {
    ru: "Русский",
    en: "Russian",
    de: "Russisch",
    es: "Ruso",
    it: "Russo",
    pt: "Russo",
    sr: "Руски",
  },
  en: {
    ru: "Английский",
    en: "English",
    de: "Englisch",
    es: "Inglés",
    it: "Inglese",
    pt: "Inglês",
    sr: "Енглески",
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
  return (Object.keys(uiText) as InterfaceLanguageCode[]).map((code) => ({
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
  };
  const nativeLabel = nativeLabels[uiLanguage];
  return ["", nativeLabel, "A1", "A2", "B1", "B2", "C1", "C2"];
}
