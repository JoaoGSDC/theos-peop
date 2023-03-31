import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { year, vacancyId, company } = req.query;
  const result = await execute(Number(year), Number(vacancyId), company as string);

  return res.status(200).json(result);
}

export async function execute(year: number, vacancyId: number, company: string): Promise<any> {
  let months: any[] = [];

  try {
    const january = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-01-01`) } }, { createdAt: { lt: new Date(`${year}-02-01`) } }],
      },
      _count: true,
    });

    const february = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-02-01`) } }, { createdAt: { lt: new Date(`${year}-03-01`) } }],
      },
      _count: true,
    });

    const march = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-03-01`) } }, { createdAt: { lt: new Date(`${year}-04-01`) } }],
      },
      _count: true,
    });

    const april = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-04-01`) } }, { createdAt: { lt: new Date(`${year}-05-01`) } }],
      },
      _count: true,
    });

    const may = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-05-01`) } }, { createdAt: { lt: new Date(`${year}-06-01`) } }],
      },
      _count: true,
    });

    const june = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-06-01`) } }, { createdAt: { lt: new Date(`${year}-07-01`) } }],
      },
      _count: true,
    });

    const july = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-07-01`) } }, { createdAt: { lt: new Date(`${year}-08-01`) } }],
      },
      _count: true,
    });

    const august = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-08-01`) } }, { createdAt: { lt: new Date(`${year}-09-01`) } }],
      },
      _count: true,
    });

    const september = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-09-01`) } }, { createdAt: { lt: new Date(`${year}-10-01`) } }],
      },
      _count: true,
    });

    const october = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-10-01`) } }, { createdAt: { lt: new Date(`${year}-11-01`) } }],
      },
      _count: true,
    });

    const november = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-11-01`) } }, { createdAt: { lt: new Date(`${year}-12-01`) } }],
      },
      _count: true,
    });

    const december = await prisma.professional.aggregate({
      where: {
        Vacancy: {
          company,
        },
        vacancyId: vacancyId > 0 ? vacancyId : undefined,
        AND: [{ createdAt: { gte: new Date(`${year}-12-01`) } }, { createdAt: { lt: new Date(`${year + 1}-01-01`) } }],
      },
      _count: true,
    });

    months = [
      { code: 1, name: 'Janeiro', count: january['_count'] },
      { code: 2, name: 'Fevereiro', count: february['_count'] },
      { code: 3, name: 'Março', count: march['_count'] },
      { code: 4, name: 'Abril', count: april['_count'] },
      { code: 5, name: 'Maio', count: may['_count'] },
      { code: 6, name: 'Junho', count: june['_count'] },
      { code: 7, name: 'Julho', count: july['_count'] },
      { code: 8, name: 'Agosto', count: august['_count'] },
      { code: 9, name: 'Setembro', count: september['_count'] },
      { code: 10, name: 'Outubro', count: october['_count'] },
      { code: 11, name: 'Novembro', count: november['_count'] },
      { code: 12, name: 'Dezembro', count: december['_count'] },
    ];
  } catch (err) {
    console.log(err);
  }

  return months;
}
