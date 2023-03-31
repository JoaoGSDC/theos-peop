import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { byCpfAndVacancy as findOneProfessionalbyCpfAndVacancy } from '../professional/findOne';
import { execute as insertProfessionalSkill } from '../professionalSkill/insert';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { profissional } = req.body;
  const result = await execute(profissional);

  return res.status(200).json(result);
}

export async function execute(profissional: any): Promise<any[]> {
  let newProfessional: any = {};

  try {
    const { cpf, name, email, birthdate, city, uf, observation, salaryExpectation, curriculum, vacancyId, skills } =
      profissional;

    let professional = await findOneProfessionalbyCpfAndVacancy({ cpf, vacancyId: skills.vacancyId });

    if (professional) {
      return [];
    }

    newProfessional = await prisma.professional.create({
      data: {
        cpf,
        name,
        email,
        birthdate,
        city,
        uf,
        observation,
        salaryExpectation,
        curriculum,
        vacancyId,
      },
    });

    professional = await findOneProfessionalbyCpfAndVacancy({ cpf, vacancyId: skills.vacancyId });

    const professionalSkillTechnicalNote = {
      note: skills.technical.note,
      professionalId: professional.id,
      skillsId: skills.skillsId,
      vacancyId: skills.vacancyId,
    };

    await insertProfessionalSkill(professionalSkillTechnicalNote);

    const professionalSkillBehavioralNote = {
      note: skills.technical.note,
      professionalId: professional.id,
      skillsId: skills.skillsId,
      vacancyId: skills.vacancyId,
    };

    await insertProfessionalSkill(professionalSkillBehavioralNote);
  } catch (err) {
    console.log(err);
  }

  return newProfessional;
}
