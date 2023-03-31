import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, name } = req.body;
  const result = await execute(id, name);

  return res.status(200).json(result);
}

export async function execute(id: number, name: string): Promise<any> {
  let sector: any = {};

  try {
    sector = await prisma.sector.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return sector;
}
