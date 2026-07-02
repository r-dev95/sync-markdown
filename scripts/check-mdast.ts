import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Command, OptionValues } from 'commander';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

async function getFilePaths(args: OptionValues): Promise<string[]> {
  if (args.file) {
    return [args.file];
  }

  if (args.dir) {
    return (await Array.fromAsync(fs.glob(path.posix.join(args.dir, '*.md')))).sort();
  }

  return [];
}

const Processor = unified().use(remarkParse).use(remarkMath);

async function parseOneFile(srcPath: string) {
  const basename = path.basename(srcPath);
  const source = await fs.readFile(srcPath, { encoding: 'utf8' });
  const data = JSON.stringify(await Processor.parse(source), null, 2);
  return `
## [${basename}](../sources/${basename})

\`\`\`js
${data}
\`\`\`

`;
}

async function parseFiles(options: OptionValues) {
  const srcPaths = await getFilePaths(options);
  if (srcPaths.length === 0) throw new Error('変換元ファイルを指定してください。');

  const dstDir = path.resolve(path.dirname(srcPaths[0]!), options.out);
  await fs.mkdir(dstDir, { recursive: true });

  let index = 0;
  const results: string[] = [];
  for (const srcPath of srcPaths) {
    const result = await parseOneFile(srcPath);
    if (options.all) {
      results.push(result);
      console.log(`${index} src: ${srcPath}`);
    } else {
      const dstPath = path.join(dstDir, path.basename(srcPath));
      await fs.writeFile(dstPath, result);
      console.log(`${index} src: ${srcPath} dst: ${dstPath}`);
    }
    index++;
  }

  if (results.length > 0) {
    const dstPath = path.join(dstDir, 'mdast.md');
    console.log(`dst: ${dstPath}`);
    await fs.writeFile(dstPath, results.join('\n'));
  }
}

(async () => {
  const program = new Command();
  program
    .option('--all', 'Combine the results into a single file.')
    .option('-f, --file <file path>', 'Output the mdast of <file path>.')
    .option(
      '-d, --dir <directory path>',
      'Output the mdast of the files in <directory path>.',
      './docs/md-syntax/sources',
    )
    .option('-o, --out <directory path>', 'Output to <directory path>.', '../out');
  program.parse();

  const options = program.opts();

  await parseFiles(options);
})().catch((error) => {
  console.error(error);
});
