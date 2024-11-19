---
type: text
title: Kontrolovaný a nekontrolovaný input
description: Aby to nebylo tak jednoduché, tak můžeme v Reactu používat dva druhy inputů. Podívejme se tedy na to,
  jak každý input pracuje a který z nich bychom chtěli používat.
cover: "/assets/images/react-forms.webp"
badges:
  - 4 min
  - text
---

## Co je naším cílem

Jedna z věcí, kterou můžete potkat na pohovoru je otázka na rozdíly mezi kontrolovaným a nekontrolovaným inputem. Takže
si pojďme vyjasnit tuto trochu pokročilou část Reactu, abychom mohli psát skvělé formuláře.

## Události inputů

Jednou z velmi důležitých částí inputů jsou jejich události. Ty nás notifikují například o tom, že někdo do formuláře
kliknul, což odchytáváme `onFocus`, nebo opačná událost, že někdo opustil prvek `onBlur`. Nicméně nás zajímá událost
`onChange`, která je vytvořená vždy, když někdo v inputu něco změní. Pokud bychom si chtěli změnu vypsat, můžeme
následovně:

```tsx
const Form: FC = () => {
  const handleChange = (e) => console.log(e.target.value);

  return <input onChange={handleChange} />;
};
```

Nyní při každém napsaném písmenu (tedy změně), se vytvoří událost, kterou odchytíme v `onChange` a vypíšeme si
aktuální hodnotu ve formulářovém prvku. To zní docela dobře ne? Umíme získávat hodnotu tak to si ji někam uložíme a
máme vyhráno! No, ne tak úplně.

## Kontrolovaný input

Kontrolovaný input je v okamžiku, kdy záskáváme hodnotu přes `onChange` a zároveň nastavujeme hodnotu přes `value`:

```tsx
const Form: FC = () => {
  const [name, setName] = useState("");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
};
```

Když pomineme nyní jak by vypadalo toto řešení na formulářích o 30 inputech. Tak to vypadá docela dobře. V `onChange`
změníme hodnotu ve stavu a stav nám změní hodnotu v inputu. Nicméně kontrolované inputy jsou zrádné. Co dělá React,
když se mu změní state nebo props? Přerenderuje se. No a my jsme teď při každém stisku klávesy ve formuláři měníme
stav komponenty a tím pádem i ji přerenderováváme.

Na něčem takhle malém to smysl nedává, ale představme si toto aplikované na nějaké velké komponentě. To by už mohlo
vytvořit trochu problémy s výkoností aplikace.

## Nekontrolovaný input

Nekontrolovaný input funguje prakticky na opačném principu. Chceme aby si input sám říkal, co nese za hodnotu a my
si tu hodnotu vyzvedneme až na konci při odeslání formuláře.

Nekontrolovaný input v praxi může vypdat nějak takto:

```tsx
const Form: FC = () => {
  const nameInput = useRef<HTMLInputElement>();

  const handleSubmit = () => console.log(nameInput.current?.value);

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameInput} />
    </form>
  );
};
```

Ale představa, že takto složitě musíme pracovat s velkými formuláři není o nic více lákavá než u kontrolovaného inputu.

## Závěr

Pokud si můžeme vybrat, tak varianta nekontrolovaného inputu je vždy lepší než kontrolovaného. Při změně se totiž
nevyvolá přerenderování celé komponenty. Nicméně v praxi stejně použijeme knihovnu pro práci s formulářemi, takže
spíše si pamatujme tyto znalosti, abychom na nich mohli dále stavět.
