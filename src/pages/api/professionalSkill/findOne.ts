import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { professionalId } = req.query;
  const result = await execute(Number(professionalId));

  return res.status(200).json(result);
}

export async function execute(professionalId: number): Promise<any[]> {
  let professionalSkill: any = [];

  try {
    professionalSkill = await prisma.professionalSkill.findMany({
      where: {
        professionalId,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return professionalSkill;
}
