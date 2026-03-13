import EntriesSection from "../components/EntriesSection";
import ExperienceSection from "../components/ExperienceSection";
import HeaderSection from "../components/HeaderSection";
import LanguagesSection from "../components/LanguagesSection";
import SkillsSection from "../components/SkillsSection";
import SummarySection from "../components/SummarySection";
import { useStudioOutlet } from "../hooks/useStudioOutlet";

export default function HomePage() {
  const studio = useStudioOutlet();

  return (
    <>
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
    </>
  );
}
