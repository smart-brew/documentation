---
---

# Front-end

Link na repozitár - [Frontend](https://github.com/smart-brew/frontend)

## Technológie

Pre používateľské rozhranie budeme používať **React framework**.

Pre IDE je treba doinštalovať tieto rozšírenia - **eslint, prettier, editorconfig** (odporúčaný je VSCode).

## Komunikácia s back-endom

Pre komunikáciu využijeme REST API cally a správy vo formáte JSON. Viac info na [API](./api-reference.md).

### Štruktúra JSONu pre inštrukciu

Príklad:

```json
{
  "id": 0,                      // unique for instruction type
  "name": "Heat up",            // type of instruction
  "type": "man"/"auto",         // či je inštrukcia manuálna alebo automatická
  "parentBlockId": 0,           // id of parent block
  "currParam": 40,              // current parameter value
  "targetParam": 70,            // target parameter value
  "start": 1635332321000,       // begin UNIX timestamp in milis
  "end": 1635335921000,         // end UNIX timestamp in milis
  "orderNum": 0,                // order in recipe (from 0)
  "chamberId": 0,
  "recipeId" : 4,
  "templateId" : 6
}
```

Podľa stavu vykonávania inštrukcie bude _start_ a _end_ atribút:

- **obidva null** - pokiaľ inštrukcia ešte nebola začatá
- **start = timestamp, end = null** - pokiaľ sa inštrukcia práve vykonáva
- **start = timestamp, end = timestamp** - pokiaľ sa inštrukcia vykonala úspešne
- **start = timestamp, end = -timestamp** - pokiaľ sa inštrukcia vykonala neúspešne

### Štruktúra JSONu pre blok

Príklad:

```json
{
  "id": 0,
  "name": "Varenie jačmeňa"
}
```

Inštrukcie sa k bloku budú priradzovať na základe jeho ID uloženého v každej inštrukcii.

### Notes

- inštrukcia musí mať atribút **type**, ktorý bude identifikovať, či je automatický alebo
  treba vstup používateľa
- pri varení nemusí BE odpovedať stále s celým receptom, pokiaľ má recept
  uložený u seba (z kroku spustenia varenia) - stačí len current block a module-stats
- zamyslieť sa, či by bolo možné implementovať pozastavenie varenia

### Je potrebné

- označovať jednotlivé násypníky (Akú úlohu môžu zastávať - jačmeň sa bude pridávať iba jedným z nich, a podobne.)
- odkiaľ sa bude načítavať stav zariadenia (backend/konfiguračný file). Napríklad ktoré násypníky sú dostupné a môžu sa využiť pri varení jednotlivých receptov
- šipočka ukazuje či teplota v jednotlivých nádobách stúpa alebo klesá

## Opis prostredia
Návrh užívateľského prostredie prešiel viacerými kolami úprav. Dole je opísaná verzia aktuálna po dokončení 3. šprintu, spolu s návrhmi úprav do ďalších šprintov. 

### Hlavná obrazovka
<img src="https://user-images.githubusercontent.com/43378515/142446345-e63bf434-077c-4c22-bdf2-582bf88cd217.JPG " width="550" height="400" />
Obrázok zobrazuje stav, kedy je navolený recept, ale nie je potvrdené začatie procesu. Na ľavej strane obrazovky sa nachádza zariadenie, spolu s informáciami o procesoch vykonávajúcich sa v jednotlivých nádobách. Napravo sú zobrazené potrebné ingrediencie, spolu s inštrukciami, ktoré sa budú vykonávať. (Používateľ si môže skontrolovať, či má všetky dostupné ingrediencie, a v prípade potreby vybrať iný recept).
<img src="https://user-images.githubusercontent.com/43378515/142447098-53c8ee2d-a601-4548-99df-49d5ddc39764.JPG" width="550" height="400" />
Po začatí varenia sa používateľovi zobrazujú bližšie informácie o prebiehajúcich (i ukončených a nasledujúcich) procesoch. 
#### Odsúhlasené úpravy
- Informácie k zariadeniu budú zobrazované inak. K detailnejšiemu nákresu zariadenia budú priradené informácie, ktoré sa priamo týkajú danej časti zariadenia.
- zobrazované budú 4 typy tlačidiel (buď v menu, alebo každé bude permanentne zobrazené na hornej časti obrazovky). Budú odkazovať na stránky: hlavná stránka, výber receptu, história varenia. Ďalej bude možné tlačidlom prerušiť varenie (t.j. zastaviť celé Raspberry Pi)
- Po stlačení tlačidla start brewing sa zobrazí vyskakovacie okno s informáciami, ktoré ingrediencie treba dať do ktorého násypníka. // toto je už prepravené, len to treba presunúť na danú stránku

### Výber receptu
<img src="https://user-images.githubusercontent.com/43378515/142450675-692804b0-9d38-42a0-89da-024c8a74fbdd.JPG" width="550" height="450" />

Pokiaľ si používateľ vyberie možnosť výberu receptu, na pravej strane obrazovky sa zobrazí zoznam všetkých dostupných receptov. Po kliknutí na recept sa zobrazia informácie k danému receptu. Potvrdením sa používateľ dostane na hlavnú obrazovku (popísané vyššie). Z tejto obrazovky sa taktiež používateľ preklikne na tvorbu nového receptu.

### Pridanie ingredencii
<img src="https://user-images.githubusercontent.com/43378515/142450791-b8796239-ec50-4f2a-90d5-f2d94875f652.JPG" width="550" height="400" />

Prázny formulár na pridanie ingredencii obsahuje delenie na jednotlivé kategórie ingrediencii, a možnosť pridať a odobrať (v návrhu chýba) ingredienciu. Vždy je potrebné nastaviť množstvo, jednotku a popis ingrediencie. Po stlačení tlačidla Next step sa prejde na výber inštrukcii. Pri cancel sa zobrazí upozornenie, že sa dané údaje stratia, a vracia sa na stránku s výberom receptu.

### Pridanie inštrukcii
<img src="https://user-images.githubusercontent.com/43378515/142451444-8a8b30f7-75c5-442d-bab5-951f5f8fbc0b.JPG" width="550" height="370" />

Napravo sú zobrazené pridané ingrediencie. Inštrukcie sú zobrazené naľavo. Delené sú do osobitných blokov, ktorým prislúcha názov. Je možné pridávať odoberať bloky, prespektíve inštrukcie vrámci blokov. Každá inštrukcia obsahuhje pomocný popisok, ktorý jednoduchým spôsobom objasňuje používateľovi jeho funkciu. Po kliknutí na zelené plusko sa zobrazí obrazovka výberu inštukcie. Spolu s ukážkou inštrukcii je zobrazená nižšie. 

<img src="https://user-images.githubusercontent.com/43378515/142452039-45fa126d-dbb5-4987-a864-0cf997870fc1.JPG" width="550" height="370" />
<img src="https://user-images.githubusercontent.com/43378515/142452049-b0d1c45c-3d3a-46d7-9adb-cc73df684ebb.JPG" width="450" height="200" />

### História varenia
Túto obrazovku je potrebné zostaviť.

