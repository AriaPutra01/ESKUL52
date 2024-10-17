-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "no_wa" TEXT NOT NULL,
    "alasan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "id_eskul" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pendaftar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eskul" (
    "id" TEXT NOT NULL,
    "nama_eskul" TEXT NOT NULL,
    "jadwal" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aktif',
    "logo" TEXT,
    "foto" TEXT,
    "deskripsi" TEXT NOT NULL,
    "id_pembina" TEXT NOT NULL,
    "id_ketua" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eskul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatatanKehadiran" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id_anggota" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatatanKehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaftarKehadiran" (
    "id" TEXT NOT NULL,
    "doc" TIMESTAMP(3) NOT NULL,
    "id_eskul" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DaftarKehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anggota" (
    "id" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "no_wa" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "id_eskul" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anggota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Eskul_id_pembina_key" ON "Eskul"("id_pembina");

-- CreateIndex
CREATE UNIQUE INDEX "Eskul_id_ketua_key" ON "Eskul"("id_ketua");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendaftar" ADD CONSTRAINT "Pendaftar_id_eskul_fkey" FOREIGN KEY ("id_eskul") REFERENCES "Eskul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eskul" ADD CONSTRAINT "Eskul_id_pembina_fkey" FOREIGN KEY ("id_pembina") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eskul" ADD CONSTRAINT "Eskul_id_ketua_fkey" FOREIGN KEY ("id_ketua") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatatanKehadiran" ADD CONSTRAINT "CatatanKehadiran_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "Anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaftarKehadiran" ADD CONSTRAINT "DaftarKehadiran_id_eskul_fkey" FOREIGN KEY ("id_eskul") REFERENCES "Eskul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anggota" ADD CONSTRAINT "Anggota_id_eskul_fkey" FOREIGN KEY ("id_eskul") REFERENCES "Eskul"("id") ON DELETE CASCADE ON UPDATE CASCADE;
