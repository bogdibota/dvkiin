const config = {
  'gatsby': {
    'pathPrefix': '/',
    'siteUrl': 'https://dvkiin.xyz',
    'gaTrackingId': 'UA-40939202-6',
  },
  'header': {
    'logoLink': '/',
    'title': 'DVKIIN ☂ Project',
    'githubUrl': 'https://github.com/bogdibota/dvkiin',
    'helpUrl': '',
    'tweetText': '',
    'links': [
      { 'text': '', 'link': '' },
    ],
    'search': {
      'enabled': false,
      'indexName': '',
      'algoliaAppId': process.env.GATSBY_ALGOLIA_APP_ID,
      'algoliaSearchKey': process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      'algoliaAdminKey': process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  'sidebar': {
    'forcedNavOrder': [
      '/introduction',
      '/layout',
      '/components',
      '/validation',
      '/helpers',
    ],
    'links': [
      { 'text': 'OptiOffer', 'link': 'https://optioffer.com' },
      { 'text': 'Github', 'link': 'https://github.com/bogdibota/dvkiin' },
      { 'text': 'Issues', 'link': 'https://github.com/bogdibota/dvkiin/issues' },
    ],
    'frontline': false,
    'ignoreIndex': true,
  },
  'siteMetadata': {
    'title': 'DVKIIN Project',
    'description': 'Documentation and code examples for the @dvkiin/* packages. Powered by optioffer.com',
    'ogImage': null,
    'docsLocation': 'https://github.com/bogdibota/dvkiin/tree/master/docs/content',
  },
};

module.exports = config;
