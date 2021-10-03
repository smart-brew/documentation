---
sidebar_position: 1
slug: /
---

# Vytváranie dokumentácie

Dokumentácia sa robí s pomocou nástroja na tvorbu dokumentácie [Docusaurus](https://docusaurus.io/)

Link na Github repozitár https://github.com/smart-brew/documentation

Dokumentácia sa automaticky buildne z `master branch` do https://smart-brew.netlify.app

## Nový súbor

Stačí iba pridať súbor typu `Markdown` (`.md` alebo `.mdx`) do priečinka `docs`.

Prvý nadpis (H1 `# Nadpis`) bude zároveň názvom v menu.

Pre tvorbu sub menu stačí iba sub priečinok a do neho sa vkladajú súbory. V tomto priečinku by mal byť aj súbor `_category_.json` v ktorom bude zadefinovaný názov submenu (inak bude mať submenu rovnký názov ako priečinok):

```json
{
  "label": "Moje submenu",
  "position": 3
}
```
