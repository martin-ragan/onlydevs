---
type: code
title: Ukázka validace formuláře
description: Názorný příklad, kde si vyzkoušíte implementaci nejen validace formuláře přes validační schéma,
  ale take vypisování chybových hlášek.
cover: "/assets/images/react-forms.webp"
badges:
  - 8 min
  - coding
---

Formulář pro registraci potřebuje dodat nějakou validaci. Chceme validovat korektně napsaný email, jméno musí
být alespoň 3 znaky dlouhé a heslo alespoň 8 znaků dlouhé. Zkuste si napsat validaci a vypsat uživateli chybu
u konkrétního elementu, pokud nebude validní.

```tsx App.tsx assignment
import { FC } from "react";
import "./App.css";

import RegistrationPage, { RegistrationForm } from "./pages/RegistrationPage";

const handleRegister = (values: RegistrationForm) => {
  alert("Registration: " + JSON.stringify(values, null, 2));
};

const App: FC<{}> = (props) => {
  return <RegistrationPage onRegister={handleRegister} />;
};

export default App;
```

```tsx /pages/RegistrationPage.tsx assignment
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export type RegistrationForm = {
  name: string;
  email: string;
  password: string;
};

export type RegistrationPageProps = {
  onRegister: (values: ProductForm) => void;
};

const RegistrationPage: FC<RegistrationPageProps> = (props) => {
  const { onRegister } = props;
  const { register, handleSubmit, formState } = useForm<RegistrationForm>({
    resolver: undefined,
  });

  const submitHandler: SubmitHandler<RegistrationForm> = (values) => {
    onRegister(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2>Register</h2>
      <div>
        <input placeholder="Name" {...register("name")} />
      </div>
      <div>
        <input placeholder="Email" {...register("email")} />
      </div>
      <div>
        <input placeholder="Passowrd" {...register("password")} />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default RegistrationPage;
```

```tsx App.css assignment
body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

html, body {
  margin: 0;
  padding: 0;
}

form {
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1rem;
}

p {
  font-size: 0.65rem;
}
```

```tsx App.tsx solution
import { FC } from "react";
import "./App.css";

import RegistrationPage, { RegistrationForm } from "./pages/RegistrationPage";

const handleRegister = (values: RegistrationForm) => {
  alert("Registration: " + JSON.stringify(values, null, 2));
};

const App: FC<{}> = (props) => {
  return <RegistrationPage onRegister={handleRegister} />;
};

export default App;
```

```tsx /pages/RegistrationPage.tsx solution
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export type RegistrationForm = {
  name: string;
  email: string;
  password: string;
};

const formSchema = z.object({
  name: z.string().min(3, { message: "Name should be more than 3 characters long" }),
  email: z.string().email({ message: "Not valid email " }),
  password: z.string().min(8, { message: "Password should be more than 8 characters long" }),
});

export type RegistrationPageProps = {
  onRegister: (values: ProductForm) => void;
};

const RegistrationPage: FC<RegistrationPageProps> = (props) => {
  const { onRegister } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler: SubmitHandler<RegistrationForm> = (values) => {
    onRegister(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2>Register</h2>
      <div>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input placeholder="Passowrd" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button>Submit</button>
    </form>
  );
};

export default RegistrationPage;
```

```tsx App.css solution
body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

html, body {
  margin: 0;
  padding: 0;
}

form {
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1rem;
}

p {
  font-size: 0.65rem;
}
```
