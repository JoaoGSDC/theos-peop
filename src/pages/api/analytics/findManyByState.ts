import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { execute as executeState } from '../states/findOne';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { year, vacancyId, company } = req.query;
  const result = await execute(Number(year), Number(vacancyId), company as string);

  return res.status(200).json(result);
}

export async function execute(year: number, vacancyId: number, company: string): Promise<any> {
  let result: any = [];

  try {
    const statesWithProfessionals = await prisma.professional.groupBy({
      by: ['uf'],
      where: {
        Vacancy: {
          company,
        },
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
      },
      _count: {
        _all: true,
      },
    });

    const statesWithProfessionalsFiltered = statesWithProfessionals.filter((state) => state._count._all > 0);

    await Promise.all(
      statesWithProfessionalsFiltered.map(async (statesWithProfessional) => {
        const { acronym } = await executeState(statesWithProfessional.uf);

        result.push({
          count: statesWithProfessional['_count']['_all'],
          uf: acronym,
        });
      })
    );
  } catch (err) {
    console.log(err);
  }

  return result;
}
