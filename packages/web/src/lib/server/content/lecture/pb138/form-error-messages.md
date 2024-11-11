---
type: text
title: Chybové zprávy při validaci
description: Jak dostat k uživateli nějakou přívětivou metodou chybové zprávy z validačních knihoven, například
  z již použité knihovny Zod.
cover: "@/assets/images/react-forms.webp"
badges:
  - 3 min
  - text
---

## Co je naším cílem

Pokud nejsme schopni uživateli správně předat, co špatně vyplnil ve formuláři, tak máme problém. Je velmi malá
šance, že uživatele napadne například překročení maximální počet znaků u jména, nebo nevalidní formát emailu. Dříve
se toto řešilo odesláním formuláře na server, který provedl validaci a poté vrátil zpět celou stránku s vypsanými
chybami. Nicméně v SPA umíme toto řešit na straně klienta a tím pádem naši webovou aplikaci opouští až validní
data. Také je aplikace poté více interaktivní a uživatel má odezvu na špatně vyplněná data hned.

## Schéma a chybové hlášky

Většina knihoven, které nějakým způsobem validují proti definovanému schématu, umožňují nastavovat chybové hlášky.
Zod tedy není vyjímkou a doporučuji vždy chybové hlášky přikládat a nenechávat ty automaticky vygenerované. Chybovou
zprávu editujeme přes klíč `message`.

```tsx
const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Username is required" }).email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
```

## Výpis chyb ve formuláři

K chybám můžeme přistupovat přes stav samotného formuláře. Konkrétně přes atribut `errror`. Ten nám pro každý
input drží aktuální error a jeho message.

```tsx
const Form: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>(/* schema resolvers*/);

  const submitHandler: SubmitHandler<LoginForm> = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("email")} /> {/* email */}
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register("password")} /> {/* password */}
      {errors.password && <p>{errors.password.message}</p>}
      <button>Login</button>
    </form>
  );
};
```

Kdykoli tedy má nějaké formulářové pole jakýkoli error, tak vyrenderujeme zprávu, kterou nám validační schéma předá.
