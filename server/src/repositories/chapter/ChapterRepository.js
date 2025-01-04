import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function update(chapter_id, chapterData) {
  const { title, content } = chapterData;
  try {
    const currentChapter = await prisma.chapters.findUnique({
      where: {
        chapter_id,
      },
    });
    if (!currentChapter) {
      throw "Chapter not found";
    }
    if (title && title !== currentChapter.title) {
      const existingChapter = await prisma.chapters.findFirst({
        where: {
          title: {
            equals: title,
            mode: "insensitive",
          },
          chapter_id: {
            not: chapter_id,
          },
        },
      });
      if (existingChapter) {
        throw "Chapter with this title already exists";
      }
    }

    const updatedChapter = await prisma.chapters.update({
      where: {
        chapter_id,
      },
      data: {
        title,
        content,
      },
    });
    return updatedChapter;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteChapter(chapter_id) {
  try {
    const chapter = await prisma.chapters.findUnique({
      where: {
        chapter_id,
      },
    });
    if (!chapter) {
      throw "Couldn't find chapter";
    }
    return await prisma.chapters.delete({
      where: {
        chapter_id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAll(story_id) {
  try {
    const chapter = await prisma.chapters.findMany({
      where: {
        story_id,
      },
    });
    if (!chapter) {
      throw "Chapter not found";
    }
    return chapter;
  } catch (error) {
    throw new Error(`Failed to get chapters: ${error.message}`);
  }
}
