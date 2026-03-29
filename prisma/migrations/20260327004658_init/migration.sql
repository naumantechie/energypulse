-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "population" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyRecord" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "solarGwh" DOUBLE PRECISION NOT NULL,
    "windGwh" DOUBLE PRECISION NOT NULL,
    "HydroGwh" DOUBLE PRECISION NOT NULL,
    "nuclearGwh" DOUBLE PRECISION NOT NULL,
    "fossilGwh" DOUBLE PRECISION NOT NULL,
    "totalGwh" DOUBLE PRECISION NOT NULL,
    "renewablePercent" DOUBLE PRECISION NOT NULL,
    "carbonIntensity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnergyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveGrid" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "carbonIntensity" DOUBLE PRECISION NOT NULL,
    "renewablePercent" DOUBLE PRECISION NOT NULL,
    "fossilPercent" DOUBLE PRECISION NOT NULL,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveGrid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "EnergyRecord_countryId_idx" ON "EnergyRecord"("countryId");

-- CreateIndex
CREATE INDEX "EnergyRecord_year_idx" ON "EnergyRecord"("year");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyRecord_countryId_year_key" ON "EnergyRecord"("countryId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "LiveGrid_countryCode_key" ON "LiveGrid"("countryCode");

-- CreateIndex
CREATE INDEX "LiveGrid_countryCode_idx" ON "LiveGrid"("countryCode");

-- AddForeignKey
ALTER TABLE "EnergyRecord" ADD CONSTRAINT "EnergyRecord_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
