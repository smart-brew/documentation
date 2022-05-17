---
---

# Moduly

Link na repozitár - [Module](https://github.com/smart-brew/websocket-module)

## Technológie

Používame ESP32 Dev board. Kód je písaný v **C++**.

Odpurúčaný setup pre ~~develomplemt~~ development je v [README](https://github.com/smart-brew/websocket-module) v rámci git repozitára.

## Rôzne moduly

V tejto sekcii sa pozrieme na to, aké rôzne moduly náš pivovar podporuje

### Motor

Motory sa nachádzajú v každej z varných nádob a umožnujú stabilné miešania surovín potrebných na prípravu piva. Vo vnútry nádob sa nachádzajú rózne metličky, vzhľadom k tomu, že v prvej nádobe očakávame tekutinu hustejšiu a v tej druhej, zase viac riedku.

Tento motor je riadený pomocou meniča _H300_ ([zapojenie](#h300)), ktorý používa [Modbus](../analysis/modbus.md) na komunikáciu s ESP32.

Menič H300 je taktiež potrebné nastaviť, aby vedel komunikovať s ESP:

```
PD.00 - 6006 (19200 BAUD)
PD.01 - 3 (jeden stop bit)
P0.02 - 2 (mala by blikat LEDka)
P0.03 - 9
P0.04 - 8
P0.11 - 5
```

### Teplomer

Teplomer sa nachádza v každej z varných nádob a spolu s regulátorom teploty umožnuje reguláciu správnej teploty tekutiny počas varenia a kvasenia.

Používame teplomer rady _DS18B20_ ([zapojenie](#ds18b20)).

### Regulátor teploty

Používame _JULABO CF41_ s podporovaným sériovým rozhraním RS-232 alebo RS-485. Pre ovládanie zariadenia na diaľku je nutné v menu _Interface_ vybrať typ rozhrania a následne v menu _Configuration_ nastaviť položku _Setpoint_ na vybrané rozhranie.

Potom možeme so zariadením komunikovať pomocou príkazov, ktoré by však mali byť posielané s časovým rozostupom aspoň 250ms. Príkazy pre získanie údajov zo zariadenie sa začínajú **IN** a príkazy pre nastavenie hodnoty v zariadení sa začínajú **OUT**.

Príklad príkazu pre nastavenie pracovnej teploty
```
OUT_SP_00 ⇔ 55.5↵
```
Príklad príkazu pre získanie pracovnej teploty
```
IN_SP_00↵
```
a odpoveď na tento príkaz
```
55.5↵ LF
```
Všetky podporované príkazy ako aj možné odpovede sú bližšie špecifikované v [oficiálnom manuáli](https://www.julabo.com/sites/default/files/betriebsanleitung/1.950.4871.en.V09.pdf#page=72) v kapitole 11.
### Pumpa

Pumpa sa využíva, keď je potrebné prečerpať tekutinu z prvej nádoby do tej druhej. Používame pumpu _AWH E-Actuator 24V Type E2 DIN_. Na spúštanie tejto pumpy nám však stačí iba obyčajné relé, čo nám veľmi uľahčí prácu s daným zariadením. Ako relé používame _Hong Wei HW-655_, ktoré je ovládané cez sériové rozhranie.

### Násypníky

Momentálne máme iba jeden násypník, ktorý je ovládaný jedným servom _SG90_ (_\*pravdepodobne - nieje to isté_). Servo vlastne iba posunie pliešok, ktorý drží všetky suroviny, ktoré následne spadnú do prvej varnej nádoby.

## Komunikácia s back-endom

Pre komunikáciu využijeme websocket a správy budú mať formu: [Podporované údaje](supported-data.md).

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

#### Zapojenie meniča H300 {#h300}

![H300](/img/module/wiring_H300.png)

_\*Originálny autor diagramu H300: http://team18-19.studenti.fiit.stuba.sk/ _

#### Zapojenie teplomera DS18B20 {#ds18b20}

![Teplomer](/img/module/wiring_temp.png)

