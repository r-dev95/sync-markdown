export type Platform = 'qiita' | 'zenn' | 'gfm';

export type FrontMatterData = Record<string, unknown>;

export interface PluginOptions {
  from: Platform;
  to: Platform;
}
