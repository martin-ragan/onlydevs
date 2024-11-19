---
type: text
title: Jednoduchý program v Rustu
cover: "/assets/course/pb138/course-cover.webp"
description: V této lekci se naučíte jak napsat jednoduchý program v rustu a seznámíte se s základní syntaxí. Ukážeme di deklaraci proměnných, funkce a jak spustit Váš první kus kódu.
badges:
  - 5 min
  - Začátečník
---

## V jakém souboru vůbec začít

Z minulých lekcí víme, že se nám po spuštění `cargo init` případně `cargo new` vytvoří základní projekt v Rustu. Tedy pro připomenutí struktura projektu vypadá asi takto:

```
.
├── .git/
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs
```

Asi nikoho moc nepřekvapí, že začneme v souboru `main.rs`. Právě v tomto souboru náš překladač počítá s tím, že mu vytvoříme funci `main`, kterou po spuštění programu provolá. Kdybyste ovšem na toto zapomněli, vše je v pořádku, protože cargo nám při inicializaci dokonce tento základ předpíše, takže se stačí jen podívat do souboru `main.rs`.

```rust
fn main() {
    println!("Hello, world!");
}
```

## Pojďme tedy spustit náš první program

Skvělé. V našem projektu tedy stačí v terminálu zavolat:

```sh
cargo run
```

a měli bychom vidět výstup:

```
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/hello_cargo`
Hello, world!
```

Nic težkého, že? Pokračujeme tedy k základní syntaxi Rustu.

## Základní syntax programu

Funkci `main` už známe a vidíme na ní, že každá funkce používá k zápisu klíčové slovo `fn`, parametry píšeme do jednoduchých závorek a scope funkce píšeme do šložených závorek.

Když si budeme chtít deklarovat nějakou základní proměnnou, jednoduše použijeme klíčové slovo `let`, případně `let mut` pokud má být proměnná měnitelná, tedy mutabilní. Zápis typu je podobný jako například v Typescriptu, tedy píšeme za dvojtečku po názvu proměnné.

```rust
fn main() {
    let a: u32 = 25;
    let mut b: f64 = 20.3;
}
```

Na konci řádku středník. Tedy... tady je to trochu zajímavější:

```rust
fn foo(a: i32, b: i32) -> i32 {
    return a + b;
}

fn foo(a: i32, b: i32) -> i32 {
    a + b
}
```

Tyto dvě funkce jsou totožné. Vrátit hodnotu můžeme buď přes klíčové slovo `return` a poté píšeme na konci řádku středník, případně bez return jen jako výraz a poté nepíšeme na konci středník.

Také si můžeme všimnou definování návratové hodnoty funkce přes `->`.
