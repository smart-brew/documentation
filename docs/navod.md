---
sidebar_position: 1
slug: /
---

# Vytváranie dokumentácie

Dokumentácia sa robí s pomocou nástroja na tvorbu dokumentácie [Docusaurus](https://docusaurus.io/)

Link na Github repozitár https://github.com/smart-brew/documentation

Dokumentácia sa **automaticky** buildne z `master branch` do https://smart-brew.netlify.app

## Nový súbor

Stačí iba pridať súbor typu `Markdown` (`.md` alebo `.mdx`) do priečinka `docs`.

:::tip Tip
Prvý nadpis (H1 `# Vytváranie dokumentácie`) bude zároveň názvom v menu.
:::

```a title="Ukážka súboru"
---                     <----------------- Hlavička
sidebar_position: 1       <---- Options       |
id: moje-id               <---- Options       |
title: moj-nadpis         <---- Options       |
---                     <---------------------+

# Vytváranie dokumentácie     <----- H1

Dokumentácia...          <----- Text
```

## Sub menu

Pre tvorbu sub menu stačí iba sub priečinok a do neho sa vkladajú súbory. V tomto priečinku by mal byť aj súbor `_category_.json` v ktorom bude zadefinovaný názov submenu (inak bude mať submenu rovnký názov ako priečinok):

```json title="_category_.json"
{
  "label": "Moje submenu",
  "position": 3
}
```

## Lokálny development

0. Mať: `nodeJS` (v12+) a `yarn` (v1+)
1. Prvotná inštalácia

```bash
git clone https://github.com/smart-brew/documentation.git
cd documentation
yarn
```

2. Spustenie hot-reload dev servera

```bash
yarn start
```

:::tip Tip
Server sa spustí defaultne na adrese: [http://localhost:3000](http://localhost:3000)
:::
