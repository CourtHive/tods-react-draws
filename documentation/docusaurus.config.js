/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'TODS React Draws',
  tagline: 'Visualization of TODS Draw Structures',
  url: 'https://courthive.github.io',
  baseUrl: '/tods-competition-factory/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CourtHive', // Usually your GitHub org/user name.
  projectName: 'tods-react-draws', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'TODS React Draws',
      logo: {
        alt: 'CourtHive',
        src: 'img/CourtHive.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        //        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/CourtHive/tods-react-draws',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Getting Started',
        //       to: 'docs/',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: '',
        //     },
        //     {
        //       label: 'Discord',
        //       href: '',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: '',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: 'blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/CourtHive/tods-react-draws',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CourtHive`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
        },
        //  blog: { showReadingTime: true, },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
