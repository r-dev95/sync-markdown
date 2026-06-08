import { FrontMatterData, PluginOptions } from '../types/transform.js';

export default function transformFrontMatter(
  source: FrontMatterData,
  options: PluginOptions,
): FrontMatterData {
  const { from, to } = options;

  if (from === to) {
    throw EvalError('The source and destination are the same.');
  }

  if (from === 'zenn' && to === 'qiita') {
    const title = `${source.title ? `${source.emoji ? `${source.emoji} ${source.title}` : source.title}` : ''}`;
    const tags = source.topics ?? [];
    const privateFlag = typeof source.published === 'boolean' ? !source.published : true;
    return {
      title: title,
      tags: tags,
      private: privateFlag,
      updated_at: '',
      id: null,
      organization_url_name: null,
      slide: false,
      ignorePublish: false,
    };
  }

  if (from === 'qiita' && to === 'zenn') {
    const title = source.title ?? '';
    const topics = source.tags ?? [];
    const published = typeof source.private === 'boolean' ? !source.private : false;
    return {
      title: title,
      emoji: '',
      type: 'tech',
      topics: topics,
      published: published,
    };
  }

  return source;
}
