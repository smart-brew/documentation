---
title: Brewery
---


# Brewery


## Základná charakteristika

Pozostáva z dvoch nádob, ktoré sú navzájom prepojené. Na rozdiel od zariadenia s troma nádobami mu chýba špeciálna nádoba pre ohrev vody. Tím sa zníži nielen potreba priestoru na skladovanie pivovaru, ale aj čas k vareniu piva. 

## Základné postupy pri varení piva
1. Rozdrvený jačmenný slad sa zmieša s teplou (nie vriacou) vodou. Nechá sa namáčať. Možné pridať iné prísady, ako napríklad pomletú ryžu. Dôkladným zamiešaním vzniká hustá kaša, tzv. vystierka.
2. Zmes sa za stáleho miešania zahrieva pri teplote do 100 stupňov niekoľko hodín. Existujú rôzne spôsoby udržiavania teploty, ktoré sú popísané v ďalšej časti. Pri tomto procese sa škrob mení na cukry.
3. Následne je potrebné scediť tuhú časť zmesi od tekutej. Výsledkom je roztok sladkej chuti nazývaný slatina. 
4. Slatina sa ďalej varí s chmeľom, ktorý do zmesi pridá horkú príchuť. Chmeľ sa necháva len vylúhovať, po tomto procese sa odstráni. Výsledkom je mladina, ktorá sa vírením zbaví kalov.
5. Po schladení sa pridávajú kvasnice. Dochádza k zmene cukrov na alkohol.

## Zahrievanie

Existujú dva hlavné spôsoby ako zabezpečiť zohrievanie pri varení piva v dvoch nádobách. Sú nimi RIMS a HERMS.

**Spoločné znaky**: 
- na redistribuovanie sa využíva pumpa
- poskytujú zdroj tepla na zohrievanie 
- neustále prihrievajú zmes mimo kade a navracajú ju tak, aby sa udržala konzistentná teplota počas daného procesu

**HERMS**
Využíva ďalšiu nádobu, v ktorej sa zahrieva voda. Cez vodu vo vnútri tejto nádoby vedie cievka, cez ktorú je tlačená zmes z kade. Tento proces prebieha v cykloch kedy sa zmes zohreje a následne navráti do kade.

**RIMS**
Zdroj tepla prichádza do priameho kontaktu so zmesou. Tento proces taktiež prebieha cyklicky. Ďalším spôsobom je pôsobenie tepla priamo na spodok kade, v tom prípade je ale potrebné obsah dostatočne premiešavať aby nedošlo ku pripáleniu. 

## Možné kroky automatizácie pri procese varenia
- miešanie v kadi - určenie rýchlosti miešania (počet otáčok za minútu) a potrebného času (minúty)
- pohyb medzi kaďami. Nastavenie cirkulácie na istý objem (napr. cm3 za minútu). Otvorenie a uzatvorenie kohútikov (onen/close). 
- udržanie správnej teploty - teplomer (v stupňoch celzia). Podľa toho ako je zabezpečené zahrievanie je potrebné: zvýšiť teplotu / znížiť teplotu 
- pridanie chmeľu / kvasiniek. Ak automaticky tak na timer (v minútach/hodinách) podľa etapy procesu, možná kontrola či je vhodná teplota už dosiahnutá alebo podobne.

## Recept:
- Vodu na varenie piva predohriať na 68 stupňov. 
- Pomlieť jačmeň a namáčať ho v tejto teplote po 30 minúť. 
- Prefiltrovať pevnú zložku zmesi.
- Nechať prevrieť po 70 minút. Pridávať chmeľ v intervaloch. Pridať Whirlfloc tabletu 15 min do konca. 
- Ochladiť na teplotu 18 stupňov, premiestniť do suda a pridať kyslík spolu s kvasnicami. 	
- Uzatvoriť nádobu a držať 2 tyždne.

## Postupy pri vykonávaní receptu, ako je zakreslené v diagrame
Vstup: voda v ohrevnom kotli, namletý jačmeň v násypníku, kvasnice v násypníku, chmeľ pripravený vo vrecúšku, iné prísady pripravené (whirlgloc tablety, pomletá ryža, cukor,...).

- Ohrievač sa má zohriať vodu na 68 stupňov. Teplomer bude každých n sekúnd hlásiť priebežnú teplotu vody. Keď je teplota dosiahnutá, ohrievač túto teplotu musí udržiavať – t.j. ak klesne pod nejakú hranicu tak ju dohreje.
- Násypník dostane príkaz pridať jačmeň do vody. Nastaviť časovač na 30 minút, počas toho miešať zmes pri určitom počte otáčok za minútu. Po vypršaní času sa ukončí miešanie. Otvorí sa ventil na prvej nádobe, zapne sa výleva – podľa nejakého nastavenia bude pumpovať tekutinu do druhej nádoby. Zatvorí sa ventil na druhej nádobe. 
- Druhá nádoba sa zohreje na požadovanú teplotu 98 stupňov (ohrievač, kontroluje teplomer). Časovač sa nastaví na 70 minút po dosiahnutí teploty varu. N minút do konca časovača sa z násypníka pridá do nádoby chmeľ na vylúhovanie. N minút do konca procesu sa pridá whirlfloc tableta. Časovač ohlási koniec 70 minút. 
- Odstránenie kalov?
- Tekutina sa má zachladiť na teplotu 18 stupňov // vykonáva kryostat??. Pridajú sa kvasnice z násypníka, nechá da odležať pričom sa teplota udržiava. 

Výstup: pivo pripravené na točenie, zvyšky pomletého jačmeňa v prvej nádobe, odstránený chmeľ


![proces drawio](https://user-images.githubusercontent.com/43378515/137540987-4ed3c34f-52da-4698-a57c-32c50930197b.png)


## Zdroje

* https://www.homebrewhappyhour.com/rims-herms-systems-explained-compared/
* https://siov.sk/wp-content/uploads/2020/04/Kvasn%C3%A9-technol%C3%B3gie-v%C3%BDroba-piva.pdf
* https://buchvald.sk/postup-pri-vyrobe-piva/
* https://beerandbrewing.com/beer-recipes/?cbb_web_beer_recipes%5Bquery%5D=easy // inšpirácia k receptu

