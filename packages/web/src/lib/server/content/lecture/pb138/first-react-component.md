---
type: code
title: Implementování první komponenty
description: Co to je komponenta v Reactu, jak ji napsat a jak skládat komponenty dohromady
cover: "/assets/course/pv281/course-cover.webp"
badges:
  - 10 min
  - Beginner
---

V předchozích lekcích, jsme si probrali co to je komponenta. Zkus si teď představit, že máš za úkol
udělat výpist položek v košíku. Zkus si správně rozdělit komponty v Reactu tak, abys udělal náhled
košíku s jednotlivými položkami a na konci s souhrnem a tlačítkem pro pokračování.

```ts App.tsx assignment
import { FC } from "react";
import "./styles.css";

const App: FC<{}> = (props) => {
  return (
    <div>
      <h1>Hello from content file</h1>
    </div>
  );
};

export default App;
```

```css styles.css assignment
h1 {
  color: blue;
}
```

```ts App.tsx solution
import { FC } from "react";
import "./styles.css";

const App: FC<{}> = (props) => {
  return (
    <div>
      <h1>Hello from content file</h1>
      <button> Click here </button>
    </div>
  );
};

export default App;
```

```css styles.css solution
h1 {
  color: blue;
}
```
