import { PrismaClient } from '@prisma/client';
import { mockData } from '../../../data/mockData';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();

    for (const record of mockData) {
      await prisma.operationalRecord.create({
        data: {
          ...record,
          timestamp: new Date(record.timestamp),
          photos: record.photos ? { urls: record.photos } : undefined,
        },
      });
    }

    return NextResponse.json({ message: 'Data migrated successfully' });
  } catch (error) {
    console.error('Data migration failed:', error);
    return NextResponse.json({ message: 'Data migration failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
