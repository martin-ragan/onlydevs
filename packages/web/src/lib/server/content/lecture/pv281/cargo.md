---
type: text
title: Cargo
cover: "/assets/course/pb138/course-cover.webp"
description: Cargo is the Rust package manager. Cargo downloads your Rust package’s dependencies, compiles your packages, makes distributable packages, and uploads them to crates.io, the Rust community’s package registry.
badges:
  - 27 min
  - Beginner
---

## Install Rust and Cargo

The easiest way to get Cargo is to install the current stable release of Rust by using rustup. Installing Rust using rustup will also install cargo.

On Linux and macOS systems, this is done as follows:

```sh
curl https://sh.rustup.rs -sSf | sh
```

It will download a script, and start the installation. If everything goes well, you’ll see this appear:

```
Rust is installed now. Great!
```

On Windows, download and run [rustup-init.exe](https://win.rustup.rs/). It will start the installation in a console and present the above message on success.

After this, you can use the rustup command to also install beta or nightly channels for Rust and Cargo.

![cargo](@/assets/course/pv281/cargo-registry.png)

## First Steps with Cargo

This section provides a quick sense for the `cargo` command line tool. We
demonstrate its ability to generate a new **_package_** for us,
its ability to compile the **_crate_** within the package, and
its ability to run the resulting program.

To start a new package with Cargo, use `cargo new`:

```console
$ cargo new hello_world
```

Cargo defaults to `--bin` to make a binary program. To make a library, we
would pass `--lib`, instead.

Let’s check out what Cargo has generated for us:

```console
$ cd hello_world
$ tree .
.
├── Cargo.toml
└── src
    └── main.rs

1 directory, 2 files
```

This is all we need to get started. First, let’s check out `Cargo.toml`:

```toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"

[dependencies]
```

This is called a **_manifest_**, and it contains all of the
metadata that Cargo needs to compile your package.

Here’s what’s in `src/main.rs`:

```rust
fn main() {
    println!("Hello, world!");
}
```

Cargo generated a “hello world” program for us, otherwise known as a
**_binary crate_**. Let’s compile it:

```console
$ cargo build
   Compiling hello_world v0.1.0 (file:///path/to/package/hello_world)
```

And then run it:

```console
$ ./target/debug/hello_world
Hello, world!
```

We can also use `cargo run` to compile and then run it, all in one step:

```console
$ cargo run
     Fresh hello_world v0.1.0 (file:///path/to/package/hello_world)
   Running `target/hello_world`
Hello, world!
```
