---
author: Peter Stríž
---

# GitHub

Ako verzovací systém budeme používať GitHub po názvom organizácie [smart-brew](https://github.com/smart-brew).

V rámci tejto GitHub organizácie budeme pracovať v nasledovných repozitároch:

- [documentation](https://github.com/smart-brew/documentation) - pre dokumentáciu
- [web](https://github.com/smart-brew/web) - pre tímovú stránku
- [frontend](https://github.com/smart-brew/frontend) - GUI pre používateľov
- [backend](https://github.com/smart-brew/backend) - aplikačný server, ktorý je spojený s databázou a rieši požiadavky z frontendu cez REST API

## Commit {#commit}

Každý commit bude dodržovať nasledujúci formát

```git title="Formát commitov"
  typ(jira): popis
```

- `typ` je jedným z: `feature`, `fix`, `chore`
- `jira` je označenie Jira issue (napr. `SB-1`) - dôležité dodržať názov aby sa dalo linkovať automaticky medzi Jirou
- `popis` je krátky popis úkonu

```git title="Ukážka commitu"
+ feature(SB-2): Login page
+ fix(SB-34): Missing files from upload page
```

## Tvorba vetiev {#branch}

Každá nová fičúra sa bude tvoriť na osobitnej vetve, pričom sa neskôr bude mergovať pomocou [Pull request](#pr) do main vetvy.

```git title="Formát vetiev"
  typ(jira)/popis
```

- `typ` je jedným z: `feature`, `bug`, `hotfix`
- `jira` je označenie Jira issue (napr. `SB-1`)
- `popis` je krátky popis úkonu - všetko **malé písmená**, pričom slová sú **oddelené pomlčkou**

```git title="Ukážka vetvy"
+ Správne
+ feature(SB-2)/login-page
+ bug(SB-34)/missing-files-from-upload-page


- Nesprávne
- feature(SB-2)/Login page                      # nesprávny formát popisu
- bug(34)/missing-files-from-upload-page        # nesprávne označenie Jira issue
- bug(SB-34):missing-files-from-upload-page     # ':' namiesto '/'
```

## Pull request {#pr}

Názov pre Pull request musí taktiež dodržať istý formát ako pre názvy [commitov](#commit).

```git title="Formát pull request"
  typ(jira)/popis
```

1. Ak sa v Github actions nachádza script, ktorý vykonáva automatický test, musí najprv **úspešne** prejsť, aby sa mohli zmeny merge-núť
2. Ďalej je potrebné spraviť code review a zapísať tento fakt do [Jiry](jira)
3. Až následne vykonať merge
4. Uzavrieť issue v [Jire](jira)
