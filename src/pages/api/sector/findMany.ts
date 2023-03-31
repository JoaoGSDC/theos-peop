import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute();

  return res.status(200).json(result);
}

export async function execute(): Promise<any> {
  let sectors: any[] = [];

  try {
    sectors = await prisma.sector.findMany({
      select: {
        id: true,
        createdAt: true,
        name: true,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return sectors;
}
