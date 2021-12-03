---
---

# Podporované funkcie

Zoznam podporovaných funkcií systémom:

| Name             | Input type | Units   | Category    | Code name        | Type   | Choices                          | Code choices                    |
| ---------------- | ---------- | ------- | ----------- | ---------------- | ------ | -------------------------------- | ------------------------------- |
| Temperature      | field      | °C      | TEMPERATURE | SET_TEMPERATURE  | float  | Chamber 1, Chamber 2             | TEMP_1, TEMP_2                  |
| Motor            | field      | RMP     | MOTOR       | SET_MOTOR_SPEED  | float  | Motor 1, Motor 2                 | MOTOR_1, MOTOR_2                |
| Transfer liquids | executable | -       | PUMP        | TRANSFER_LIQUIDS | -      | Pump 1                           | PUMP_1                          |
| Unload           | executable | -       | UNLOADER    | UNLOAD           | -      | Fermentables, Yeast, Hops, Other | FERMENTABLE, YEAST, HOPS, OTHER |
| Wait             | field      | Minutes | SYSTEM      | WAIT             | float  | -                                | -                               |
| Manual step      | field      | -       | SYSTEM      | MANUAL           | string | -                                | -                               |

- **Name** - pekný názov na Frontende
- **Code name** - ako sa bude v skutočnosti volať daná funkcia
- **Category** - je kategória, do ktorej patrí daná funkcia (využívané v [Podporované údaje](supported-data.md))
- **Input type** - či bude mať možnosť meniť paramaetre alebo sa daná funkcie iba vykonáva
- **Type** - validácia na Frontende, v skutočnosti všade posielam string
- **Choices** - aké možnosti budú ponúkané - ktorý konkrétny prvok sa má spustiť
- **Code choices** - predstavujú jednotlivé zariadenia a ich "skutočné" meno - toto meno sa bude zhodovať naprieč systémom s menom ktoré bude ukazovať stav jednotlivých senzorov

V skutočnosti Frontend ukladá a prijíma iba: **Code name**, **Code choices**, **Category** a hodnoty **parametra**. Ostatné veci si už sám vyhľadá a doplní podľa špecifikácie.

## Štruktúra posielanej inštrukcie Backend --> Modul {#backend-module}

```json
{
  "moduleId": <id modulu>,
  "instruction": <code name pre inštrukciu>,
  "param": <hodnota parametru>,
  "category": <kategória inštrukcie/zariadenia>,
  "device": <zariadenie>,
}
```

```json title="Ukážka"
{
  "moduleId": 1,
  "instruction": "SET_MOTOR_SPEED",
  "param": 30,
  "category": "MOTOR",
  "device": "MOTOR_1"
}
```

## Štruktúra posielanej inštrukcie Backend --> Frontend

```json
{
  "id": <id inštrukcie>,
  "recipeId": <id receptu>,
  "templateId": <id template pre inštrukciu>,
  "codeName": <code name pre inštrukciu>, // aj toto sa bude mapovať na krajší názov
  "param": <hodnota parametru>,
  "category": <kategória inštrukcie/zariadenia>,
  "optionCodeName": <zariadenie>, // na FE sa bude mapovať na krajší názov - napr. "TEMP_1" -> "Nádoba 1",
  "blockId": <id bloku>, // ak by boli dva názvy rovnaké, ale chceme to mať ako dva rôzne bloky
  "blockName": <názov bloku>,
  "ordering": <poradové číslo>,
}
```

```json title="Ukážka"
{
  "id": 234,
  "recipeId": 123,
  "templateId": 1,
  "codeName": "SET_MOTOR_SPEED",
  "param": 30,
  "category": "MOTOR",
  "optionCodeName": "MOTOR_1",
  "blockId": 1,
  "blockName": "Fermentation",
  "ordering": 2
}
```

## Štruktúra template Backend --> Frontend

FE si vie získať ako vyzerajú všetky inštrukcie, ktoré sú podporované systémom.

```json
{
  "id": <id template>,
  "codeName": <code name pre inštrukciu>,
  "name": <pekny nazov instrukcie>,
  "category": <kategoria>,
  "units": <jednotka>,
  "inputType": <typ inputu>,
  "description": <popis>,
  "options": [
    {
      "id": <id zariadenia>,
      "name": <pekny nazov zariadenia>,
      "codeName": <zariadenie>
    },
    ...
    ...
  ]
}
```

```json title="Ukážka"
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
}
```

## Štruktúra posielanej inštrukcie Frontend --> Backend

```json
{
  "templateId": <id vzoru pre danú inštrukciu>,
  "blockName": <nazov bloku>,
  "param": <hodnota parametru>,
  "optionCodeName": <zariadenie>,
  "ordering": <poradové číslo>,
}
```

```json title="Ukážka"
{
  "templateId": 123,
  "blockName": "Fermentation",
  "param": 85,
  "optionCodeName": "TEMP_1",
  "ordering": 1
}
```

## TODO

- domysliet vytiahnutie chmeľu
- ukončenie
