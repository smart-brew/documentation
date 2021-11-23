# Documentation + web

URL http://team06-21.studenti.fiit.stuba.sk

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

### Build

```
$ yarn build
```

### Deploy

Automatically deploys from `master` branch to http://team06-21.studenti.fiit.stuba.sk

## Generate pdf

Generate pdf for final documentation:

```bash
npx mr-pdf --initialDocURLs="http://team06-21.studenti.fiit.stuba.sk/docs/" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".margin-vert--xl a,.theme-doc-toc-mobile" --coverTitle="Tímový projekt - SmartBrew"
```

## Index for Algolia doc search

To update index for DocSearch, run following command:

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat docsearch.json | jq -r tostring)" algolia/docsearch-scraper
```
