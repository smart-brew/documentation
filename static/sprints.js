export const sprints = [
  {
    title: '3.10.2021',
    cardTitle: 'Šprint 1 - Zlatý bažant',
    cardSubtitle:
      'Úlohou prvého šprintu bol prvotný setup všetkých nástrojov akými sú Git, Jira či nástroj na tvorbu dokumentácie Docusaurus.',
    cardDetailedText:
      'Krátky opis stories, na ktorých sme pracovali počas šprintu. Treba dodať že nie všetci členovia figurujú ako zodpovední za nejakú story, avšak na práci sa podielal každý. Každá story totiž obsahovala viacero úloh, ktoré sme už do tohto zápisu neuviedli, lebo ich bolo veľmi veľa (stories + úloh bolo cez 40).',
  },
  {
    title: '18.10.2021',
    cardTitle: 'Šprint 2 - Pilsner Urquell',
    cardSubtitle:
      'Hlavnou úlohou tohto šprintu bolo vedieť si zobraziť nejaké údaje zo senzorov.',
    cardDetailedText:
      'Hlavným story bolo zobrazenie údajov na grafickom rozhraní. Hlavne sa to týkalo zobrazenia akutálnej teploty, ktorú nameral teplomer.',
  },
  {
    title: '2.11.2021',
    cardTitle: 'Šprint 3 - Corgoň',
    cardSubtitle:
      'Hlavným cieľom tohto šprintu bolo vedieť vytvoriť nový recept a následne tento recept použiť na varenie.',
    cardDetailedText:
      'Bolo treba premyslieť grafické rozhranie a urobiť ho viac prívetivím pre používateľa (na konci stránky sú aj obrázky). Ďalej bolo treba zjednodišiť testovanie jednotlivých častí systému - testovací server a spúšťací script. Hlavnou častou bolo vytváranie receptov a následné použitie týchto receptov na spústenie varenia. Čiže hlavná logika a proces akým sa presúvajú inštrukcie zo stavu vykonávania do ukončeného stavu.',
  },
  {
    title: '15.11.2021',
    cardTitle: 'Šprint 4 - Krušovice',
    cardSubtitle:
      'Dokončiť úlohy z Corgoň, ktoré sa týkali prototypu tvorby a spúšťania receptov.',
    cardDetailedText:
      'V tomto šprinte sme sa pokúsili zhotoviť fyzický modul na ovládanie zariadení pivovaru. Rovnako sme začali s implementáciou unit testov backendu a pokračovali sme v práci na frontende (menu, vypínacie tlačidlo, tvorba receptov)',
  },
  {
    title: '29.11.2021',
    cardTitle: 'Šprint 5 - Šariš',
    cardSubtitle:
      'Cieľom bolo vedieť zobrazovať informácie o aktuálnom recepte, ktoré sa používa na varenie.',
    cardDetailedText:
      'Hlavným obsahom bolo dokončiť celú API čo sa týka komunikácie jednotlivých častí systému. Týkalo sa to hlavne používateľského rozhrania a aplikačného serveru. Takisto bolo treba pridať podporu na nové inštrukcie (čakanie a manuálna inštrukcia) aj v rámci modulov a aj testovacieho serveru.',
  },
  {
    title: '21.1.2022',
    cardTitle: 'Šprint 6 - Gambrinus',
    cardSubtitle:
      'Cieľom bolo vedieť zobrazovať informácie o aktuálnom stave pripojených zariadení a otestovanie skutočného zariadenia na Strojníckej fakulte.',
    cardDetailedText:
      'V tomto šprinte sme museli spraviť grafický návrh pre prehľadovú obrazovku, ktorá nám bude ukazovať aktuálny stav zariadení. Ďalej sa nám konečne podarilo otestovať skutočný pivovar na Strojníckej fakulte. Tam ale vznikla kopa problémov, lebo sa nám nepodarilo úspešne rozbehať motor. Na druhej strane sa nám podarilo zistiť zvyšné zariadenia, ktoré bude potrebné implementovať.',
  },
  {
    title: '7.3.2022',
    cardTitle: 'Šprint 7 - Kelt',
    cardSubtitle:
      'Cieľom siedmeho šprintu bolo editovanie vytvorených receptov. Ďalej sme sa zamerali na uzavretie všetkých úloh a podrobné otestovanie celého procesu varenia s testovacím serverom.',
    cardDetailedText:
      'Prvoradým cieľom tohoto šprintu bolo editovanie receptu. Museli sme pridať nové enpointy a upraviť stránku s vytváraním receptu, aby vedela robiť aj edit existujúceho. Tiež sme podrobne otestovali celý systém a spravili rýchle opravy, aby nám prebiehalo varenie správne aspoň s testovacím serverom. Takisto sme sa snažili opraviť ESP moduly, ktoré nefungovali doposial správne - konkrétne komunikácia s modulom H300.',
  },
  {
    title: '21.3.2022',
    cardTitle: 'Šprint 8 - Smädný mních',
    cardSubtitle:
      'Prvoradým cieľom tohoto šprintu bolo posielanie jednoduchej inštrukcie na modul.',
    cardDetailedText:
      ' Ďalej sme pridávali support pre kryostat, aby sme vedeli regulovať teplotu vo varnej kadi. Takisto sme opravili nespočetné množstvo chýb, ktoré vyplynuli z testovania.',
  },
  {
    title: '5.4.2022',
    cardTitle: 'Šprint 9 - Argus',
    cardSubtitle:
      'Hlavným cieľom pre tento šprint bolo zobrazovanie histórie všetkých varení. Ďalej sme sa zamerali na opravovanie vecí, ktoré boli nájdené počas zapájania na Strojníckej fakulte.',
    cardDetailedText:
      'V zobrazení histórie všetkých varení sa zobrazujú všetky varenia, pričom si môžme vybrať jedno konrétne varenie. Tu sa nám môžu zobrazovať rôzne detaily ako postup krokov, či graf teploty od času. Takisto sme opravovali komunikáciu s H300, ktorá nefungovala správne.',
  },
  {
    title: '19.4.2022',
    cardTitle: 'Šprint 10 - Erb',
    cardSubtitle:
      'V tomto šprinte sme sa hlavne venovali dokumentačným a prezentačným činnostiam ako napríklad konferencia IIT SRC, či prezentačné video a článok.',
    cardDetailedText:
      'Okrem týchto prezentačných vecí sme sa venovali ošetrovaniu všetkých možných okrajových stavov, ku ktorým môže v našom systéme dôjsť.',
  },
];
