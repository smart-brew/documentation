---
---

# API

Rôzne komponenty spolu komunikujú rôznym spôsobom, preto je dôležité mať jedno miesto, kde sa dá prehľadne pozrieť, ako fungujú naše API.

## Module -> Backend

Module komunikuje smerom na backend cez WebSocket a posiela periodicky nasledujúce správy:


```json title="Definícia"
{
  "moduleId": "<názov modulu>",
  "status": "<ready | progress | error>",
  "values": [
    {
      "<názov zariadenia1>": {
        "<názov hodnoty 1>": <hodnota 1>,
        "<názov hodnoty 2>": <hodnota 2>,
        ...
      }
    },
    {
      "<názov zariadenia N>": {
        "<názov hodnoty>": <hodnota>,
        ...
      }
    },
    ...
  ]
}
```

```json title="Ukážka"
{
  "moduleId": "1",
  "status": "ready",
  "values": [
    {
      "SERVO_1": {
        "ANGLE": 90,
        "ANOTHER_VALUE": "OK"
      }
    },
    {
      "TEMP_1": {
        "TEMP": 23.0625
      }
    }
  ]
}
```