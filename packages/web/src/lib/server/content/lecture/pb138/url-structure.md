---
type: text
title: Struktura URL adresy
description: Url adresa nabízí mnoho, ale ve výsledku máme tendenci se spokojit jen s používáním cest.
  Pojďme se tedy podívat na strukturu a co vše můžeme využít pro identifikaci nějakého zdroje.
cover: "/assets/images/react-routing.webp"
badges:
  - 4 min
  - text
---

## Co to URL adresa vlastně je?

Asi nejjednodušší pro pochopení, co to je URL adresa, je rozepsání této zkratky. Uniform Resource Locator
(jednotný lokátor zdroje). V jednoduchosti to tedy znamená, každá URL nám popisuje, kde je daný zdroj,
který chceme získat.

K tomu, abychom se z toho uplně nezbláznili, tak nám pomáhá struktura URL a nějaké konvence pojmenovávání.
V této kapitole si rozebereme hlavně strukturu URL adresy, konvence budou v některé z následujících lekcí.

### Struktura

Obecně můžeme rozdělit adresu následovně:

```
https:// myapp.com :443 /preferences/users ?filters=name~eq~john #users-table
protocol host      port path               query                 fragment
```

Každá část má svoji úlohu. Sice nás při směrování na klientovi bude zajímat hlavně `path` a `query`, ale i tak
si v krátkosti proletíme i ostatní části.

### Protocol

Ten zejmnéna popisuje, jaký protokol se k danému zdroji má použít. Typicky se setkáte například s http,
https, ftp, mailto, případně také postgres pokud se připojujete k databázi apod. Prostě určtění, jak máme s
daným zdrojem komunikovat.

### Host

Specifikuje server, kde se nachází zdroj, ke kterému chceme přistoupit. Typicky jedna doména zastává
jednu aplikaci, ale může být i použitý nějaký interní routing, díky kterému pod jedném hostem běží více
aplikací a rozlišují se například až podle prefixu cesty. Nicméně pro jednoduchost bereme doménu jako jednu
aplikace.

### Port

Nepovinná část. Pokud port nespecifikujeme, přebere se podle protokolu. To znamená například u https
se automaticky dotážeme na port 443, u http naopak na 80 a podobně. Pokud máme nějaké specifické požadavky na jiný
port, můžeme přidáním portu do URL adresy přepsat výchozí z protokolem.

### Path

Konečně něco co nás zajímá více. Cesta v adrese je základ pro naše směrování na frontendu. Typicky zde
držíme nějakou hiearchii, kdy hlavní navigační menu nám mění stránky jako `/preferences` nebo `/homepage`,
a poté třeba záložky už jsou na konkrétní stráce více specifické a můžeme zde mít `/preferences/users` případně
`/preferences/admin`. Tedy čím více částí cest použiji, tím více specifickou podčást aplikace dostanu.

Nicméně nepřehánějte to. Nikomu se nechce luštit a zanořovat se o 12 úrovní níže. Držte strukturu aplikace
v rozumné míře hloubky. Kdyby se i tak stalo, nezapomeňte v takovém případě na drobečkovou navigaci. Nezdá
se to, ale uživatel je ve Vaší aplikaci třeba poprvé a po několika zanořeních se může naprosto ztratit.

### Query

Tato nepovinná část adresy je velmi využívaná u SSR aplikací, ale u SPA apliakcí se na ti tak nějak zapomnělo,
což je velká škoda. Jedná se o parametry, které mohu posílat ve formě `key=value` a více hodnot oddělovat přes `&`.

K čemu je to dobré? No dejme tomu, že si na nějakém eshopu udělám filtrování produktů od nějaké ceny a
budu chtít toto poslat kamarádovi jako odkaz. Pokud bude odkaz jen `/products` tak jak se aplikace dozví při
otevření dané komponenty, která řeší vypisování produktů, že je nějaký filtr aktivní. Bohužel nedozví a můj
kamarád dostane všechny produkty. Například `/products?filter=price~gt~400` už zní mnohem lépe.

To platí tedy i pro příklad, kdy si v aplikaci na faktury udělám filtr a řazení na nevyřízené položky a chci
si ho jako uživatel uložit do záložek v pohlížeči. Myslíte, že bez použití query parametrů tak se mi poté načte
to samé až po několika dnech kliknu na odkaz? Opět řešení `/products?filter=statuse~eq~open&sort=created~desc`
vypadá jako dostatečné pro takovou záležitost.

Doufám, že tyto příklady stačili pro pochopení, že query parametry jsou dostatečně důležité a neměli by se
podceňovat. Pomůže to uživatelům při každodenní práci ve vaší aplikaci a i pro Vás to může mít velmi příjemné
benefity.

### Fragment

Posledním nepovinným prostorem v URL je fragment, který nám pomáhá definovat nějakou konkrétnější část zdroje.
Občas můžete u tohoho zaslechnout název "anchor", tedy kotva. Využití je například pokud máme výpis článků,
a chceme uživatele nascrolovat přímo na konkrétní článek poté co klikne na odkaz, dáme do fragmentu id daného
elementu, který článek vypisuje a prohlížeč nás po navštívení stránky sám posune tak, abychom měli dané
id přímo před na monitoru přes sebou.

Toto zejména využijte pokud děláte nějaké blogy, články případně i v rámci výpisu položek v eshopu se dá
použít něco podobného. Prostě kdykoli, kdy chcete odkázat nejen na stránku, ale na nějaký konkrétní prvek stránky.
