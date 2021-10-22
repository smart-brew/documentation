# Front-end

## Technológie

Pre používateľské rozhranie budeme používať React framework.

## Komunikácia s back-endom

### Výber receptu

Pri zapnutí si používateľ bude môcť vybrať, či chce použiť už
vytvorený recept, alebo či chce vytvoriť nový recept.

Pokiaľ si vyberie použitie vytvoreného receptu, front-end pošle POST request na back-end URL:

````
{
    "message" : "recget",       // Recipe get
    "status" : "all"
}
````

Ako odpoveď obdrží JSON vo formáte:

````
{
    "message" : "recget",
    "recipe" : 
    [
        1 : {
            "timestamp" : ...,
            "steps" : 
                [
                ...
                ],
                ...
            },
        2 : {
            "timestamp" : ...,
            "steps" : 
                [
                ...
                ],
                ...
            },
        ...
    ]
}
````

JSON obsahuje všetky uložené recepty. FE ponúkne používateľovi výber z prijatých
receptov. Pri vybratí receptu sa ten načíta na hlavnú obrazovku a tiež sa odošle
POST request na BE s vybraným receptom:

````
{
    "message" : "recsel",       // Recipe Select
    "recipe" : {
                "timestamp" : ...,
                "steps" : 
                    [
                    ...
                    ],
                ...
                }
}
````
 

### Pridanie nového receptu

Pokiaľ používateľ chce vytvoriť nový recept, pomocou obrazovky pre pridanie
receptu vykliká všetky požadované kroky a klikne na tlačidlo **"Pridať recept"**.
Na BE sa odošle POST request:

````
{
    "message" : "recadd",       // Recipe Add
    "recipe" : {
                "timestamp" : ...,
                "steps" : 
                    [
                    ...
                    ],
                ...
                }
}
````

Ďalej používateľ dostane ponuku, či chce pridaný recept rovno využiť a variť
podľa neho, alebo nie.

Pokiaľ s ním chce variť, pošle sa POST request na BE (JSON v rovnakom formáte ako
v predošlej časti). Pokiaľ s ním variť nechce, UI sa vráti na hlavnú obrazovku a 
čaká na ďalšie pokyny.

### Začiatok varenia

Po vybratí receptu sa recept načíta na hlavnú obrazovku. Používateľ dostane príležitosť
skontrolovať, či je recept správny. Pokiaľ je s receptom spokojný, spustí varenie.
Pri spustení varenia sa na BE pošle POST request:

````
{
    "message" : "recstart",        // Recipe Start
    "recipe" : {                   // pre istotu sa pošle recept znovu
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

````
{
    "message" : "recstart",
    "status" : "ok"
}
````

Pokiaľ na BE nastane porucha alebo chyba pri spúšťaní, na FE pošle odpoveď:
````
{
    "message" : "recstart",
    "status" : "error"
}
````
FE túto chybu následne ohlási používateľovi.

### Periodické dopyty na back-end

Pokiaľ sa varenie spustí úspešne, FE prejde do módu, kde sa periodicky dopytuje
BE na stav receptu. Každú 1 sekundu na BE odošle POST request na URL:
````
{
    "message" : "recupdate",         // Recipe update
    "status" : "get"                // Get state
}
````
#### Pokiaľ všetko prebieha v poriadku

V ideálnom prípade BE odpovie formou:
````
{
    "message" : "recupdate",
    "status" : "ok",
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

````
{
    "message" : "recupdate",
    "status" : "error",
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

### Prerušenie varenia

Na front-ende by mala byť možnosť prerušiť varenie používateľom. Používateľ klikne
na tlačidlo **"Prerušiť varenie"**. FE sa opýta, či si je používateľ istý.

Po potvrdení je na BE odoslaný POST request:
````
{
    "message" : "recupdate",
    "status" : "abort"
}
````

BE by mal prerušiť všetky procesy, vypnúť všetky zariadenia a odpovedať formou:
````
{
    "message" : "recupdate",
    "status" : "abort-done"
}
````

Pokiaľ pri prerušení nastane chyba, BE odpovie formou:
````
{
    "message" : "recupdate",
    "status" : "abort-error"
}
````
Now it's time to panic.

### Úspešné ukončenie varenia

Pokiaľ BE úspešne ukončil varenie, pri najbližšom dopyte (recupdate-get) z FE
BE odpovie formou:
````
{
    "message" : "recupdate",
    "status" : "finished"
}
````

FE o tejto skutočnosti upovedomí používateľa a ukončí mód periodických dopytov.
 
### Notes

- krok musí mať atribút **type**, ktorý bude identifikovať, či je automatický alebo
treba vstup používateľa
- pri varení nemusí BE odpovedať stále s celým receptom, pokiaľ má recept 
uložený u seba (z kroku spustenia varenia) - stačí len current block a module-stats
- 
