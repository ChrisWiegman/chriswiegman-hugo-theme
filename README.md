# Chris Wiegman's Hugo Theme

This repo contains the Hugo theme for ChrisWiegman.com.

## Requirements

- [Hugo](https://gohugo.io) (extended)
- [Node.js](https://nodejs.org/en) + [npm](https://www.npmjs.com) (for Playwright tests and tooling)

## Using this Theme on Your Site

Your best option for using this theme, if you like the current style, is to fork it or to download the code and copy it into your Hugo `themes` directory. This will ensure that, as I inevitably change it, you won't be forced to change it to any major new style.

If you fork it, use the [Hugo documentation](https://gohugo.io/documentation/) to install your fork via a submodule.

### Site Configuration

For an example configuration, see [hugo.json](https://github.com/ChrisWiegman/chriswiegman-hugo-theme/blob/main/dev/hugo.json) in the `dev` directory.

## Local Development

### Running the Development Site

This theme contains a complete development site with some basic content to get you running. You can start this site from your development machine by making sure your local computer has Hugo installed and then running the following:

```sh
make dev
```

The site will be available at `http://localhost:1313`.

### End-to-End Testing

This repo uses Playwright for browser tests against the local `dev` site.
It requires `hugo` on your PATH.

There's a handy Make target to install and run these tests.

```sh
make test
```

## Project Structure

- `dev/`: local development site content and configuration
- `layouts/`: Hugo templates and partials
- `assets/`: theme assets (CSS, JS, images)
- `e2e/`: Playwright end-to-end tests

## Formatting

Templates in `layouts/` are formatted with Prettier using the `go-template` parser. Use the Prettier VS Code extension (configured in `.vscode/settings.json`) to avoid breaking Hugo template markup.
