import { Outlet, useLocation } from "react-router-dom";
import ActionModal from "../components/ActionModal";
import AppSidebar from "../components/AppSidebar";
import ConfirmModal from "../components/ConfirmModal";
import InputModal from "../components/InputModal";
import { useResumeStudio } from "../hooks/useResumeStudio";

export default function RootLayout() {
  const studio = useResumeStudio();
  const location = useLocation();
  const isPreviewRoute = location.pathname === "/preview";
  const importItems = [
    ...studio.resumeProgressItems.map((item) => ({
      key: item.language,
      label: studio.t.importResume(item.label),
      onClick: () => studio.openImportPicker(item.language),
    })),
    {
      key: "skills",
      label: studio.t.importSkills,
      onClick: () => studio.openImportPicker("skills"),
    },
  ];
  const exportItems = [
    ...studio.resumeProgressItems.map((item) => ({
      key: item.language,
      label: studio.t.exportResume(item.label),
      onClick: () => studio.handleExportSelection(item.language),
    })),
    {
      key: "skills",
      label: studio.t.exportSkills,
      onClick: () => studio.handleExportSelection("skills"),
    },
  ];

  return (
    <>
      <div className="app-shell">
        <AppSidebar
          t={studio.t}
          uiLanguage={studio.uiLanguage}
          theme={studio.theme}
          activeLanguage={studio.activeLanguage}
          activeLanguageLabel={studio.activeResumeLanguageLabel}
          interfaceLanguageOptions={studio.interfaceLanguageOptions}
          resumeProgressItems={studio.resumeProgressItems}
          onChangeUiLanguage={(language) => studio.setUiLanguage(language)}
          onToggleTheme={studio.toggleTheme}
          onChangeResumeLanguage={(language) => studio.setActiveLanguage(language)}
          onOpenCreateResumeLanguage={studio.openCreateResumeLanguageModal}
          onDuplicateResumeLanguage={studio.openDuplicateResumeLanguageModal}
          onRenameResumeLanguage={studio.openRenameResumeLanguageModal}
          onDeleteResumeLanguage={studio.requestDeleteResumeLanguage}
        />

        <main className={`editor${isPreviewRoute ? " editor--preview-route" : ""}`}>
          <Outlet context={studio} />
        </main>
      </div>

      {studio.modalType === "import" ? (
        <ActionModal
          title={studio.t.importTargetTitle}
          items={importItems}
          closeLabel={studio.t.closeModal}
          onClose={() => studio.setModalType(null)}
        />
      ) : null}

      {studio.modalType === "export" ? (
        <ActionModal
          title={studio.t.exportTargetTitle}
          items={exportItems}
          closeLabel={studio.t.closeModal}
          onClose={() => studio.setModalType(null)}
        />
      ) : null}

      {studio.isCreateResumeLanguageModalOpen ? (
        <InputModal
          title={studio.t.createResumeLanguageTitle}
          label={studio.t.resumeLanguageName}
          placeholder={studio.t.resumeLanguageNamePlaceholder}
          value={studio.newResumeLanguageName}
          confirmLabel={studio.t.createResumeLanguage}
          closeLabel={studio.t.closeModal}
          onChange={studio.setNewResumeLanguageName}
          onConfirm={studio.addResumeLanguage}
          onClose={studio.closeCreateResumeLanguageModal}
        />
      ) : null}

      {studio.pendingResumeLanguageDuplicate ? (
        <InputModal
          title={studio.t.duplicateResumeLanguageTitle}
          label={studio.t.resumeLanguageName}
          placeholder={studio.t.resumeLanguageNamePlaceholder}
          value={studio.duplicateResumeLanguageName}
          confirmLabel={studio.t.duplicateResumeLanguageConfirm}
          closeLabel={studio.t.closeModal}
          onChange={studio.setDuplicateResumeLanguageName}
          onConfirm={studio.duplicateResumeLanguage}
          onClose={studio.closeDuplicateResumeLanguageModal}
        />
      ) : null}

      {studio.pendingResumeLanguageRename ? (
        <InputModal
          title={studio.t.renameResumeLanguageTitle}
          label={studio.t.resumeLanguageName}
          placeholder={studio.t.resumeLanguageNamePlaceholder}
          value={studio.renameResumeLanguageName}
          confirmLabel={studio.t.renameResumeLanguageConfirm}
          closeLabel={studio.t.closeModal}
          onChange={studio.setRenameResumeLanguageName}
          onConfirm={studio.renameResumeLanguage}
          onClose={studio.closeRenameResumeLanguageModal}
        />
      ) : null}

      {studio.pendingResumeLanguageDeletion ? (
        <ConfirmModal
          title={studio.t.deleteResumeLanguage}
          message={studio.t.deleteResumeLanguageConfirm(
            studio.resumeProgressItems.find(
              (item) => item.language === studio.pendingResumeLanguageDeletion
            )?.label ?? studio.pendingResumeLanguageDeletion
          )}
          confirmLabel={studio.t.deleteLanguage}
          closeLabel={studio.t.closeModal}
          onConfirm={studio.confirmDeleteResumeLanguage}
          onClose={studio.closeDeleteResumeLanguageModal}
        />
      ) : null}

      <input
        ref={studio.importInputRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={async (event) => {
          const [file] = Array.from(event.target.files ?? []);
          await studio.handleImportFile(file ?? null);
          event.target.value = "";
        }}
      />
    </>
  );
}
