import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { vacancyId, type } = req.query;
  const result = await execute(Number(vacancyId), Number(type));

  return res.status(200).json(result);
}

export async function execute(vacancyId: number, type: number): Promise<any[]> {
  let skills: any[] = [];

  try {
    skills = await prisma.skills.findMany({
      select: {
        id: true,
        name: true,
        weight: true,
      },
      where: {
        type,
        vacancyId,
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }

  return skills;
}
