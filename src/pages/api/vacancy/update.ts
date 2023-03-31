import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as updateSkills } from '../skills/update';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { vacancy } = req.body;
  const result = await execute(vacancy);

  return res.status(200).json(result);
}

export async function execute({
  id,
  manager,
  maximumBudget,
  minimumBudget,
  name,
  observation,
  seniority,
  timeExperience,
  sectorId,
  skills,
}: any): Promise<any[]> {
  let vacancy: any = {};

  try {
    vacancy = await prisma.vacancy.update({
      data: {
        manager,
        maximumBudget,
        minimumBudget,
        name,
        observation,
        seniority,
        timeExperience,
        sectorId,
      },
      where: {
        id,
      },
    });

    skills.technical.items.map(async (technicalItem: any) => {
      let technicalSkills = {
        id: technicalItem.id,
        name: technicalItem.name,
        type: skills.technical.type,
        weight: technicalItem.weight,
        vacancyId: id,
      };

      await updateSkills(technicalSkills);
    });

    skills.behavior.items.map(async (behaviorItem: any) => {
      let behaviorSkills = {
        id: behaviorItem.id,
        name: behaviorItem.name,
        type: skills.behavior.type,
        weight: behaviorItem.weight,
        vacancyId: id,
      };

      await updateSkills(behaviorSkills);
    });
  } catch (err) {
    console.log(err);
  }

  return vacancy;
}
