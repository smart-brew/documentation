---
---

# Front-end

Link na repozitár - [Frontend](https://github.com/smart-brew/frontend)

## Technológie

Pre používateľské rozhranie budeme používať **React Native framework**.

Pre IDE je treba doinštalovať tieto rozšírenia - **eslint, prettier, editorconfig** (odporúčaný je VSCode).

## Komunikácia s back-endom

Pre komunikáciu využijeme REST API cally a správy vo formáte JSON. Viac info na [API](api-reference.md).

## Opis prostredia

Návrh užívateľského prostredia prešiel viacerými kolami úprav. Dole je opísaná verzia aktuálna po dokončení 5. šprintu, spolu s návrhmi úprav do ďalších šprintov.

### Hlavná obrazovka

<img src="/img/screenshots-frontend/startBrewingPage.JPG" width="620" height="400" />

Obrázok zobrazuje stav, kedy je navolený recept, ale nie je potvrdené začatie procesu. Na ľavej strane obrazovky sa nachádza zariadenie, spolu s informáciami o procesoch vykonávajúcich sa v jednotlivých nádobách. Napravo sú zobrazené potrebné ingrediencie, spolu s inštrukciami, ktoré sa budú vykonávať. (Používateľ si môže skontrolovať, či má všetky dostupné ingrediencie, a v prípade potreby vybrať iný recept).

Plánom je na ľavú stranu obrazovky pridať presný nákres celého zariadenia. K jeho jednotlivým častiam by sa potom pridávali k nim patriace informácie. 

<img src="/img/screenshots-frontend/beforeBrewingPopup.JPG" width="620" height="400" />

Pred začatím varenia treba potvrdiť, že sa potrebné ingrediencie nachádzajú v správnom násypníku.

<img src="/img/screenshots-frontend/statusPage.JPG" width="620" height="400" />

Po začatí varenia sa používateľovi zobrazujú bližšie informácie o prebiehajúcich procesoch. V budúcnosti je možné pridanie ďalšieho obsahu na obrazovku, napríklad časovača na zobrazenie kedy proces skončí. 

### Výber receptu

<img src="/img/screenshots-frontend/recipePage.JPG" width="620" height="450" />

Pokiaľ si používateľ chce zvoliť recept na varenie, kliknutím na možnosť **Recipe** v menu prejde na obrazovku výberu receptu. Na pravej strane obrazovky sa zobrazí zoznam všetkých dostupných receptov. Po kliknutí na recept sa zobrazia informácie k danému receptu. Používateľ tento recept môže použiť tak, aký je, a načítať ho na hlavnú obrazovku, alebo ho upraviť. Tiež si môže vytvoriť úplne nový recept. Je taktiež možné recept vymazať. 

### Pridanie ingredencií

<img src="/img/screenshots-frontend/ingredientsPage.JPG" width="620" height="400" />

Pokiaľ si používateľ vyberie možnosť upraviť/vytvoriť recept, dostane sa na obrazovku pre vytvorenie zoznamu potrebných ingrediencií. Na hornej časti stránky sa nachádza pole na pridanie názvu receptu. Formulár na pridanie ingredencií obsahuje delenie na jednotlivé kategórie ingrediencií, a možnosť pridať a odobrať ingredienciu. Vždy je potrebné nastaviť množstvo, jednotku a popis ingrediencie (jej názov). Po stlačení tlačidla **Next step** používateľ prejde na úpravu/zostavovanie inštrukcií v recepte. Pri **Cancel** sa najprv zobrazí upozornenie, že sa dané údaje stratia, pokiaľ bude používateľ pokračovať. Pri pokračovaní sa vracia na stránku s výberom receptu.

### Pridanie inštrukcií

<img src="/img/screenshots-frontend/instructionsPage.JPG" width="620" height="370" />

Na obrazovke úpravy/zostavovania inštrukcií v recepte sa používateľovi vpravo zobrazuje zoznam ingrediencií, ktoré si v predošlom kroku navolil.
Inštrukcie sú zobrazené naľavo. Delené sú do osobitných blokov označených vlastným názvom. Je možné pridávať a odoberať bloky, a rovnako aj inštrukcie v rámci blokov. Každá inštrukcia obsahuje pomocný popisok, ktorý jednoduchým spôsobom objasňuje používateľovi, čo daná inštrukcia vykonáva. Po kliknutí na zelené plusko sa zobrazí obrazovka výberu inštukcie, je zobrazená nižšie.

<img src="/img/screenshots-frontend/instructionPopup.JPG" width="620" height="370" />

### História varenia

Túto obrazovku je potrebné zostaviť.

## Do budúcna

### Je potrebné

- označovať jednotlivé násypníky (Akú úlohu môžu zastávať - jačmeň sa bude pridávať iba jedným z nich, a podobne.)
- definovať, odkiaľ sa bude načítavať stav zariadenia (backend/konfiguračný file). Napríklad ktoré násypníky sú dostupné a môžu sa využiť pri varení jednotlivých receptov
- šipočka ukazujúca či teplota v jednotlivých nádobách stúpa alebo 

## Priebeh návrhu

### Zobrazovanie procesu varenia

<img src="/img/screenshots-frontend/mainPage1.JPG" width="550" height="370" />

V prvotnom návrhu zobrazovania varu sa obrazovka delila na dve časti, na ľavej sa nachádzalo zariadenie, na pravej priebeh varenia. V prvých návrhoch boli taktiež inštrukcie podelené do blokov, tie ale mohli v istých prípadoch prebiehať aj naraz, a preto sa zakreslovali vedľa seba. 

<img src="/img/screenshots-frontend/MainPage2.JPG" width="620" height="420" />

Druhý návrh sa viac zameriaval na zobrazovanie inštrukcii ako po sebe nasledujú. Zároveň neboli na obrazovke vždy zobrazené všetky inštrukcie, čo bolo vytvorené najmä kvôli lepšiemu prehľadu na stránke. Ku každej nádobe sa pridali údaje o prebiehajúcich procesoch. Návrh taktiež obsahoval časovače. Tie boli veľmi výtanou funkcionalitou návrhu, a niektoré z nich pravdepodobne implementujeme v budúcich etapách projektu. 

<img src="/img/screenshots-frontend/MainPage3.JPG" width="620" height="370" />

Spojením týchto dvoch návrhov vznikol návrh 3. Na ľavej strane je obrázok zariadenia s informáciami k nádobám. Napravo sú vypísané prebiehajúce inštrukcie. Detaily k inštrukcii sú zobrazené len keď práve prebieha. 

Rozdiel medzi posledným návrhom a aktuálnym riešením je výzor pravého sidebaru. Do aktuálneho riešenia bol pridaný zoznam ingrediencii, tlačidlo na prerušenie a zastavenie procesu. Pri procese totiž vždy môže nastať situácia, že používateľ potrebuje varenie krátkodobo alebo dlhodobo pozastaviť. 

### Tvorba noveceptu

<img src="/img/screenshots-frontend/newRecipe1.JPG" width="620" height="370" />

Na prvom návrhu mali všetky inštrukcie rovnaký spôsob pridanie. Používateľ si vybral typ zariadenia, inštrukciu a parametre. To ale samozrejme nepostačuje pre všetky typy inštrukcii, napríklad ak by sa jednalo o dve zariadenia (čo sa nemusí nutne stať v našom zadaní, ale vo všeobecnosti je to možné). 

<img src="/img/screenshots-frontend/newRecipe2.JPG" width="900" height="430" />

Preto vznikol druhý návrh. Pri ňom už mala každá inštrukcia vlastný "obdĺžnik" prispôsobený svojim požiadavkám. Pre pridanie novej inštrukcie bolo potrebné kliknúť na zelené plus, čim sa otvorilo vyskakovacie okno a zobrazila ponuka inštrukcii. Taktiež sa na tej istej obrazovke pridávali ingrediencie.

Rozdiel medzi posledným návrhom a aktuálnym riešením: Na jednej obrazovke sa nachádzalo priveľké množstvo funkcii. Preto bola vytvorená osobitná obrazovka pre pridávanie ingrediencii, a osobitná pre pridávanie inštrukcii. 
S využitím spôsobu spracovania inštrukcii taktiež nebol dôvod ukladať ich vedľa seba. Inštrukcie sa začali ukladať pod seba, a kategorizovať do blokov podľa jednotlivých fáz procesu. 
Názvy inštrukcii taktiež nemusia byť dostatočne výstižné, ku každej bol pridaný jej slovný popis. 


