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

- **<podporované údaje>** - sú rovnaké údaje ako v [Podporované údaje](./supported-data.md)

### Posielanie inštrukcií z backendu na modul

```json title="Posielanie inštrukcií z backendu na modul"
{
  "moduleId": "<názov modulu>",
  "type": "instruction",
  "category": "<ketegória>",       // "MOTOR", "PUMP", ...
  "device": "<názov zariadenia>",  // "MOTOR_1", "PUMP_2", ...
  "instruction": "<inštrukcia>",      // "SET_TEMPERATURE", "SET_MOTOR_SPEED", ...
  "parameter": "<parameter>"
}
```

- hodnoty budu podľa definície v [Podporované funkcie](./supported-functions.md)

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
    "code_name": "SET_TEMPERATURE",
    "name": "Temperature",
    "category": "TEMPERATURE",
    "units": "°C",
    "input_type": "float",
    "description": "Sets temerature for selected chamber",
    "Function_options": [
      {
        "id": 1,
        "name": "Chamber 1",
        "code_name": "TEMP_1"
      },
      {
        "id": 2,
        "name": "Chamber 2",
        "code_name": "TEMP_2"
      }
    ]
  },
  {
    "id": 2,
    "code_name": "SET_MOTOR_SPEED",
    "name": "Motor",
    "category": "MOTOR",
    "units": "RMP",
    "input_type": "float",
    "description": "Sets rpms for selected motor",
    "Function_options": [
      {
        "id": 3,
        "name": "Motor 1",
        "code_name": "MOTOR_1"
      },
      {
        "id": 4,
        "name": "Motor 2",
        "code_name": "MOTOR_2"
      }
    ]
  },
  {
    "id": 3,
    "code_name": "TRANSFER_LIQUIDS",
    "name": "Transfer liquids",
    "category": "PUMP",
    "units": null,
    "input_type": null,
    "description": "Transfers liquids from first chamber to second",
    "Function_options": [
      {
        "id": 5,
        "name": "Pump 1",
        "code_name": "PUMP_1"
      }
    ]
  },
  {
    "id": 4,
    "code_name": "UNLOAD",
    "name": "Unload",
    "category": "UNLOADER",
    "units": null,
    "input_type": null,
    "description": "Unloads selected ingredient into chamber",
    "Function_options": [
      {
        "id": 6,
        "name": "Fermentables",
        "code_name": "FERMENTABLE"
      },
      {
        "id": 7,
        "name": "Yeast",
        "code_name": "YEAST"
      },
      {
        "id": 8,
        "name": "Hops",
        "code_name": "HOPS"
      },
      {
        "id": 9,
        "name": "Other",
        "code_name": "OTHER"
      }
    ]
  },
  {
    "id": 5,
    "code_name": "WAIT",
    "name": "Wait",
    "category": "SYSTEM",
    "units": "Minutes",
    "input_type": "float",
    "description": "System will wait for given amount of minues",
    "Function_options": []
  },
  {
    "id": 6,
    "code_name": "MANUAL",
    "name": "Manual step",
    "category": "SYSTEM",
    "units": null,
    "input_type": "string",
    "description": "System will wait for manual inervention",
    "Function_options": []
  }
]
```
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

FE ponúkne používateľovi výber z prijatých receptov podľa názvu.
Pri vybratí receptu sa odošle GET request na backend:

````
GET /api/recipe/{recipe-id}
````
Odpoveďou bude JSON so všetkými dátami receptu:

````json
{
  "id": 3,
  "name": "Smoky Grove Lichtenhainer",
  "description": "Light, gently tart, and smoked—lichtenhainer is an unusual beer, yet surprisingly good for all seasons and one you’ll want to brew and enjoy often.",
  "locked": false,
  "Ingredients": [
    {
      "id": 5,
      "recipe_id": 3,
      "name": "American - Pale 2-Row",
      "amount": 5.6,
      "type": "Fermentable",
      "units": "Kg"
    },
    {
      "id": 6,
      "recipe_id": 3,
      "name": "Fermentis - Safale - American Ale Yeast US-05",
      "amount": 1,
      "type": "Yeast",
      "units": ""
    },
    {
      "id": 7,
      "recipe_id": 3,
      "name": "Magnum (Pellet)",
      "amount": 1,
      "type": "Hops",
      "units": "oz"
    },
    {
      "id": 8,
      "recipe_id": 3,
      "name": "Crush whilrfoc Tablet",
      "amount": 1,
      "type": "Other",
      "units": ""
    }
  ],
  "Instructions": [
    {
      "id": 11,
      "recipe_id": 3,
      "block_id": 1,
      "function_template_id": 4,
      "function_option_id": 6,
      "ordering": 4,
      "param": null,
      "Blocks": {
        "name": "Fermentation"
      }
    },
    {
      "id": 12,
      "recipe_id": 3,
      "block_id": 1,
      "function_template_id": 1,
      "function_option_id": 1,
      "ordering": 3,
      "param": {
        "temp": "60"
      },
      "Blocks": {
        "name": "Fermentation"
      }
    },
    {
      "id": 13,
      "recipe_id": 3,
      "block_id": 2,
      "function_template_id": 5,
      "function_option_id": null,
      "ordering": 2,
      "param": {
        "duration": "5"
      },
      "Blocks": {
        "name": "Yeasting"
      }
    },
    {
      "id": 14,
      "recipe_id": 3,
      "block_id": 2,
      "function_template_id": 2,
      "function_option_id": 3,
      "ordering": 1,
      "param": {
        "rpms": "100"
      },
      "Blocks": {
        "name": "Yeasting"
      }
    }
  ]
}
````

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
      "function_template_id": 4,
      "function_option_id": 6,
      "ordering": 4,
      "param": null,
      "Block": "First stage",
    },
    {
      "function_template_id": 1,
      "function_option_id": 1,
      "ordering": 3,
      "param": {
        "temp": "60"
      },
      "Block": "First stage",
    },
    {
      "function_template_id": 5,
      "function_option_id": null,
      "ordering": 2,
      "param": {
        "duration": "5"
      },
      "Block": "Second stage",
    },
    {
      "function_template_id": 2,
      "function_option_id": 3,
      "ordering": 1,
      "param": {
        "rpms": "100"
      },
      "Block": "Second stage",
    }
  ]
}
```
Ako odpoveď na FE príde JSON s vygenerovaným ID pridaného receptu:
````json
200 OK
{
  "id" : xxx
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
PUT /api/brew/0/start
```

```json
{
  "recipeId": 123  // id vybraného receptu
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

### Periodické dopyty na back-end {#api-data}

Pokiaľ sa varenie spustí úspešne, FE prejde do módu, kde sa periodicky dopytuje
BE na stav receptu. Každú 1 sekundu na BE odošle GET request na URL:
````
GET /api/data
````
#### Pokiaľ všetko prebieha v poriadku

V ideálnom prípade BE odpovie formou:

````json
200 OK
{
  "data": {
    <podporované údaje>
  },
  "instruction" : {
    "currentInstruction": 23,
    "status": "IN_PROGRESS"
  },
  "brewStatus": "IN_PROGRESS"
}
````

- **<podporované údaje>** - sú rovnaké údaje ako v [Podporované údaje](./supported-data.md)

FE túto odpoveď spracuje a obnoví obrazovku.

#### Pokiaľ nastane chyba

Pokiaľ došlo k chybe niekde v pipeline, BE odpovie formou:

````json
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
    "status": "FAIL"
  },
  "brewStatus": "STOPPED"
}
````

### Úspešné ukončenie varenia

Pokiaľ BE úspešne ukončil varenie, pri najbližšom GET dopyte (`GET /api/data`) BE pridá položku `status: "FINISHED"`:
````json
200 OK
{
  ...
  ...
  "brewStatus": "FINISHED"
}
````

FE o tejto skutočnosti upovedomí používateľa a ukončí mód periodických dopytov.

### Potvrdenie manuálnej inštrukcie

Keď nastane situácia, že treba vykonať manuálnu inštrukciu, systém bude čakať až kým používateľ nepotvrdí jej vykonanie.

```
POST /api/brew/{brewId}/instruction/{instructionId}/done
```

````json
200 OK
````

Až po nasledujúcom dopyte v [Periodické dopyty na back-end](#api-data) sa prejde na ďalšiu inštrukciu, keď nám BE pošle, že sme na nasledujúcej inštrukcii.

### Úprava parametrov počas varenia

Pokiaľ nastane zmena parametrov nejakých krokov, ktoré ešte neboli vykonané,
FE odošle POST request na BE:
````
POST /api/brew/{brewId}/instruction/{instructionId}
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

### Pokračovanie varenia

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
