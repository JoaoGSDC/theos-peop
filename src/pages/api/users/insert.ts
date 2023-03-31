import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import hashPassword from '../../../utils/hashPassword';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { company, email, password, name } = req.body;
  const result = await execute(company, email, password, name);

  return res.status(200).json(result);
}

export async function execute(company: string, email: string, password: string, name: string): Promise<any> {
  let newUsers: any = {};

  try {
    const hashedPassword = hashPassword(password);

    newUsers = await prisma.users.create({
      data: {
        company,
        name,
        email,
        password: hashedPassword.hash,
        salt: hashedPassword.salt,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return newUsers;
}
