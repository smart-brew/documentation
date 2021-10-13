---
---

# Raspberry pi

## Pripojenie do rpi

:::caution vhodný terminál a reštart
Odporúčam použiť `git bash` alebo `wsl` terminál na prístup do rpi. Taktiež by malo byť spojenie odolné voči reštartom. To znamená, že reštart virtuálneho stroja alebo rpi by nemal nič znefunkčniť a po čase cca `1 min` by malo byť  pripojenie znova dostupné.
::: 

** 1. krok **

Ak nemáš vygenerované ssh kľúče treba ich vygenerovať bez hesla (treba len stále štláčať enter). 
```bash title="Vygenerovanie ssh kľúčov"
ssh-keygen
```
** 2. krok **
:::caution podmienka použitia príkazu
Ak budeme mať heslo do virtuálneho stroja `heslo="neznáme"` môžes použiť príkaz na skopírovanie tvojho verejného kľuča do `authorized_keys`.
::: 
Ak je heslo neznáme pošli nejakému členovi napr. (Marek Vajda alebo Peter Stríž) svoj verejný kľúč aby ti ho nahrali na virtuálnom stroji do `authorized_keys`. V prípade, že skôr spomenuté možnosti nie sú dostupné, je potrebné sa prihlásiť pomocou privátneho kľúča do virtuálneho stroja, ktorý zadáš do prikazu `ssh -i [cesta ku privátnemu kľúču]> user@ip`. Následne si môžeš nahrať svoj kľúč samostatne.
```bash title="Skopírovanie verejného kľúča do virtuálneho stroja"
ssh-copy-id ubuntu@team06-21.studenti.fiit.stuba.sk
```
** 3. krok **

Pripojenie príkazom ssh, ktorý používa tzv. `jumphost` na pripojenie sa do reverzného terminálu rpi.
```bash title="pripojenie do rpi cez ssh jumphost"
ssh-copy-id ubuntu@team06-21.studenti.fiit.stuba.sk
```
:::note alternatívne pripojenie
Alternatívne je možné sa pripojiť najprv cez ssh do virtuálneho stroja. A následne do reverzného prikazového riadka na porte `2222`.
```bash title="alternatívne príkazy"
ssh -p 22 ubuntu@team06-21.studenti.fiit.stuba.sk
ssh -p 2222 pi@localhost
:::

## Pripojenie pomocou vnc

    #todo

## Ako funguje pripojenie

Pripojenie funguje pomocou reverzného shell spojenia. Rpi v intervale `1 min` spúšťa pomocou `sudo crontab -e` skript, ktorý kontroluje vytvorenie reverzného ssh spojenia na virtuálnom stroji.

```bash title="sudo crontab -e príkaz"
*/1 * * * * sudo . /create_ssh_tunnel.sh > tunnel.log 2>&1
```
Skript na vytvorenie reverzného konzolového spojenia sa pripája na virtuálny stroj `team06-21.studenti.fiit.stuba.sk`. Port `2222` na virtuálnom je následne tunelovaný ako port `22` na raspberry pi. 

```bash title="create_ssh_tunnel.sh"
#!/bin/bash
createTunnel() {
  /usr/bin/ssh -N -f -R 2222:localhost:22 ubuntu@team06-21.studenti.fiit.stuba.sk
  if [[ $? -eq 0 ]]; then
    echo Tunnel to jumpbox created successfully
  else
    echo An error occurred creating a tunnel to jumpbox. RC was $?
  fi
}
/bin/pidof ssh
if [[ $? -ne 0 ]]; then
  echo Creating new tunnel connection
  createTunnel
fi
```
