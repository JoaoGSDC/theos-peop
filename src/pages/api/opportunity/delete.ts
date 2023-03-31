import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute('', 0);

  return res.status(200).json(result);
}

export async function execute(cpf: string, vacancyId: number): Promise<any[]> {
  let opportunity: any = {};

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const opportunityCollection = db.collection('opportunities');

    opportunity = opportunityCollection.deleteOne({
      where: {
        cpf,
        vacancyId,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return opportunity;
}
