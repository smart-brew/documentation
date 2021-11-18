---
---

# Podporované údaje

Tieto `interface` predstavujú kategórie, ktoré sú využívané aj v [Podporované funkcie](./supported-functions.md).

Zoznam podporovaných údajov systémom:

```js
interface Temperature {
  temp: number;
  regulation_enabled: boolean;
  state: string;
  device: string; // "TEMP_1" or "TEMP_2"
}

interface Motor {
  speed: number;
  rpm: number;
  state: string;
  device: string; // "MOTOR_1" or "MOTOR_2"
}

interface Unloader {
  unloaded: boolean;
  state: string;
  device: string; // "FERMENTABLE", "YEAST", "HOPS", "OTHER"
}

interface Pump {
  enabled: boolean;
  state: string;
  device: string; // "PUMP_1"
}
```

## Príklad

Údaje sa budú posielať tak, že najprv sa zadefinuje do akej kategórie patrí zariadenie, potom jeho bližšie údaje. "DEVICE" bude jedinečný názov naprieč všetkými zariadeniami z danej kategórie.

```json title="Príklad posielaných údajov"
{
  "TEMPERATURE": [
    {
      "temp": 50,
      "regulation_enabled": true,
      "state": "IN_PROGRESS",
      "device": "TEMP_1"
    },
    {
      "temp": 21.5,
      "regulation_enabled": false,
      "state": "WAITING",
      "device": "TEMP_2"
    }
  ],
  "MOTOR": [
    {
      "speed": 30,
      "rpm": 25,
      "state": "WAITING",
      "device": "MOTOR_1"
    },
    {
      "speed": 0,
      "rpm": 0,
      "state": "WAITING",
      "device": "MOTOR_2"
    }
  ],
  "UNLOADER": [
    {
      "unloaded": true,
      "state": "WAITING",
      "device": "FERMENTABLE"
    },
    {
      "unloaded": false,
      "state": "WAITING",
      "device": "YEAST"
    },
    {
      "unloaded": false,
      "state": "WAITING",
      "device": "HOPS"
    },
    {
      "unloaded": false,
      "state": "WAITING",
      "device": "OTHER"
    }
  ],
  "PUMP": [
    {
      "enabled": false,
      "state": "WAITING",
      "device": "PUMP_1"
    }
  ]
}
```
