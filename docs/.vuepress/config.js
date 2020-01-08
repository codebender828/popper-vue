module.exports = {
  title: 'popper-vue', // Title of the website
  // appears in the meta tag and as a subtitle
  description: "A lightweight bring-your-own-component(BYOC) Popper for Vue.js.",
  // Google Analytics tracking code
  ga: "Analytics code",
  // custom text for edit link. Defaults to "Edit this page"
  editLinkText: 'Help us improve this page!',
  themeConfig: {
      nav: [
          // links that will appear in the top navbar
          { text: 'Guide', link: '/guide/getting-started.html' },
          { text: 'API', link: '/api/' }
      ],
      sidebar: [
          // These links will appear in the sidebar
          // Create heading groups
          {
              title: 'Guide',
              collapsable: false,
              children: [
                  // These are pages we'll add later
                  '/guide/getting-started',
              ]
          },
          {
            title: 'API',
            path: '/api/',
            collapsible: false
          }
      ],
      lastUpdated: 'Last Updated',
      repo: 'codebender828/popper-vue',
      editLinks: true,
      smoothScroll: true
  }
}