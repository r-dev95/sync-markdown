import type { Html, Paragraph, Parent, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PluginOptions } from '../../types/transform.js';

const serviceNames = [
  'card',
  'twitter',
  'youtube',
  'github',
  'gist',
  'codepen',
  'stackblitz',
  'codesandbox',
  'speakerdeck',
  'slideshare',
  'docswell',
  'blueprintue',
  'figma',
  // Zenn only
  'jsfiddle',
  // Qiita only
  'asciinema',
  'googleslides',
  'googledrive',
  'claudeartifacts',
] as const;

type ServiceName = (typeof serviceNames)[number];

const serviceNameSet = new Set<ServiceName>(serviceNames);

function getSingleUrl(node: Paragraph): string | null {
  if (node.children.length === 1 && node.children[0]?.type === 'text') {
    const text = node.children[0].value.trim();
    if (/^https?:\/\/\S+$/.test(text)) return text;
  }

  if (node.children.length === 1 && node.children[0]?.type === 'link') {
    const linkNode = node.children[0];
    if (linkNode.children.length === 1 && linkNode.children[0]?.type === 'text') {
      const label = linkNode.children[0].value;
      if (label === linkNode.url) return linkNode.url;
    }
  }
  return null;
}

function gfmToZenn() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      const url = getSingleUrl(node);
      if (!url) return;

      const sUrl = new URL(url);
      const host = sUrl.hostname.replace(/^www\./, '');

      let embed: { service: ServiceName; value: string } | null = null;

      // plain URL
      // - Twitter / X
      // - YouTube
      // - GitHub file

      // Zenn no support
      // - Asciinema
      // - Google Slides
      // - Google Drive
      // - Claude Artifacts

      // Zenn syntax - URL
      // - GitHub Gist
      if (host === 'gist.github.com') {
        embed = { service: 'gist', value: url };
      }

      // - CodePen
      if (host === 'codepen.io') {
        if (sUrl.pathname.includes('/pen/')) {
          embed = { service: 'codepen', value: url };
        }
      }

      // - StackBlitz
      if (host === 'stackblitz.com') {
        embed = { service: 'stackblitz', value: url };
      }

      // - CodeSandbox
      if (host === 'codesandbox.io') {
        embed = {
          service: 'codesandbox',
          value: url.replace(/\/s\//, '/embed/') + '?fontsize=14&hidenavigation=1&theme=dark',
        };
      }

      // - Docswell
      if (host === 'docswell.com') {
        embed = { service: 'docswell', value: url };
      }

      // - blueprintUE
      if (host === 'blueprintue.com') {
        embed = { service: 'blueprintue', value: url };
      }

      // - Figma
      if (host === 'figma.com' || host === 'embed.figma.com') {
        embed = { service: 'figma', value: url.replace('embed.figma.com', 'figma.com') };
      }

      // - JSFiddle
      if (host === 'jsfiddle.net') {
        embed = { service: 'jsfiddle', value: url };
      }

      // Zenn syntax - ID, Key, ...
      // - SpeakerDeck
      if (host === 'speakerdeck.com') {
        const m = url.match(/https:\/\/speakerdeck.com\/player\/([A-Za-z0-9]+)/);
        if (m && m[1]) {
          embed = { service: 'speakerdeck', value: m[1] };
        }
      }

      // - SlideShare
      if (host === 'slideshare.net') {
        const m = url.match(/embed_code\/key\/([A-Za-z0-9]+)/);
        if (m && m[1]) {
          embed = { service: 'slideshare', value: m[1] };
        }
      }

      if (embed) {
        parent.children[index] = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: `@[${embed.service}](${embed.value})`,
            },
          ],
        };
      }
    });
  };
}

function zennToGfm() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      const atTextNode = node.children[0];
      if (!atTextNode || atTextNode.type !== 'text' || atTextNode.value !== '@') return;

      const linkNode = node.children[1];
      if (!linkNode || linkNode.type !== 'link') return;

      const textNode = linkNode.children[0];
      if (!textNode || textNode.type !== 'text') return;

      if (textNode.value === 'tweet') textNode.value = 'twitter';
      if (!serviceNameSet.has(textNode.value as ServiceName)) return;

      const service = textNode.value as ServiceName;
      const value = linkNode.url;

      let url: string | null;
      switch (service) {
        // plain URL
        // case 'youtube':
        // case 'github':
        //   url = null;
        //   break;

        // Zenn no support
        // case 'asciinema':
        // case 'googleslides':
        // case 'googledrive':
        // case 'claudeartifacts':
        //   url = null;
        //   break;

        // Zenn syntax - URL
        case 'card':
        case 'twitter':
        case 'gist':
        case 'codepen':
        case 'docswell':
        case 'stackblitz':
        case 'figma':
        case 'blueprintue':
        case 'jsfiddle':
        case 'codesandbox':
          url = value;
          break;

        // Zenn syntax - ID, Key, ...
        case 'slideshare':
          url = `https://www.slideshare.net/slideshow/embed_code/key/${value}`;
          break;
        case 'speakerdeck':
          url = `https://speakerdeck.com/player/${value}`;
          break;

        default:
          url = null;
          break;
      }

      if (url) {
        parent.children[index] = {
          type: 'paragraph',
          children: [{ type: 'text', value: url }],
        };
      }
    });
  };
}

function gfmToQiita() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      const url = getSingleUrl(node);
      if (!url) return;

      const sUrl = new URL(url);
      const host = sUrl.hostname.replace(/^www\./, '');

      let embed: { service: ServiceName; value: string } | null = null;

      // plain URL
      // - Twitter / X
      // - GitHub file
      // - GitHub Gist
      // - CodeSandbox
      if (host === 'codesandbox.io') {
        embed = { service: 'codesandbox', value: url };
      }

      if (embed) {
        parent.children[index] = {
          type: 'paragraph',
          children: [{ type: 'text', value: embed.value }],
        };
        return;
      }

      // Qiita no support
      // - JSFiddle

      // Qiita syntax - HTML embed
      // - YouTube
      if (host === 'youtube.com') {
        const id = new URL(url).searchParams.get('v');
        if (sUrl.pathname === '/watch' && id) {
          embed = {
            service: 'youtube',
            value: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
          };
        }
      }

      // - CodePen
      if (host === 'codepen.io') {
        const m = url.match(/codepen\.io\/([^/]+)\/pen\/([^/?#]+)/);
        if (m && m[1] && m[2]) {
          const [, user, hash] = m;
          const tab = new URL(url).searchParams.get('default-tab') ?? 'result';
          embed = {
            service: 'codepen',
            value: `<p data-height="265" data-theme-id="0" data-slug-hash="${hash}" data-default-tab="${tab}" data-user="${user}" data-embed-version="2" data-pen-title="${hash}" class="codepen">See the Pen <a href="${url}">${hash}</a> by ${user} (<a href="https://codepen.io/${user}">@${user}</a>) on <a href="https://codepen.io">CodePen</a>.</p><script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>`,
          };
        }
      }

      // - StackBlitz
      if (host === 'stackblitz.com') {
        embed = {
          service: 'stackblitz',
          value: `<iframe src="${url}?embed=1" height="600" width="800" loading="lazy"></iframe>`,
        };
      }

      // - Asciinema
      if (host === 'asciinema.org') {
        const m = url.match(/asciinema\.org\/a\/([^/?#]+)/);
        if (m && m[1]) {
          embed = {
            service: 'asciinema',
            value: `<script id="asciicast-${m[1]}" src="https://asciinema.org/a/${m[1]}.js" async></script>`,
          };
        }
      }

      // - SpeakerDeck
      if (host === 'speakerdeck.com') {
        const m = url.match(/https:\/\/speakerdeck.com\/player\/([A-Za-z0-9]+)/);
        if (m && m[1]) {
          embed = {
            service: 'speakerdeck',
            value: `<script async class="speakerdeck-embed" data-id="${m[1]}" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>`,
          };
        }
      }

      // - SlideShare
      if (host === 'slideshare.net') {
        const m = url.match(/embed_code\/key\/([A-Za-z0-9]+)/);
        if (m && m[1]) {
          embed = {
            service: 'slideshare',
            value: `<iframe src="//www.slideshare.net/slideshow/embed_code/key/${m[1]}" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" loading="lazy" allowfullscreen></iframe>`,
          };
        }
      }

      // - Docswell
      if (host === 'docswell.com') {
        if (sUrl.pathname.startsWith('/slide')) {
          embed = {
            service: 'docswell',
            value: `<script async class="docswell-embed" src="https://www.docswell.com/assets/libs/docswell-embed/docswell-embed.min.js" data-src="${url}" data-aspect="0.5625"></script>`,
          };
        }
      }

      // - Google Slides
      if (host === 'docs.google.com') {
        if (sUrl.pathname.startsWith('/presentation/')) {
          embed = {
            service: 'googleslides',
            value: `<iframe src="${url}" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
          };
        }
      }

      // - Google Drive
      if (host === 'drive.google.com') {
        const eUrl = url.replace('/view', '/preview');
        embed = {
          service: 'googledrive',
          value: `<iframe src="${eUrl}" width="640" height="480"></iframe>`,
        };
      }

      // - blueprintUE
      if (host === 'blueprintue.com') {
        const eUrl = url.includes('/render/')
          ? url
          : url.replace('/blueprintue.com/', '/blueprintue.com/render/');
        embed = {
          service: 'blueprintue',
          value: `<iframe src="${eUrl}" scrolling="no" allowfullscreen height="400"></iframe>`,
        };
      }

      // - Figma
      if (host === 'figma.com' || host === 'embed.figma.com') {
        const eUrl = url.replace('figma.com', 'embed.figma.com');
        embed = {
          service: 'figma',
          value: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" height="450" width="800" src="${eUrl}" loading="lazy" allowfullscreen></iframe>`,
        };
      }

      // - Claude Artifacts
      if (host === 'claude.site') {
        if (sUrl.pathname.startsWith('/public/artifacts/')) {
          const eUrl = url.includes('/embed') ? url : url.replace(/\/?$/, '/embed');
          embed = {
            service: 'claudeartifacts',
            value: `<iframe src="${eUrl}" title="Claude Artifact" width="100%" height="600" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>`,
          };
        }
      }

      if (embed) {
        parent.children[index] = { type: 'html', value: embed.value };
      }
    });
  };
}

function qiitaToGfm() {
  return (tree: Root) => {
    visit(tree, 'html', (node: Html, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      let url: string | null = null;

      // plain URL
      // - Twitter / X
      // - Github file
      // - Github Gist
      // - CodeSandbox

      // Qiita no support
      // - JSFiddle

      // Qiita syntax - HTML embed
      // - YouTube
      {
        const m = node.value.match(/src="https:\/\/www\.youtube\.com\/embed\/([^"?]+)/);
        if (m) {
          url = `https://www.youtube.com/watch?v=${m[1]}`;
        }
      }

      // - CodePen
      {
        const hash = node.value.match(/data-slug-hash="([^"]+)"/)?.[1];
        const user = node.value.match(/data-user="([^"]+)"/)?.[1];
        const tab = node.value.match(/data-default-tab="([^"]+)"/)?.[1];
        if (hash && user && tab) {
          url = `https://codepen.io/${user}/pen/${hash}?default-tab=${tab}`;
        }
      }

      // - StackBlitz
      {
        const m = node.value.match(/src="(https:\/\/stackblitz\.com\/[^"]+)"/);
        if (m) {
          url = m[1] as string;
        }
      }

      // - Asciinema
      {
        const m = node.value.match(/src="(https:\/\/asciinema\.org\/a\/[^"]+\.js)"/);
        if (m) {
          url = m[1]!.replace(/\.js$/, '');
        }
      }

      // - SpeakerDeck
      {
        const m = node.value.match(/class="speakerdeck-embed"[^>]*data-id="([^"]+)"/);
        if (m) {
          url = `https://speakerdeck.com/player/${m[1]}`;
        }
      }

      // - SlideShare
      {
        const m = node.value.match(/www.slideshare.net\/slideshow\/embed_code\/key\/([A-Za-z0-9]+)/);
        if (m) {
          url = `https://www.slideshare.net/slideshow/embed_code/key/${m[1]}`;
        }
      }

      // - Docswell
      {
        const m = node.value.match(/class="docswell-embed"[^>]*data-src="([^"]+)"/);
        if (m) {
          url = m[1] as string;
        }
      }

      // - Google Slides
      {
        const m = node.value.match(/src="(https:\/\/docs\.google\.com\/presentation\/[^"]+)"/);
        if (m) {
          url = m[1] as string;
        }
      }

      // - Google Drive
      {
        const m = node.value.match(/src="(https:\/\/drive\.google\.com\/[^"]+)"/);
        if (m) {
          url = m[1] as string;
        }
      }

      // - blueprintUE
      {
        const m = node.value.match(/src="(https:\/\/blueprintue\.com\/render\/[^"]+)"/);
        if (m) {
          url = m[1] as string;
        }
      }

      // - Figma
      {
        const m = node.value.match(/src="(https:\/\/(?:embed\.)?figma\.com\/[^"]+)"/);
        if (m) {
          url = m[1]!.replace('embed.figma.com', 'figma.com');
        }
      }

      // - Claude Artifacts
      {
        const m = node.value.match(/src="(https:\/\/claude\.site\/public\/artifacts\/[^"]+)"/);
        if (m) {
          url = m[1] as string;
        }
      }

      if (url) {
        parent.children[index] = {
          type: 'paragraph',
          children: [{ type: 'text', value: url }],
        };
      }
    });
  };
}

const remarkImage: Plugin<[PluginOptions], Root> = (options: PluginOptions) => {
  const { from, to } = options;
  if (from === 'gfm' && to === 'zenn') {
    return gfmToZenn();
  } else if (from === 'zenn' && to === 'gfm') {
    return zennToGfm();
  } else if (from === 'gfm' && to === 'qiita') {
    return gfmToQiita();
  } else if (from === 'qiita' && to === 'gfm') {
    return qiitaToGfm();
  } else if (from === 'zenn' && to === 'qiita') {
    return (tree) => {
      zennToGfm()(tree);
      gfmToQiita()(tree);
    };
  } else if (from === 'qiita' && to === 'zenn') {
    return (tree) => {
      qiitaToGfm()(tree);
      gfmToZenn()(tree);
    };
  }

  console.error(`Not supported: from = ${from}, to = ${to}`);
  return;
};

export default remarkImage;
