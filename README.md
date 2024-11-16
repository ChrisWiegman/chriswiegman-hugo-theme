# Chris Wiegman's Hugo Theme

This repo contains the Hugo theme for ChrisWiegman.com.

## Usage

Your best option for using this theme, if you like the current style, is to download the code and copy it into your hugo `themes` directory. This will ensure that, as I inevitably change it, you won't get behind.

The alternative is to install it as a submodule or go module per the [Hugo documentation](https://gohugo.io/documentation/).

## Site Configuration:

See the following example for the configuration of my own site:

```json
{
  "title": "Chris Wiegman",
  "baseURL": "https://chriswiegman.com",
  "params": {
    "mainSections": [
      "posts"
    ],
    "OpenGraph": true,
    "TwitterCards": false,
    "MobileWebAppTitle": "C Wiegman",
    "FediverseCreator": "@chris@mastodon.chriswiegman.com",
    "description": "VP of Engineering, software developer, teacher, and blogger building teams and products focused on humane and sustainable technology.",
    "subtitle": "Software Developer, Teacher, Speaker and Blogger building teams and products",
    "imageSizes": [
      850,
      710,
      300
    ],
    "imageSizeString": "(max-width: 850px) 850w, (max-width: 710px) 710w, (max-width: 300px) 300w",
    "license": {
      "name": "Creative Commons Licensed",
      "title": "Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license",
      "link": "https://creativecommons.org/licenses/by-nc-sa/4.0/"
    },
    "policies": "/policies",
    "headerIcon": "images/2024/11/logo.png"
  },
  "minify": {
    "minifyOutput": true
  },
  "theme": "chriswiegman-hugo-theme",
  "html": {
    "keepDefaultAttrVals": false,
    "keepDocumentTags": false,
    "keepEndTags": false,
    "keepSpecialComments": false
  },
  "menus": {
    "main": [
      {
        "name": "About",
        "title": "About Chris Wiegman",
        "pageRef": "/about",
        "weight": 10
      },
      {
        "name": "Uses",
        "title": "My tools, both digital and analogue",
        "pageRef": "/uses",
        "weight": 20
      },
      {
        "name": "Blog",
        "title": "A list of all blog posts on this site going back to 2008",
        "pageRef": "/blog",
        "weight": 30
      },
      {
        "name": "Contact",
        "title": "Reach me via email",
        "url": "mailto:contact@chriswiegman.com",
        "weight": 40
      }
    ],
    "footer": [
      {
        "name": "About",
        "title": "About Chris Wiegman",
        "pageRef": "/about",
        "weight": 10
      },
      {
        "name": "RSS",
        "title": "Subscribe to this site in your favorite feed reader",
        "pageRef": "/index.xml",
        "weight": 20
      }
    ]
  },
  "permalinks": {
    "posts": "/:year/:month/:slug/"
  },
  "services": {
    "rss": {
      "limit": 30
    }
  },
  "languageCode": "en-us",
  "disableHugoGeneratorInject": true,
  "cleanDestinationDir": true,
  "enableRobotsTXT": true,
  "enableGitInfo": true,
  "canonifyURLs": true,
  "disableKinds": [
    "section",
    "taxonomy"
  ],
  "timeout": "90s",
  "outputs": {
    "home": [
      "HTML",
      "RSS",
      "JSON"
    ],
    "section": [
      "html",
      "JSON"
    ],
    "taxonomy": [
      "html"
    ],
    "term": [
      "html"
    ]
  },
  "markup": {
    "highlight": {
      "style": "gruvbox"
    },
    "goldmark": {
      "parser": {
        "attribute": {
          "block": true
        },
        "wrapStandAloneImageWithinParagraph": false
      },
      "renderer": {
        "unsafe": true
      },
      "renderHooks": {
        "image": {
          "enableDefault": true
        },
        "link": {
          "enableDefault": true
        }
      }
    }
  }
}
```