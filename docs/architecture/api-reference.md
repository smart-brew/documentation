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
  "function": "<inštrukcia>",      // "SET_TEMPERATURE", "SET_MOTOR_SPEED", ...
  "parameter": "<parameter>"
}
```

- hodnoty budu podľa definície v [Podporované funkcie](./supported-functions.md)

## Backend <--> Frontend
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
    "created_at": "2021-10-30T16:59:08.653Z",
    "updated_at": "2021-10-30T16:59:08.657Z",
    "Function_options": [
      {
        "id": 1,
        "name": "Chamber 1",
        "code_name": "TEMP_1",
        "module": 1,
        "created_at": "2021-10-30T16:59:08.654Z",
        "updated_at": "2021-10-30T16:59:08.657Z"
      },
      {
        "id": 2,
        "name": "Chamber 2",
        "code_name": "TEMP_2",
        "module": 1,
        "created_at": "2021-10-30T16:59:08.654Z",
        "updated_at": "2021-10-30T16:59:08.657Z"
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
    "created_at": "2021-10-30T16:59:08.733Z",
    "updated_at": "2021-10-30T16:59:08.734Z",
    "Function_options": [
      {
        "id": 3,
        "name": "Motor 1",
        "code_name": "MOTOR_1",
        "module": 2,
        "created_at": "2021-10-30T16:59:08.733Z",
        "updated_at": "2021-10-30T16:59:08.734Z"
      },
      {
        "id": 4,
        "name": "Motor 2",
        "code_name": "MOTOR_2",
        "module": 2,
        "created_at": "2021-10-30T16:59:08.733Z",
        "updated_at": "2021-10-30T16:59:08.734Z"
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
    "created_at": "2021-10-30T16:59:08.764Z",
    "updated_at": "2021-10-30T16:59:08.765Z",
    "Function_options": [
      {
        "id": 5,
        "name": "Pump 1",
        "code_name": "PUMP_1",
        "module": 3,
        "created_at": "2021-10-30T16:59:08.764Z",
        "updated_at": "2021-10-30T16:59:08.765Z"
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
    "created_at": "2021-10-30T16:59:08.780Z",
    "updated_at": "2021-10-30T16:59:08.781Z",
    "Function_options": [
      {
        "id": 6,
        "name": "Fermentables",
        "code_name": "FERMENTABLE",
        "module": 4,
        "created_at": "2021-10-30T16:59:08.780Z",
        "updated_at": "2021-10-30T16:59:08.781Z"
      },
      {
        "id": 7,
        "name": "Yeast",
        "code_name": "YEAST",
        "module": 4,
        "created_at": "2021-10-30T16:59:08.780Z",
        "updated_at": "2021-10-30T16:59:08.781Z"
      },
      {
        "id": 8,
        "name": "Hops",
        "code_name": "HOPS",
        "module": 4,
        "created_at": "2021-10-30T16:59:08.780Z",
        "updated_at": "2021-10-30T16:59:08.781Z"
      },
      {
        "id": 9,
        "name": "Other",
        "code_name": "OTHER",
        "module": 4,
        "created_at": "2021-10-30T16:59:08.780Z",
        "updated_at": "2021-10-30T16:59:08.781Z"
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
    "created_at": "2021-10-30T16:59:08.798Z",
    "updated_at": "2021-10-30T16:59:08.799Z",
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
    "created_at": "2021-10-30T16:59:08.810Z",
    "updated_at": "2021-10-30T16:59:08.810Z",
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
    "id": 1,
    "name": "TEST_RECIPE_1",
    "description": "Seed recipe 1",
    "locked": false,
    "created_at": "2021-10-30T17:02:10.626Z",
    "updated_at": "2021-10-30T17:02:10.629Z",
    "Ingredients": [
      {
        "id": 1,
        "recipe_id": 1,
        "name": "Some ingredient",
        "amount": 5.6,
        "type": "Hops",
        "created_at": "2021-10-30T17:02:10.626Z",
        "updated_at": "2021-10-30T17:02:10.629Z"
      },
      {
        "id": 2,
        "recipe_id": 1,
        "name": "Some different ingredient",
        "amount": 1,
        "type": "Yeast",
        "created_at": "2021-10-30T17:02:10.627Z",
        "updated_at": "2021-10-30T17:02:10.629Z"
      }
    ],
    "Blocks": [
      {
        "id": 1,
        "recipe_id": 1,
        "name": "Initialization",
        "created_at": "2021-10-30T17:02:10.627Z",
        "updated_at": "2021-10-30T17:02:10.629Z",
        "Instructions": [
          {
            "id": 1,
            "block_id": 1,
            "function_template_id": 5,
            "function_option_id": null,
            "ordering": 2,
            "param": {
              "duration": "5"
            },
            "created_at": "2021-10-30T17:02:10.627Z",
            "updated_at": "2021-10-30T17:02:10.629Z"
          },
          {
            "id": 2,
            "block_id": 1,
            "function_template_id": 2,
            "function_option_id": 3,
            "ordering": 1,
            "param": {
              "rpms": "100"
            },
            "created_at": "2021-10-30T17:02:10.627Z",
            "updated_at": "2021-10-30T17:02:10.629Z"
          }
        ]
      },
      {
        "id": 2,
        "recipe_id": 1,
        "name": "NextBlock",
        "created_at": "2021-10-30T17:02:10.627Z",
        "updated_at": "2021-10-30T17:02:10.629Z",
        "Instructions": [
          {
            "id": 3,
            "block_id": 2,
            "function_template_id": 4,
            "function_option_id": 6,
            "ordering": 4,
            "param": null,
            "created_at": "2021-10-30T17:02:10.627Z",
            "updated_at": "2021-10-30T17:02:10.629Z"
          },
          {
            "id": 4,
            "block_id": 2,
            "function_template_id": 1,
            "function_option_id": 1,
            "ordering": 3,
            "param": {
              "temp": "60"
            },
            "created_at": "2021-10-30T17:02:10.627Z",
            "updated_at": "2021-10-30T17:02:10.629Z"
          }
        ]
      }
    ]
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
````
 

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