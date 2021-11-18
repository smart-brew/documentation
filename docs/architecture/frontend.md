---
---

# Front-end

Link na repozitár - [Frontend](https://github.com/smart-brew/frontend)

## Technológie

Pre používateľské rozhranie budeme používať **React Native framework**.

Pre IDE je treba doinštalovať tieto rozšírenia - **eslint, prettier, editorconfig** (odporúčaný je VSCode).

## Komunikácia s back-endom

Pre komunikáciu využijeme REST API cally a správy vo formáte JSON. Viac info na [API](./api-reference.md).

## Opis prostredia
Návrh užívateľského prostredia prešiel viacerými kolami úprav. Dole je opísaná verzia aktuálna po dokončení 3. šprintu, spolu s návrhmi úprav do ďalších šprintov. 

### Hlavná obrazovka

<img src="https://user-images.githubusercontent.com/43378515/142446345-e63bf434-077c-4c22-bdf2-582bf88cd217.JPG " width="550" height="400" />

Obrázok zobrazuje stav, kedy je navolený recept, ale nie je potvrdené začatie procesu. Na ľavej strane obrazovky sa nachádza zariadenie, spolu s informáciami o procesoch vykonávajúcich sa v jednotlivých nádobách. Napravo sú zobrazené potrebné ingrediencie, spolu s inštrukciami, ktoré sa budú vykonávať. (Používateľ si môže skontrolovať, či má všetky dostupné ingrediencie, a v prípade potreby vybrať iný recept).

<img src="https://user-images.githubusercontent.com/43378515/142447098-53c8ee2d-a601-4548-99df-49d5ddc39764.JPG" width="550" height="400" />

Po začatí varenia sa používateľovi zobrazujú bližšie informácie o prebiehajúcich (i ukončených a nasledujúcich) procesoch. 

#### Odsúhlasené úpravy

- Informácie k zariadeniu budú zobrazované inak. K detailnejšiemu nákresu zariadenia budú priradené informácie, ktoré sa priamo týkajú danej časti zariadenia.
- zobrazované budú 4 typy tlačidiel (buď v menu, alebo každé bude permanentne zobrazené na hornej časti obrazovky). Budú odkazovať na stránky: hlavná stránka, výber receptu, história varenia. Ďalej bude možné tlačidlom korektne vypnúť zariadenie (t.j. zastaviť celé Raspberry Pi)
- Po stlačení tlačidla **Start brewing** sa zobrazí vyskakovacie okno s informáciami, ktoré ingrediencie treba dať do ktorého násypníka. // toto je už pripravené, len to treba presunúť na danú stránku

### Výber receptu

<img src="https://user-images.githubusercontent.com/43378515/142450675-692804b0-9d38-42a0-89da-024c8a74fbdd.JPG" width="550" height="450" />

Pokiaľ si používateľ chce zvoliť recept na varenie, kliknutím na možnosť **Výber receptu** v menu prejde na obrazovku výberu receptu. Na pravej strane obrazovky sa zobrazí zoznam všetkých dostupných receptov. Po kliknutí na recept sa zobrazia informácie k danému receptu. Používateľ tento recept môže použiť tak, aký je, a načítať ho na hlavnú obrazovku, alebo ho upraviť. Tiež si môže vytvoriť úplne nový recept.

### Pridanie ingredencií

<img src="https://user-images.githubusercontent.com/43378515/142450791-b8796239-ec50-4f2a-90d5-f2d94875f652.JPG" width="550" height="400" />

Pokiaľ si používateľ vyberie možnosť upraviť/vytvoriť recept, dostane sa na obrazovku pre vytvorenie zoznamu potrebných ingrediencií.
Formulár na pridanie ingredencií obsahuje delenie na jednotlivé kategórie ingrediencií, a možnosť pridať a odobrať (v návrhu chýba) ingredienciu. Vždy je potrebné nastaviť množstvo, jednotku a popis ingrediencie (jej názov). Po stlačení tlačidla **Next step** používateľ prejde na úpravu/zostavovanie  inštrukcií v recepte. Pri **Cancel** sa najprv zobrazí upozornenie, že sa dané údaje stratia, pokiaľ bude používateľ pokračovať. Pri pokračovaní sa vracia na stránku s výberom receptu.

### Pridanie inštrukcií

<img src="https://user-images.githubusercontent.com/43378515/142451444-8a8b30f7-75c5-442d-bab5-951f5f8fbc0b.JPG" width="550" height="370" />

Na obrazovke úpravy/zostavovania inštrukcií v recepte sa používateľovi vpravo zobrazuje zoznam ingrediencií, ktoré si v predošlom kroku navolil.
Inštrukcie sú zobrazené naľavo. Delené sú do osobitných blokov označených vlastným názvom. Je možné pridávať a odoberať bloky, a rovnako aj inštrukcie v rámci blokov. Každá inštrukcia obsahuje pomocný popisok, ktorý jednoduchým spôsobom objasňuje používateľovi, čo daná inštrukcia vykonáva. Po kliknutí na zelené plusko sa zobrazí obrazovka výberu inštukcie. Spolu s ukážkou identifikovaných typov inštrukcií je zobrazená nižšie. 


<img src="https://user-images.githubusercontent.com/43378515/142452039-45fa126d-dbb5-4987-a864-0cf997870fc1.JPG" width="550" height="370" />

<img src="https://user-images.githubusercontent.com/43378515/142452049-b0d1c45c-3d3a-46d7-9adb-cc73df684ebb.JPG" width="450" height="200" />

Výber inštrukcie a rovnako aj typy inštrukcií pre zostavovanie receptu sú už implementované, ale samotné zostavovanie receptu ešte nie.

### História varenia
Túto obrazovku je potrebné zostaviť.

## Do budúcna

### Je potrebné

- označovať jednotlivé násypníky (Akú úlohu môžu zastávať - jačmeň sa bude pridávať iba jedným z nich, a podobne.)
- definovať, odkiaľ sa bude načítavať stav zariadenia (backend/konfiguračný file). Napríklad ktoré násypníky sú dostupné a môžu sa využiť pri varení jednotlivých receptov
- šipočka ukazujúca či teplota v jednotlivých nádobách stúpa alebo klesá

