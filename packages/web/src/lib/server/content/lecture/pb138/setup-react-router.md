---
type: text
title: Příprava a instalace React routeru
description: Zkusíme si stáhnout a nasetupovat nejstahovanšjší knihovnu na směrování, abychom od dalších
  lekcí ji mohli začít konečně používat v plném rozsahu.
cover: "/assets/images/react-routing.webp"
badges:
  - 2 min
  - text
  - instalace
---

## Instalace

Kompletní návod a příklady najdete vždy na oficiálních stránkách zde: [https://reactrouter.com/en/main](https://reactrouter.com/en/main).

Předpokládám, že máte nějaký projekt v Reactu, nejlépe doposud prázný. Nyní tedy instalace. Musíme nainstalovat
knihovnu `react-router-dom`. Proč je na konci DOM? Protože budeme používat router v prohlížeči, takže zde musí
být zahrnuta i nějaká interakce s API prohlížeče. To jen kdyby vzniklo zmatení, proč se knihovna oficiálně jmenuje
jinak než knihovna, kterou instalujeme.

```
npm install react-router-dom
```

No a to je vše. Jednoduché že? Můžete zkontrolovat v `package.json`, že se vše správně nainstalovalo, že máte
verzi 6 a máte hotovo.
