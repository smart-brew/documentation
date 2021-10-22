# Front-end

## Technológie

Pre používateľské rozhranie budeme používať React framework.

## Komunikácia s back-endom

Pre komunikáciu využijeme REST API cally a správy vo formáte JSON.

### Výber receptu

Pri zapnutí si používateľ bude môcť vybrať, či chce použiť už
vytvorený recept, alebo či chce vytvoriť nový recept.

Pokiaľ si vyberie použitie vytvoreného receptu, front-end pošle GET request na back-end URL:

```
GET /api/recipe
```

Ako odpoveď obdrží **všetky** recepty v JSON formáte:

```json
[
    {
        "id" : 0,
        "timestamp" : ...,
        "steps" : 
            [
            ...
            ],
            ...
        },
    {
        "id" : 1,
        "timestamp" : ...,
        "steps" : 
            [
            ...
            ],
            ...
    },
    ...
]
```

JSON obsahuje všetky uložené recepty. FE ponúkne používateľovi výber z prijatých
receptov. Pri vybratí receptu sa ten načíta na hlavnú obrazovku a tiež sa odošle
POST request na BE s vybraným receptom:

```
POST /api/recipe/{recipe-id}/select
```

```json
{
    "id" : 0,
    "timestamp" : ...,
    "steps" : 
        [
        ...
        ],
    ...
    }
}
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
    "timestamp" : ...,
    "steps" : 
        [
        ...
        ],
    ...
    }
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
Pri spustení varenia sa na BE pošle POST request:

```
POST /api/brew/{recepie-id}/start
```

```json
{
    // pre istotu sa pošle recept znovu
    "id" : xx,
    "timestamp" : ...,
    "steps" : 
        [
        ...
        ],
    ...
    }
}
````

FE čaká na odpoveď z BE, či sa všetko úspešne spustilo:

````json
200 OK
{
    "brew-id" : xx
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
GET /api/brew/{brew-id}
````
#### Pokiaľ všetko prebieha v poriadku

V ideálnom prípade BE odpovie formou:
````json
200 OK
{
    "module-states" : [                 // stavy jednotlivých modulov
                        1 : {
                            "temp" : 70,
                            "rpm" : 100,
                            "heating" : 1,      // 1 - true, 0 - false (myslím že JSON nepodporuje bool)
                            "active" : 1,
                            },
                        2 : {
                            "temp" : 20,
                            "rpm" : 0,
                            "heating" : 0,
                            "active" : 0,
                            },
                            
    "rec-blocks": [                     // základné informácie o všetkých blokoch
                    1 : {
                        "id": 1,
                        "name" : "BLOCK1",
                        "steps" [
                                ...
                                ]
                        },
                    2 : {
                        "id": 2,
                        "name" : "BLOCK2",
                        "steps" [
                                ...
                                ]
                        },
                   ...
                  ],
    "curr-block": {                 // podrobné informácie o momentálne vykonávanom bloku
                    id: 1,          // stačí len ID, pokiaľ sa aj o ostatných blokoch budú posielať podrobné info.
                    "name" : "BLOCK2",
                    "steps" [
                            ...
                            ]
                    },
    "remaining-time" : ...
}
````
FE túto odpoveď spracuje a obnoví obrazovku.

#### Pokiaľ nastane chyba

Pokiaľ došlo k chybe niekde v pipeline, BE odpovie formou:

````json
500 SERVER ERROR
{
    "error" : "Temp error message.",
    "module" : {                        // špecifikácia chybného modulu (a zariadenia)
                "name" : "MODULE1",
                ...
                },
    "step" : {                          // krok, v ktorom nastala chyba
             "parent-block" : ID,
             ...
             },                         
}
````

### Úprava parametrov počas varenia

Pokiaľ nastane zmena parametrov nejakých krokov, ktoré ešte neboli vykonané,
FE odošle POST request na BE:
````
POST /api/brew/{brew-id}/step/{step-id}
````
````json
{                     
    "parent-block" : ID,
    ...             // upravovany "step"
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

### Zrušenie varenia

Na front-ende by mala byť možnosť prerušiť varenie používateľom. Používateľ klikne
na tlačidlo **"Zrušiť varenie"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:
````
POST /api/brew/{brew-id}/abort
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

### Úspešné ukončenie varenia

Pokiaľ BE úspešne ukončil varenie, pri najbližšom GET dopyte (`GET /api/brew/{brew-id}`) BE pridá položku `status: "fin"`:
````json
200 OK
{
    ...
    ...
    "status" : "fin"
}
````

FE o tejto skutočnosti upovedomí používateľa a ukončí mód periodických dopytov.
 
### Notes

- krok musí mať atribút **type**, ktorý bude identifikovať, či je automatický alebo
treba vstup používateľa
- pri varení nemusí BE odpovedať stále s celým receptom, pokiaľ má recept 
uložený u seba (z kroku spustenia varenia) - stačí len current block a module-stats
- zamyslieť sa, či by bolo možné implementovať pozastavenie varenia
