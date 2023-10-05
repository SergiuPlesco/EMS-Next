-- CreateTable
CREATE TABLE "_UserManagers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserManagers_AB_unique" ON "_UserManagers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserManagers_B_index" ON "_UserManagers"("B");

-- AddForeignKey
ALTER TABLE "_UserManagers" ADD CONSTRAINT "_UserManagers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserManagers" ADD CONSTRAINT "_UserManagers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
