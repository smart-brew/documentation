---
---

# API

Rôzne komponenty spolu komunikujú rôznym spôsobom, preto je dôležité mať jedno miesto, kde sa dá prehľadne pozrieť, ako fungujú naše API.

## Module <--> Backend

Modul komunikuje smerom na backend cez WebSocket a posiela periodicky nasledujúce správy:

### Posielanie údajov z modulu na backend

```json title="Posielanie údajov z modulu na backend"
{
  "moduleId": "<názov modulu>",
  "status": "<ok | progress | error>",
  <podporované údaje>
}
```

- **<podporované údaje>** - sú rovnaké údaje ako v [Podporované údaje](supported-data.md)

### Posielanie inštrukcií z backendu na modul

```json title="Posielanie inštrukcií z backendu na modul"
{
  "moduleId": "<názov modulu>",
  "type": "instruction",
  "category": "<ketegória>", // "MOTOR", "PUMP", ...
  "device": "<názov zariadenia>", // "MOTOR_1", "PUMP_2", ...
  "instruction": "<inštrukcia>", // "SET_TEMPERATURE", "SET_MOTOR_SPEED", ...
  "parameter": "<parameter>"
}
```

- hodnoty budu podľa definície v [Podporované funkcie](supported-functions.md)

## Backend <--> Frontend

Pri každom dopyte a jeho odpovedi, sa budú nachádzať aj `created_at` a `updated_at`, avšak pre prehľadnosť, tu niesú napísané.

### Podporované funkcie

FE môže získať informácie o podporovaých funkciách v rámci systému.

```
GET /api/function
```

```json
[
  {
    "id": 1,
    "instruction": "SET_TEMPERATURE",
    "name": "Set temperature",
    "category": "TEMPERATURE",
    "units": "°C",
    "inputType": "float",
    "description": "Sets temerature for selected chamber",
    "devices": [
      {
        "id": 1,
        "name": "Chamber 1",
        "device": "TEMP_1"
      },
      {
        "id": 2,
        "name": "Chamber 2",
        "device": "TEMP_2"
      }
    ]
  },
  {
    "id": 2,
    "instruction": "SET_MOTOR_SPEED",
    "name": "Set motor speed",
    "category": "MOTOR",
    "units": "RMP",
    "inputType": "float",
    "description": "Sets rpms for selected motor",
    "devices": [
      {
        "id": 3,
        "name": "Motor 1",
        "device": "MOTOR_1"
      },
      {
        "id": 4,
        "name": "Motor 2",
        "device": "MOTOR_2"
      }
    ]
  },
  {
    "id": 3,
    "instruction": "TRANSFER_LIQUIDS",
    "name": "Transfer liquids",
    "category": "PUMP",
    "units": null,
    "inputType": null,
    "description": "Transfers liquids from first chamber to second",
    "devices": [
      {
        "id": 5,
        "name": "Pump 1",
        "device": "PUMP_1"
      }
    ]
  },
  {
    "id": 4,
    "instruction": "UNLOAD",
    "name": "Unload ingredient",
    "category": "UNLOADER",
    "units": null,
    "inputType": null,
    "description": "Unloads selected ingredient into chamber",
    "devices": [
      {
        "id": 6,
        "name": "Fermentables",
        "device": "FERMENTABLE"
      },
      {
        "id": 7,
        "name": "Yeast",
        "device": "YEAST"
      },
      {
        "id": 8,
        "name": "Hops",
        "device": "HOPS"
      },
      {
        "id": 9,
        "name": "Other",
        "device": "OTHER"
      }
    ]
  },
  {
    "id": 5,
    "instruction": "WAIT",
    "name": "Wait",
    "category": "SYSTEM",
    "units": "Minutes",
    "inputType": "float",
    "description": "System will wait for given amount of minues",
    "devices": []
  },
  {
    "id": 6,
    "instruction": "MANUAL",
    "name": "Manual step",
    "category": "SYSTEM",
    "units": null,
    "inputType": "string",
    "description": "System will wait for manual inervention",
    "devices": []
  }
]
```

### Výber všetkých receptov

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
    "id": 3,
    "name": "Smoky Grove Lichtenhainer",
    "description": "Light, gently tart, and smoked—lichtenhainer is an unusual beer, yet surprisingly good for all seasons and one you’ll want to brew and enjoy often.",
    "locked": false
  },
  {
    "id": 4,
    "name": "Burke-Gilman The Hopsplainer",
    "description": "Courtesy of the brewing team at Burke-Gilman in Seattle, here is a homebrew-scale recipe for the double hazy IPA that won GABF gold in 2020.",
    "locked": true
  },
  ...
]
```

### Výber jedného receptu

FE ponúkne používateľovi výber z prijatých receptov podľa názvu.
Pri vybratí receptu sa odošle GET request na backend:

```
GET /api/recipe/{recipe-id}
```

Odpoveďou bude JSON so všetkými dátami receptu:

```json
{
  "id": 3,
  "name": "Smoky Grove Lichtenhainer",
  "description": "Light, gently tart, and smoked—lichtenhainer is an unusual beer, yet surprisingly good for all seasons and one you’ll want to brew and enjoy often.",
  "locked": false,
  "Ingredients": [
    {
      "id": 5,
      "recipeId": 3,
      "name": "American - Pale 2-Row",
      "amount": 5.6,
      "type": "Fermentable",
      "units": "Kg"
    },
    {
      "id": 6,
      "recipeId": 3,
      "name": "Fermentis - Safale - American Ale Yeast US-05",
      "amount": 1,
      "type": "Yeast",
      "units": ""
    },
    {
      "id": 7,
      "recipeId": 3,
      "name": "Magnum (Pellet)",
      "amount": 1,
      "type": "Hops",
      "units": "oz"
    },
    {
      "id": 8,
      "recipeId": 3,
      "name": "Crush whilrfoc Tablet",
      "amount": 1,
      "type": "Other",
      "units": ""
    }
  ],
  "Instructions": [
    {
      "id": 11,
      "recipeId": 3,
      "templateId": 2,
      "instruction": "SET_MOTOR_SPEED",
      "param": 30,
      "category": "MOTOR",
      "device": "MOTOR_1",
      "blockId": 1,
      "block": "Fermentation",
      "ordering": 1
    },
    {
      "id": 12,
      "recipeId": 3,
      "templateId": 1,
      "instruction": "SET_TEMPERATURE",
      "param": 85,
      "category": "TEMPERATURE",
      "device": "TEMP_1",
      "blockId": 1,
      "block": "Fermentation",
      "ordering": 2
    },
    {
      "id": 13,
      "recipeId": 3,
      "templateId": 2,
      "instruction": "SET_MOTOR_SPEED",
      "param": 0,
      "category": "MOTOR",
      "device": "MOTOR_1",
      "blockId": 2,
      "block": "Yeasting",
      "ordering": 3
    },
    {
      "id": 14,
      "recipeId": 3,
      "templateId": 1,
      "instruction": "SET_TEMPERATURE",
      "param": 23,
      "category": "TEMPERATURE",
      "device": "TEMP_1",
      "blockId": 2,
      "block": "Yeasting",
      "ordering": 4
    }
  ]
}
```

### Výber receptu na varenie

Pokiaľ je používateľ s vybraným receptom spokojný, klikne na tlačidlo **"Vybrať recept"**.
Recept sa následne načíta na hlavnú obrazovku a tiež sa odošle
POST request na BE s vybraným receptom (aby BE vedel, že čo sa bude robiť):

```
POST /api/recipe/{recipe-id}/load
```

### Pridanie nového receptu

Pokiaľ používateľ chce vytvoriť nový recept, pomocou obrazovky pre pridanie
receptu vykliká všetky požadované kroky a klikne na tlačidlo **"Pridať recept"**.
Na BE sa odošle PUT request:

```
PUT /api/recipe
```

```json
{
  "name": "Perfect Northeast IPA (NEIPA)",
  "description": "I have no idea what I'am doing",
  "locked": false,
  "Ingredients": [
    {
      "name": "American - Pale 2-Row",
      "amount": 5.6,
      "type": "Fermentable",
      "units": "Kg"
    },
    {
      "name": "Fermentis - Safale - American Ale Yeast US-05",
      "amount": 1,
      "type": "Yeast",
      "units": ""
    },
    {
      "name": "Magnum (Pellet)",
      "amount": 1,
      "type": "Hops",
      "units": "oz"
    },
    {
      "name": "Crush whilrfoc Tablet",
      "amount": 1,
      "type": "Other",
      "units": ""
    }
  ],
  "Instructions": [
    {
      "templateId": 4,
      "param": null,
      "deviceId": 6,
      "blockId": 1,
      "ordering": 4
    },
    {
      "templateId": 1,
      "param": "60",
      "deviceId": 1,
      "blockId": 1,
      "ordering": 3
    },
    {
      "templateId": 5,
      "param": "5",
      "deviceId": null,
      "blockId": 2,
      "ordering": 2
    },
    {
      "templateId": 2,
      "param": "100",
      "deviceId": 3,
      "blockId": 2,
      "ordering": 1
    }
  ]
}
```

Ako odpoveď na FE príde JSON s vygenerovaným ID pridaného receptu:

```json
200 OK
{
  "id" : xxx
}
```

Po vytvorení receptu sa vrátime na výber receptov, kde bude už nový recept zobrazený.

### Začiatok varenia

Po vybratí receptu sa recept načíta na hlavnú obrazovku. Používateľ dostane príležitosť
skontrolovať, či je recept správny. Pokiaľ je s receptom spokojný, spustí varenie.
Pri spustení varenia sa na BE pošle PUT request:

```
PUT /api/brew/0/start
```

```json
{
  "recipeId": 123 // id vybraného receptu
}
```

FE čaká na odpoveď z BE, či sa všetko úspešne spustilo:

```json
200 OK
{
    "brewId" : xxx
}
```

FE si uloží ID varenia pre ďalšie dopyty.

Pokiaľ na BE nastane porucha alebo chyba pri spúšťaní, na FE pošle odpoveď:

```json
500 SERVER ERROR
{
  "error" : "Temp error message."
}
```

FE túto chybu následne ohlási používateľovi.

### Periodické dopyty na back-end {#api-data}

Pokiaľ sa varenie spustí úspešne, FE prejde do módu, kde sa periodicky dopytuje
BE na stav receptu. Každú 1 sekundu na BE odošle GET request na URL:

```
GET /api/data
```

#### Pokiaľ všetko prebieha v poriadku

V ideálnom prípade BE odpovie formou:

```json
200 OK
{
  "data": {
    <podporované údaje>
  },
  "instruction" : {
    "currentInstruction": 23,
    "currentValue": 36.5,
    "status": "IN_PROGRESS",
  },
  "brewStatus": "IN_PROGRESS"
}
```

- **<podporované údaje>** - sú rovnaké údaje ako v [Podporované údaje](supported-data.md)

FE túto odpoveď spracuje a obnoví obrazovku.

#### Pokiaľ nastane chyba

Pokiaľ došlo k chybe niekde v pipeline, BE odpovie formou:

```json
500 SERVER ERROR
{
  "error": "Temp error message.",
  "module": {
    "moduleId": 234,
    "device": "MOTOR_1",
    "category": "MOTOR",
    "error": "Cannot communicate with device"
  },
  "instruction" : {
    "currentInstruction": 23,
    "currentValue": 36.5,
    "status": "FAIL"
  },
  "brewStatus": "STOPPED"
}
```

### Úspešné ukončenie varenia

Pokiaľ BE úspešne ukončil varenie, pri najbližšom GET dopyte (`GET /api/data`) BE pridá položku `status: "FINISHED"`:

```json
200 OK
{
  ...
  ...
  "brewStatus": "FINISHED"
}
```

FE o tejto skutočnosti upovedomí používateľa a ukončí mód periodických dopytov.

### Potvrdenie manuálnej inštrukcie

Keď nastane situácia, že treba vykonať manuálnu inštrukciu, systém bude čakať až kým používateľ nepotvrdí jej vykonanie.

```
POST /api/brew/{brewId}/instruction/{instructionId}/done
```

```json
200 OK
```

Až po nasledujúcom dopyte v [Periodické dopyty na back-end](#api-data) sa prejde na ďalšiu inštrukciu, keď nám BE pošle, že sme na nasledujúcej inštrukcii.

### Úprava parametrov počas varenia

Pokiaľ nastane zmena parametrov nejakých krokov, ktoré ešte neboli vykonané,
FE odošle POST request na BE:

```
POST /api/brew/{brewId}/instruction/{instructionId}
```

```json
{
  // celá inštrukcia s upravenými paremtrami, viď Štruktúra JSONu inštrukcie"
}
```

Pokiaľ úprava prebehne v poriadku, BE odpovie správou:

```json
200 OK
```

Pokiaľ úpravu nebolo možné vykonať, BE odpovie správou:

```json
400 BAD REQUEST
{
    "error" : "Temp error message."
}
```

_Note: je potrebné, aby FE po tomto POST requeste spustil timer na periodické dopyty odznova,
aby sme sa vyhli nepríjemnostiam s asynchronicitou BE._

### Pauza počas varenia

Na front-ende by mala byť možnosť pauznúť varenie používateľom. Používateľ klikne
na tlačidlo **"Pauza"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:

```
POST /api/brew/{brewId}/pause
```

BE by mal zastaviť časovače na všetkých aktívnych procesoch a odpovedať formou:

```json
200 OK
```

Pokiaľ pri zrušení nastane chyba, BE odpovie formou:

```json
500 SERVER ERROR
{
    "error" : "Temp error message."
}
```

### Pokračovanie varenia

Ak chceme pokračovať vo varení, pošleme:

```
POST /api/brew/{brewId}/resume
```

### Zrušenie varenia

Na front-ende by mala byť možnosť prerušiť varenie používateľom. Používateľ klikne
na tlačidlo **"Zrušiť varenie"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:

```
POST /api/brew/{brewId}/abort
```

BE by mal zrušiť všetky procesy, správne vypnúť všetky zariadenia a odpovedať formou:

```json
200 OK
```

Pokiaľ pri zrušení nastane chyba, BE odpovie formou:

```json
500 SERVER ERROR
{
    "error" : "Temp error message."
}
```

Now it's time to panic.
