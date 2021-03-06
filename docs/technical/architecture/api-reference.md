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
  "type": "instruction",
  "moduleId": "<názov modulu>",
  "category": "<ketegória>", // "MOTOR", "PUMP", ...
  "device": "<názov zariadenia>", // "MOTOR_1", "PUMP_2", ...
  "instruction": "<inštrukcia>", // "SET_TEMPERATURE", "SET_MOTOR_SPEED", ...
  "params": "<parameter>"
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
    "codeName": "SET_TEMPERATURE",
    "name": "Set temperature",
    "category": "TEMPERATURE",
    "units": "°C",
    "inputType": "float",
    "description": "Sets temerature for selected chamber",
    "options": [
      {
        "id": 1,
        "name": "Chamber 1",
        "codeName": "TEMP_1"
      },
      {
        "id": 2,
        "name": "Chamber 2",
        "codeName": "TEMP_2"
      }
    ]
  },
  {
    "id": 2,
    "codeName": "SET_MOTOR_SPEED",
    "name": "Set motor speed",
    "category": "MOTOR",
    "units": "RMP",
    "inputType": "float",
    "description": "Sets rpms for selected motor",
    "options": [
      {
        "id": 3,
        "name": "Motor 1",
        "codeName": "MOTOR_1"
      },
      {
        "id": 4,
        "name": "Motor 2",
        "codeName": "MOTOR_2"
      }
    ]
  },
  {
    "id": 3,
    "codeName": "TRANSFER_LIQUIDS",
    "name": "Transfer liquids",
    "category": "PUMP",
    "units": null,
    "inputType": null,
    "description": "Transfers liquids from first chamber to second",
    "options": [
      {
        "id": 5,
        "name": "Pump 1",
        "codeName": "PUMP_1"
      }
    ]
  },
  {
    "id": 4,
    "codeName": "UNLOAD",
    "name": "Unload ingredient",
    "category": "UNLOADER",
    "units": null,
    "inputType": null,
    "description": "Unloads selected ingredient into chamber",
    "options": [
      {
        "id": 6,
        "name": "Fermentables",
        "codeName": "FERMENTABLE"
      },
      {
        "id": 7,
        "name": "Yeast",
        "codeName": "YEAST"
      },
      {
        "id": 8,
        "name": "Hops",
        "codeName": "HOPS"
      },
      {
        "id": 9,
        "name": "Other",
        "codeName": "OTHER"
      }
    ]
  },
  {
    "id": 5,
    "codeName": "WAIT",
    "name": "Wait",
    "category": "SYSTEM",
    "units": "Minutes",
    "inputType": "float",
    "description": "System will wait for given amount of minues",
    "options": []
  },
  {
    "id": 6,
    "codeName": "MANUAL",
    "name": "Manual step",
    "category": "SYSTEM",
    "units": null,
    "inputType": "string",
    "description": "System will wait for manual inervention",
    "options": []
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
      "codeName": "SET_MOTOR_SPEED",
      "params": 30,
      "category": "MOTOR",
      "optionCodeName": "MOTOR_1",
      "blockId": 1,
      "blockName": "Fermentation",
      "ordering": 1
    },
    {
      "id": 12,
      "recipeId": 3,
      "templateId": 1,
      "codeName": "SET_TEMPERATURE",
      "params": 85,
      "category": "TEMPERATURE",
      "optionCodeName": "TEMP_1",
      "blockId": 1,
      "blockName": "Fermentation",
      "ordering": 2
    },
    {
      "id": 13,
      "recipeId": 3,
      "templateId": 2,
      "codeName": "SET_MOTOR_SPEED",
      "params": 0,
      "category": "MOTOR",
      "optionCodeName": "MOTOR_1",
      "blockId": 2,
      "blockName": "Yeasting",
      "ordering": 3
    },
    {
      "id": 14,
      "recipeId": 3,
      "templateId": 1,
      "codeName": "SET_TEMPERATURE",
      "params": 23,
      "category": "TEMPERATURE",
      "optionCodeName": "TEMP_1",
      "blockId": 2,
      "blockName": "Yeasting",
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
      "params": null,
      "optionCodeName": "FERMENTABLE",
      "blockName": "Fermentation",
      "ordering": 4
    },
    {
      "templateId": 1,
      "params": "60",
      "optionCodeName": "TEMP_1",
      "blockName": "Fermentation",
      "ordering": 3
    },
    {
      "templateId": 5,
      "params": "5",
      "optionCodeName": null,
      "blockName": "Yeasting",
      "ordering": 2
    },
    {
      "templateId": 2,
      "params": "100",
      "optionCodeName": "MOTOR_1",
      "blockName": "Yeasting",
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

### Úprava existujúceho receptu

Pokiaľ používateľ chce upraviť existujúci recept, pomocou obrazovky pre úpravu
receptu pozmení všetky požadované položky a klikne na tlačidlo **"Uložiť recept"** a odošle požiadavku na BE. Keďže potrebujem uchovať údaje pre potreby histórie varení, upravený recept sa uloží ako nový recept a pôvodný sa ďalej nebude zobrazovať medzi výberom recptov.

```
PUT /api/recipe/{recipe-id}/edit
```

```json
{
  "name": "New Perfect Northeast IPA (NEIPA)",
  "description": "I have no idea what I'am doing",
  "locked": false,
  "Ingredients": [
    {
      "name": "American - Pale 2-Row",
      "amount": 8.6,
      "type": "Fermentable",
      "units": "Kg"
    },
    {
      "name": "Fermentis - Safale - American Ale Yeast US-05",
      "amount": 2,
      "type": "Yeast",
      "units": ""
    },
    {
      "name": "Magnum (Pellet)",
      "amount": 0.5,
      "type": "Hops",
      "units": "oz"
    },
    {
      "name": "Crush whilrfoc Tablet",
      "amount": 1.5,
      "type": "Other",
      "units": ""
    }
  ],
  "Instructions": [
    {
      "templateId": 4,
      "params": null,
      "optionCodeName": "FERMENTABLE",
      "blockName": "Fermentation",
      "ordering": 4
    },
    {
      "templateId": 1,
      "params": "80",
      "optionCodeName": "TEMP_1",
      "blockName": "Fermentation",
      "ordering": 3
    },
    {
      "templateId": 5,
      "params": "5",
      "optionCodeName": null,
      "blockName": "Yeasting",
      "ordering": 2
    },
    {
      "templateId": 2,
      "params": "100",
      "optionCodeName": "MOTOR_1",
      "blockName": "Yeasting",
      "ordering": 1
    }
  ]
}
```

Ako odpoveď na FE príde JSON s vygenerovaným ID aktualizovaného receptu:

```json
200 OK
{
  "id" : xxx
}
```

### Vymazanie receptu

Pokiaľ chce používateľ vymazať jeden z receptov, klikne na ten, ktorý chce vymazať a následne
klikne na tlačidlo **"Vymazať"**. Po kliknutí na tlačidlo sa zobrazí potvrdzovacie okno a
po kliknutí tlačidla **"Potvrdiť"** sa pošle na BE POST request:

```
POST /api/recipe/{recipe-id}/delete
```

Ako odpoveď na FE príde JSON s ID vymazaného receptu:

```json
200 OK
{
  "id" : 3
}
```

Po vymazaní receptu sa obrazovka s receptami načíta znova a vymazaný recept už nebude zobrazovaný.

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
POST /api/brew/0/pause
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
POST /api/brew/0/resume
```

### Zrušenie varenia

Na front-ende by mala byť možnosť prerušiť varenie používateľom. Používateľ klikne
na tlačidlo **"Zrušiť varenie"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:

```
POST /api/brew/0/abort
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


### Resetovanie varenia po errore

Ak chceme pokračovať vo varení, po tom ako sa vyskytla chyba spojenia s modulmi , pošleme:

```
POST /api/brew/0/reset
```

### História všetkých varení

Pre zobrazenie prehľadu všetkých varení na FE je vytvorený endpoint:

```
GET /api/brew
```

Ako odpoveď príde zoznam vštekých ukončených varení s id, (poznámky a vyhdonotenie sme zatiaľ neimplementovali, možno v budúcnosti), status ako sa varenie skončilo, meno použitého receptu pre varenie, a časy začiatku a skončenia varenia.

```json
[
   {
      "id":1,
      "notes":null,
      "evaluation":null,
      "endState":"Aborted",
      "recipeName":"Smoky Grove Lichtenhainer",
      "startedAt":"2022-04-07T16:12:03.011Z",
      "finishedAt":"2022-04-07T16:12:47.442Z"
   },
   ...
]
```

### História konkrétneho varenia

Pre zobrazenie podrobného prehľadu varenia na FE je vytvorený endpoint:

```
GET /api/brew/{brewId}
```

Ako odpoveď príde JSON s údajmi o varení ako pri dopytovaní si prehľadu všetkých varení. Spolu s týmito údajmi prídu aj údaje o použitom recepte (rovnaké údaje ako pri dopytovaní si konkrétneho recptu na endpointe **GET /api/recipe/{recipe-id}**) a k tomu ešte aj záznamy z priebehu varenia. Časové údaje v týchto záznamoch sú relatívne k začiatku varenia.

Pod **InstructionLogs** sa nachádza zoznam záznamov o začatí vykonávania jednotlivých inštrukcií použitého receptu a o ich ukončení(v uvedenom príklade bol recept ukončený abortom počas vykonávania druhej inštrukcie, preto sa táto instšrukcia neukončila úspešne a nasledujúce sa ani nezačali vykonávať). Obsahuje identifikačné údaje varenia a inštrukcie ku ktorej patrí a údaje o úspešnom ukončení a relatívny čas začiatku vykonávania inštrukcie.

Pod **StatusLogs** sa nachádza zoznam záznamov o stave pivovaru a hodnotách nameraných na jednotlivých senzoroch (rovnaký formát ako pri dopyte na endpoint **GET /api/data**). Pre optimalizáciu výkonu a zjednodušenie zobrazenia údajov na FE posielame iba jeden záznam za minútu aj keď v skutočnosti má každé varenie oveľa viac záznamov.

```json
{
   "id":1,
   "notes":null,
   "evaluation":null,
   "endState":"Aborted",
   "recipeName":"Smoky Grove Lichtenhainer",
   "startedAt":"2022-04-07T16:12:03.011Z",
   "finishedAt":"2022-04-07T16:12:47.442Z",
   "recipe":{
      "name":"Smoky Grove Lichtenhainer",
      "id":1,
      "locked":true,
      "description":"Light, gently tart, and smoked—lichtenhainer is an unusual beer, yet surprisingly good for all seasons and one you’ll want to brew and enjoy often.",
      "Ingredients":[
         {
            "id":1,
            "recipeId":1,
            "name":"American - Pale 2-Row",
            "amount":5.6,
            "type":"Fermentable",
            "units":"Kg",
            "createdAt":"2022-04-07T14:45:04.034Z",
            "updatedAt":"2022-04-07T14:45:04.037Z"
         },
         {
            "id":2,
            "recipeId":1,
            "name":"Fermentis - Safale - American Ale Yeast US-05",
            "amount":1,
            "type":"Yeast",
            "units":"",
            "createdAt":"2022-04-07T14:45:04.034Z",
            "updatedAt":"2022-04-07T14:45:04.037Z"
         },
         {
            "id":3,
            "recipeId":1,
            "name":"Magnum (Pellet)",
            "amount":1,
            "type":"Hops",
            "units":"oz",
            "createdAt":"2022-04-07T14:45:04.034Z",
            "updatedAt":"2022-04-07T14:45:04.037Z"
         },
         {
            "id":4,
            "recipeId":1,
            "name":"Crush whilrfoc Tablet",
            "amount":1,
            "type":"Other",
            "units":"",
            "createdAt":"2022-04-07T14:45:04.034Z",
            "updatedAt":"2022-04-07T14:45:04.037Z"
         }
      ],
      "Instructions":[
         {
            "id":4,
            "recipeId":1,
            "templateId":6,
            "codeName":"SET_MOTOR_SPEED",
            "param":"100",
            "category":"MOTOR",
            "optionCodeName":"MOTOR_1",
            "blockId":2,
            "blockName":"FIRST_BLOCK",
            "ordering":1
         },
         {
            "id":3,
            "recipeId":1,
            "templateId":2,
            "codeName":"WAIT",
            "param":"50000",
            "category":"SYSTEM",
            "optionCodeName":null,
            "blockId":2,
            "blockName":"FIRST_BLOCK",
            "ordering":2
         },
         {
            "id":2,
            "recipeId":1,
            "templateId":4,
            "codeName":"SET_TEMPERATURE",
            "param":"60",
            "category":"TEMPERATURE",
            "optionCodeName":"TEMP_1",
            "blockId":1,
            "blockName":"SECOND_BLOCK",
            "ordering":3
         },
         {
            "id":1,
            "recipeId":1,
            "templateId":5,
            "codeName":"UNLOAD",
            "param":null,
            "category":"UNLOADER",
            "optionCodeName":"FERMENTABLE",
            "blockId":1,
            "blockName":"SECOND_BLOCK",
            "ordering":4
         }
      ]
   },
   "InstructionLogs":[
      {
         "id":2,
         "brewingId":1,
         "instructionId":3,
         "finished":false,
         "startedAt":2999
      },
      {
         "id":1,
         "brewingId":1,
         "instructionId":4,
         "finished":true,
         "startedAt":218
      }
   ],
   "StatusLogs":[
      {
         "id":1,
         "brewingId":1,
         "status":"IN_PROGRESS",
         "params":{
            "TEMPERATURE":[
               {
                  "TEMP":16.2652657535844,
                  "REGULATION_ENABLED":false,
                  "STATE":"WAITING",
                  "DEVICE":"TEMP_1"
               },
               {
                  "TEMP":10.941566144455068,
                  "REGULATION_ENABLED":false,
                  "STATE":"WAITING",
                  "DEVICE":"TEMP_2"
               }
            ],
            "MOTOR":[
               {
                  "SPEED":0,
                  "RPM":-0.15012981101345724,
                  "STATE":"WAITING",
                  "DEVICE":"MOTOR_1"
               },
               {
                  "SPEED":0,
                  "RPM":14.64062077202769,
                  "STATE":"WAITING",
                  "DEVICE":"MOTOR_2"
               }
            ],
            "UNLOADER":[
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"FERMENTABLE"
               },
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"YEAST"
               },
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"HOPS"
               },
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"OTHER"
               }
            ],
            "PUMP":[
               {
                  "ENABLED":false,
                  "STATE":"WAITING",
                  "DEVICE":"PUMP_1"
               }
            ],
            "SYSTEM":[
               {
                  "REMAINING":0,
                  "STATE":"WAITING",
                  "DEVICE":"WAIT"
               }
            ]
         },
         "createdAt":1382
      },
      {
         "id":42,
         "brewingId":1,
         "status":"IN_PROGRESS",
         "params":{
            "TEMPERATURE":[
               {
                  "TEMP":14.262489126700011,
                  "REGULATION_ENABLED":false,
                  "STATE":"WAITING",
                  "DEVICE":"TEMP_1"
               },
               {
                  "TEMP":7.213137158608217,
                  "REGULATION_ENABLED":false,
                  "STATE":"WAITING",
                  "DEVICE":"TEMP_2"
               }
            ],
            "MOTOR":[
               {
                  "SPEED":100,
                  "RPM":90.88227550340005,
                  "STATE":"WAITING",
                  "DEVICE":"MOTOR_1"
               },
               {
                  "SPEED":0,
                  "RPM":12.901996647902722,
                  "STATE":"WAITING",
                  "DEVICE":"MOTOR_2"
               }
            ],
            "UNLOADER":[
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"FERMENTABLE"
               },
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"YEAST"
               },
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"HOPS"
               },
               {
                  "UNLOADED":false,
                  "STATE":"WAITING",
                  "DEVICE":"OTHER"
               }
            ],
            "PUMP":[
               {
                  "ENABLED":false,
                  "STATE":"WAITING",
                  "DEVICE":"PUMP_1"
               }
            ],
            "SYSTEM":[
               {
                  "REMAINING":14,
                  "STATE":"IN_PROGRESS",
                  "DEVICE":"WAIT"
               }
            ]
         },
         "createdAt":42498
      }
   ]
}
```

### Exportovanie logov - CSV

Pre export status logov počas varenia ako csv súboru je možné poslať request:

```
GET /api/brew/{brewId}/exportCsv
```

Následne sa stiahne csv súbor obsahujúci logy varenia.

### Exportovanie logov - JSON

Pre export status logov počas varenia ako json súboru je možné poslať request:

```
GET /api/brew/{brewId}/exportJson
```

Následne sa stiahne json súbor obsahujúci logy varenia.

### Vypnutie systému

Používateľ môže kliknúť na tlačidlo vypnutia systému. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:

```
POST /api/shutdown
```

BE následne vypne celé RPI, na ktorom beží systém pivovaru.
