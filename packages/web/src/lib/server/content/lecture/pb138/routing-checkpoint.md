---
type: checkpoint
title: Kontrola znalostí z této kapitoly
description: |
  Zkuste si v tomto kvízu, zda jste správně pochopili vše co si máte z této kapitoly odnést. Zde máte
  připravené klíčové otázky, z lekcí, které jste si prošli a můžete si prověřit, zda máte osvojené
  právě důležité pojmy, které si máte odnést.
cover: "@/assets/images/react-routing.webp"
badges:
  - 8 min
  - checkpoint
questions:
  - type: single-choice
    title: Která z knihoven je nejvíce používaná v současnosti pro směrování na straně klienta?
    code: "most-used-routing-lib"
    correct: "react-router"
    answers:
      - label: React router
        code: "react-router"
        explanation: Ano, toto je knihovna, kterou nejspíše potkáte v projektu v práci
      - label: Tannstack router
        code: "tannstack-router"
        explanation: Tato knihovna vyšla relativně nedávno, takže si ji mnoho projektů ještě neosvojilo
      - label: React navigation
        code: "react-navigation"
        explanation: Občas někde tuto knihovnu můžete najít, ale už není dále udržovaná a nebyla nikdy tak populární
      - label: Reach Router
        code: "reach-router"
        explanation: Používaná, ale je zde mnohem lepší volba
  - type: multiple-choice
    title: Jaké komponenty používáte při routování v rámci knihovny React router v6
    code: "routing-lib-components"
    correct: ["route", "link"]
    answers:
      - label: Route
        code: "route"
        explanation: Ano, definujeme tím pod jakou cestou v URL adrese se má vykreslit potomci této komponenty
      - label: Switch
        code: "switch"
        explanation: Od verze 6 již není používaný, místo toho definujeme podobné chování přes <Routes />
      - label: Link
        code: "link"
        explanation: Ano, pro navigaci na konkrétní cestu
      - label: Slot
        code: "slot"
        explanation: Ne, v této knihovně používáme Outlet pro vykreslení komponenty z definice cest
  - type: multiple-choice
    title: Která tvrzení o komponentě Navlink jsou správná
    code: "navlink-statments"
    correct: [navlink-has-active, navlink-in-navigation]
    answers:
      - label: Navlink je úplně to samé jako Link a je zde kvůli zpětné kompatibilitě
        code: "navlink-like-link"
        explanation: Ne, jsou to odlišné kompoennty a každá by se měla používat tam, kde dává smysl
      - label: Navlink poskytuje proměnnou active, abychom uměli podmínit styly u aktivního linku
        code: "navlink-has-active"
        explanation: Ano, toto je pravdivé a pomůže nám to dělat lepší UI pro uživatele
      - label: Navlink se používa v navigačních prvcích
        code: "navlink-in-navigation"
        explanation: Ano, Navlink se primárně používá v navigačních prvcích
      - label: Navlink nefunguje pokud je mimo HTML element nav
        code: "navlink-outside-nav"
        explanation: Navlink funguje i mimo nav
  - type: single-choice
    title: Co je to code splitting
    code: code-splitting
    correct: performance-improvement
    answers:
      - label: Způsob, jak zlepšit výkon aplikace tím, že se kód aplikace rozdělí na menší části, které se načtí pouze když jsou potřeba
        code: performance-improvement
        explanation: Ano. Code splitting je technika používaná pro zlepšení výkonu aplikace tím, že rozdělí kód aplikace na menší, samostatně načítané balíčky.
      - label: Metoda šifrování kódu pro zvýšení bezpečnosti aplikace
        code: code-encryption
        explanation: Ne, toto není správná odpověď. Code splitting nemá nic společného se šifrováním kódu; místo toho je to technika optimalizace výkonu aplikace.
      - label: Proces kompilace kódu z vyššího programovacího jazyka do jazyka strojového
        code: compilation-process
        explanation: To není správná odpověď. Code splitting se netýká procesu kompilace kódu, ale spíše jeho dynamického načítání během běhu aplikace.
  - type: multiple-choice
    title: Jaké je vhodné použití search parametrů v URL adrese v SPA?
    code: "search-params-usage"
    correct: [form-state-sharing, dialog-state]
    answers:
      - label: Pro zvýšení bezpečnosti webové aplikace tím, že se klíčové informace předávají přes URL
        code: increase-security
        explanation: To není doporučené využití. Předávání citlivých informací přes URL, včetně search parametrů, může vést k bezpečnostním rizikům, protože URL jsou často logovány a mohou být snadno přístupné.
      - label: Umožňují ukládat stav formulářů a filtrování na stránce pro snadné sdílení nebo opětovné použití
        code: form-state-sharing
        explanation: Ano, search parametry mohou být využity pro ukládání stavů formulářů nebo filtrování, což umožňuje uživatelům sdílet odkazy s přednastavenými hodnotami nebo si uložit tyto nastavení pro budoucí použití
      - label: Pro zobrazování kompletních chybových zpráv přímo v URL, když dojde k chybě na stránce
        code: display-error-messages
        explanation: Toto není uživatelsky přívětivý způsob použití. Zobrazování kompletních chybových zpráv v URL může být matoucí pro uživatele a také představuje riziko pro bezpečnost, protože potenciálně odhaluje citlivé informace o struktuře aplikace nebo o chybách v kódu.
      - label: Stav otevření nebo zavření dialogu
        code: dialog-state
        explanation: Ano, pokud chci uživatele odkázat na stránku s rovnou otevřeným dialogem tak search parametry jsou pro toto vhodné řešení.
---

## Informace ke kvízu

Tento kvíz je jen pro tebe, abys měl jistotu, že ty klíčové pojmy ti z této lekce utkvěli v hlavě. Pokud budeš
mít nějaké otázky špatně tak si zkus projít určitou kapitolu znovu a vyplnit si kvíz za pár dní.

Pokud budeš mít všechny otázky správně, označí se lekce automaticky jako naučená.