---
---

# Front-end

Link na repozitár - [Frontend](https://github.com/smart-brew/frontend)

## Technológie

Pre používateľské rozhranie budeme používať **React framework**.

Pre IDE je treba doinštalovať tieto rozšírenia - **eslint, prettier, editorconfig** (odporúčaný je VSCode).

## Komunikácia s back-endom

Pre komunikáciu využijeme REST API cally a správy vo formáte JSON. Viac info na [API](./api-reference.md).

### Štruktúra JSONu pre inštrukciu

Príklad:

```json
{
  "id": 0,                      // unique for instruction type
  "name": "Heat up",            // type of instruction
  "type": "man"/"auto",         // či je inštrukcia manuálna alebo automatická
  "parentBlockId": 0,           // id of parent block
  "currParam": 40,              // current parameter value
  "targetParam": 70,            // target parameter value
  "start": 1635332321000,       // begin UNIX timestamp in milis
  "end": 1635335921000,         // end UNIX timestamp in milis
  "orderNum": 0,                // order in recipe (from 0)
  "chamberId": 0,
  "recipeId" : 4,
  "templateId" : 6
}
```

Podľa stavu vykonávania inštrukcie bude _start_ a _end_ atribút:

- **obidva null** - pokiaľ inštrukcia ešte nebola začatá
- **start = timestamp, end = null** - pokiaľ sa inštrukcia práve vykonáva
- **start = timestamp, end = timestamp** - pokiaľ sa inštrukcia vykonala úspešne
- **start = timestamp, end = -timestamp** - pokiaľ sa inštrukcia vykonala neúspešne

### Štruktúra JSONu pre blok

Príklad:

```json
{
  "id": 0,
  "name": "Varenie jačmeňa"
}
```

Inštrukcie sa k bloku budú priradzovať na základe jeho ID uloženého v každej inštrukcii.

### Notes

- inštrukcia musí mať atribút **type**, ktorý bude identifikovať, či je automatický alebo
  treba vstup používateľa
- pri varení nemusí BE odpovedať stále s celým receptom, pokiaľ má recept
  uložený u seba (z kroku spustenia varenia) - stačí len current block a module-stats
- zamyslieť sa, či by bolo možné implementovať pozastavenie varenia

### Je potrebné

- ku vykonávaným krokom poznamenať či sú automatické, alebo manuálne (musí ich vykonať obsluha, pivovar o tom upozorní na monitore)
- označovať jednotlivé násypníky (Akú úlohu môžu zastávať - jačmeň sa bude pridávať iba jedným z nich, a podobne.)
- odkiaľ sa bude načítavať stav zariadenia (backend/konfiguračný file). Napríklad ktoré násypníky sú dostupné a môžu sa využiť pri varení jednotlivých receptov
- odkiaľ sa načítavajú možné inštrukcie (obsahujúce názov a kombináciu jednotlivých parametrov ) // vo figme zakreslené ako jeden obdĺžniček z ktorých sa skladajú postupy
- na hlavnej obrazovke zobraziť náhlad práve vykonávaného receptu (napísaný ako postup pre človeka, v celistvom texte)
- dodať možnosť pomenovania jednotlivých krokov vykonávania receptov
- šipočka ukazuje či teplota v jednotlivých nádobách stúpa alebo klesá
