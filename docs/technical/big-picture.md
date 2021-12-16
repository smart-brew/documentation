---
title: Big Picture
sidebar_position: 1
---

# Úvod

Tento dokument obsahuje informácie k produktu. Poskytuje základné delenie na časti **Architektúra, Analýzy a Návody.**

**Architektúra**

- **Api**: Spôsoby komunikácie (requesty a odpovede) medzi komponentami jednotlivých vrstiev.
- **Návrh databázy**: Štruktúra databázy vyjadrená diagramom.
- **Front-end**: Návrh používateľského prostredia a jeho opis
- **Moduly**: Opis fungovania modulu
- **Podporované údaje**: Zadefinované interfaces. Údaje z akých zariadení sa využívajú.
- **Podporované funkcie**: Zoznam podporovaných funkcií systémom a štruktúry inštrukcii.
- **Testovací server**: Opis funkcionality.

**Analýzy**

- **Brewery, modbus, SCADA**: analýza nástrojov využitých pri funkčnom pivovare daného typu

**Návody**

- **Migrácie, Raspberry Pi, Spustenie pivovaru, Tímová VM, Tímový web + dokumentácia**: Návody k správnemu využívaniu daných nástrojov.

# Pohľad na systém

![mikrosluzby](/img/microservices.png)

Systém pozostáva z mikroslužieb, ktoré medzi sebou komunikujú na základe [API](./architecture/api-reference.md). Každá mikroslužba predstavuje jeden komponent. Využívame zariadenia `Raspberry Pi` a `ESP-32`. Na kontajnerizáciu v zariadení Raspberry Pi používame virtuálne prostredie `Docker`.

# Use Cases

![useCases](/img/useCasesDiagram.png)

## UC01 Vyber recept a začni proces varenia

| Hlavný scenár                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Používateľ z hlavného menu zvolí možnosť Recipes<br /> 2. Aplikácia zobrazí okno Recipes, kde sa na pravom sidebare zobrazuje zoznam možných receptov<br /> 3. Používateľ klikne na ľubovoľný prvok zo zoznamu<br /> 4. Aplikácia v hlavnej časti obrazovky zobrazí podrobnosti o danom recepte<br /> 5. Používateľ klikne na tlačidlo Load recipe<br /> 6. Aplikácia zobrazí Overview page, kde sa na pravom sidebare zobrazujú informácie o recepte a tlačidlo Start brewing<br /> 7. Používateľ klikne na tlačidlo Start brewing<br /> 8. Aplikácia zobrazí vyskakovacia okno s ingredienciami, ktoré treba pripraviť<br /> 9. Používateľ klikne na tlačidlo Confirm<br /> 10. Aplikácia na pravom sidebare zobrazuje stav procesu varenia<br /> 11. Prípad použitia skončí |

## UC02 Vytvor nový recept

| Hlavný scenár                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Používateľ zvolí z hlavného menu možnosť Recipes<br /> 2. Aplikácia zobrazí okno Recipes, kde sa na pravom sidebare nachádza tlačidlo Create new<br /> 3. Používateľ klikne na tlačidlo Create new<br /> 4. Vyvolá sa prípad UC03 Vyber ingrediencie tvoriace recept<br /> 5. Vyvolá sa prípad UC04 Vyber bloky tvoriace recept<br /> 6. Aplikácia zobrazí vyskakovacie okno pre potvrdenie uloženia receptu<br /> 7. Používateľ potvrdí uloženie receptu tlačidlom Confirm<br /> 8. Aplikácia zobrazí okno Recipes<br /> 9. Prípad použitia skončí |

## UC03 Vyber ingrediencie tvoriace recept

| Hlavný scenár                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Aplikácia zobrazí okno Ingredients<br /> 2. Používateľ vyplní pole s názvom receptu<br /> Alternate: 2a. Alternatívny scenár <br /> 3. Používateľ klikne na tlačidlo Add new ingredient korešpondujúce k vybranej kategórii ingrediencie<br /> 4. Aplikácia zobrazí nové pole pre zadanie informácii o recepte<br /> 5. Používateľ zadá informácie: počet, jednotku a opis ingrediencie<br /> 6. Používateľ stlačí tlačidlo Next Step<br /> 7. Prípad použitia skončí |

| Alternatívny scenár                                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Používateľ klikne na tlačidlo - korešpondujúce s vybranou kategóriou ingrediencie<br /> 2. Aplikácia odstráni danú ingredienciu zo zoznamu<br /> 3. Hlavný scenár pokračuje krokom 6 |

## UC04 Vyber bloky tvoriace recept

| Hlavný scenár                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Aplikácia zobrazí okno Instructions<br /> 2. Používateľ klikne na modrý znak plus na pridanie bloku<br /> 3. Aplikácia pridá nový blok do receptu<br />  4. Používateľ zadá názov bloku<br /> Alternate: 4a. Alternatívny scenár <br />  5. Vyvolá sa prípad UC05 Vyber inštrukcie tvoriace bloky<br /> 6. Používateľ stlačí tlačidlo Save recipe<br /> 7. Prípad použitia končí |

| Alternatívny scenár                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Používateľ klikne na červené X označujúce vymazanie bloku<br /> 2. Aplikácia odstráni blok<br /> 3. Hlavný scenár pokračuje krokom 6 |

## UC05 Vyber inštrukcie tvoriace bloky

| Hlavný scenár                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Aplikácia zobrazí blok s možnosťami na pridanie alebo odobranie inštrukcie<br /> 2. Používateľ klikne na zelený znak plus<br /> 3. Aplikácia zobrazí vyskakovacie okno s možnosťami pre výber inštrukcii<br /> 4. Používateľ kliknutím vyberie požadovanú inštrukciu<br /> 5. Aplikácia danú inštrukciu pridá na požadované miesto v rámci bloku<br /> 6. Používateľ vyplní údaje inštrukcie<br /> Alternate: 6a. Alternatívny scenár <br />  7. Prípad použitia skončí |

| Alternatívny scenár                                                                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Používateľ sa rozhodne kliknúť na červené X pre vymazanie inštrukcie<br /> 2. Aplikácia odstráni inštrukciu<br /> 3. Hlavný scenár pokračuje krokom 7 |

# Ciele

Cieľom projektu je vytvoriť ucelené riešenie na automatizovanie procesov v priemysle.
Projekt je vykonávaný v spolupráci so Strojníckou fakultou STU, ktorá z veľkej časti zastrešuje materiálne požiadavky a fyzické prevedenie pivovaru.
Pivovar využíva dve prepojené nádoby, pričom v každej prebieha iná fáza varenia. Naša práca bude prebiehať nad údajmi z pivovaru,
konkrétne nad rôznymi efektormi (motory, násypníky, ventily,...) a senzormi (teplomer, tlakomer,...).
Centrálnym komponentom systému je Raspberry Pi, ktoré bude poskytovať zázemie pre sieť senzorov a efektorov.
Automatizovaná výroba piva pozostáva z pridania nového receptu (respektíve výberu už existujúceho receptu),
procesu výroby piva, priebežného zobrazovania priebehu varenia a vytvorenia zápisu o ukončenom procese.

Komunikácia bude prebiehať medzi niekoľkými vrstvami. Moduly periodicky odovzdávajú svoje údaje back-endu,
ktorý ich spracuje (niektoré si ukladá v dočasnej pamäti a niektoré ukladá do databázy).
Taktiež si periodicky pýtajú úlohy, ktoré majú vykonávať. Rovnakú úlohu vykonáva aj front-end.
Pri procese varenia si od back-endu periodicky pýta stav varenia, ktorý zobrazuje používateľovi.
Pri tvorení nového receptu zase posiela údaje na back-end, kde sa zapisujú do databázy.

Komunikácia medzi front-endom a back-endom sa bude riešiť pomocou REST API. Na komunikáciu sa bude využívať formát JSON.
Štruktúra JSON-u sa bude meniť podľa vrstvy komunikácie a obsahu správy.

Kroky (inštrukcie) pre jednotlivé moduly sa budú posielať a spracovávať sériovo.
Teda inštrukcie na moduly sa budú zasielať v osobitných správach.
Frontend si ale tieto kroky bude triediť a spájať do blokov podľa určitých etáp výroby pre lepší user experience.

Všetky potrebné údaje o receptoch a jednotlivých vareniach sa budú ukladať do databázy.
To umožní znovupoužitie už vytvoreného receptu a vygenerovanie protokolu z varenia.

## Ciele na prvý semester

Pripraviť funkčný prototyp tak, aby vykonával základné úlohy.
V užívateľskom prostredí si používateľ bude vedieť vytvoriť nový recept. Taktiež bude vedieť začať proces varenia,
a na obrazovke zobraziť jeho priebeh. Backend spracuje dané údaje, ktoré získa z modulov, a pošle ich na frontend - používateľ
bude môcť kontrolovať stav varenia. Stav varenia sa tiež bude logovať do databázy (čo sa neskôr môže použiť na vytváranie protokolu o varení).
Bude funkčná aspoň určitá podmnožina modulov (nakoľko nie sú niektoré zariadenia dostupné, nedá sa s nimi zatiaľ pracovať).
Front-end a back-end bude vedieť spracovávať všetky procesy, funkcionalitu zatiaľ nefunčných modulov budeme simulovať.
