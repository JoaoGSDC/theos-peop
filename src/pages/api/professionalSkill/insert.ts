import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { profissionalSkill } = req.body;
  const result = await execute(profissionalSkill);

  return res.status(200).json(result);
}

export async function execute({ note, professionalId, skillId, vacancyId }: any): Promise<any> {
  let newProfessionalSkill = {};

  try {
    newProfessionalSkill = await prisma.professionalSkill.create({
      data: {
        note,
        professionalId,
        skillId,
        vacancyId,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return newProfessionalSkill;
}
