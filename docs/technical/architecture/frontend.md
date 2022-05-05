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

Návrh užívateľského prostredia prešiel viacerými kolami úprav. Dole je opísaná verzia aktuálna po dokončení 9. šprintu.

### Hlavná obrazovka

![img](/img/screenshots-frontend/main_page.JPG)

Obrázok zobrazuje stav, kedy je navolený recept, ale nie je potvrdené začatie procesu. Na ľavej strane obrazovky sa nachádza zariadenie, spolu s informáciami o aktualnej teplote a otačkach pre jednotlivé nádoby, údaje o pumpe a o jednotlivých násypníkoch. Napravo sú zobrazené potrebné ingrediencie, spolu s inštrukciami, ktoré sa budú vykonávať. (Používateľ si môže skontrolovať, či má všetky dostupné ingrediencie, a v prípade potreby vybrať iný recept).

![img](/img/screenshots-frontend/ingredients_to_prepare.JPG)

Pred začatím varenia treba potvrdiť, že sa potrebné ingrediencie nachádzajú v správnom násypníku. 

![img](/img/screenshots-frontend/while_page.JPG)

Po začatí varenia sa používateľovi zobrazujú bližšie informácie o prebiehajúcich procesoch. V budúcnosti je možné pridanie ďalšieho obsahu na obrazovku, napríklad časovača, na zobrazenie kedy proces skončí.

### Výber receptu

![img](/img/screenshots-frontend/recipe_list.JPG)

Pokiaľ si používateľ chce zvoliť recept na varenie, kliknutím na možnosť **Recipe** v menu prejde na obrazovku výberu receptu. Na pravej strane obrazovky sa zobrazí zoznam všetkých dostupných receptov. Po kliknutí na recept sa zobrazia informácie k danému receptu. Používateľ tento recept môže použiť tak, aký je a načítať ho na hlavnú obrazovku, alebo ho upraviť. Tiež si môže vytvoriť úplne nový recept. Je taktiež možné recept vymazať.

### Pridanie ingredencií

![img](/img/screenshots-frontend/recipe_making_ingredients.JPG)

Pokiaľ si používateľ vyberie možnosť upraviť/vytvoriť recept, dostane sa na obrazovku pre vytvorenie zoznamu potrebných ingrediencií. Na hornej časti stránky sa nachádza pole na pridanie názvu receptu. Formulár na pridanie ingredencií obsahuje delenie na jednotlivé kategórie ingrediencií, a možnosť pridať a odobrať ingredienciu. Vždy je potrebné nastaviť množstvo, jednotku a popis ingrediencie (jej názov). Ak používateľ nezadá názov receptu, respektíve pridá ingredienciu bez popisu, nemôže sa prekliknúť ďalej. Po stlačení tlačidla **Next step** používateľ prejde na úpravu/zostavovanie inštrukcií v recepte.  Pri **Cancel** sa najprv zobrazí upozornenie, že sa dané údaje stratia, pokiaľ bude používateľ pokračovať. Pri pokračovaní sa vracia na stránku s výberom receptu. Po stlačení **Save** sa zobrazi informácia, že daný recept bude uložený. 

### Pridanie inštrukcií

![img](/img/screenshots-frontend/rcipe%making%instructions.JPG)

Na obrazovke úpravy/zostavovania inštrukcií v recepte sa používateľovi vpravo zobrazuje zoznam ingrediencií, ktoré si v predošlom kroku navolil.
Inštrukcie sú zobrazené naľavo. Delené sú do osobitných stagov označených vlastným názvom. Každý recept musí obsahovať aspoň jeden stage, pričom každý stage musí mať (pre daný recept) jedinecný názov. Každý stage musí obsahovať aspoň jednu inštrukciu. Je možné pridávať a odoberať stage, a rovnako aj inštrukcie v rámci stagov. Každá inštrukcia obsahuje pomocný popisok, ktorý jednoduchým spôsobom objasňuje používateľovi, čo daná inštrukcia vykonáva.  Po kliknutí na zelené plusko sa zobrazí obrazovka výberu inštukcie, je zobrazená nižšie.

![img](/img/screenshots-frontend/instructionPopup.JPG)

![img](/img/screenshots-frontend/confirm_manual_step.JPG)

V prípade potrebného zásahu používateľa sa zobrazí vyskakovacie okienko s popisom manuálneho kroku. Všetky procesy sa udržiavajú pokiaľ používateľ nezaklikne, že boli dané procesy splnené. 

### Edit

![img](/img/screenshots-frontend/edit_locked_recipe.JPG)

Edit prebieha v tom istom prostredí ako tvorba nového receptu. Jediným rozdielom je to, že má používateľ možnosť výberu medzi uložením kópie receptu, alebo novej verzie rovnakého receptu. Niektoré "zamknuté" recepty je možné uložiť len ako kópiu receptu (viď. obrázok).

### Tester

![img](/img/screenshots-frontend/tester.JPG)

Pre potreby odskúšania funkčnosti jednotlivých častí pivovaru sme taktiež vytvorili testovaciu funkcionalitu. Používateľ si vyberie aký typ inštrukcie chce odskúšať, a klikne submit. Táto inštrukcia je ďalej zaslaná na backend a tam spracovaná.

### História varenia

![img](/img/screenshots-frontend/history_recipe.JPG)

Táto stránka je štrtuktúrou veľmi podobná náhľadu všetkých receptov. Na pravej strane sa nachádzajú všetky vykonané varenia - ich názov a a čas, kategorizované podľa dňa kedy boli vykonané. Lavá strana obsahuje 2 podčasti, ktoré sa dajú prepínať. Na obrázku môžete vidieť informácie či bol recept dokončený (Finished) alebo Aborted. Potom kedy varenie prebeho, a ako sa volalo. Ďalej obsahuje ingrediencie a inštrukcie daného receptu. 

![img](/img/screenshots-frontend/history_stats1.JPG)

Druhá časť obsahuje zoznam priebehu varenia - inštrukcie a ich čas dokončenie relatívny k začiatku varenia. Zelená farba značí, že boli úspešne dokončené, červenou sú označené tie na ktorých bol napríklad spustený abort.

![img](/img/screenshots-frontend/history_temp.JPG)
![img](/img/screenshots-frontend/history_motor.JPG)

Na grafoch sú zobrazené zmeny v templotách v nádobách, respektíve zmeny v rýchlostiach točenia počas daného varenia. 

## Do budúcna

## Priebeh návrhu

### Zobrazovanie procesu varenia

![img](/img/screenshots-frontend/mainPage1.JPG)

V prvotnom návrhu zobrazovania varu sa obrazovka delila na dve časti, na ľavej sa nachádzalo zariadenie, na pravej priebeh varenia. V prvých návrhoch boli taktiež inštrukcie podelené do blokov, tie ale mohli v istých prípadoch prebiehať aj naraz, a preto sa zakreslovali vedľa seba.

![img](/img/screenshots-frontend/MainPage2.JPG)

Druhý návrh sa viac zameriaval na zobrazovanie inštrukcií, ako po sebe nasledujú. Zároveň neboli na obrazovke vždy zobrazené všetky inštrukcie, čo sa vykonalo najmä kvôli lepšiemu prehľadu na stránke. Ku každej nádobe sa pridali údaje o prebiehajúcich procesoch. Návrh taktiež obsahoval časovače. 


![img](/img/screenshots-frontend/MainPage3.JPG)

Spojením týchto dvoch návrhov vznikol návrh 3. Na ľavej strane je obrázok zariadenia s informáciami k nádobám. Napravo sú vypísané prebiehajúce inštrukcie. Detaily k inštrukcii sú zobrazené, len keď práve prebieha.

![img](/img/screenshots-frontend/startBrewingPage.JPG)

Rozdiel medzi posledným návrhom a prvou implementáciou je výzor pravého sidebaru. Bol pridaný zoznam ingrediencii, tlačidlo na prerušenie a zastavenie procesu. Pri procese totiž vždy môže nastať situácia, kedy používateľ potrebuje varenie krátkodobo alebo dlhodobo pozastaviť.


### Tvorba nového receptu

![img](/img/screenshots-frontend/newRecipe1.JPG)



Na prvom návrhu mali všetky inštrukcie rovnaký spôsob pridania. Používateľ si vybral typ zariadenia, inštrukciu a parametre. To ale samozrejme nepostačuje pre všetky typy inštrukcií, napríklad ak by sa jednalo o dve zariadenia (čo sa nemusí nutne stať v našom zadaní, ale vo všeobecnosti je to možné).

![img](/img/screenshots-frontend/newRecipe2.JPG)

Preto vznikol druhý návrh. Pri ňom už mala každá inštrukcia vlastné "telo" prispôsobené svojim požiadavkám. Pre pridanie novej inštrukcie bolo potrebné kliknúť na zelené plus, čim sa otvorilo vyskakovacie okno a zobrazila ponuka inštrukcií. Taktiež sa na tej istej obrazovke pridávali ingrediencie.

Rozdiel medzi posledným návrhom a aktuálnym riešením: Na jednej obrazovke sa nachádzalo priveľké množstvo informácií (ingrediencie aj inštrukcie naraz). Preto bola vytvorená osobitná obrazovka pre pridávanie ingrediencií a osobitná pre pridávanie inštrukcií.
S využitím spôsobu spracovania inštrukcii taktiež nebol dôvod ukladať ich vedľa seba. Inštrukcie sa začali ukladať pod seba, a kategorizovať do blokov podľa jednotlivých fáz procesu.
Názvy inštrukcií taktiež nemusia byť dostatočne výstižné, ku každej bol pridaný jej slovný popis.
