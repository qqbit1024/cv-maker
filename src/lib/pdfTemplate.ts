import { PDFDocument, rgb, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { ResumeData, ResumeTemplateId, SkillsData } from "../types/resume";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;

const TEMPLATE_CONFIG = {
  classic: {
    leftMargin: 15,
    rightMargin: 20,
    topY: 800,
    bottomMargin: 40,
    rightColumnWidth: 110,
    headerMode: "inline" as const,
    headerNameSize: 14,
    headerTitleSize: 14,
    contactSize: 10.5,
    contactLineHeight: 12,
    summarySize: 9,
    summaryLineHeight: 10,
    sectionTitleSize: 12,
    sectionTitleGap: 15,
    sectionLineGap: 5,
    paragraphGap: 3,
    experienceHeadingSize: 10,
    experienceHeadingLineHeight: 12,
    experienceGapAfterHeading: 3,
    taskSize: 8.5,
    taskLineHeight: 9.3,
    taskBlockGap: 6,
    educationSize: 10,
    educationLineHeight: 12,
    skillsSize: 9,
    skillsRowHeight: 12,
  },
  compact: {
    leftMargin: 14,
    rightMargin: 16,
    topY: 806,
    bottomMargin: 34,
    rightColumnWidth: 102,
    headerMode: "inline" as const,
    headerNameSize: 13.2,
    headerTitleSize: 13.2,
    contactSize: 9.7,
    contactLineHeight: 11,
    summarySize: 8.4,
    summaryLineHeight: 9.2,
    sectionTitleSize: 11.2,
    sectionTitleGap: 12,
    sectionLineGap: 4,
    paragraphGap: 2,
    experienceHeadingSize: 9.4,
    experienceHeadingLineHeight: 10.8,
    experienceGapAfterHeading: 2,
    taskSize: 8.1,
    taskLineHeight: 8.8,
    taskBlockGap: 4,
    educationSize: 9.5,
    educationLineHeight: 10.6,
    skillsSize: 8.4,
    skillsRowHeight: 10.6,
  },
  minimal: {
    leftMargin: 24,
    rightMargin: 24,
    topY: 794,
    bottomMargin: 42,
    rightColumnWidth: 120,
    headerMode: "stacked" as const,
    headerNameSize: 18,
    headerTitleSize: 11.2,
    contactSize: 9.6,
    contactLineHeight: 11,
    summarySize: 8.9,
    summaryLineHeight: 10.2,
    sectionTitleSize: 11.4,
    sectionTitleGap: 14,
    sectionLineGap: 4,
    paragraphGap: 3,
    experienceHeadingSize: 9.8,
    experienceHeadingLineHeight: 11.5,
    experienceGapAfterHeading: 3,
    taskSize: 8.4,
    taskLineHeight: 9.1,
    taskBlockGap: 6,
    educationSize: 9.7,
    educationLineHeight: 11.2,
    skillsSize: 8.8,
    skillsRowHeight: 11.2,
  },
} as const satisfies Record<ResumeTemplateId, Record<string, number | string>>;

function interleaveArrays(columns: string[][]): string[] {
  const result: string[] = [];
  const maxRows = Math.max(...columns.map((column) => column.length), 0);

  for (let rowIndex = 0; rowIndex < maxRows; rowIndex += 1) {
    columns.forEach((column) => {
      if (column[rowIndex]) {
        result.push(column[rowIndex]);
      }
    });
  }

  return result;
}

function getSkillItems(skillsData: SkillsData): string[] {
  if (Array.isArray(skillsData.items)) {
    return skillsData.items.map((item) => String(item ?? "").trim()).filter(Boolean);
  }

  return interleaveArrays((skillsData as { list?: string[][] }).list ?? [])
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function getSkillsColumnCount(skillsData: SkillsData): number {
  const normalizedColumns = Number(skillsData.columns);

  if (Number.isInteger(normalizedColumns) && normalizedColumns >= 3 && normalizedColumns <= 6) {
    return normalizedColumns;
  }

  return 5;
}

function wrapText(text: unknown, maxWidth: number, font: PDFFont, size: number): string[] {
  const normalizedText = String(text ?? "").replace(/\s+/g, " ").trim();

  if (!normalizedText) {
    return [];
  }

  const words = normalizedText.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let index = 1; index < words.length; index += 1) {
    const nextWord = words[index];
    const candidate = `${currentLine} ${nextWord}`;

    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    lines.push(currentLine);
    currentLine = nextWord;
  }

  lines.push(currentLine);
  return lines;
}

function getHeaderContactText(header: ResumeData["header"]): string {
  if (Array.isArray(header?.contacts)) {
    return header.contacts
      .map((item) => String(item ?? "").trim())
      .filter(Boolean)
      .join(" | ");
  }

  return String(header?.contact ?? "").trim();
}

function getLanguagesText(section: ResumeData["sections"]["languages"]): string {
  if (Array.isArray(section?.items)) {
    return section.items
      .map((item) => {
        const name = String(item?.name ?? "").trim();
        const level = String(item?.level ?? "").trim();

        if (name && level) {
          return `${name}: ${level}`;
        }

        return name || level;
      })
      .filter(Boolean)
      .join(", ");
  }

  return String(section?.content ?? "").trim();
}

function getVisibleTaskTexts(tasks: ResumeData["sections"]["experience"]["jobs"][number]["tasks"]): string[] {
  return (tasks ?? [])
    .filter((task) => !task.hidden)
    .map((task) => String(task.text ?? "").trim())
    .filter(Boolean);
}

interface CreateResumePdfParams {
  resumeData: ResumeData;
  skillsData: SkillsData;
  fontBytes: ArrayBuffer;
  templateId?: ResumeTemplateId;
}

export async function createResumePdf({
  resumeData,
  skillsData,
  fontBytes,
  templateId = "classic",
}: CreateResumePdfParams): Promise<Uint8Array> {
  const template = TEMPLATE_CONFIG[templateId] ?? TEMPLATE_CONFIG.classic;
  const LEFT_MARGIN = template.leftMargin;
  const RIGHT_MARGIN = template.rightMargin;
  const TOP_Y = template.topY;
  const BOTTOM_MARGIN = template.bottomMargin;
  const RIGHT_COLUMN_WIDTH = template.rightColumnWidth;
  const RIGHT_COLUMN_X = PAGE_WIDTH - RIGHT_MARGIN - RIGHT_COLUMN_WIDTH;
  const EXPERIENCE_TITLE_MAX_WIDTH = RIGHT_COLUMN_X - LEFT_MARGIN - 10;
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(fontBytes);
  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let yPosition = TOP_Y;

  const addPage = () => {
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    yPosition = TOP_Y;
  };

  const ensureSpace = (requiredHeight: number) => {
    if (yPosition - requiredHeight < BOTTOM_MARGIN) {
      addPage();
    }
  };

  const drawLine = () => {
    page.drawLine({
      start: { x: LEFT_MARGIN, y: yPosition },
      end: { x: PAGE_WIDTH - RIGHT_MARGIN, y: yPosition },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  };

  const drawWrappedText = (
    content: string | string[],
    options: {
      x?: number;
      size?: number;
      lineHeight?: number;
      maxWidth?: number;
      paragraphGap?: number;
      bullet?: boolean;
      bulletIndent?: number;
    } = {}
  ) => {
    const {
      x = LEFT_MARGIN,
      size = 10,
      lineHeight = 12,
      maxWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN,
      paragraphGap = 0,
      bullet = false,
      bulletIndent = 0.5,
    } = options;
    const blocks = Array.isArray(content) ? content : [content];
    const bulletPrefix = "• ";
    const bulletOffset = bullet
      ? font.widthOfTextAtSize(bulletPrefix, size) + bulletIndent
      : 0;
    const availableWidth = bullet ? maxWidth - bulletOffset : maxWidth;

    blocks.forEach((block, blockIndex) => {
      const lines = wrapText(block, availableWidth, font, size);

      lines.forEach((line, lineIndex) => {
        ensureSpace(lineHeight);

        const isBulletStart = bullet && lineIndex === 0;
        const text = isBulletStart ? `${bulletPrefix}${line}` : line;
        const lineX = bullet && !isBulletStart ? x + bulletOffset : x;

        page.drawText(text, {
          x: lineX,
          y: yPosition,
          size,
          font,
        });

        yPosition -= lineHeight;
      });

      if (blockIndex < blocks.length - 1) {
        yPosition -= paragraphGap;
      }
    });
  };

  const drawSectionTitle = (title: string) => {
    ensureSpace(20);

    page.drawText(title, {
      x: LEFT_MARGIN,
      y: yPosition,
      size: template.sectionTitleSize,
      font,
    });

    yPosition -= template.sectionLineGap;
    ensureSpace(10);
    drawLine();
    yPosition -= template.sectionTitleGap;
  };

  const drawRightAlignedText = (
    text: string,
    { rightX, y, size = 10 }: { rightX: number; y: number; size?: number }
  ) => {
    const normalizedText = String(text ?? "").trim();

    if (!normalizedText) {
      return;
    }

    const textWidth = font.widthOfTextAtSize(normalizedText, size);
    page.drawText(normalizedText, {
      x: rightX - textWidth,
      y,
      size,
      font,
    });
  };

  const drawEducationLikeSection = (
    section:
      | ResumeData["sections"]["education"]
      | ResumeData["sections"]["certificates"]
      | ResumeData["sections"]["additionalEducation"]
      | undefined
  ) => {
    if (!section) {
      return;
    }

    const source = section as unknown as {
      title: string;
      entries?: Array<Record<string, unknown>>;
      degrees?: Array<Record<string, unknown>>;
      items?: Array<Record<string, unknown>>;
    };
    const entries = (source.entries || source.degrees || source.items || []).filter(
      (entry) => !entry.hidden
    );

    if (!entries.length) {
      return;
    }

    drawSectionTitle(source.title);

    entries.forEach((entry) => {
      const source = entry as { course?: string; title?: string; institution?: string; subtitle?: string; year?: string };
      const mainLine = source.course || source.title || "";
      const secondaryLine = source.institution || source.subtitle || "";
      const year = source.year || "";
      const mainLineMaxWidth = year
        ? RIGHT_COLUMN_X - LEFT_MARGIN - 10
        : PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN - 10;
      const mainLines = wrapText(mainLine, mainLineMaxWidth, font, 10);

      mainLines.forEach((line, lineIndex) => {
        ensureSpace(template.educationLineHeight);

        page.drawText(lineIndex === 0 ? `• ${line}` : line, {
          x: lineIndex === 0 ? LEFT_MARGIN : 28,
          y: yPosition,
          size: template.educationSize,
          font,
        });

        if (lineIndex === 0 && year) {
          drawRightAlignedText(year, {
            rightX: PAGE_WIDTH - RIGHT_MARGIN,
            y: yPosition,
            size: template.educationSize,
          });
        }

        yPosition -= template.educationLineHeight;
      });

      if (secondaryLine) {
        drawWrappedText(secondaryLine, {
          x: 60,
          size: 9,
          lineHeight: 11,
          maxWidth: 440,
        });
      }

      yPosition -= 4;
    });
  };

  const drawSimpleSection = (section?: { title: string; content: string }) => {
    if (!section || !section.content) {
      return;
    }

    drawSectionTitle(section.title);
    drawWrappedText(section.content, {
      x: LEFT_MARGIN,
      size: template.educationSize,
      lineHeight: template.educationLineHeight,
      maxWidth: PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN,
    });
    yPosition -= 6;
  };

  const header = resumeData.header;
  if (template.headerMode === "stacked") {
    const name = String(header.name ?? "").trim();
    const title = String(header.title ?? "").trim();
    const nameWidth = font.widthOfTextAtSize(name, template.headerNameSize);

    page.drawText(name, {
      x: (PAGE_WIDTH - nameWidth) / 2,
      y: yPosition,
      size: template.headerNameSize,
      font,
    });

    yPosition -= 18;

    if (title) {
      const titleWidth = font.widthOfTextAtSize(title, template.headerTitleSize);
      page.drawText(title, {
        x: (PAGE_WIDTH - titleWidth) / 2,
        y: yPosition,
        size: template.headerTitleSize,
        font,
      });
      yPosition -= 16;
    }
  } else {
    page.drawText(`${header.name} | ${header.title}`, {
      x: 180,
      y: yPosition,
      size: template.headerNameSize,
      font,
    });

    yPosition -= 20;
  }

  drawWrappedText(getHeaderContactText(header), {
    x: template.headerMode === "stacked" ? LEFT_MARGIN + 30 : LEFT_MARGIN,
    size: template.contactSize,
    lineHeight: template.contactLineHeight,
    maxWidth:
      template.headerMode === "stacked"
        ? PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN - 60
        : PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN,
  });

  yPosition -= 8;

  const summary = resumeData.sections.summary;
  const summaryContent = Array.isArray(summary.content)
    ? summary.content.join(" ")
    : summary.content;
  drawSectionTitle(summary.title);
  drawWrappedText(summaryContent, {
    size: template.summarySize,
    lineHeight: template.summaryLineHeight,
    paragraphGap: template.paragraphGap,
  });

  yPosition -= 8;

  const experience = resumeData.sections.experience;
  drawSectionTitle(experience.title);

  experience.jobs.filter((job) => !job.hidden).forEach((job) => {
    const period = String(job.period ?? "").trim();
    const titleLines = wrapText(
      `${job.title} | ${job.company}`,
      EXPERIENCE_TITLE_MAX_WIDTH,
      font,
      template.experienceHeadingSize
    );

    titleLines.forEach((line, lineIndex) => {
      ensureSpace(template.experienceHeadingLineHeight);

      page.drawText(line, {
        x: LEFT_MARGIN,
        y: yPosition,
        size: template.experienceHeadingSize,
        font,
      });

      if (lineIndex === 0 && period) {
        drawRightAlignedText(period, {
          rightX: PAGE_WIDTH - RIGHT_MARGIN,
          y: yPosition,
          size: template.experienceHeadingSize,
        });
      }

      yPosition -= template.experienceHeadingLineHeight;
    });

    yPosition -= template.experienceGapAfterHeading;

    getVisibleTaskTexts(job.tasks).forEach((task) => {
      drawWrappedText(task, {
        x: 30,
        size: template.taskSize,
        lineHeight: template.taskLineHeight,
        maxWidth: 540,
        bullet: true,
      });
    });

    yPosition -= template.taskBlockGap;
  });

  drawEducationLikeSection(resumeData.sections.education);
  drawEducationLikeSection(resumeData.sections.certificates);
  drawEducationLikeSection(resumeData.sections.additionalEducation);
  drawSimpleSection({
    ...resumeData.sections.languages,
    content: getLanguagesText(resumeData.sections.languages),
  });

  drawSectionTitle(resumeData.sections.skills.title);

  const interleavedSkills = getSkillItems(skillsData);
  const skillsPerRow = getSkillsColumnCount(skillsData);
  const rowHeight = template.skillsRowHeight;
  const availableWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
  const columnWidth = availableWidth / skillsPerRow;

  for (let index = 0; index < interleavedSkills.length; index += skillsPerRow) {
    ensureSpace(rowHeight);

    const rowSkills = interleavedSkills.slice(index, index + skillsPerRow);

    rowSkills.forEach((skill, columnIndex) => {
      page.drawText(`• ${skill}`, {
        x: LEFT_MARGIN + columnIndex * columnWidth,
        y: yPosition,
        size: template.skillsSize,
        font,
      });
    });

    yPosition -= rowHeight;
  }

  return pdfDoc.save();
}
