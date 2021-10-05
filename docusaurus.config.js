const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'SmartBrew',
    tagline: 'Team 6 - Team project 2021/2022',
    url: 'https://smart-brew.netlify.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'smart-brew', // Usually your GitHub org/user name.
    projectName: 'documentation', // Usually your repo name.

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            path: './docs',
            routeBasePath: '/',
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
          defaultMode: 'dark',
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
              docId: 'intro',
              position: 'left',
              label: 'Docs',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'More',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/smart-brew/',
                },
              ],
            },
            {
              title: 'Edit',
              items: [
                {
                  label: 'Dokumntácia VS code',
                  href: 'https://github.dev/smart-brew/documentation',
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
  }
);
