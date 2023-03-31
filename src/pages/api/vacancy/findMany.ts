import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { company } = req.headers;
  const result = await execute(company as string);

  return res.status(200).json(result);
}

export async function execute(company: string): Promise<any[]> {
  let vacancies: any[] = [];

  try {
    vacancies = await prisma.vacancy.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      where: {
        active: true,
        company,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return vacancies;
}
