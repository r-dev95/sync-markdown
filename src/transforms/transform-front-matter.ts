import matter from 'gray-matter';

export type FrontMatterPlatform = 'qiita' | 'zenn' | 'gfm';

type FrontMatterData = Record<string, unknown>;

export function transformFrontMatter(
  source: string,
  from: FrontMatterPlatform,
  to: FrontMatterPlatform,
): string {
  const parsed = matter(source);
  const data = parsed.data as FrontMatterData;
  const mapped = mapFrontMatter(data, from, to);
  if (data === mapped) return source;
  return matter.stringify('', mapped).trimEnd();
}

function mapFrontMatter(
  source: FrontMatterData,
  from: FrontMatterPlatform,
  to: FrontMatterPlatform,
): FrontMatterData {
  if (from === to) {
    throw EvalError('The source and destination are the same.');
  }

  if (from === 'zenn' && to === 'qiita') {
    const emoji = source.emoji ?? '';
    const title = (source.title ?? '') ? `${emoji} ${source.title}` : '';
    const tags = source.topics ?? [];
    const privateFlag = typeof source.published === 'boolean' ? !source.published : true;
    return pickInTargetOrder(
      {
        title: title,
        tags: tags,
        private: privateFlag,
      },
      to,
    );
  }

  if (from === 'qiita' && to === 'zenn') {
    const title = source.title ?? '';
    const topics = source.tags ?? [];
    const published = typeof source.private === 'boolean' ? !source.private : false;
    return pickInTargetOrder(
      {
        title: title,
        topics: topics,
        published: published,
      },
      to,
    );
  }

  return source;
}

function pickInTargetOrder(source: FrontMatterData, target: FrontMatterPlatform): FrontMatterData {
  return target === 'zenn'
    ? {
        title: source.title,
        emoji: '',
        type: 'tech',
        topics: source.topics,
        published: source.published,
      }
    : {
        title: source.title,
        tags: source.tags,
        private: source.private,
        updated_at: '',
        id: null,
        organization_url_name: null,
        slide: false,
        ignorePublish: false,
      };
}
