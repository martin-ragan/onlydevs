---
type: checkpoint
title: Kvíz na formuláře
description: |
  Zkuste si v tomto kvízu, zda jste správně pochopili vše co si máte z této kapitoly odnést. Zde máte
  připravené klíčové otázky, z lekcí, které jste si prošli a můžete si prověřit, zda máte osvojené
  právě důležité pojmy.
cover: "@/assets/images/react-forms.webp"
badges:
  - 7 min
  - checkpoint
questions:
  - type: single-choice
    title: Jaký je rozdíl mezi kontrolovaným a nekontrolovaným inputem?
    code: "controlled-vs-uncontrolled-input"
    correct: "state-control"
    answers:
      - label: Kontrolované inputy mají svůj stav spravovaný Reactem, zatímco u nekontrolovaných inputů je stav spravovaný samotným DOM.
        code: "state-control"
        explanation: Ano, toto je klíčový rozdíl. U kontrolovaných inputů je hodnota inputu svázaná se stavem komponenty v Reactu, což umožňuje Reactu kontrolovat hodnotu tohoto inputu. U nekontrolovaných inputů React nekontroluje stav inputu; místo toho je hodnota přímo spravována DOM.
      - label: Kontrolované inputy jsou automaticky validovány Reactem, zatímco nekontrolované inputy vyžadují manuální validaci.
        code: "validation-difference"
        explanation: Ne, toto není správné. Ačkoli React usnadňuje práci s validací u kontrolovaných inputů prostřednictvím stavu a událostí, automatická validace není poskytována. Oba typy inputů mohou využívat manuální nebo programovou validaci.
      - label: Kontrolované inputy nelze použít ve formulářích, zatímco nekontrolované inputy jsou určené speciálně pro formuláře.
        code: "form-usage"
        explanation: To není pravda. Kontrolované i nekontrolované inputy mohou být použity ve formulářích. Rozdíl spočívá v tom, jak je jejich stav spravován a jak jsou integrovány do React aplikací.
  - type: single-choice
    title: Je možné v React Hook Form použít validaci formulářových dat přes knihovnu Zod?
    code: "react-hook-form-zod-validation"
    correct: "yes-integration"
    answers:
      - label: Ano, React Hook Form umožňuje integraci s knihovnou Zod pro validaci formulářových dat.
        code: "yes-integration"
        explanation: To je správně. React Hook Form podporuje integraci s validátory typů a schémat, včetně knihovny Zod, což umožňuje vývojářům vytvářet robustní validaci formulářů s použitím schémat definovaných v Zod.
      - label: Ne, React Hook Form podporuje pouze vlastní validaci a validaci přes Yup.
        code: "no-yup-only"
        explanation: Toto tvrzení není správné. Ačkoli React Hook Form má podporu pro Yup, také umožňuje použítí jiných knihoven pro validaci, včetně Zod, prostřednictvím svého adaptéru pro validaci.
      - label: Ano, ale pouze pro základní typy validace, složitější validace vyžadují vlastní implementaci.
        code: "yes-basic-only"
        explanation: To není přesné. Integrace Zod s React Hook Form umožňuje jak základní, tak složité validace, včetně využití vlastních validátorských funkcí a asynchronní validace.
  - type: multiple-choice
    title: Které funkce a objekty nám vrací hook `useFieldArray`?
    code: "useFieldArray-returns"
    correct: [fields, append, remove]
    answers:
      - label: fields
        code: "fields"
        explanation: Ano, `fields` je objekt obsahující seznam položek field array, který lze použít pro renderování inputů field array. Každá položka v `fields` obsahuje `id` pro klíč a ostatní hodnoty pro každý field.
      - label: append
        code: "append"
        explanation: Správně, `append` je funkce umožňující přidání nové položky na konec field array, což je užitečné pro dynamické formuláře, kde mohou uživatelé přidávat více položek.
      - label: validate
        code: "validate"
        explanation: Ne, `useFieldArray` neposkytuje přímo funkci `validate`. Validace pro pole v field array se obvykle provádí na úrovni formuláře nebo pomocí externích validátorských pravidel.
      - label: remove
        code: "remove"
        explanation: Toto je také funkce poskytovaná `useFieldArray`. `remove` umožňuje odstranit specifickou položku z field array na základě jejího indexu.
  - type: multiple-choice
    title: Jaké výhody jsou při použití `register` v React Hook Form?
    code: "register-advantages"
    correct: [easy-to-use, automatic-validation, performance-improvement]
    answers:
      - label: Snadné připojení inputů k formulářovému řízení bez nutnosti ručně manipulovat s eventy nebo stavem.
        code: "easy-to-use"
        explanation: Přesně tak, `register` umožňuje vývojářům snadno připojit inputy k formulářovému řízení, automatizovat sběr dat a odstranit potřebu manuálně manipulovat s eventy nebo stavem.
      - label: Automatická validace na základě pravidel definovaných pro každý input.
        code: "automatic-validation"
        explanation: Ano, jednou z výhod `register` je možnost definovat pravidla validace přímo v atributu `register`, což umožňuje automatickou validaci.
      - label: Zvyšuje výkon aplikace tím, že eliminuje potřebu používat externí stavové řízení pro formuláře.
        code: "performance-improvement"
        explanation: Ano, `register` skutečně pomáhá zvyšovat výkon aplikace tím, že redukuje potřebu externího stavového řízení a počet renderů, což je klíčové pro efektivní správu formulářů.
      - label: Umožňuje globální správu stavu formulářů ve velkých aplikacích.
        code: "global-state-management"
        explanation: Sám o sobě `register` není nástrojem pro globální správu stavu formulářů. Jeho primárním účelem je registrace inputů pro lokalizované formulářové řízení, nikoli globální správa stavu.
---

## Informace ke kvízu

Tento kvíz je jen pro tebe, abys měl jistotu, že ty klíčové pojmy ti z této lekce utkvěli v hlavě. Pokud budeš
mít nějaké otázky špatně tak si zkus projít určitou kapitolu znovu a vyplnit si kvíz za pár dní.

Pokud budeš mít všechny otázky správně, označí se lekce automaticky jako naučená.
