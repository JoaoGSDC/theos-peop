import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as insertSkills } from '../skills/insert';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { vacancy } = req.body;
  const result = await execute(vacancy);

  return res.status(200).json(result);
}

export async function execute({
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
  let newVacancy: any = {};

  try {
    newVacancy = await prisma.vacancy.create({
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
    });

    skills.technical.items.map(async (technicalItem: any) => {
      let technicalSkills = {
        name: technicalItem.name,
        type: skills.technical.type,
        weight: technicalItem.weight,
        vacancyId: newVacancy.id,
      };

      await insertSkills(technicalSkills);
    });

    skills.behavior.items.map(async (behaviorItem: any) => {
      let behaviorSkills = {
        name: behaviorItem.name,
        type: skills.behavior.type,
        weight: behaviorItem.weight,
        vacancyId: newVacancy.id,
      };

      await insertSkills(behaviorSkills);
    });
  } catch (err) {
    console.log(err);
  }

  return newVacancy;
}
