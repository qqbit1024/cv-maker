const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const fontkit = require("@pdf-lib/fontkit");

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const LEFT_MARGIN = 15;
const RIGHT_MARGIN = 20;
const TOP_Y = 800;
const BOTTOM_MARGIN = 40;
const RIGHT_COLUMN_WIDTH = 110;
const RIGHT_COLUMN_X = PAGE_WIDTH - RIGHT_MARGIN - RIGHT_COLUMN_WIDTH;
const EXPERIENCE_TITLE_MAX_WIDTH = RIGHT_COLUMN_X - LEFT_MARGIN - 10;

const language = process.argv[2];

if (!language) {
  throw new Error("Укажи язык: node cv.js ru");
}

const getDataPath = (primaryName, fallbackName) => {
  const primaryPath = path.join(__dirname, primaryName);

  if (fs.existsSync(primaryPath)) {
    return primaryPath;
  }

  const fallbackPath = path.join(__dirname, fallbackName);

  if (fs.existsSync(fallbackPath)) {
    return fallbackPath;
  }

  throw new Error(
    `Не найден ни ${primaryName}, ни ${fallbackName}. Добавь приватный файл или example-версию.`
  );
};

const resumeData = require(getDataPath(`${language}.json`, `${language}.example.json`));
const skillsData = require(getDataPath("skills.json", "skills.example.json"));

function interleaveArrays(columns) {
  const result = [];
  const maxRows = Math.max(...columns.map((column) => column.length));

  for (let rowIndex = 0; rowIndex < maxRows; rowIndex += 1) {
    columns.forEach((column) => {
      if (column[rowIndex]) {
        result.push(column[rowIndex]);
      }
    });
  }

  return result;
}

function wrapText(text, maxWidth, font, size) {
  const normalizedText = String(text ?? "").replace(/\s+/g, " ").trim();

  if (!normalizedText) {
    return [];
  }

  const words = normalizedText.split(" ");
  const lines = [];
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

(async () => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontPath = "fonts/helvetica_regular.otf";
  if (!fs.existsSync(fontPath)) {
    throw new Error(`Шрифт не найден по пути: ${fontPath}`);
  }

  const fontBytes = fs.readFileSync(fontPath);
  const font = await pdfDoc.embedFont(fontBytes);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let yPosition = TOP_Y;

  const addPage = () => {
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    yPosition = TOP_Y;
  };

  const ensureSpace = (requiredHeight) => {
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
    content,
    {
      x = LEFT_MARGIN,
      size = 10,
      lineHeight = 12,
      maxWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN,
      paragraphGap = 0,
      bullet = false,
      bulletIndent = 0.5,
    } = {}
  ) => {
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

  const drawSectionTitle = (title) => {
    ensureSpace(20);

    page.drawText(title, {
      x: LEFT_MARGIN,
      y: yPosition,
      size: 12,
      font,
    });

    yPosition -= 5;
    ensureSpace(10);
    drawLine();
    yPosition -= 15;
  };

  const drawRightAlignedText = (text, { rightX, y, size = 10 }) => {
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

  const drawEducationLikeSection = (section) => {
    if (!section) {
      return;
    }

    const entries = section.entries || section.degrees || section.items || [];
    if (!entries.length) {
      return;
    }

    drawSectionTitle(section.title);

    entries.forEach((entry) => {
      const mainLine = entry.course || entry.title || "";
      const secondaryLine = entry.institution || entry.subtitle || "";
      const year = entry.year || "";
      const mainLineMaxWidth = year
        ? RIGHT_COLUMN_X - LEFT_MARGIN - 10
        : PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN - 10;
      const mainLines = wrapText(mainLine, mainLineMaxWidth, font, 10);

      mainLines.forEach((line, lineIndex) => {
        ensureSpace(12);

        page.drawText(lineIndex === 0 ? `• ${line}` : line, {
          x: lineIndex === 0 ? LEFT_MARGIN : 28,
          y: yPosition,
          size: 10,
          font,
        });

        if (lineIndex === 0 && year) {
          drawRightAlignedText(year, {
            rightX: PAGE_WIDTH - RIGHT_MARGIN,
            y: yPosition,
            size: 10,
          });
        }

        yPosition -= 12;
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

  const drawSimpleSection = (section) => {
    if (!section || !section.content) {
      return;
    }

    drawSectionTitle(section.title);
    drawWrappedText(section.content, {
      x: LEFT_MARGIN,
      size: 10,
      lineHeight: 12,
      maxWidth: PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN,
    });
    yPosition -= 6;
  };

  const header = resumeData.header;
  page.drawText(`${header.name} | ${header.title}`, {
    x: 180,
    y: yPosition,
    size: 14,
    font,
  });

  yPosition -= 20;
  drawWrappedText(header.contact, {
    size: 10.5,
    lineHeight: 12,
  });

  yPosition -= 8;

  const summary = resumeData.sections.summary;
  const summaryContent = Array.isArray(summary.content)
    ? summary.content.join(" ")
    : summary.content;
  drawSectionTitle(summary.title);
  drawWrappedText(summaryContent, {
    size: 9,
    lineHeight: 10,
    paragraphGap: 3,
  });

  yPosition -= 8;

  const experience = resumeData.sections.experience;
  drawSectionTitle(experience.title);

  experience.jobs.forEach((job) => {
    const period = String(job.period ?? "").trim();
    const titleLines = wrapText(
      `${job.title} | ${job.company}`,
      EXPERIENCE_TITLE_MAX_WIDTH,
      font,
      10
    );

    titleLines.forEach((line, lineIndex) => {
      ensureSpace(12);

      page.drawText(line, {
        x: LEFT_MARGIN,
        y: yPosition,
        size: 10,
        font,
      });

      if (lineIndex === 0 && period) {
        drawRightAlignedText(period, {
          rightX: PAGE_WIDTH - RIGHT_MARGIN,
          y: yPosition,
          size: 10,
        });
      }

      yPosition -= 12;
    });

    yPosition -= 3;

    job.tasks.forEach((task) => {
      drawWrappedText(task, {
        x: 30,
        size: 8.5,
        lineHeight: 9.3,
        maxWidth: 540,
        bullet: true,
      });
    });

    yPosition -= 6;
  });

  drawEducationLikeSection(resumeData.sections.education);
  drawEducationLikeSection(resumeData.sections.certificates);
  drawEducationLikeSection(resumeData.sections.additionalEducation);
  drawSimpleSection(resumeData.sections.languages);

  const skillsTitle = resumeData.sections.skills.title;
  drawSectionTitle(skillsTitle);

  const skills = interleaveArrays(skillsData.list);
  const skillsPerRow = 5;
  const rowHeight = 12;

  for (let index = 0; index < skills.length; index += skillsPerRow) {
    ensureSpace(rowHeight);

    const rowSkills = skills.slice(index, index + skillsPerRow);

    rowSkills.forEach((skill, columnIndex) => {
      page.drawText(`• ${skill}`, {
        x: 20 + columnIndex * 115,
        y: yPosition,
        size: 9,
        font,
      });
    });

    yPosition -= rowHeight;
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`Pavel_Merkulov_CV_${language}.pdf`, pdfBytes);

  console.log("PDF создан!");
})();
