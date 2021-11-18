---
author: Peter Stríž
---

# Tímový web + dokumentácia

Tímový web aj spolu s dokumentáciou sa automaticky deploy-ne na 
http://team06-21.studenti.fiit.stuba.sk, pričom dokumentácia je na http://team06-21.studenti.fiit.stuba.sk/docs/.

## Setup deploymentu

Deployment sa robí automaticky z najnovšieho commitu na `master` vetve za pomoci [GitHub Actions](https://github.com/features/actions)

Po commite sa vykoná krátky script, ktorý zbuilduje stránku a nahrá súbory pomocou `rsync` z GitHubovej virtuálky na náš stroj `team06-21.studenti.fiit.stuba.sk` do priečinka `~/web` a `~/web/docs`.

## Server

Ako server na hostovanie webu sa používa [http-server](https://www.npmjs.com/package/http-server), keďže všetky súbory sú statické, stačí ich len vedieť poskytnúť používateľovi.

Automatické spustenie servera:
    
1. Mať nainštalovaný `http-server` na VM    
2. Vo VM spustiť príkaz:

```bash
crontab -e
```

3. Na koniec súboru pridať:

```bash
@reboot cd ~/web && sudo http-server -p 80
```