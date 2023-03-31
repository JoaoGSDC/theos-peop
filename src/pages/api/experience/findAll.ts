import { NextApiRequest, NextApiResponse } from 'next';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../connection';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await execute();

  return res.status(200).json(result);
}

export async function execute(): Promise<any> {
  let experiences: any[] = [];
  const DESC = 1;

  try {
    const db: Db = await connectToDatabase(process.env.MONGODB_URI);

    const experiencesCollection = db.collection('experience');

    experiences = (await experiencesCollection
      .find()
      .sort({
        ref: DESC,
      })
      .toArray()) as any;
  } catch (err) {
    console.log(err);
  }

  return experiences;
}
