-- CreateEnum
CREATE TYPE "Category" AS ENUM ('financial', 'technology', 'health');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('publish', 'draft');

-- CreateTable
CREATE TABLE "Stories" (
    "story_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "cover" TEXT NOT NULL,
    "tags" TEXT[],
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stories_pkey" PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "Chapters" (
    "chapter_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("chapter_id")
);

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Stories"("story_id") ON DELETE RESTRICT ON UPDATE CASCADE;
