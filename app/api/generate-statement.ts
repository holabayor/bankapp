import path from 'path';
import { StatementGenerator } from '@/statementGenerator';

const inputFile = path.resolve('./test_input.csv'); // Update the path as needed

export default async function generateStatement() {
  const statementGenerator = new StatementGenerator();

  try {
    await statementGenerator.run(inputFile);
    console.log('PDF statement generated successfully.');
  } catch (error) {
    console.error('Error generating PDF statement:', error);
  }
}
