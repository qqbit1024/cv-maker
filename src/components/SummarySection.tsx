import Field from "./Field";
import SectionCard from "./SectionCard";
import type { UIText } from "../i18n/uiText";

interface SummarySectionProps {
  t: UIText;
  title: string;
  content: string;
  exampleTitle: string;
  exampleContent: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
}

export default function SummarySection({
  t,
  title,
  content,
  exampleTitle,
  exampleContent,
  onChangeTitle,
  onChangeContent,
}: SummarySectionProps) {
  return (
    <SectionCard title={t.summary} description={t.summaryDescription}>
      <div className="field-grid">
        <Field
          label={t.sectionTitle}
          value={title}
          onChange={onChangeTitle}
          autoClearValue={exampleTitle}
        />
      </div>
      <Field
        label={t.summaryText}
        value={content}
        onChange={onChangeContent}
        autoClearValue={exampleContent}
        multiline
        rows={5}
      />
    </SectionCard>
  );
}
