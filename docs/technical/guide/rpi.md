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
***** (treba získať prístup od: Marek Vajda)
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

:::caution po inštalácií
https://docs.docker.com/engine/install/linux-postinstall/
:::

## RPI wifi hotspot

:::note link na nastavenie rpi wifi hotspotu
https://www.raspberrypi.com/documentation/computers/configuration.html
:::

Wifi hotspot funguje s SSID: `rpiWifi`.

```bash title="password"
tp062122
```

Rpi robí vlastný router na subnete `10.20.1.0/24` rpi má adresu `10.20.1.1/24`.

```bash title="ssh pripojenie k rpi po pripojeni k wifi"
ssh pi@10.20.1.1
```

Na rpi nefunguje DHCP. Treba nastaviť statickú ip z rozsahu subnety ideálne od `<10.20.1.2 - 10.20.1.9>`. Adresu `10.20.1.3` používam (Marek Vajda) pre notebook. Dávať modulom ip adresy odkonca vyššie napísaného rozsahu. Od `<10.20.1.10 - 10.20.1.100>` by malo ip adresy priradovať DHCP, ale to nie je funkčné.

## Príklad kódu na pripojenie ESP32 k rpiWifi sieti

V loope je nadbytočný kód ale možno sa zíde.

```c title="esp32 pripojenie k rpiWifi"
/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com
*********/

// Load Wi-Fi library
#include <WiFi.h>

// Replace with your network credentials
const char* ssid     = "rpiWifi";
const char* password = "tp062122";

// Set web server port number to 80
WiFiServer server(80);

// Variable to store the HTTP request
String header;

// Auxiliar variables to store the current output state
String output26State = "off";
String output27State = "off";

// Assign output variables to GPIO pins
const int output26 = 26;
const int output27 = 27;

// Set your Static IP address
IPAddress local_IP(10, 20, 1, 7);
// Set your Gateway IP address
IPAddress gateway(10, 20, 1, 1);

IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional

void setup() {
  Serial.begin(115200);
  // Initialize the output variables as outputs
  pinMode(output26, OUTPUT);
  pinMode(output27, OUTPUT);
  // Set outputs to LOW
  digitalWrite(output26, LOW);
  digitalWrite(output27, LOW);

  // Configures static IP address
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("STA Failed to configure");
  }

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop(){
  WiFiClient client = server.available();   // Listen for incoming clients

  if (client) {                             // If a new client connects,
    Serial.println("New Client.");          // print a message out in the serial port
    String currentLine = "";                // make a String to hold incoming data from the client
    while (client.connected()) {            // loop while the client's connected
      if (client.available()) {             // if there's bytes to read from the client,
        char c = client.read();             // read a byte, then
        Serial.write(c);                    // print it out the serial monitor
        header += c;
        if (c == '\n') {                    // if the byte is a newline character
          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // and a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // turns the GPIOs on and off
            if (header.indexOf("GET /26/on") >= 0) {
              Serial.println("GPIO 26 on");
              output26State = "on";
              digitalWrite(output26, HIGH);
            } else if (header.indexOf("GET /26/off") >= 0) {
              Serial.println("GPIO 26 off");
              output26State = "off";
              digitalWrite(output26, LOW);
            } else if (header.indexOf("GET /27/on") >= 0) {
              Serial.println("GPIO 27 on");
              output27State = "on";
              digitalWrite(output27, HIGH);
            } else if (header.indexOf("GET /27/off") >= 0) {
              Serial.println("GPIO 27 off");
              output27State = "off";
              digitalWrite(output27, LOW);
            }

            // Display the HTML web page
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<link rel=\"icon\" href=\"data:,\">");
            // CSS to style the on/off buttons
            // Feel free to change the background-color and font-size attributes to fit your preferences
            client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".button2 {background-color: #555555;}</style></head>");

            // Web Page Heading
            client.println("<body><h1>ESP32 Web Server</h1>");

            // Display current state, and ON/OFF buttons for GPIO 26
            client.println("<p>GPIO 26 - State " + output26State + "</p>");
            // If the output26State is off, it displays the ON button
            if (output26State=="off") {
              client.println("<p><a href=\"/26/on\"><button class=\"button\">ON</button></a></p>");
            } else {
              client.println("<p><a href=\"/26/off\"><button class=\"button button2\">OFF</button></a></p>");
            }

            // Display current state, and ON/OFF buttons for GPIO 27
            client.println("<p>GPIO 27 - State " + output27State + "</p>");
            // If the output27State is off, it displays the ON button
            if (output27State=="off") {
              client.println("<p><a href=\"/27/on\"><button class=\"button\">ON</button></a></p>");
            } else {
              client.println("<p><a href=\"/27/off\"><button class=\"button button2\">OFF</button></a></p>");
            }
            client.println("</body></html>");

            // The HTTP response ends with another blank line
            client.println();
            // Break out of the while loop
            break;
          } else { // if you got a newline, then clear currentLine
            currentLine = "";
          }
        } else if (c != '\r') {  // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
        }
      }
    }
    // Clear the header variable
    header = "";
    // Close the connection
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");
  }
}
```
