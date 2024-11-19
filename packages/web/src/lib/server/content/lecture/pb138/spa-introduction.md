---
type: text
title: Začátky s SPA
description: V rámci tohoto kurzu SPA uslyšíte vcelku často, zkusíme si tedy v této lekci zadefinovat
  co to vlastně, jeho výhody jeho nevýhody.
cover: "/assets/course/pv281/course-cover.webp"
badges:
  - 5 min
  - chill
  - introduction
---

## SPA vs. SSR

SSR po dlouhou dobu vedlo ve světě webových aplikací. Jedná se o zkratku Server Side Rendering a
jednuše si to můžeme představit tak, že pošlu z webového prohlížeče dotaz server, ten se na chvíli
zamyslí a podle URL adresy, uživatele který poslal dotaz a dalších kritérií seskládá kompletně
HTML stránku, kterou pošle do prohlížeče a ten ji zobrazí.

To zní docela jednoduše tak proč se na nějakou dobu od toho opustilo. Problém je trochu v
interaktitě. Pokud jsme srovnali nativní aplikaci a webovou aplikaci tak by té u webové při
kliknutí na záložku došlo k takovému probliknutí. To by bylo způsobené tím, že při kliknutí se musí
provolat dotaz a dostat dob prohlížeče novou šabolnou.
