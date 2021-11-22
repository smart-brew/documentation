const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'SmartBrew',
  tagline: 'Team 6 - Team project 2021/2022',
  url: 'http://team06-21.studenti.fiit.stuba.sk/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'smart-brew', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  i18n: {
    defaultLocale: 'sk-SK',
    locales: ['sk-SK'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: './docs',
          routeBasePath: '/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
      },
      navbar: {
        title: 'SmartBrew',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'navod',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      algolia: {
        appId: 'FE1FNBDNQS',
        apiKey: 'de41bb7bfad10c227d414c04e276cc83',
        indexName: 'SmartBrew',
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'GitHub',
            items: [
              {
                label: 'Organizácia',
                href: 'https://github.com/smart-brew/',
              },
              {
                label: 'Tímový web + dokumentácia',
                href: 'https://github.com/smart-brew/documentation',
              },
              {
                label: 'Backend',
                href: 'https://github.com/smart-brew/backend',
              },
              {
                label: 'Frontend',
                href: 'https://github.com/smart-brew/frontend',
              },
              {
                label: 'Moduly',
                href: 'https://github.com/smart-brew/websocket-module',
              },
              {
                label: 'Testovací modul',
                href: 'https://github.com/smart-brew/module-mock-server',
              },
            ],
          },
          {
            title: 'Online editor dokumentácie',
            items: [
              {
                label: 'Web VS code',
                href: 'https://github.dev/smart-brew/documentation',
              },
            ],
          },
          {
            title: 'Kontakt',
            items: [
              {
                label: 'tim6_tp2021@googlegroups.com',
                href: 'mailto:tim6_tp2021@googlegroups.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SmartBrew - Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};
