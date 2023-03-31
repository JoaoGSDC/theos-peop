import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute(0);

  return res.status(200).json(result);
}

export async function execute(id: number): Promise<any> {
  let professionalSkill: any = {};

  try {
    professionalSkill = await prisma.professionalSkill.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return professionalSkill;
}
