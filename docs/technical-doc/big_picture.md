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

## Ciele na tento semester
Pripraviť funkčný prototyp tak, aby vykonával základné úlohy. 
V užívateľskom prostredí si používateľ bude vedieť vytvoriť nový recept. Taktiež bude vedieť začať proces varenia, 
a na obrazovke zobraziť jeho priebeh. Backend spracuje dané údaje, ktoré získa z modulov, a pošle ich na frontend - používateľ
bude môcť kontrolovať stav varenia. Stav varenia sa tiež bude logovať do databázy (čo sa neskôr môže použiť na vytváranie protokolu o varení).
Bude funkčná aspoň určitá podmnožina modulov (nakoľko nie sú niektoré zariadenia dostupné, nedá sa s nimi zatiaľ pracovať). 
Rozsah inštrukcií vykonávaných počas varenia bude teda obmedzený. 


