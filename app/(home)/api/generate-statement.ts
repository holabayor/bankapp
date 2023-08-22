import { StatementGenerator } from '@/statementGenerator';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function generateStatement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const inputFile = './input.csv';

  try {
    const statement = new StatementGenerator();
    await statement.run(inputFile);
    res.status(200).json({ message: 'PDF statement generated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF statement.' });
  }
}
