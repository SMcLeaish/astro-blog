---
title: "Rust OS - Week 1"
pubDate: 2025-08-17
description: "I'm working on embedded Rust this week. Here's a bit of what I've gotten working so far, up through implementing the println! macro in an unsafe environment."
author: "SMC"
image:
  url: ../assets/2025-08-02-qemu_running.png
  alt: "Screenshot of a qemu terminal with Hello World printed on it"
tags: ["rust", "embedded", "learning in public"]
---
I've been making my way through [Writing an OS in Rust](https://os.phil-opp.com) by Phil Opperman.   
<br/>
This has been slow going as I tend to jump around projects quite a bit. I've also been working my way through
<a href="https://www.oreilly.com/library/view/command-line-rust/9781098109424/" class="text-secondary">Command Line Rust</a>
by Ken Youens-Clark, as well as playing around with <a href="https://book.leptos.dev/" class="text-secondary">Leptos</a>,
reviving this  <a href="https://astro.build/" class="text-secondary">Astro</a> blog, some python projects, and trying to keep up with life and work as well. 
<br/>
<br/>
I've been interested in Rust since last year. I don't have a lot of experience with systems programming, my only work experience is with interpreted languages and a small amount of Go.
I decided to stick with Rust after the <a href="https://arstechnica.com/gadgets/2025/02/linux-leaders-pave-a-path-for-rust-in-kernel-while-supporting-c-veterans/" class="text-secondary">conflicts about Rust in the Linux kernel </a>
seemed to be shaking out as well as the <a href="https://www.cisa.gov/news-events/news/urgent-need-memory-safety-software-products" class="text-secondary">statements by CISA on memory safety</a>.




