---
type: text
title: Použití useFieldArray ve formuláři
description: Pokud potřebujeme řešit dynamické přidávání a odebírání položek ve formuláři tak i pro toto
  má React hook form řešení.
cover: "/assets/images/react-forms.webp"
badges:
  - 5 min
  - text
---

## Co je naším cílem

Představme si formulář, kdy přes tlačítko přidáváme nové uživatele a pak všechny naráz pošleme na server jako
seznam. Řešit toto bez `useFieldArray` by bylo skoro nemožné. Díky tomuto hooku však můžeme mít takovou věc napsanou
během chvilky.

## Definování typu formuláře

Dejme tomu, že potřebujeme definovat seznam nějakých uživatelů. Máme tedy samotný formulář, který obsahuje jeden
atribut se seznamem nějakých uživatelů. Důležité je, že i pokud formulář pracuje jen s tímto, tak pořád nějaký atribut
musíme mít. Například právě `users`.

```tsx
type User = {
  name: string;
  email: string;
};

type UserListForm = {
  users: User[];
};
```

## Definice useFieldArray

Takto můžeme definovat pole uživatelů:

```tsx
const Form: FC = () => {
  const { control, handleSubmit } = useForm<UserListForm>(/* schema resolvers*/);

  const { append, remove, fields } = useFieldArray({ control, name: "users" });

  return; /* form */
};
```

Hook si vezme `control`, aby se připojil ke konkrétnímu formuláři a také vezme název pole, kde bude aplikovat
přidávání a odebírání prvků. Předá nám poté například funkce `append`, `remove`, díky kterým přídávme a mazáme.
Hodnota `fields` obsahuje všechny prvky v poli, tedy všechny naše uživatele.

Kromě těchto funkcí, nabízí také například `prepend`, `insert`, `swap`, `move` a podobně. Tedy i nějaká pokročilá
práce s takovýmito seznami je velmi jednoduchá, například implementování drag and drop.

## Použití na formuláři

Pokud budeme chtít použít tyto utility z `useFieldArray` na formuláři, tak Vás nejspíše nic nepřekvapí. Za zmínku snad
stojí, že k `field` nám hook přibalí ještě nějaké unikátní ID, které je dobré používat právě v `key`, když iterujeme
na všemi `fields`.

Ještě si všiměte, jak přistupujeme v `register` k názvům jednotlivých polí. Je to relativně snadné. Přes indexy, které
jsou typově hlídáné knihovnou díky `useForm` generice.

```tsx
const Form: FC = () => {
  /* useFieldArray and useForm definition above */
  const handleAddNew = () => append({ name: "", email: "" });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`users.${index}.name`)} />
          <input {...register(`users.${index}.email`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddNew}>
        Add new
      </button>
      <button>Submit</button>
    </form>
  );
};
```
