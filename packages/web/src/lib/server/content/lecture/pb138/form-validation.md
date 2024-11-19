---
type: text
title: Validace formuláře
description: Uživatel může nyní odesílat data, ale jak správně řešit nevalidní údaje do formuláře? Jde
  toto detekovat ještě než formulář odešleme?
cover: "/assets/images/react-forms.webp"
badges:
  - 3 min
  - text
---

## Co je naším cílem

Nechceme na server odesílat data, která nejsou validní. Zkusíme tedy přes knihovnu zod vyřešit validaci formuláře.

## Instalace

Kromě knihovny zod tak budeme potřebovat i resolver (React Hook Form umí pracovat s více knihovnami, tak
je potřeba použít nějaký middleware, aby si navzájem rozuměli).

```sh
npm install zod
npm install @hookform/resolvers
```

## Vytvoření schématu

Nyní pokud jste někdy již pracovali se Zod knihovnou tak to není nic nového. Použijeme formulář pro přihlášení, na
kterém jsme pracovali v minulé lekci. Schéma tedy bude vypadat nějak takto:

```tsx
const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Username is required" }).email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginForm = z.infer<typeof loginFormScheme>;
```

## Přidání schématu do formuláře

Nyní schéma musíme jen přidat do formuláře. Pro tento krok použijeme právě resolver.

```tsx
const Form: FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginFormSchema),
  });

  const submitHandler: SubmitHandler<LoginForm> = (values) => {
    console.log(values);
  };

  return; /* form */
};
```

No a nyní si můžete vyzkoušet takový formulář odeslat. Pokud neprojde validační schéma, tak se vůbec neprovolá
funkce `submitHandler`, protože `handleSubmit` proces odeslání zastaví a bude vyžadovat validní data.

Toto není sice úplně uživatelsky přívětivé, ale nyní umíme validovat data. V další lekci si ukážeme jak vytáhnout
zprávy o chybách ze Zodu uživateli do formuláře.
