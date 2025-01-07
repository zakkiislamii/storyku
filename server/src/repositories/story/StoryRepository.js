import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(storyData) {
  const { title, writer, synopsis, category, cover, tags, status, chapters } =
    storyData;
  try {
    const existingStory = await prisma.stories.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });
    if (existingStory) {
      throw "Story with this title already exists";
    }
    const story = await prisma.stories.create({
      data: {
        title,
        writer,
        synopsis,
        category,
        cover,
        tags,
        status,
        chapters: {
          create: chapters.map((chapter) => ({
            title: chapter.title,
            content: chapter.content,
          })),
        },
      },
    });
    return story;
  } catch (error) {
    throw new Error(error);
  }
}

export async function update(story_id, storyData) {
  const { title, writer, synopsis, category, cover, tags, status } = storyData;
  try {
    const currentStory = await prisma.stories.findUnique({
      where: {
        story_id,
      },
    });

    if (!currentStory) {
      throw new Error("Story not found");
    }
    if (title && title !== currentStory.title) {
      const existingStory = await prisma.stories.findFirst({
        where: {
          title: {
            equals: title,
            mode: "insensitive",
          },
          story_id: {
            not: story_id,
          },
        },
      });

      if (existingStory) {
        throw "Story with this title already exists";
      }
    }

    const updatedStory = await prisma.stories.update({
      where: {
        story_id,
      },
      data: {
        title,
        writer,
        synopsis,
        category,
        cover,
        tags,
        status,
      },
    });
    return updatedStory;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteStory(story_id) {
  try {
    const story = await prisma.stories.findUnique({
      where: {
        story_id,
      },
    });

    if (!story) {
      throw new Error("Couldn't find story");
    }

    await prisma.chapters.deleteMany({
      where: {
        story_id,
      },
    });

    return await prisma.stories.delete({
      where: {
        story_id,
      },
    });
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAll(page = 1) {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;
  try {
    const stories = await prisma.stories.findMany({
      skip: skip,
      take: pageSize,
      include: { chapters: true },
    });
    const totalStories = await prisma.stories.count();
    const totalPages = Math.ceil(totalStories / pageSize);
    return {
      stories,
      totalPages,
      currentPage: page,
      totalStories,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function search(query) {
  try {
    const stories = await prisma.stories.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { writer: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        chapters: true,
      },
    });
    return stories;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getByFilter(category, status) {
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (status) {
    filter.status = status;
  }
  try {
    const stories = await prisma.stories.findMany({
      where: filter,
      include: { chapters: true },
    });
    return stories;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getStoryById(story_id) {
  try {
    const story = await prisma.stories.findMany({
      where: {
        story_id,
      },
      include: {
        chapters: true,
      },
    });
    if (!story || story === null) {
      throw "Story not found";
    }
    return story;
  } catch (error) {
    throw new Error(`Failed to get story: ${error.message}`);
  }
}
