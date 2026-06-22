import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const statements = [
  `CREATE TABLE IF NOT EXISTS Article (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    isPublished BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS Video (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    youtubeUrl TEXT NOT NULL,
    youtubePlaylistUrl TEXT NOT NULL,
    orderIndex INTEGER NOT NULL,
    level TEXT NOT NULL,
    durationLabel TEXT NOT NULL,
    isExclusive BOOLEAN NOT NULL DEFAULT false,
    isPublished BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS TestExcel (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    question TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    expectedAnswer TEXT NOT NULL,
    autoCheckType TEXT NOT NULL,
    estimatedTime TEXT NOT NULL,
    formulaSkills TEXT NOT NULL,
    isPublished BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS DigitalProduct (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    relatedTestId INTEGER,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    accessType TEXT NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT DigitalProduct_relatedTestId_fkey FOREIGN KEY (relatedTestId) REFERENCES TestExcel (id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS TestExplanation (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    testId INTEGER NOT NULL UNIQUE,
    answerText TEXT NOT NULL,
    tutorialText TEXT NOT NULL,
    solutionFileUrl TEXT,
    isLocked BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT TestExplanation_testId_fkey FOREIGN KEY (testId) REFERENCES TestExcel (id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS Challenge (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    sheetLabel TEXT NOT NULL,
    taskInstruction TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    estimatedTime TEXT NOT NULL,
    isPublished BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS Tip (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    formula TEXT,
    pattern TEXT,
    exampleInput TEXT,
    exampleOutput TEXT,
    useCase TEXT NOT NULL,
    level TEXT NOT NULL,
    tags TEXT NOT NULL,
    isPublished BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS Template (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    targetUser TEXT NOT NULL,
    features TEXT NOT NULL,
    price INTEGER NOT NULL,
    previewImageUrl TEXT,
    isPaid BOOLEAN NOT NULL DEFAULT true,
    isPublished BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS ClassProgram (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    format TEXT NOT NULL,
    description TEXT NOT NULL,
    targetUser TEXT NOT NULL,
    topics TEXT NOT NULL,
    ctaLabel TEXT NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS InhouseRequest (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    needType TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS Certificate (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    certificateCode TEXT NOT NULL UNIQUE,
    testTitle TEXT NOT NULL,
    score INTEGER NOT NULL,
    level TEXT NOT NULL,
    issuedAt DATETIME NOT NULL,
    skills TEXT NOT NULL,
    formulaMastered TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS Portfolio (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    displayName TEXT NOT NULL,
    summary TEXT NOT NULL,
    testsCompleted INTEGER NOT NULL,
    averageScore INTEGER NOT NULL,
    skills TEXT NOT NULL,
    formulaMastered TEXT NOT NULL,
    certificates TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
] as const

async function main() {
  await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON')
  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
