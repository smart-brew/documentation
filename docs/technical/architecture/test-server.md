---
---

# Testovací server

Testovací server slúži na simuláciu správania modulov. Od vývoja modulov závisí hlavne vývoj backendu a aj frontendu, preto sme sa rozhodli vytvoriť testovací server,
ktorý simuluje správanie reálneho modulu, čím napomáha k rýchlejšiemu vývoju práve backendu a frontendu.

Server posiela a prijíma údaje cez WebSocket. Posielanie údajov a prijímanie inštrukcií prebieha rovnako ako je zadefinované v [API](api-reference.md).

Server po pripojení na backend posiela periodicky namodelované dáta. Server taktiež prijíma inštrukcie z backendu, na ktoré odpovedá zmenenými dátami podľa jednotlivých
inštrukcií. Zoznam podporovaných inštrukcií s konkrétnymi parametrami sa nachádza v [Podporované funkcie](supported-functions.md).

V prípade zmien na backende so spusteným testovacím serverom, nie je potrebné tento testovací server spúšťať znova, automaticky sa pripojí späť na backend.

## Príklad komunikácie

Server posiela údaje typu:

```json
{
  "moduleId": "test-module-1",
  "state": "ok",
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

Príklad inštrukcie, ktorú server prijme z backendu:

```json
{
  "moduleId": "test-module-1",
  "type": "instruction",
  "category": "TEMPERATURE",
  "device": "TEMP_2",
  "instruction": "SET_TEMPERATURE",
  "parameter": "100"
}
```

Na základe prijatej inštrukcie prebehne buď okamžitá, alebo postupná zmena dát. Po prijatí inštrukcie vyššie môžu odosielané dáta vyzerať nasledovne:

```json
{
  "moduleId": "test-module-1",
  "state": "ok",
  "TEMPERATURE": [
    {
      "TEMP": 50,
      "REGULATION_ENABLED": true,
      "STATE": "IN_PROGRESS",
      "DEVICE": "TEMP_1"
    },
    {
      "TEMP": 90,
      "REGULATION_ENABLED": true,
      "STATE": "IN_PROGRESS",
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
