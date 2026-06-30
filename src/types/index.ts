export const Platforms = ['gfm', 'zenn', 'qiita'] as const;

export type Platform = (typeof Platforms)[number];

export type FrontMatterData = Record<string, unknown>;

export interface PluginOptions {
  from: Platform;
  to: Platform;
}
