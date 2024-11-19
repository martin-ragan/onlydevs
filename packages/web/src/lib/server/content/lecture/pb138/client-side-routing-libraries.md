---
type: text
title: Knihovny pro SPA směrování
description: Jak už to v Reactu bývá, i zde je mnoho možných řešení routingu na straně klienta, proto
  si rozebereme některé knihovny se kterými se můžete setkat a řekneme si o těch, co stojí za použití.
cover: "/assets/images/react-routing.webp"
badges:
  - 5 min
  - text
  - knihovny
---

## Existují nějaké knihovny? Nemám si to napsat sám?

Dělat client-side routing bez knihoven by bylo opravdu složité. Už to není jen tak něco, co si zvláneme
napsat za jedno odpoledne, než dopijeme kávu, ale je zde potřeba komunikovat s API prohlížeče, řešit
spoustu nehezkých problémů a podobně. Ono totiž dělat klientské směrování je tak trochu proti tomu, na
co je prohlížeč zvyklý a má tendenci nám v tom házet klacky pod nohy a všelijak nám to zesložiťovat.

Doporučuji tedy všechny tyto problémy nechat na jiném programátorovi a použít již nějaké existující řešení. Zde
Vám doporučím několik knihoven a pokusím se je v rychlosti popsat.

### React router

Nejznámější, nejpoužívánější a nejstahovanější knihovna pro routing v Reactu. Stojí za ní framework Remix, který
patří mezi přední React frameworky. Mezi verzemi 5 a 6 sice kompleteně předělali API, takže migrace nebyla úplně
jednoduchá, ale pokud začínáte nový projekt na verzi 6 tak budete určitě spokojení.

Právě kvůli tomu, že ji používá v komunitě skoro každý jsme ji zvolili také jako routing knihovnu letošním běhu PB138.
Najdete totiž skvělou dokumentaci, mnoho návodů a hlavně je knihovna stabilní a musí být i nadále, protože většina
react aplikací na to spoléhá.

S touto knihovnou neuděláte chybu a určitě ji můžeme doporučit.

### Tannstack router

Velmi mladá knihovna od vývojáře Tanner Linsley, který stojí například za nepřekonatelnou knihovnou na data fetching
`@tannstack/react-query`. Letos vydali první stabilní verzi a zatím vypadá velmi slibně. Skoro bychom ji i učili v
letošním běhu PB138, ale pořád si necháváme odstup trochu nechat komunitu ověřit, jak si tato knihovna poradí se všemi
možnými druhy projektů.

Co je odlišné od knihovny React router? Především nabízí typovou bezpečnost pro cesty. To znamená, že když píšeme
cestu, kam nás má link přesměrovat tak nám umí napovídat z existujicí definice routingu. Případně také pokud někde cestu
smažeme, pak nám spadne build aplikace a nějaký link se Vám ohlásí, že vede tam, kam nemá.

Poté ještě je určitě potřeba zmínit práce se Search params, na kterou se při vývoji velmi soustředili. Obecně
je i v React routeru trochu složitější logika, pokud chceme nějak konzistentně pracovat s URL parametery, ale zdá
se, že v této knihovně se k tomu postavili trochu jinak a třeba nám to jednoho dne práci s parametry velmi
usnadní.

### Reach router

Kdysi docela dobrá alternativa k React routeru. Bylo zde jednoduché API a zaměřovali se hodně na zpřístupnění.
Nicméně tato knihovna už není udržovaná a sloučila se s React routerem. Takže od React router v6 můžete určitě
najít nějaké funkce a přístupy z Reach routeru i tam.

Takže tuto knihovnu určitě v nových projektech nepoužívejte, ale v nějakých starších aplikací ji pořád můžete
najít a proto nám přijde důležité ji zde zmínit.

### React navigation

Poslední do rodiny takových známých knihoven, ale pozor, tato není pro weby, ale pro nativní aplikace. Můžete
díky ní využívat jistého routingu i v rámci React native, což je framwork pro psaní nativních aplikací podobně,
jak jsme zvyklí v Reactu.

Tato knihovna se právě snaží využívat nativních přechodů, pracuje s nativními navigačními prvky. Určitě tedy
je dobré znát tuto knihovnu, když budete budovat nějaké aplikace například pro telefony. Nicméně je zde spíše
zahrnutá, abyste věděli, že taková knihovna existuje a má své místo.

### Další knihovny

Určtě najdete nějaké další knihovny, například Wouter, Redux Router a podobně, ale dejte si pozor. Knihovny budou
mít podobné funkcionality jako výše zmíněný React router, ale nemusí být bezchybné a zrovna u routingu bych
volil co nejvíce spolehlivé řešení, protože měnit router u velké aplikace může být na dlouhé večery přepisování.

Pokud se bojíte známého problému, na který poukazují lidé u React routeru, že každou velkou verzí kompletně
rozbijí API tak ano, to se jim stává, nicméně pokud chvíli počkáte, většinou vyjdou nějaké knihovny, které
Vám umožní postupně přecházet a mít po nějakou dobu v kódu obě verze knihovny.
