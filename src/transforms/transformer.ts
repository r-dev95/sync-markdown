import matter from 'gray-matter';

import type { FrontMatterData, PluginOptions } from '../types/index.js';
import transformBody from './transform-body.js';
import transformFrontMatter from './transform-front-matter.js';

export async function transformer(source: string, options: PluginOptions): Promise<string> {
  const parsed = matter(source);

  const data = parsed.data as FrontMatterData;
  const transformedData = transformFrontMatter(data, options);

  const body = parsed.content;
  const transformedBody = await transformBody(body, options);

  return matter.stringify(transformedBody, transformedData);
}
