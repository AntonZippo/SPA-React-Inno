# Products catalog (innoproject)

A single-page React application that presents a product catalog backed by the public [DummyJSON](https://dummyjson.com/) REST API. Users can browse with category filters, price and rating filters (client-side), search products, open product detail pages, and use placeholder login and 404 routes.

## Features

- **Category filtering** — Categories are fetched from API using RTK Query, server-side filtering by category.
- **Search** — Full-text search against DummyJSON API, search query clears when category is changed.
- **Price & Rating filters** — Applied client-side on the currently loaded page (API does not support these filters).
- **Pagination** — Server-side pagination with `limit` and `skip` parameters.
- **Cart** — Redux Toolkit slice with `localStorage` persistence, add/remove/clear functionality.
- **Product page** — Fetches a single product by id from DummyJSON.
- **Routing** — `react-router-dom` for home (`/home`), login (`/login`), cart (`/cart`), product (`/product/:id`), and a catch-all 404 page.
- **State management** — Redux store with RTK Query for server state; cart state in separate slice; UI filters and search in React.

## Dependencies

### Runtime (`dependencies`)

| Package            | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `react`            | UI library                                     |
| `react-dom`        | DOM rendering                                  |
| `react-redux`      | React bindings for Redux                       |
| `@reduxjs/toolkit` | Redux core, RTK Query, and store configuration |
| `react-router-dom` | Declarative routing                            |

### Development (`devDependencies`)

| Package                                                   | Purpose                                              |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `webpack`                                                 | Module bundler                                       |
| `webpack-cli`                                             | Webpack CLI                                          |
| `webpack-dev-server`                                      | Development server with hot reload                   |
| `@babel/core`, `@babel/preset-env`, `@babel/preset-react` | JavaScript / JSX transpilation                       |
| `babel-loader`                                            | Babel integration for Webpack                        |
| `css-loader`, `style-loader`                              | CSS in bundles                                       |
| `sass`, `sass-loader`                                     | Sass support for styles                              |
| `html-webpack-plugin`                                     | Generates `index.html` and injects bundle references |

Exact versions are pinned in `package-lock.json` after `npm install`.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) and npm.

### Install

```bash
npm install
```

### Run in development

Starts Webpack dev server (default port **3000**, see `webpack.config.js`):

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

### Production build

```bash
npm run build
```

Output is written to the `dist/` folder (`bundle.js` and `index.html`).
