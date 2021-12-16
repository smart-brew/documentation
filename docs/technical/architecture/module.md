---
---

# Moduly

Link na repozitár - [Module](https://github.com/smart-brew/websocket-module)

## Technológie

Používame ESP32 Dev board. Kód je písaný v **C++**.

Odpurúčaný setup pre ~~develomplemt~~ development je v [README](https://github.com/smart-brew/websocket-module) v rámci git repozitára.

## Komunikácia s back-endom

Pre komunikáciu využijeme websocket a správy budú vyzerať ako v [Podporované údaje](supported-data.md).

```json title="Periodický update"
{
  "moduleId": 123,
  "status": <status modulu>, // ERROR, OK
  <podporované údaje>
}
```

## Ako v skratke funguje modul?

### Setup

Najprv si treba zadefinovať aké zariadenia máme kde pripojené a dať ich do poľa všetkých zariadení (v budúcnosti by sme chceli, aby tento krok nebolo treba manuálne robiť pred nasadením modulu, ale dala by sa modulu poslať konfigurácia).

### Kód

Modul sa pripojí na WiFi podľa konfigurácie a následne sa pripojí cez WebSocket na backendový server. Modul potom periodicky posiela svoj aktuálny stav, a aj stav všetkých pripojených zariadení.

Na modul je možné poslať z backendu aj inštrukciu, ktorú má modul vykonať. Formát je zadefinovaný v [Podporované funkcie](supported-functions.md#backend-module). Modul následne vo svojich periodických updatoch posiela aj informáciu o aktuálnom stave danej inštrukcie.

### Diagram zapojenia

#### Zapojenie meniča H300

![H300](/img/module/wiring_H300.png)

_\*Originálny autor diagramu H300: http://team18-19.studenti.fiit.stuba.sk/ _

#### Zapojenie teplomera DS18B20

![Teplomer](/img/module/wiring_temp.png)

## Notes

- pridať viac diagramov zapojenia modulu a rôznych zariadení
- automatická kontrola WiFi spojenia (ak bolo prerušené)
- dynamická konfigurácia pripojených zariadení
