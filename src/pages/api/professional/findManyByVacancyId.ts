import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as findOneVacancy } from '../vacancy/findOne';
import { execute as findOneProfessionalSkill } from '../professionalSkill/findOne';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, vacancyId } = req.query;
  const result = await execute(Number(id), Number(vacancyId));

  return res.status(200).json(result);
}

export async function execute(id: number, vacancyId: number): Promise<any[]> {
  let professionals: any[] = [];

  try {
    professionals = await prisma.professional.findMany({
      select: {
        id: true,
        cpf: true,
        name: true,
        vacancyId: true,
      },
      where: {
        vacancyId,
        NOT: {
          id,
        },
      },
    });

    professionals = await Promise.all(
      professionals.map(async (professional) => {
        let professionalSkills = await findOneProfessionalSkill(professional.id);
        let vacancy = await findOneVacancy(professional.vacancyId);

        let skills: any = {};
        for (const typeName of Object.keys(vacancy.skills)) {
          skills[typeName] = { ...vacancy.skills[typeName] };
          skills[typeName].items = [];

          for (const item of vacancy.skills[typeName].items) {
            let skill = professionalSkills.find((x) => x.skillId === item.id);
            if (skill) {
              skills[typeName].items.push({
                id: item.id,
                name: item.name,
                weight: item.weight,
                note: skill.note,
              });
            }
          }
        }

        return {
          ...professional,
          skills,
        };
      })
    );
  } catch (err) {
    console.log(err);
  }

  return professionals;
}
