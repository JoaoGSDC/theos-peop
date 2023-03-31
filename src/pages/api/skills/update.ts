import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { skills } = req.body;
  const result = await execute(skills);

  return res.status(200).json(result);
}

export async function execute({ id, name, type, weight, vacancyId }: any): Promise<any[]> {
  let skills: any = {};

  try {
    skills = await prisma.skills.update({
      data: { name, type, weight, vacancyId },
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return skills;
}
