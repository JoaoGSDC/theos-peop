import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute();
  return res.status(200).json(result);
}

export async function execute(): Promise<any[]> {
  let professionalSkills: any[] = [];

  try {
    professionalSkills = await prisma.professionalSkill.findMany();
  } catch (err) {
    console.log(err);
  }

  return professionalSkills;
}
