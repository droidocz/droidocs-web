const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://droidocsweb.gatsbyjs.io',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://brandeps.com/logo-download/A/Android-logo-vector-01.svg',
    logoLink: '/',
    title:
      "<a href='/'>DOCS</a>",
    githubUrl: 'https://github.com/droidocz/droidocs-web',
    helpUrl: '',
    tweetText: '',
    social: ``,
    links: [{ text: '', link: '' }],
    search: {
      enabled: true,
      indexName: 'droidocs',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/', // add trailing slash if enabled above
    ],
    collapsedNav: true, // list of urls or Boolean
    links: [{ text: 'Android Docs', link: 'https://developer.android.com' }],
    frontline: false,
    ignoreIndex: false,
    title: null,
  },
  siteMetadata: {
    title: 'Android Docs | Droidocs',
    description: 'Documentation for Android',
    ogImage: null,
    docsLocation: 'https://github.com/droidocz/droidocs-web/tree/master/content',
    favicon: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Droidocs',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
