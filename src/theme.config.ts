export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "Ryuichi's Blog",
  /** your name */
  author: "Ryuichi",
  /** website description */
  desc: "Life is a game",
  /** your deployed domain */
  website: "https://astro-blog-sunsir007.vercel.app/",
  /** your locale */
  locale: "en-us",
  /** theme style */
  themeStyle: "dark",
  /** pagination settings */
  pagination: {
    postsPerPage: 5,
    essaysPerPage: 10,
  },
  /** your socials */
  socials: [
    {
      name: "github",
      href: "https://github.com/ryusaksun",
    },
    {
      name: "rss",
      href: "/atom.xml",
    },
    {
      name: "twitter",
      href: "https://twitter.com/Ryuichi_lol",
    }
  ],
  /** your header info */
  header: {
    twitter: "@ryuichi_lol",
  },
  /** your navigation links */
  navs: [
    {
      name: "Posts",
      href: "/",
    },
    {
      name: "Essays",
      href: "/essays",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
  ],
}

