---
type: text
title: Datové typy
cover: "@/assets/course/pb138/course-cover.webp"
description: V této kapitole se naučíte o základních datových typech v Rustu a jejich použití. Budeme se věnovat číslům, řetězcům a dalším důležitým datovým typům.
badges:
  - 10 min
  - Beginner
---

Rust, jako staticky typovaný jazyk, vyžaduje, abychom při deklaraci proměnných specifikovali jejich datový typ. Zde jsou některé základní datové typy v Rustu:

## Celá čísla (Integer Types)

V Rustu máme několik různých typů celých čísel, které se liší svou velikostí a znaménkem:

| Velikost         | Znaménkový | Neznaménkový |
| ---------------- | ---------- | ------------ |
| 8 bitů           | i8         | u8           |
| 16 bitů          | i16        | u16          |
| 32 bitů          | i32        | u32          |
| 64 bitů          | i64        | u64          |
| 128 bitů         | i128       | u128         |
| dle architektury | isize      | usize        |

```rust
let age: u32 = 30;
let temperature: i16 = -10;
```

Pokud potřebujete zapisovat hodnoty v jiném formátu

| Velikost     | Příklad     |
| ------------ | ----------- |
| desítkové    | 98_222      |
| šestnáctkové | 0xff        |
| osmičkové    | 0o77        |
| binární      | 0b1111_0000 |
| bajtové      | b'A'        |

## Desetinná čísla (Floating-Point Types)

Pro reprezentaci desetinných čísel používáme typy `f32` a `f64`, kde `f32` má menší přesnost než `f64`.

```rust
let pi: f64 = 3.14159265359;
let gravity: f32 = 9.81;
```

## Řetězce (Strings)

Textové řetězce v Rustu jsou reprezentovány typem String. Rust také podporuje řetězce označené jednoduchými úvozovkami (str).

```rust
let name: String = String::from("John");
let greeting: &str = "Hello, World!";
```

## Logické hodnoty (Boolean)

Logické hodnoty jsou reprezentovány typem bool a mohou být true nebo false.

```rust
let is_raining: bool = false;
let has_coffee: bool = true;
```

## Znaky (Characters)

Znakový typ char reprezentuje jediný znak Unicode.

```rust
let heart_emoji: char = '❤';
```

## Automatická inference datových typů

Rust dokáže automaticky inferovat datové typy na základě hodnoty, kterou přiřadíte proměnné. To znamená, že nemusíte vždy specifikovat datový typ explicitně:

```rust
Copy code
let x = 42; // Rust automaticky určí, že x je i32
let name = "Alice"; // Rust automaticky určí, že name je &str
```
