import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;
  const result = await execute(name);

  return res.status(200).json(result);
}

export async function execute(name: string): Promise<any> {
  let newSector: any = {};

  try {
    newSector = await prisma.sector.create({
      data: {
        name,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return newSector;
}
