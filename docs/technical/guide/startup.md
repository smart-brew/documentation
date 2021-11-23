---
---

# Spustenie pivovaru

Link na repozitár, ktorý obsahuje automatický script: [startup](https://github.com/smart-brew/startup)

## Spustenie testovacej verzie

V tejto verzii je nahradený modul, testovacím serverom, ktorý simuluje funkcionalitu modulov.

### Postup

0. Stihanuť si všetky repozitáre

- Testovací modul (link na repo: [module-mock-server](https://github.com/smart-brew/module-mock-server))
- Frontend (link na repo: [frontend](https://github.com/smart-brew/frontend))
- Backend (link na repo: [backend](https://github.com/smart-brew/backend))

```bash
git clone https://github.com/smart-brew/module-mock-server.git
git clone https://github.com/smart-brew/frontend.git
git clone https://github.com/smart-brew/backend.git
```

1. Spustiť testovací modul

```bash
cd module-mock-server
docker compose build
docker compose up
```

2. Spustiť backend (spolu aj s databázou)

```bash
cd backend
docker compose build
docker compose up
```

:::note Poznámka

Ak nebola doposial spustená databáza a sú problémy s nesprávnymi dátami, treba vykonať manuálne migráciu spolu so seedom údajov - viac info: [Migrácie](migration.md)

:::

3. Spustiť GUI

```bash
cd frontend
docker compose build
docker compose up
```
