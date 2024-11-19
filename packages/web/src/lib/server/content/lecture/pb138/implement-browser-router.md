---
type: code
title: Implementace routingu
description: Už po předchozích lekcích byste měli mít trochu ponětí o tom co je to routing a jak
  ho v Reactu SPA řešit tak si pojďme naimplementovat router
cover: "/assets/images/react-routing.webp"
badges:
  - 10 min
  - coding
---

V tomto úkolu Vás bude zajímat jen to, co je v App.tsx, nikam jinam nemusíte zasahovat. Vaším úkolem je sestavit
router. Komponentu AppLayout použijte jako kořenový layout a přidejte mu potomky /homepage => Homepage a
/articles => Articles. Kromě toho vyřešte, aby vždy cesta / byla přesměrovaná na /homepage.

```tsx App.tsx assignment
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
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

const AppLayout: FC<{}> = (props) => {
  return (
    <div className="app-layout">
      <Outlet />
      <nav className="navbar">
        <Link className="navbar__item" to="/homepage">
          Homepage
        </Link>
        <Link className="navbar__item" to="/articles">
          Articles
        </Link>
      </nav>
    </div>
  );
};

export default AppLayout;
```

```tsx pages/Articles.tsx assignment
import { FC } from "react";

const Articles: FC<{}> = (props) => {
  return (
    <main className="app-page">
      <h1>Articles</h1>
      <ul>
        <li> Article 1 </li>
        <li> Article 2 </li>
        <li> Article 2 </li>
      </ul>
    </main>
  );
};

export default Articles;
```

```tsx pages/Homepage.tsx assignment
import { FC } from "react";

const Homepage: FC<{}> = (props) => {
  return (
    <main className="app-page">
      <h1>Homepage</h1>
      <p>Homepage content</p>
    </main>
  );
};

export default Homepage;
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
}

.navbar__item {
  flex: 1 1 100%;
  text-align: center;
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
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";

import AppLayout from "./layouts/AppLayout";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/homepage" />,
      },
      {
        path: "homepage",
        Component: Homepage,
      },
      {
        path: "articles",
        Component: Articles,
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

const AppLayout: FC<{}> = (props) => {
  return (
    <div className="app-layout">
      <Outlet />
      <nav className="navbar">
        <Link className="navbar__item" to="/homepage">
          Homepage
        </Link>
        <Link className="navbar__item" to="/articles">
          Articles
        </Link>
      </nav>
    </div>
  );
};

export default AppLayout;
```

```tsx pages/Articles.tsx solution
import { FC } from "react";

const Articles: FC<{}> = (props) => {
  return (
    <main className="app-page">
      <h1>Articles</h1>
      <ul>
        <li> Article 1 </li>
        <li> Article 2 </li>
        <li> Article 2 </li>
      </ul>
    </main>
  );
};

export default Articles;
```

```tsx pages/Homepage.tsx solution
import { FC } from "react";

const Homepage: FC<{}> = (props) => {
  return (
    <main className="app-page">
      <h1>Homepage</h1>
      <p>Homepage content</p>
    </main>
  );
};

export default Homepage;
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
}

.navbar__item {
  flex: 1 1 100%;
  text-align: center;
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
