import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const records = await prisma.operationalRecord.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
    return NextResponse.json(records);
  } catch (error) {
    console.error('Failed to fetch records:', error);
    return NextResponse.json({ message: 'Failed to fetch records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timestamp, activityType, responsible, location, description, status, photos } = body;

    const newRecord = await prisma.operationalRecord.create({
      data: {
        timestamp: new Date(timestamp),
        activityType,
        responsible,
        location,
        description,
        status,
        photos: photos ? { urls: photos } : undefined,
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Failed to create record:', error);
    return NextResponse.json({ message: 'Failed to create record' }, { status: 500 });
  }
}
