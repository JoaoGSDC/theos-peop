import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as findAllSkills } from '../skills/findAll';
import { execute as findOneSeniority } from '../seniority/findOne';
import { execute as findOneExperience } from '../experience/findOne';
import { execute as findOneSector } from '../sector/findOne';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const result = await execute(Number(id));

  return res.status(200).json(result);
}

export async function execute(id: number): Promise<any> {
  let vacancy: any = {};

  try {
    vacancy = await prisma.vacancy.findUnique({
      where: {
        id,
      },
    });

    const sector = await findOneSector(vacancy.sectorId);

    const seniority = await findOneSeniority(vacancy.seniority);
    const timeExperience = await findOneExperience(vacancy.timeExperience);

    let allTechnicalSkills = await findAllSkills(id, 1);
    let allBehaviorSkills = await findAllSkills(id, 2);

    vacancy = {
      ...vacancy,
      seniorityName: seniority.name,
      timeExperienceName: timeExperience.name,
      sectorName: sector.name,
      skills: {
        technical: {
          type: 1,
          items: allTechnicalSkills,
        },
        behavior: { type: 2, items: allBehaviorSkills },
      },
    };
  } catch (err) {
    console.log(err);
  }

  return vacancy;
}
