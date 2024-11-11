---
type: code
title: Implementace navigace
description: Pokud již umíte nastavit routing tak poslední částí, co v poslední řadě už zbývá jen drobnost. Použití
  Navlinku, pro implementaci plnohodnoté navigace.
cover: "@/assets/images/react-routing.webp"
badges:
  - 10 min
  - coding
---

Minule jste implementovali router, teď se pustíme do navigace. V souboru Navbar tak zkuste s využitím komponenty
Navlink implementovat takovou navigaci, aby například na první pohled bylo vidět, který z prvků navigace je
aktivní. Pro aktivní prvek použijte třídu `navlink__item--active`

```tsx App.tsx assignment
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AppLayout from "./layouts/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <div>Index page</div>,
      },
      {
        path: "/homepage",
        element: <div>Homepage</div>,
      },
      {
        path: "/articles",
        element: <div>Articles</div>,
      },
    ],
  },
]);

const App: FC<{}> = (props) => {
  return <RouterProvider router={router} />;
};

export default App;
```

```tsx layouts/AppLayout.tsx assignment
import { FC } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout: FC<{}> = (props) => {
  return (
    <div className="app-layout">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default AppLayout;
```

```tsx components/Navbar.tsx assignment
import { FC } from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar: FC<{}> = (props) => {
  return (
    <nav className="navbar">
      <Link className="navbar__item" to="/">
        Index
      </Link>
      <Link className="navbar__item" to="/homepage">
        Homepage
      </Link>
      <Link className="navbar__item" to="/articles">
        Articles
      </Link>
    </nav>
  );
};

export default Navbar;
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

.navbar {
  display: flex;
  align-items: center;
  background-color: gray;
  gap: 8px;
}

.navbar__item {
  flex: 1 1 100%;
  text-align: center;
  color: white;
  padding: 0.2rem 0;
  text-decoration: none;
}

.navbar__item--active {
  border-radius: 5px;
  background-color: #A5A5A5;
  color: white;
}

.app-layout {
  display: grid;
  grid-template-rows: 1fr 3rem;
  height: 100dvh;
}

.app-page {
  padding: 0 1rem;
}
```

```tsx App.tsx solution
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AppLayout from "./layouts/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <div>Index page</div>,
      },
      {
        path: "/homepage",
        element: <div>Homepage</div>,
      },
      {
        path: "/articles",
        element: <div>Articles</div>,
      },
    ],
  },
]);

const App: FC<{}> = (props) => {
  return <RouterProvider router={router} />;
};

export default App;
```

```tsx layouts/AppLayout.tsx solution
import { FC } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout: FC<{}> = (props) => {
  return (
    <div className="app-layout">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default AppLayout;
```

```tsx components/Navbar.tsx solution
import { FC } from "react";
import { Outlet, NavLink } from "react-router-dom";

const Navbar: FC<{}> = (props) => {
  return (
    <nav className="navbar">
      <NavLink className={({ isActive }) => "navbar__item" + (isActive ? " navbar__item--active" : "")} to="/">
        Index
      </NavLink>
      <NavLink className={({ isActive }) => "navbar__item" + (isActive ? " navbar__item--active" : "")} to="/homepage">
        Homepage
      </NavLink>
      <NavLink className={({ isActive }) => "navbar__item" + (isActive ? " navbar__item--active" : "")} to="/articles">
        Articles
      </NavLink>
    </nav>
  );
};

export default Navbar;
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

.navbar {
  display: flex;
  align-items: center;
  background-color: gray;
  padding: 0 4px;
  gap: 8px;
}

.navbar__item {
  flex: 1 1 100%;
  text-align: center;
  color: white;
  padding: 0.2rem 0;
  text-decoration: none;
}

.navbar__item--active {
  border-radius: 5px;
  background-color: #A5A5A5;
  color: white;
}

.app-layout {
  display: grid;
  grid-template-rows: 1fr 3rem;
  height: 100dvh;
}

.app-page {
  padding: 0 1rem;
}
```
