import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';
import verifyPassword from '../../../utils/verifyPassword';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const result = await execute(email, password);

  return res.status(200).json(result);
}

export async function execute(email: string, password: string): Promise<any> {
  let response: any;

  try {
    const user = (
      await prisma.users.findMany({
        where: {
          email,
        },
      })
    )[0];

    const isValid = verifyPassword(password, user.password, user.salt);

    if (!isValid) {
      return;
    }

    const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET as string, { expiresIn: '720h' });

    response = {
      token,
      company: user.company,
      name: user.name,
    };
  } catch (err) {
    console.log(err);
  }

  return response;
}
