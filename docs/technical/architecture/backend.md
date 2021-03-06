---
---

# Back-end

Link na repozitár - [Backend](https://github.com/smart-brew/backend)

## Technológie

Server využíva technológiu **Node JS**.

Pre spojenie s databázou a obsluhu požiadaviek na databázu využívame ORM **Prisma**.

## Komunikácia

Pre komunikáciu s frontendom je k dispozícií REST API, ktoré je dostupné na porte 8000.

Pre komunikáciu s jednotlivými modulmi pivovaru používame **websocket**. Spojenie prebieha na porte 8001.

Viac info v časti [API](api-reference.md).

## Súčasný stav

### Web socket

Pomocu web socketového servera je možné pripojiť viacero klientov, ktorí predstavujú moduly pivovaru. Tie slúžia na obsluhu efektorov a zisk údajov zo senzorov. Server s nimi pravidelne udržiava spojenie (keep-alive) a odosiela im jednotlivé inštrukcie. Bližšie informácie o nich je možné nájsť v [Podporované inštrukcie](supported-functions.md).

Pokiaľ spojenie k požadovanému modulu neexistuje, proces varenia sa ukončí špeciálnou inštrukciou **Abort**.

### REST API

Zoznam endpointov v rámci REST API sa nachádza v [API](api-reference.md), avšak tento zoznam sa môže podľa potrieb aktualizovať. Momentálne pre obsluhu požiadaviek frontendu implementujeme nasledovné endpointy:

- Získanie všetkých receptov
- Získanie konkrétneho receptu
- Získanie všetkých podporovaných funkcií
- Vytvorenie nového receptu
- Načítanie receptu pre varenie
- Spustenie varenia
- Pozastavenie a pokračovanie varenia
- Vynútené zrušenie varenia
- Vymazanie receptu
- Úprava receptu
- História varení
- Prehľad štatistík varenia
