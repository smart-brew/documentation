---
title: SCADA
---

# SCADA

**SCADA** je skratka pre **S**upervisory **C**ontrol **A**nd **D**ata **A**cquisition.

## Základná charakteristika

Ide o koncept kontrolného systému, kde je potreba monitorovať, kontrolovať,
získavať a analyzovať real-time dáta z priemyselných zariadení a procesov.

> Any application that gets data about a system in order to control that system is a SCADA application.

## Kľúčové komponenty

SCADA systém sa najčastejšie skladá z komponentov:

- Supervisory computer
- Remote terminal units
- Programmable logic controllers
- Communication infrastructure
- Human-machine interface

### Supervisory computer

- **jadro SCADA systému** - zbiera dáta z procesu a posiela
  príkazy do pripojených zariadení
- zahŕňa počítač a softvér komunikujúci s pripojenými zariadeniami +
  HMI softvér bežiaci na pracovných staniciach operátorov
- pri veľkých systémoch môže ísť o viacero serverov, viacero HMI softvérov
  na klientských počítačoch (proste massive)

### Remote terminal/telemetry units (RTUs)

- prepája fyzické zariadenia (senzory, efektory) na hlavný kontrolný systém (SCADA systém)
- prenáša telemetrické dáta na hlavný systém
- pomocou správ z hlavného systému kontroluje pripojené fyzické zariadenia

### Programmable logic controllers (PLCs)

- počítač používaný na automatizáciu elektromechanických procesov
- môže mať veľa inputov a outputov
- má naprogramovanú logiku, ktorá spracováva dáta z pripojených senzorov a riadi pripojené efektory

### Communication infrastructure

- prepája hlavný kontrolný systém s RTU-čkami a PLC-čkami
- využíva komunikačné protokoly podľa industry štandardov

### Human-machine interface (HMI)

- využívané pre vizualizáciu a kontrolu procesu
- má nejakú obrazovku (napr. monitor), cez ktorú môžu používatelia interagovať
  priamo so strojmi alebo kontrolovať zariadenia
- prezentuje dáta získané zo zariadení (PLC / RTU)
- obrazovka zobrazuje grafickú reprezentáciu vybavenia / procesov,
  ktoré je treba monitorovať
  - mimic diagram
- grafická reprezentácia môže byť vytvorená cez špeciálny softvér
  - napr. SIMATIC WinCC

![img.png](/img/analysis/HMI_example.png)

## Využitie

- elektrárne
- vodárne, čističky vôd
- inteligentné budovy, továrne
- ...

## Zdroje

- https://en.wikipedia.org/wiki/SCADA
- https://steemit.com/steemstem/@ibk-gabriel/scada-systems-principle-and-applications
- https://www.copadata.com/en/industries/food-beverage/food-beverage-insights/creative-brewing/
- https://www.automationworld.com/products/control/blog/13307242/rtu-or-plc-which-is-right-for-you
