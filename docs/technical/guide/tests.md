---
author: Marek Vajda
---

# Testovanie

Na testovanie využívame unit a integračné testy vytvorené pomocou `Jest` a `Cypress` testovacích rámcov.

## Jest

Nový test vytvoríme tak, že vytvoríme `*.test.ts` súbor s rovnakým menom ako .ts súbor, ktorý ideme testovať. Test sa rozpoznáva na základe `.test.ts` prípony. Testy vytvárame vždy v `src/tests` priečinku.

Príkaz na manuálne spustenie testov je `yarn test`, prípadne je potrebné spustiť pred týmto príkazom ešte príkaz `yarn` ak testovanie ešte nebolo spustené.

:::caution Pred testovaním
Pred testovaním je potrebné spustiť databázu v docker kontajneri pomocou príkazu `yarn docker:up` v adresári backend repozitára. Na fungovanie tohto príkazu treba spustiť aj aplikáciu Docker desktop. Po skončení testovania je možné kontajner vypnúť pomocou príkazu `yarn docker:down`.
:::

## Backend unit testy [dočasne pozastavené]

Testy pre backend sa automaticky spúšťajú pri príkaze `git push`. Pri testovaní využívame okrem rámca `Jest` aj rámec `Supertest`, ktorý slúži na odosielanie HTTP requestov na API našich `Express.js` endpointov.

Testy vytvorené záznamy v databáze po skončení vymažú.

Zoznam unit testov pre endpointy:

1. `GET /api/data`
2. `GET /api/recipe`
3. `GET /api/recipe/recipeId`
4. `POST /api/recipe/recipeId/load`
5. `PUT /api/recipe`

```bash title="Konzolový výpis po úspešnom vykonaní unit testov"
PASS  src/tests/RestServer.test.ts
  Get data devices info data
    √ GET /api/data (33 ms)
  Get all recipes
    √ GET /api/recipe (81 ms)
  Get recipe by id
    √ GET /api/recipe/recipeId (55 ms)
  Load recipe Smoky Grove Lichtenhainer
    √ POST /api/recipe/recipeId/load (33 ms)
  Add new recipe
    √ PUT /api/recipe (150 ms)
  Load, start loaded recipe and abort test
    ○ skipped PUT /api/brew/0/start

Test Suites: 1 passed, 1 total
Tests:       1 skipped, 5 passed, 6 total
Snapshots:   0 total
Time:        3.858 s, estimated 4 s
Ran all test suites.
Done in 7.09s.
```

## Backend integračné testy [dočasne pozastavené]

Integračné testy sa spúšťajú manuálne odstránením `skip()` funkcie z `describe` bloku testu. Bežne sa tieto testy preskakujú, pretože zatiaľ nevieme spoľahlivo ukončiť všetky procesy, ktoré sa počas testu spúšťajú, a testovanie nie je automaticky ukončené.

Zoznam integračných testov pre endpointy:

1. `PUT /api/brew/0/start` - načíta recept a spustí nové varenie

## Cypress - frontend integračné testy

Na testovanie funkčnosti aplikácie ako celku používame rámec `cypress`, ktorým testujeme reakcie frontendu a tým zároveň aj funkčnosť backendu a jeho súčastí.

:::info spustenie testovacieho prostredia vo frontend repozitári

```bash
yarn cypress:open
```

:::

Po zadaní nasledujúceho príkazu sa spustí testovacie rozhranie, ktoré umožnuje spustenie naprogramovaných scénárov pre testy.
Všetky testy je možné pustiť aj bez grafického rozhrania "headless".

![ukazka okna prostredia cypresss](/img/tests-img/cypress.jpg)

### Testovacie scenáre

1.  Načitanie a spustenie receptu
2.  Spustenie receptu, pauza, spustenie a následné zrušernie varenia

_Príklad spustenia jedného testovacieho scenára_

![príklad testovacieho scenára cypress](/img/tests-img/test-example.jpg)
