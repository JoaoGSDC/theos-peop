import { NextApiRequest, NextApiResponse } from 'next';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const result = await execute(id as string);

  return res.status(200).json(result);
}

export async function execute(id: string): Promise<any> {
  let experience: any[] = [];

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const experienceCollection = db.collection('experience');
    experience = await experienceCollection.find({ _id: new ObjectId(String(id)) }).toArray();
  } catch (err) {
    console.log(err);
  }

  return experience[0];
}
