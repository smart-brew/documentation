---
---

# Raspberry pi

## Pripojenie do rpi

:::caution vhodný terminál a reštart
Odporúčam použiť `git bash` alebo `wsl` terminál na prístup do rpi. Taktiež by malo byť spojenie odolné voči reštartom. To znamená, že reštart virtuálneho stroja alebo rpi by nemal nič znefunkčniť a po čase cca `1 min` by malo byť pripojenie znova dostupné.
:::

### 1. krok

Ak nemáš vygenerované ssh kľúče treba ich vygenerovať bez hesla (treba len stále štláčať enter).

```bash title="Vygenerovanie ssh kľúčov"
ssh-keygen
```

### 2. krok

:::caution podmienka použitia príkazu
Ak budeme mať heslo do virtuálneho stroja `heslo="neznáme"` je možné použiť príkaz na skopírovanie svojho verejného kľuča do `authorized_keys`.
:::
Ak je heslo neznáme, je potreba poslať nejakému členovi napr. (Marek Vajda alebo Peter Stríž) svoj verejný kľúč, aby ho nahrali na virtuálnom stroji do `authorized_keys`. V prípade, že skôr spomenuté možnosti nie sú dostupné, je potrebné sa prihlásiť pomocou privátneho kľúča do virtuálneho stroja, ktorý treba zadať do prikazu `ssh -i [cesta ku privátnemu kľúču]> user@ip`. Následne je možné nahrať svoj kľúč samostatne.

```bash title="Skopírovanie verejného kľúča do virtuálneho stroja"
ssh-copy-id ubuntu@team06-21.studenti.fiit.stuba.sk
```

### 3. krok

Pripojenie príkazom ssh, ktorý používa tzv. `jumphost` na pripojenie sa do reverzného terminálu rpi. Port je `2222` alebo `2224`.

```bash title="pripojenie do rpi cez ssh jumphost"
ssh -J ubuntu@team06-21.studenti.fiit.stuba.sk:22 -p 2222 pi@localhost
```

:::note alternatívn+e pripojenie
Alternatívne je možné sa pripojiť najprv cez ssh do virtuálneho stroja. A následne do reverzného prikazového riadka na porte `2222` alebo `2224`.

````bash title="alternatívne príkazy"
ssh -p 22 ubuntu@team06-21.studenti.fiit.stuba.sk
ssh -p 2222 pi@localhost
:::

## Pripojenie pomocou vnc

Na pripojenie pomocou vnc si treba stiahnuť [vnc viewer](https://www.realvnc.com/en/connect/download/viewer). A následne sa prihlásiť do účtu. Rpi sa následne zobrazí v účte tímu.

```bash title="prihlasovací email"
marek.vajda009@gmail.com
````

```bash title="password"
tp062122
```

## Spustenie browsera do fullscreenu na Rpi

Rpi je nastavené tak aby sa po spustení otvoril webový frontend v prehliadači. Momentálne sa v grafickom rozhraní spustí len webový prehliadač `chromium` bez ostatného grafického rozhrania. Toto nastavenie sme docielili v súbore `/home/pi/.config/lxsession/LXDE-pi/autostart`. Ak chceme, aby sa otvorilo po štarte aj štandardné grafické rozhranie, musíme nasledujúci príkaz zadať do súboru `/etc/xdg/lxsession/LXDE-pi/autostart`. Alebo ak nefunguje, treba použiť `sudo nano /etc/xdg/lxsession/LXDE-pi/autostart` súbor.

```bash title="príkaz na spustenie prehliadaca vo fullscreen"
@chromium-browser localhost --start-fullscreen --kiosk
```

## Ako funguje pripojenie

Pripojenie funguje pomocou reverzného ssh spojenia. Rpi v intervale `1 min` spúšťa pomocou `sudo crontab -e` skript, ktorý kontroluje vytvorenie reverzného ssh spojenia na virtuálnom stroji.

```bash title="sudo crontab -e príkaz"
*/1 * * * * sudo . /create_ssh_tunnel.sh > tunnel.log 2>&1
```

Skript na vytvorenie reverzného konzolového spojenia sa pripája na virtuálny stroj `team06-21.studenti.fiit.stuba.sk`. Port `2224` na virtuálnom je následne tunelovaný ako port `22` na Raspberry pi.

```bash title="create_ssh_tunnel"
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

## Zoznam príkazov na nastavenie rpi komunikácie

```bash title="príkazy"
# add ssh file to filesystem root on boot partition of rpi to enable ssh
# add wpa_supplicant file to rpi root partition boot
# this for automatic wifi connection
# example of wpa_supplicant file(file is deleted after first reboot):
country=SK # Your 2-digit country code
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="marek-nb"
    psk="76O6y;69"
    key_mgmt=WPA-PSK
}
#update and upgrade of new rpi
sudo apt-get update && sudo apt-get upgrade

#docker
curl -sSL https://get.docker.com | sh

#pip
sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip

#docker-compose
sudo pip3 install docker-compose

# docker on startup
sudo systemctl enable docker

# make script for reverse shell
# change 2222 to wanted port if needed
# this command should be run from rpi for adding to known hosts
# /usr/bin/ssh -N -f -R 2224:localhost:22 ubuntu@team06-21.studenti.fiit.stuba.sk
# after that you need to connect to rpi with ubuntu
# ssh -p 2222 pi@localhost
sudo nano create_ssh_tunnel
#script
#!/bin/bash
createTunnel() {
  /usr/bin/ssh -N -f -R 2224:localhost:22 ubuntu@team06-21.studenti.fiit.stuba.sk
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

chmod +x create_ssh_tunnel

# make new sudo cron schedule for script
crontab -e
*/1 * * * * ./create_ssh_tunnel > tunnel.log 2>&1

ssh-keygen
# ssh to ubuntu ssh copy id
ssh ubuntu@team06-21.studenti.fiit.stuba.sk
vim .ssh/authorized_keys # add id_rsa.pub generated by rpi + increment identificator at the pi@raspberrypiv[version-number]
#unlock port for listening firevall
sudo netstat -tulpn # check listening ports
sudo ufw allow 2222

# ssh keygen for ssh deploy keys one for frontend and one for backend
ssh-keygen -t rsa -f ~/.ssh/frontend -C "frontend"
ssh-keygen -t rsa -f ~/.ssh/backend -C "backend"
cat  ~/.ssh/frontend.pub

cat  ~/.ssh/backend.pub

# add deploy keys to repos
# In the server's SSH configuration file (usually ~/.ssh/config), add an alias entry for each repository.

cat <<EOT >> ~/.ssh/config
Host github-frontend
HostName github.com
User git
IdentityFile ~/.ssh/frontend

Host github-backend
HostName github.com
User git
IdentityFile ~/.ssh/backend
EOT

git clone github-frontend:smart-brew/frontend.git
git clone github-backend:smart-brew/backend.git

# create startup file
chmod +x startup
#!/bin/bash
cd ~/frontend
sudo docker-compose up
cd ~/backend
sudo docker-compose up

#autostart of chromium
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
#add
@chromium-browser localhost --start-fullscreen --kiosk
```
