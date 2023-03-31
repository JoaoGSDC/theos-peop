import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { profissionalSkill } = req.body;
  const result = await execute(profissionalSkill);

  return res.status(200).json(result);
}

export async function execute({ id, note, professionalId, skillId, vacancyId }: any): Promise<any> {
  let professionalSkill = {};

  try {
    professionalSkill = await prisma.professionalSkill.update({
      data: {
        note,
        professionalId,
        skillId,
        vacancyId,
      },
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return professionalSkill;
}
