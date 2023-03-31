import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const result = await execute(Number(id));

  return res.status(200).json(result);
}

export async function execute(id: number): Promise<any> {
  let sector: any = {};

  try {
    sector = await prisma.sector.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return sector;
}
