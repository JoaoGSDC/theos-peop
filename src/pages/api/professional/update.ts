import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as updateProfessionalSkill } from '../professionalSkill/update';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { profissional } = req.body;
  const result = await execute(profissional);

  return res.status(200).json(result);
}

export async function execute(profissional: any): Promise<any[]> {
  let professional: any = {};

  try {
    const { id, cpf, name, email, birthdate, city, uf, observation, salaryExpectation, curriculum, skills } =
      profissional;

    professional = await prisma.professional.update({
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
      },
      where: {
        id,
      },
    });

    const professionalSkillTechnicalNote = {
      id: skills.technical.id,
      note: skills.technical.note,
      professionalId: id,
      skillsId: skills.skillsId,
      vacancyId: skills.vacancyId,
    };

    await updateProfessionalSkill(professionalSkillTechnicalNote);

    const professionalSkillBehavioralNote = {
      id: skills.behavioral.id,
      note: skills.technical.note,
      professionalId: id,
      skillsId: skills.skillsId,
      vacancyId: skills.vacancyId,
    };

    await updateProfessionalSkill(professionalSkillBehavioralNote);
  } catch (err) {
    console.log(err);
  }

  return professional;
}
