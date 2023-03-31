import { NextApiRequest, NextApiResponse } from 'next';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const result = await execute(id as string);

  return res.status(200).json(result);
}

export async function execute(id: string): Promise<any> {
  let state: any[] = [];

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const stateCollection = db.collection('states');
    state = await stateCollection.find({ _id: new ObjectId(String(id)) }).toArray();
  } catch (err) {
    console.log(err);
  }

  return state[0];
}
