---
title: Metodika pre Jiru
author: Peter Stríž
---

# Jira

Pre prácu na projekte a trackovanie úloh využívame Jiru.

S [Jirou](https://smartbrew.atlassian.net/jira/software/projects/SB/boards/1) pracujeme metodológiou Scrumu.

## Úlohy

- `Epic`
  - Epic zahŕňa stories a tasky pre časť funkcionality projektu (moduly, back-end, front-end, organizácia).
  - Spravidla sa na ňom podieľajú viacerí členovia tímu.
- `Story`
  - Story je stavané z pohľadu "Ako používateľ chcem ...", napr. _"Ako používateľ chcem vytvoriť nový recept."_
  - Väčšinou sa na ňom podieľajú viacerí členovia tímu.
- `Task`
  - Task ponúka najnižšiu granularitu pre story. Ide už o konkrétne implementačné úlohy.
  - Pracuje na ňom vždy jeden člen tímu.

### Hodnotenie

Tím bodovo hodnotí zložitosť jednotlivých **taskov**. Tieto hodnotenia sa potom spočítajú
a výsledok je použitý ako body pre dané story, ktorému tasky patria.

## Prechody

`TO DO` --> `IN PROGRESS` --> `WAITING FOR REVIEW` --> `DONE`

Pokiaľ člen tímu začne vykonávať pridelený task, presunie ho do `IN PROGRESS`.

Po dokončení tasku ho presunie do `WAITING FOR REVIEW` s tým, že mu ho musí iný (aspoň jeden) člen tímu odsúhlasiť.

## Definition of DONE

Pre každý šprint je nastavený **Definition of DONE**. Ide o konkrétne story alebo viacero stories,
ktoré keď sa podarí tímu splniť, šprint môže byť považovaný za úspešne splnený.

## Zodpovednosti

S Jirou pracuje najmä scrum master:

- vytvára epics, stories a tasks
- dohliada na plnenie taskov a ich aktualizáciu v Jire
- uzatvára šprint po ukončení

Tasky môžu vytvárať aj iní členovia tímu po dohode so zvyškom tímu a vyhodnotení, že daný task je naozaj potrebný.
