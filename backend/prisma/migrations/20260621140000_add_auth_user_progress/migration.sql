CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "avatarUrl" TEXT,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "UserProfile" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "bio" TEXT,
  "level" TEXT NOT NULL DEFAULT 'Pemula',
  "headline" TEXT,
  "location" TEXT,
  "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "UserProfile_userId_key" ON "UserProfile"("userId");

CREATE TABLE IF NOT EXISTS "UserProgress" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "level" TEXT NOT NULL DEFAULT 'Pemula',
  "totalScore" INTEGER NOT NULL DEFAULT 0,
  "testsCompleted" INTEGER NOT NULL DEFAULT 0,
  "challengesCompleted" INTEGER NOT NULL DEFAULT 0,
  "competitionsCompleted" INTEGER NOT NULL DEFAULT 0,
  "averageScore" REAL NOT NULL DEFAULT 0,
  "formulasMastered" JSONB NOT NULL DEFAULT '[]',
  "skills" JSONB NOT NULL DEFAULT '[]',
  "rank" INTEGER,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "UserProgress_userId_key" ON "UserProgress"("userId");

CREATE TABLE IF NOT EXISTS "UserSession" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "refreshToken" TEXT NOT NULL,
  "expiresAt" DATETIME NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "UserSession_refreshToken_key" ON "UserSession"("refreshToken");

CREATE TABLE IF NOT EXISTS "PlayAttempt" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT,
  "guestSessionId" TEXT,
  "playCaseId" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "mode" TEXT NOT NULL,
  "score" INTEGER NOT NULL,
  "totalPoints" INTEGER NOT NULL,
  "accuracy" REAL NOT NULL,
  "correctCount" INTEGER NOT NULL,
  "questionCount" INTEGER NOT NULL,
  "durationSeconds" INTEGER,
  "isSaved" BOOLEAN NOT NULL DEFAULT false,
  "answers" JSONB NOT NULL,
  "skillsEarned" JSONB NOT NULL DEFAULT '[]',
  "formulasEarned" JSONB NOT NULL DEFAULT '[]',
  "startedAt" DATETIME,
  "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PlayAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ChallengeCompletion" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "challengeId" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'completed',
  "skillsEarned" JSONB NOT NULL DEFAULT '[]',
  "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ChallengeCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "UserCertificate" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "certificateCode" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "level" TEXT NOT NULL,
  "score" INTEGER NOT NULL,
  "formulaMastered" JSONB NOT NULL DEFAULT '[]',
  "skillEvidence" JSONB NOT NULL DEFAULT '[]',
  "relatedPlayCases" JSONB NOT NULL DEFAULT '[]',
  "completedTests" INTEGER NOT NULL DEFAULT 0,
  "completedChallenges" INTEGER NOT NULL DEFAULT 0,
  "accuracy" REAL NOT NULL DEFAULT 0,
  "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "UserCertificate_certificateCode_key" ON "UserCertificate"("certificateCode");