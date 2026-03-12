import ActionModal from "../components/ActionModal";
import AppSidebar from "../components/AppSidebar";
import ConfirmModal from "../components/ConfirmModal";
import EntriesSection from "../components/EntriesSection";
import ExperienceSection from "../components/ExperienceSection";
import HeaderSection from "../components/HeaderSection";
import InputModal from "../components/InputModal";
import LanguagesSection from "../components/LanguagesSection";
import SkillsSection from "../components/SkillsSection";
import SummarySection from "../components/SummarySection";
import { useResumeStudio } from "../hooks/useResumeStudio";

export default function HomePage() {
  const studio = useResumeStudio();

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
          pdfFileName={studio.pdfFileName}
          totalContacts={studio.totalContacts}
          totalJobs={studio.jobs.length}
          totalEducation={studio.totalEducation}
          totalCertificates={studio.totalCertificates}
          totalLanguages={studio.totalLanguages}
          totalSkills={studio.totalSkills}
          didAutoSave={studio.didAutoSave}
          onChangeUiLanguage={(language) => studio.setUiLanguage(language)}
          onToggleTheme={studio.toggleTheme}
          onChangeResumeLanguage={(language) => studio.setActiveLanguage(language)}
          onChangePdfFileName={studio.updatePdfFileName}
          onOpenCreateResumeLanguage={studio.openCreateResumeLanguageModal}
          onDuplicateResumeLanguage={studio.openDuplicateResumeLanguageModal}
          onRenameResumeLanguage={studio.openRenameResumeLanguageModal}
          onDeleteResumeLanguage={studio.requestDeleteResumeLanguage}
          onOpenImport={() => studio.setModalType("import")}
          onOpenExport={() => studio.setModalType("export")}
          onDownloadPdf={studio.downloadPdf}
          isGenerating={studio.isGenerating}
        />

        <main className="editor">
          <HeaderSection
            t={studio.t}
            name={studio.resume.header.name}
            title={studio.resume.header.title}
            contacts={studio.contactItems}
            exampleName={studio.defaultResume.header.name}
            exampleTitle={studio.defaultResume.header.title}
            exampleContacts={studio.defaultResume.header.contacts ?? []}
            onChangeName={(value) => studio.updateHeader("name", value)}
            onChangeTitle={(value) => studio.updateHeader("title", value)}
            onChangeContact={studio.updateContactItem}
            onAddContact={studio.addContactItem}
            onRemoveContact={studio.removeContactItem}
            onReorderContacts={studio.reorderContactItems}
          />

          <SummarySection
            t={studio.t}
            title={studio.resume.sections.summary.title}
            exampleTitle={studio.defaultResume.sections.summary.title}
            content={
              Array.isArray(studio.resume.sections.summary.content)
                ? studio.resume.sections.summary.content.join(" ")
                : studio.resume.sections.summary.content
            }
            exampleContent={
              Array.isArray(studio.defaultResume.sections.summary.content)
                ? studio.defaultResume.sections.summary.content.join(" ")
                : studio.defaultResume.sections.summary.content
            }
            onChangeTitle={(value) => studio.updateSectionTitle("summary", value)}
            onChangeContent={studio.updateSummary}
          />

          <ExperienceSection
            t={studio.t}
            title={studio.resume.sections.experience.title}
            jobs={studio.jobs}
            hiddenJobs={studio.hiddenJobs}
            exampleTitle={studio.defaultResume.sections.experience.title}
            exampleJobs={studio.defaultResume.sections.experience.jobs.filter((job) => !job.hidden)}
            exampleHiddenJobs={studio.defaultResume.sections.experience.jobs.filter((job) => job.hidden)}
            onChangeTitle={(value) => studio.updateSectionTitle("experience", value)}
            onAddJob={studio.addJob}
            onReorderJobs={studio.reorderJobs}
            onHideJob={studio.hideJob}
            onRestoreJob={studio.restoreHiddenJob}
            onRemoveJob={studio.removeJob}
            onUpdateJobField={studio.updateJobField}
            onUpdateTask={studio.updateTask}
            onAddTask={studio.addTask}
            onRemoveTask={studio.removeTask}
            onReorderTask={studio.reorderTask}
            onHideTask={studio.hideTask}
            onRestoreTask={studio.restoreHiddenTask}
            onUpdateNotes={studio.updateJobNotes}
          />

          <EntriesSection
            t={studio.t}
            panelTitle={studio.t.education}
            description={studio.t.educationDescription}
            title={studio.resume.sections.education.title}
            exampleTitle={studio.defaultResume.sections.education.title}
            entryLabel={studio.t.entry}
            addVisibleLabel={studio.t.addEntry}
            addHiddenLabel={studio.t.addHiddenEducation}
            hiddenTitle={studio.t.hiddenEducation}
            hiddenHelp={studio.t.hiddenEducationHelp}
            hiddenDeleteLabel={studio.t.deleteHiddenEducation}
            visibleEntries={studio.resume.sections.education.entries}
            hiddenEntries={studio.hiddenEducationEntries}
            exampleVisibleEntries={studio.defaultResume.sections.education.entries}
            exampleHiddenEntries={studio.defaultResume.sections.education._commentedEntries ?? []}
            onChangeTitle={(value) => studio.updateSectionTitle("education", value)}
            onUpdateEntry={(collectionKey, index, value) => {
              if (collectionKey === "entries" || collectionKey === "_commentedEntries") {
                studio.updateEducationEntry(collectionKey, index, value);
              }
            }}
            onAddEntry={(collectionKey) => {
              if (!collectionKey || collectionKey === "entries" || collectionKey === "_commentedEntries") {
                studio.addEducationEntry(collectionKey);
              }
            }}
            onRemoveEntry={(collectionKey, index) => {
              if (collectionKey === "entries" || collectionKey === "_commentedEntries") {
                studio.removeEducationEntry(collectionKey, index);
              }
            }}
            onReorderEntry={(collectionKey, fromIndex, toIndex) => {
              if (collectionKey === "entries" || collectionKey === "_commentedEntries") {
                studio.reorderEducationEntry(collectionKey, fromIndex, toIndex);
              }
            }}
            onHideEntry={studio.hideEducationEntry}
            onRestoreEntry={studio.restoreEducationEntry}
            visibleCollectionKey="entries"
            hiddenCollectionKey="_commentedEntries"
          />

          <EntriesSection
            t={studio.t}
            panelTitle={studio.t.certificates}
            description={studio.t.certificatesDescription}
            title={studio.certificates.title}
            exampleTitle={studio.defaultResume.sections.certificates.title}
            entryLabel={studio.t.certificateEntry}
            addVisibleLabel={studio.t.addCertificate}
            addHiddenLabel={studio.t.addHiddenCertificate}
            hiddenTitle={studio.t.hiddenCertificates}
            hiddenHelp={studio.t.hiddenCertificatesHelp}
            hiddenDeleteLabel={studio.t.deleteHiddenCertificate}
            visibleEntries={studio.certificateEntries}
            hiddenEntries={studio.hiddenCertificateEntries}
            exampleVisibleEntries={studio.defaultResume.sections.certificates.items.filter(
              (item) => !item.hidden
            )}
            exampleHiddenEntries={studio.defaultResume.sections.certificates.items.filter(
              (item) => item.hidden
            )}
            onChangeTitle={(value) => studio.updateSectionTitle("certificates", value)}
            onUpdateEntry={(collectionKey, index, value) => {
              if (collectionKey === "items" || collectionKey === "_commentedItems") {
                studio.updateCertificateEntry(collectionKey, index, value);
              }
            }}
            onAddEntry={(collectionKey) => {
              if (!collectionKey || collectionKey === "items" || collectionKey === "_commentedItems") {
                studio.addCertificateEntry(collectionKey);
              }
            }}
            onRemoveEntry={(collectionKey, index) => {
              if (collectionKey === "items" || collectionKey === "_commentedItems") {
                studio.removeCertificateEntry(collectionKey, index);
              }
            }}
            onReorderEntry={(collectionKey, fromIndex, toIndex) => {
              if (collectionKey === "items" || collectionKey === "_commentedItems") {
                studio.reorderCertificateEntry(collectionKey, fromIndex, toIndex);
              }
            }}
            onHideEntry={studio.hideCertificateEntry}
            onRestoreEntry={studio.restoreCertificateEntry}
            visibleCollectionKey="items"
            hiddenCollectionKey="_commentedItems"
          />

          <LanguagesSection
            t={studio.t}
            title={studio.resume.sections.languages.title}
            items={studio.languageItems}
            exampleTitle={studio.defaultResume.sections.languages.title}
            exampleItems={studio.defaultResume.sections.languages.items ?? []}
            levelOptions={studio.languageLevelOptions}
            onChangeTitle={(value) => studio.updateSectionTitle("languages", value)}
            onUpdateLanguage={studio.updateLanguageItem}
            onAddLanguage={studio.addLanguageItem}
            onRemoveLanguage={studio.removeLanguageItem}
            onReorderLanguages={studio.reorderLanguageItems}
          />

          <SkillsSection
            t={studio.t}
            title={studio.resume.sections.skills.title}
            items={studio.skills.items}
            columns={studio.skills.columns}
            exampleTitle={studio.defaultResume.sections.skills.title}
            exampleItems={studio.defaultSkills.items}
            onChangeTitle={(value) => studio.updateSectionTitle("skills", value)}
            onUpdateSkill={studio.updateSkillItem}
            onAddSkill={studio.addSkillItem}
            onRemoveSkill={studio.removeSkillItem}
            onChangeColumns={studio.updateSkillColumns}
          />
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
