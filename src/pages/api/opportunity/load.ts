import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute();
  return res.status(200).json(result);
}

export async function execute(): Promise<any[]> {
  let opportunity: any[] = [];

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const opportunityCollection = db.collection('vacancies');

    opportunity = await opportunityCollection.find().toArray();
  } catch (err) {
    console.log(err);
  }

  return opportunity;
}
