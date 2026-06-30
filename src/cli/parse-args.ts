import { Command, Option } from 'commander';
import z from 'zod';
import { Platforms } from '../types/index.js';

const schema = z
  .object({
    file: z.string().optional(),
    dir: z.string().optional(),
    out: z.string(),
    from: z.enum(Platforms),
    to: z.enum(Platforms),
  })
  .refine(({ file, dir }) => !!file !== !!dir, {
    message: '--file/-f と --dir/-d はどちらか一方のみ指定してください',
  });

export type Options = z.infer<typeof schema>;

export function parseArgs(argv = process.argv) {
  const program = new Command();

  program
    .description('This is a CLI tool for transforming Markdown syntax that differs across platforms.')
    .option('-f, --file <file path>', 'Transform <file path>.')
    .option('-d, --dir <directory path>', 'Transform the files in <directory path>.')
    .option('-o, --out <directory path>', 'Output the transformed file to <directory path>.', 'out')
    .addOption(new Option('--from <name>', 'Transform from the <name> platform syntax.').choices(Platforms))
    .addOption(new Option('--to <name>', 'Transform to the <name> platform syntax.').choices(Platforms));

  program.parse(argv);
  return schema.parse(program.opts());
}
