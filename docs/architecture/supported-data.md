---
---

# Podporované údaje

Tieto `interface` predstavujú kategórie, ktoré sú využívané aj v [Podporované funkcie](./supported-functions.md).

Zoznam podporovaných údajov systémom:

```js
interface Temperature {
  TEMP: number;
  REGULATION_ENABLED: boolean;
  STATE: string;
  DEVICE: string; // "TEMP_1" or "TEMP_2"
}

interface Motor {
  SPEED: number;
  RPM: number;
  STATE: string;
  DEVICE: string; // "MOTOR_1" or "MOTOR_2"
}

interface Unloader {
  UNLOADED: boolean;
  STATE: string;
  DEVICE: string; // "FERMENTABLE", "YEAST", "HOPS", "OTHER"
}

interface Pump {
  ENABLED: boolean;
  STATE: string;
  DEVICE: string; // "PUMP_1"
}
```

## Príklad

Údaje sa budú posielať tak, že najprv sa zadefinuje do akej kategórie patrí zariadenie, potom jeho bližšie údaje. "DEVICE" bude jedinečný názov naprieč všetkými zariadeniami z danej kategórie.

```json title="Príklad posielaných údajov"
{
  "TEMPERATURE": [
    {
      "TEMP": 50,
      "REGULATION_ENABLED": true,
      "STATE": "IN_PROGRESS",
      "DEVICE": "TEMP_1"
    },
    {
      "TEMP": 21.5,
      "REGULATION_ENABLED": false,
      "STATE": "WAITING",
      "DEVICE": "TEMP_2"
    }
  ],
  "MOTOR": [
    {
      "SPEED": 30,
      "RPM": 25,
      "STATE": "WAITING",
      "DEVICE": "MOTOR_1"
    },
    {
      "SPEED": 0,
      "RPM": 0,
      "STATE": "WAITING",
      "DEVICE": "MOTOR_2"
    }
  ],
  "UNLOADER": [
    {
      "UNLOADED": true,
      "STATE": "WAITING",
      "DEVICE": "FERMENTABLE"
    },
    {
      "UNLOADED": false,
      "STATE": "WAITING",
      "DEVICE": "YEAST"
    },
    {
      "UNLOADED": false,
      "STATE": "WAITING",
      "DEVICE": "HOPS"
    },
    {
      "UNLOADED": false,
      "STATE": "WAITING",
      "DEVICE": "OTHER"
    }
  ],
  "PUMP": [
    {
      "ENABLED": false,
      "STATE": "WAITING",
      "DEVICE": "PUMP_1"
    }
  ]
}
```
