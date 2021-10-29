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
- **Category** - je kategória, do ktorej patrí daná funkcia (využívané v [Podporované údaje](./supported-data.md))
- **Input type** - či bude mať možnosť meniť paramaetre alebo sa daná funkcie iba vykonáva
- **Type** - validácia na Frontende, v skutočnosti všade posielam string
- **Choices** - aké možnosti budú ponúkané - ktorý konkrétny prvok sa má spustiť
- **Code choices** - predstavujú jednotlivé zariadenia a ich "skutočné" meno - toto meno sa bude zhodovať naprieč systémom s menom ktoré bude ukazovať stav jednotlivých senzorov

V skutočnosti Frontend ukladá a prijíma iba: **Code name**, **Code choices**, **Category** a hodnoty **parametra**. Ostatné veci si už sám vyhľadá a doplní podľa špecifikácie.

## TODO

- domysliet vytiahnutie chmeľu
- ukončenie
