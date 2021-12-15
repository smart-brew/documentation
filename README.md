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
npx mr-pdf --initialDocURLs="http://team06-21.studenti.fiit.stuba.sk/docs/" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".margin-vert--xl a,.theme-doc-toc-mobile,.theme-doc-footer-edit-meta-row" --coverTitle="Tímový projekt - SmartBrew" --cssStyle="h1{font-size: 24px; margin-top: 20px;} h2{font-size: 20px; margin-top: 100px;} h3{font-size: 18px; margin-top: 100px;} h4{font-size: 16px; margin-top: 100px;} p,li,ul{font-size: 14px; margin: 0; padding: 0;}" --outputPDFFilename="SmartBrew-dokumentacia.pdf" --pdfMargin="100,80,150,80"
```

## Index for Algolia doc search

To update index for DocSearch, run following command:

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat docsearch.json | jq -r tostring)" algolia/docsearch-scraper
```
