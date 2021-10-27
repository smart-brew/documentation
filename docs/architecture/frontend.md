# Front-end

## Technológie

Pre používateľské rozhranie budeme používať React framework.

## Komunikácia s back-endom

Pre komunikáciu využijeme REST API cally a správy vo formáte JSON.

### Štruktúra JSONu pre inštrukciu
Príklad:

````json
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
````

Podľa stavu vykonávania inštrukcie bude *start* a *end* atribút:
* **obidva null** - pokiaľ inštrukcia ešte nebola začatá
* **start = timestamp, end = null**  - pokiaľ sa inštrukcia práve vykonáva
* **start = timestamp, end = timestamp** - pokiaľ sa inštrukcia vykonala úspešne
* **start = timestamp, end = -timestamp** - pokiaľ sa inštrukcia vykonala neúspešne

### Štruktúra JSONu pre blok
Príklad:

````json
{
  "id": 0,
  "name" : "Varenie jačmeňa"
}
````

Inštrukcie sa k bloku budú priradzovať na základe jeho ID uloženého v každej inštrukcii.


### Výber receptu

Pri zapnutí si používateľ bude môcť vybrať, či chce použiť už
vytvorený recept, alebo či chce vytvoriť nový recept.

Pokiaľ si vyberie použitie vytvoreného receptu, front-end pošle GET request na back-end URL:

```
GET /api/recipe
```

Ako odpoveď obdrží základné informácie (id, názov, čas vytvorenia) pre **všetky** recepty v JSON formáte:

```json
[
    {
        "id" : 0,
        "name" : "IPA",
        "createdAt" : 1635335921000,    // example
        },
    {
        "id" : 1,
        "name" : "American Pale Ale",
        "createdAt" : 1635335921000,    // example
    },
    ...
]
```

FE ponúkne používateľovi výber z prijatých receptov podľa názvu.
Pri vybratí receptu sa odošle GET request na backend:

````
GET /api/recipe/{recipe-id}/select
````
Odpoveďou bude JSON so všetkými dátami receptu:

````json
{
    "id" : 0,
    "name" : "IPA",
    "createdAt" : 1635335921000,    // example
    "blocks" : [
    ...
    ],
    "instructions" :
    [
    ...
    ]
}
````
Pokiaľ je používateľ s vybraným receptom spokojný, klikne na tlačidlo **"Vybrať recept"**.
Recept sa následne načíta na hlavnú obrazovku a tiež sa odošle
POST request na BE s vybraným receptom:

```
POST /api/recipe/{recipe-id}/load
```

```json
{
  "id" : 0,
  "name" : "IPA",
  "createdAt" : 1635335921000,    // example
  "blocks" : [
    ...
  ],
  "instructions" :
  [
    ...
  ]
}

 

### Pridanie nového receptu

Pokiaľ používateľ chce vytvoriť nový recept, pomocou obrazovky pre pridanie
receptu vykliká všetky požadované kroky a klikne na tlačidlo **"Pridať recept"**.
Na BE sa odošle PUT request:

```
PUT /api/recipe
```

```json
{
  "name": "Corgoň",
  "createdAt": ...,
  "blocks" : [
    ...
  ],
  "instructions" :
  [
    ...
  ]
}
```
Ako odpoveď na FE príde JSON s vygenerovaným ID pridaného receptu:
````json
200 OK
{
    "id" : xx      
}
````
Tento recept spolu s jeho novým ID s následne FE uloží k sebe lokálne.

Ďalej používateľ dostane ponuku, či chce pridaný recept rovno využiť a variť
podľa neho, alebo nie.

Pokiaľ s ním chce variť, pošle sa POST request na BE (JSON v rovnakom formáte ako
pri výbere existujúceho receptu). Pokiaľ s ním variť nechce, UI sa vráti na hlavnú obrazovku a 
čaká na ďalšie pokyny.

### Začiatok varenia

Po vybratí receptu sa recept načíta na hlavnú obrazovku. Používateľ dostane príležitosť
skontrolovať, či je recept správny. Pokiaľ je s receptom spokojný, spustí varenie.
Pri spustení varenia sa na BE pošle PUT request (body je prázdne):

```
PUT /api/brew/{recipeId}/start
```

```json
{
  // pre istotu sa pošle recept znovu
  "id": 3,
  "name": "Corgoň",
  "createdAt": ...,
  "blocks" : [
    ...
  ],
  "instructions" :
  [
    ...
  ]
}
}
````

FE čaká na odpoveď z BE, či sa všetko úspešne spustilo:

````json
200 OK
{
    "brewId" : xx
}
````
FE si uloží ID varenia pre ďalšie dopyty.

Pokiaľ na BE nastane porucha alebo chyba pri spúšťaní, na FE pošle odpoveď:
````json
500 SERVER ERROR
{
    "error" : "Temp error message."
}
````
FE túto chybu následne ohlási používateľovi.

### Periodické dopyty na back-end

Pokiaľ sa varenie spustí úspešne, FE prejde do módu, kde sa periodicky dopytuje
BE na stav receptu. Každú 1 sekundu na BE odošle GET request na URL:
````
GET /api/brew/{brewId}
````
#### Pokiaľ všetko prebieha v poriadku

V ideálnom prípade BE odpovie formou:

````json
200 OK
{
  "module-states": [
    // stavy jednotlivých modulov
    {
      "temp": 70,
      "rpm": 100,
      "heating": 1,
      // 1 - true, 0 - false (myslím že JSON nepodporuje bool)
      "active": 1
    },
    {
      "temp": 20,
      "rpm": 0,
      "heating": 0,
      "active": 0
    },
    "rec-blocks"
    :
    [
      // základné informácie o všetkých blokoch
      {
        "id": 0,
        "name": "BLOCK1"
      },
      {
        "id": 1,
        "name": "BLOCK2"
      },
      ...
    ],
    "instructions" : [
      ...
    ],
    "remaining-time" :
    ...
    }
````

FE túto odpoveď spracuje a obnoví obrazovku.

#### Pokiaľ nastane chyba

Pokiaľ došlo k chybe niekde v pipeline, BE odpovie formou:

````json
500 SERVER ERROR
{
  "error": "Temp error message.",
  "module": {
    // špecifikácia chybného modulu (a zariadenia)
    "name": "MODULE1",
    ...
  },
  "instruction": {
    // inštrukcia, v ktorom nastala chyba
    "parent-block": ID,
    ...
  }
}
````
### Úspešné ukončenie varenia

Pokiaľ BE úspešne ukončil varenie, pri najbližšom GET dopyte (`GET /api/brew/{brewId}`) BE pridá položku `status: "fin"`:
````json
200 OK
{
    ...
    ...
    "status" : "fin"
}
````

FE o tejto skutočnosti upovedomí používateľa a ukončí mód periodických dopytov.
 

### Úprava parametrov počas varenia

Pokiaľ nastane zmena parametrov nejakých krokov, ktoré ešte neboli vykonané,
FE odošle POST request na BE:
````
POST /api/brew/{brewId}/step/{stepId}
````
````json
{                     
    // celá inštrukcia s upravenými paremtrami, viď Štruktúra JSONu inštrukcie"
}    
````
Pokiaľ úprava prebehne v poriadku, BE odpovie správou:
````json
200 OK
````
Pokiaľ úpravu nebolo možné vykonať, BE odpovie správou:

````json
400 BAD REQUEST
{
    "error" : "Temp error message."
}
````


_Note: je potrebné, aby FE po tomto POST requeste spustil timer na periodické dopyty odznova,
aby sme sa vyhli nepríjemnostiam s asynchronicitou BE._

### Pauza počas varenia

Na front-ende by mala byť možnosť pauznúť varenie používateľom. Používateľ klikne
na tlačidlo **"Pauza"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:
````
POST /api/brew/{brewId}/pause
````

BE by mal zastaviť časovače na všetkých aktívnych procesoch a odpovedať formou:
````json
200 OK
````

Pokiaľ pri zrušení nastane chyba, BE odpovie formou:
````json
500 SERVER ERROR
{
    "error" : "Temp error message."
}
````
Ak chceme pokračovať vo varení, pošleme:
````
POST /api/brew/{brewId}/resume
````

### Zrušenie varenia

Na front-ende by mala byť možnosť prerušiť varenie používateľom. Používateľ klikne
na tlačidlo **"Zrušiť varenie"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:
````
POST /api/brew/{brewId}/abort
````

BE by mal zrušiť všetky procesy, správne vypnúť všetky zariadenia a odpovedať formou:
````json
200 OK
````

Pokiaľ pri zrušení nastane chyba, BE odpovie formou:
````json
500 SERVER ERROR
{
    "error" : "Temp error message."
}
````
Now it's time to panic.
### Notes

- inštrukcia musí mať atribút **type**, ktorý bude identifikovať, či je automatický alebo
treba vstup používateľa
- pri varení nemusí BE odpovedať stále s celým receptom, pokiaľ má recept 
uložený u seba (z kroku spustenia varenia) - stačí len current block a module-stats
- zamyslieť sa, či by bolo možné implementovať pozastavenie varenia

### Je potrebné
- ku vykonávaným krokom poznamenať či sú automatické, alebo manuálne (musí ich vykonať obsluha, pivovar o tom upozorní na monitore)
- označovať jednotlivé násypníky (Akú úlohu môžu zastávať - jačmeň sa bude pridávať iba jedným z nich, a podobne.)
- odkiaľ sa bude načítavať stav zariadenia (backend/konfiguračný file). Napríklad ktoré násypníky sú dostupné a môžu sa využiť pri varení jednotlivých receptov
- odkiaľ sa načítavajú možné inštrukcie (obsahujúce názov a kombináciu jednotlivých parametrov ) // vo figme zakreslené ako jeden obdĺžniček z ktorých sa skladajú postupy
- na hlavnej obrazovke zobraziť náhlad práve vykonávaného receptu (napísaný ako postup pre človeka, v celistvom texte)
- dodať možnosť pomenovania jednotlivých krokov vykonávania receptov
- šipočka ukazuje či teplota v jednotlivých nádobách stúpa alebo klesá
