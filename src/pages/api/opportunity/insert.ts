import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, description, skills, budget, exp } = req.body;
  const { company } = req.headers;

  const result = await execute(company as string, name, description, skills, budget, exp);

  return res.status(200).json(result);
}

export async function execute(
  company: string,
  name: string,
  description: string,
  skills: string,
  budget: string,
  exp: string
): Promise<any[]> {
  let opportunity: any = {};

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const opportunityCollection = db.collection('opportunities');

    opportunity = opportunityCollection.insertOne({
      company,
      name,
      description,
      skills,
      budget,
      exp,
    });
  } catch (err) {
    console.log(err);
  }

  return opportunity;
}
