-- CreateTable
CREATE TABLE "SecurityTopic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "security_topic_id" TEXT NOT NULL,
    "security_topic_name" TEXT NOT NULL,
    "summary" TEXT
);

-- CreateTable
CREATE TABLE "SecuritySection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "security_section_id" TEXT NOT NULL,
    "security_section_name" TEXT NOT NULL,
    "summary" TEXT,
    "security_topic_id" TEXT NOT NULL,
    CONSTRAINT "SecuritySection_security_topic_id_fkey" FOREIGN KEY ("security_topic_id") REFERENCES "SecurityTopic" ("security_topic_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SecurityControl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "control_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level1" BOOLEAN NOT NULL,
    "level2" BOOLEAN NOT NULL,
    "level3" BOOLEAN NOT NULL,
    "cwe" REAL,
    "nist" TEXT,
    "link" TEXT,
    "security_section_id" TEXT NOT NULL,
    CONSTRAINT "SecurityControl_security_section_id_fkey" FOREIGN KEY ("security_section_id") REFERENCES "SecuritySection" ("security_section_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SecurityTopic_security_topic_id_key" ON "SecurityTopic"("security_topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "SecuritySection_security_section_id_key" ON "SecuritySection"("security_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityControl_control_id_key" ON "SecurityControl"("control_id");
