---
title: Building This Blog
author: Sean McLeaish
description: "Building this page using Astro, Tailwind, and DaisyUI"
image:
  url: "../assets/astro-page.png"
  alt: "The Astro, Tailwind, and DaisyUI logos on a dark background with a purple gradient arc."
pubDate: 2025-08-17
tags: ["astro", "tailwindcss", "daisyui"]
---

<br/>

### Background - Why Astro?
I've used and enjoyed [Astro](https://astro.build) for a few projects, for a number of reasons:
* [Islands](https://docs.astro.build/en/concepts/islands/) let you use components from different frameworks and decide if and when
they're loaded. It offers performance increases, but it also gives you a lot of options for experimentation.
* On the projects where I've used Astro in the past I've tried to use frameworks sparingly and lean into html/css or vanilla JS. I'm used to
[React](https://react.dev) and had been drawn to Astro to reconnect to the basics.
* [Astro](https://astro.build) uses file based routing. This is supposedly better for SEO, but I just like it better than jacking with React
Router.
* [Astro](https://astro.build) encourages using [Nano Stores](https://docs.astro.build/en/recipes/sharing-state-islands/) for state, which are
framework-agnostic.


### Tailwind and Daisy
I've gotten used to reaching for [Shadcn](https://ui.shadcn.com) once again locking me into [React](https://react.dev/). Sticking with the concept of
framework agnosticism I'm using [Tailwind](http://tailwindcss.com/) for coherent styling and the DAISY component library.

### The Blog
[Astro](https://astro.build) comes with a [content collections](https://docs.astro.build/en/guides/content-collections/) API that essentially
gives it a built-in headless CMS. It supports writing posts in Markdown or MDX. I've wired it up with a GitHub action so it gets published
whenever I push the repository, making it really easy to update. Source for this site, including the GitHub workflow can be found
[here](https://github.com/SMcLeaish/astro-blog).

[Tailwind](http://tailwindcss.com/) has a nice plugin for styling text called [typography](https://v1.tailwindcss.com/docs/typography-plugin) that works great with
Markdown. It really simplifies styling free-text.

I've been using [Helix](http://helix-editor.com/) as my text editor for the last couple of months, and I'll probably do a post on it in the future, because it rocks.
While not limited to [Helix](http://helix-editor.com/), while building this site I found [ltex-ls-plus](https://github.com/ltex-plus/ltex-ls-plus), a language server that
adds grammar and spell-checking to your Markdown editor. Integrating it into [Helix](http://helix-editor.com/) was very easy using the reference [Helix](http://helix-editor.com/) maintains on their
[Language Server Configurations](https://github.com/helix-editor/helix/wiki/Language-Server-Configurations) page.

### Why Blogging?
It feels weird blogging in 2025. I'm not great about taking notes, and I have a bad tendency to jump between projects.
I'm hoping that trying to publish something occasionally as I'm going along will help with both of those problems. If anyone happens along
and is working on the same things as me all the better.

### What I'd still like to get working
* One gripe about the [Astro](https://astro.build) [content collections](https://docs.astro.build/en/guides/content-collections/)
is it doesn't have a built-in way to do post excerpts, so right now my main page displays the description from the front matter. I've seen
some ways to work around this, but I'm going to get to that later.

* I'd like to have a table of contents for my posts. I wanted to get this site up and running, perfect is the enemy of good, so I'll get to
that later as well.

* A search bar is definitely something that I'll want to implement at some point.

* Pagination. Similar to the search bar, it'll make sense when I've got more posts.

So, on the to-do list:

- [ ] Excerpts
- [x] Table of Contents 🎉
- [ ] Searching
- [ ] Pagination

I'll update this page as I get them working. 


