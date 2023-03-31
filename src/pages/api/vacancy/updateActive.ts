import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, active } = req.body;
  const result = await execute({ id, active });

  return res.status(200).json(result);
}

export async function execute({ id, active }: any): Promise<any> {
  let vacancy: any = {};

  try {
    vacancy = await prisma.vacancy.update({
      data: {
        active,
      },
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return vacancy;
}
