-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "h2s" DOUBLE PRECISION,
    "no2" DOUBLE PRECISION,
    "ws" DOUBLE PRECISION,
    "wd" DOUBLE PRECISION,
    "rain" DOUBLE PRECISION,
    "airT" DOUBLE PRECISION,
    "airRH" DOUBLE PRECISION,
    "battery" DOUBLE PRECISION,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceId_key" ON "Device"("deviceId");

-- CreateIndex
CREATE INDEX "Measurement_timestamp_idx" ON "Measurement"("timestamp");

-- CreateIndex
CREATE INDEX "Measurement_deviceId_timestamp_idx" ON "Measurement"("deviceId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_deviceId_timestamp_key" ON "Measurement"("deviceId", "timestamp");

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
