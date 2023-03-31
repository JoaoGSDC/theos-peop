import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { skills } = req.body;
  const result = await execute(skills);

  return res.status(200).json(result);
}

export async function execute({ name, type, weight, vacancyId }: any): Promise<any[]> {
  let newSkills: any = {};

  try {
    newSkills = await prisma.skills.create({
      data: { name, type, weight, vacancyId },
    });
  } catch (err) {
    console.log(err);
  }

  return newSkills;
}
