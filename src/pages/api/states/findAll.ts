import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute();

  return res.status(200).json(result);
}

export async function execute(): Promise<any> {
  let states: any[] = [];
  const ASC = -1;

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const statesCollection = db.collection('states');

    states = (await statesCollection
      .find()
      .sort({
        ref: ASC,
      })
      .toArray()) as any;
  } catch (err) {
    console.log(err);
  }

  return states;
}
