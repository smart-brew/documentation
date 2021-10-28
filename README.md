# Documentation

URL http://team06-21.studenti.fiit.stuba.sk/docs

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

### Build

Automatically builds from `master` branch at http://team06-21.studenti.fiit.stuba.sk/docs

## Generate pdf

Generate pdf for final documentation:

```bash
npx mr-pdf --initialDocURLs="http://team06-21.studenti.fiit.stuba.sk/docs/" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".margin-vert--xl a" --coverTitle="Tímový projekt - SmartBrew"
```

## Index for Algolia doc search

To update index for DocSearch, run following command:

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat docsearch.json | jq -r tostring)" algolia/docsearch-scraper
```
