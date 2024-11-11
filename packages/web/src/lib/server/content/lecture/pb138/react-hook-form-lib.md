---
type: text
title: Knihovna React Hook Form
description: No a teď už ta slavná knihovna, která nás spasí při vytváření složitých formulářů... nebo minimálně nám
  s tím trochu pomůže.
cover: "@/assets/images/react-forms.webp"
badges:
  - 4 min
  - text
---

## Co je naším cílem

Zkusíme se seznámit s novou knihovnou, která je slavná skoro jako React samotný. Pojďme si tedy projít instalaci a
první jednoduchý formulář.

## Instalace

Asi Vás to nepřekvapí, ale bude nám stačit pouze:

```sh
npm install react-hook-form
```

případně jiný Vás oblíbený správce balíčků.

## Jednoduchý formulář

Představme si, že chceme dělat login formulář. To by mohlo vypadat zhruba takto:

```tsx
const Form: FC = () => {
  return (
    <form>
      <input /> {/* email */}
      <input /> {/* password */}
      <button>Login</button>
    </form>
  );
};
```

No a teď by to chtělo tenhle formulář nějak oživit.

## Přidání knihovny React hook form

Teď je ten čas přidat naši chytrou knihovnu. Všimněte si, že spolu s ní i vytváříme typ formuláře. Díky tomu
nejen, že budeme mít podchycenou logiku formuláře, ale také nám bude knihovna napovídat a bude celkově typově
bezpečná od začátku až do konce:

```tsx
type LoginForm = {
  email: string;
  password: string;
};

const Form: FC = () => {
  const {} = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  return (
    <form>
      <input /> {/* email */}
      <input /> {/* password */}
      <button>Login</button>
    </form>
  );
};
```

Nyní jsme přidali hook, který bude řešit fomuláře. Spolu s ním jsme mu v generice předali i typ, který budou
hodnoty nabývat a v parametrech jsme specifikovali výchozí hodnoty jednolivých polí formuláře.

Nyní, když jsme vytvořili a nastavili instanci formuláře, podíváme se jak bude vše interagovat dohromady:

```tsx
const Form: FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>(/* form setup */);

  const submitHandler: SubmitHandler<LoginForm> = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("email")} /> {/* email */}
      <input {...register("password")} /> {/* password */}
      <button>Login</button>
    </form>
  );
};
```

Tak, a nyní co vše se stalo. První věc tak je napojení inputů k formuláři. Přes register tak zaregistrujeme
jednotlivé inputy pod jejich jménem, které mají v typu. No a to je vše. Hook form tak si sám vygeneruje
property do každého inputu a přes referenci si bude komunikovat s našimi inputy na úrovni HTML. Takže nejlepší
performance co vůbec můžeme chtít.

Druhá věc je řešení odeslání formuláře. Funkce `handleSubmit` pouze zprostředokává odeslání. To znamená, že
hlídá zda jsou data validní, ruší původní chování odeslaného formuláře a podobně. Pokud je vše správně tak
provolá funkci `submitHandler`, která dostane již hotová data.

To není tak složité. Vlastně jen zaregistrujeme inputy a řekneme, co se má dít po kliknutí na odeslat. Opravdu
jednoduché fomuláře se dají řešit takto snadno. V dalších lekcích se podíváme na nějaké pokročilejší věci.
