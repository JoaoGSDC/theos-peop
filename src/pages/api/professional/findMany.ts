import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as findOneVacancy } from '../vacancy/findOne';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { company } = req.headers;
  const { limit } = req.query;

  const result = await execute(company as string, Number(limit));

  return res.status(200).json(result);
}

export async function execute(company: string, limit: number = 0): Promise<any[]> {
  let professionals: any[] = [];

  try {
    professionals = await prisma.professional.findMany({
      take: Number.isNaN(limit) ? undefined : limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        Vacancy: {
          company,
        },
        active: true,
      },
      select: {
        id: true,
        cpf: true,
        name: true,
        vacancyId: true,
        createdAt: true,
      },
    });

    professionals = await Promise.all(
      professionals.map(async (professional) => {
        let vacancy = await findOneVacancy(professional.vacancyId);

        return {
          ...professional,
          vacancy: vacancy.name,
        };
      })
    );
  } catch (err) {
    console.log(err);
    professionals = [];
  }

  return professionals;
}
