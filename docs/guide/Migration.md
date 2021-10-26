# Migrácie

V projekte využívame ORM Prisma. Pre vytvorenie migrácie treba upraviť súbor `schema.prisma` podľa potreby.

Potom vytvoriť novú migráciu, ktorá sa automaticky aplikuje na databázu na adrese `localhost:5432`.

Ak nevykonáš zmeny tak sa nevytvorí nová migrácia iba sa aplikujú čakajúce migrácie.

```git title="Vytvorenie novej migrácie alebo aplikovanie migrácií"
  yarn migrate
```
Pri použítí príkazu `yarn migrate` sa databáza naseeduje. Ak však už bola raz naseedovaná pri opakovaní príkazu sa u neseeduje. Preto ak sa napríklad doplní do súboru `seed.js` ďalší záznam, je potrebné seedovanie spraviť samostatne.

```git title="Seedovanie databázy"
  yarn seed
```
Záznamy, ktoré už v databáze sú sa opakovane nepridávajú.