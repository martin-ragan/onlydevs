---
type: text
title: Použití komponenty Controller
description: Tato komponenta má velké využití. Asi nejvíce se nám hodí u komplikovanějších inputů, jako
  jsou nějaké výběry datumů a podobně.
cover: "@/assets/images/react-forms.webp"
badges:
  - 4 min
  - text
---

## Co je naším cílem

Občas nazazíme na inputy, kde nám prosté `register` nestačí. Jedná se o například nějaké selectboxy, které
umožňují výběr více možností zaráz. V takovém případě již musíme přijít s kontrolovaným inputem a to díky
komponentě z knihovny `Controller`.

## Co je nyní jinak oproti inputu?

Klasický input je v rámci HTML a tedy má nějakou vlastní logiku. Pokud tuto logiku využije například React
hook form díky referenci na takový input, tak získáváme skvělou výkonost. Pokud však potřebujeme některé složitější
inputy, které prohlížeč nenabízí, pak je součástí komponenty inputu více věcí. Například je zde nějaký stav, který
řeší, zda je otevřený modal pro výběr možností a podobně. Tedy nějakému React přerenderování se nevyhneme a potřebujeme
nějaký kontrolovaný přístup z formulářové knihovny.

## Controller

Z knihovny můžeme využít jednoduchou komponentu Controller, která propojí input s formulářem a zároveň se snaží
trochu odstínit celé to přerenderování bokem. Pojďme se podívat na ukázkové použití:

```tsx
const Form: FC = () => {
  const { control, handleSubmit } = useForm<DeliveryForm>(/* schema resolvers*/);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="deliveryAddress"
        control={control}
        render={({ field }) => <DeliveryAddressSelector {...field} />}
      />
    </form>
  );
};
```

Představme si, že `DeliveryAddressSelector` je nějaký složitější input, který již nelze používat nekontrokolaně
jako nativní HTML inputy. Použijeme tedy atribut `control`, který předáme `Controller` komponentě a poté v `render`
vyrenderujeme funkcí náš input. Ve `fields` jsou atributy jako `value`, `onChange`, `onBlur` a podobně. Díky tomu
zvládneme propojit naše pole s celkovým formulářem.
