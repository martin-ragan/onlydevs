---
type: code
title: Jednoduchá implementace formuláře
description: Pokud si vše pamatujete dobře tak si zkuste implementovat jednoduchý formulář.
cover: "@/assets/images/react-forms.webp"
badges:
  - 10 min
  - coding
---

Představte si jednoduchý formulář na vytvoření produktu. Žádná složitá validace, žádné CSS a UI. Jen zkuste
v komponentě CreateProduct napojit formulář na funkci onCreate a použijte k tomu knihovnu React hook form.

```tsx App.tsx assignment
import { FC } from "react";
import "./App.css";

import CreateProduct, { ProductForm } from "./pages/CreateProduct";

const handleCreate = (values: ProductForm) => {
  alert("Product created: " + JSON.stringify(values, null, 2));
};

const App: FC<{}> = (props) => {
  return <CreateProduct onCreate={handleCreate} />;
};

export default App;
```

```tsx /pages/CreateProduct.tsx assignment
import { FC } from "react";
import { useForm } from "react-hook-form";

export type ProductForm = {
  title: string;
  description: string;
  price: number;
};

export type CreateProductProps = {
  onCreate: (values: ProductForm) => void;
};

const CreateProduct: FC<CreateProductProps> = (props) => {
  const { onCreate } = props;
  return (
    <form>
      <h2>Create product</h2>
    </form>
  );
};

export default CreateProduct;
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
```

```tsx App.tsx solution
import { FC } from "react";
import "./App.css";

import CreateProduct, { ProductForm } from "./pages/CreateProduct";

const handleCreate = (values: ProductForm) => {
  alert("Product created: " + JSON.stringify(values, null, 2));
};

const App: FC<{}> = (props) => {
  return <CreateProduct onCreate={handleCreate} />;
};

export default App;
```

```tsx /pages/CreateProduct.tsx solution
import { FC } from "react";
import { useForm } from "react-hook-form";

export type ProductForm = {
  title: string;
  description: string;
  price: number;
};

export type CreateProductProps = {
  onCreate: (values: ProductForm) => void;
};

const CreateProduct: FC<CreateProductProps> = (props) => {
  const { onCreate } = props;
  const { register, handleSubmit } = useForm<ProductForm>();

  const submitHandler: SubmitHandler<ProductForm> = (values) => {
    onCreate(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2>Create product</h2>
      <input placeholder="Title" {...register("title")} />
      <input placeholder="Description" {...register("description")} />
      <input placeholder="Price" {...register("price")} />
      <button>Submit</button>
    </form>
  );
};

export default CreateProduct;
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
```
