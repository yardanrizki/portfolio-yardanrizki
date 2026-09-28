-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('JOURNAL', 'CONFERENCE', 'OTHER');

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT,
    "publicationType" "PublicationType" NOT NULL DEFAULT 'OTHER',
    "publishedDate" TIMESTAMP(3),
    "accreditation" TEXT,
    "descriptionEn" TEXT,
    "descriptionId" TEXT,
    "url" TEXT,
    "doi" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
