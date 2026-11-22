---
title: "Devlog 01: Learning and Building Something in Go"
description: Trying to build something, only to end up learning a new language.
date: 2026-11-23
updated: 2026-11-23
---

So I've been trying to find something else to build that would actually feel like an actual project that I _could_ finish and learn a new thing or two along the way. Most would probably go and search for the 'Top 10 Projects To Build' kind of posts in those tech bro blogs but I feel like it's mostly the same thing recycled all over again. There's a to-do app, a note taking app, even a calculator for crying out loud. Some would even suggest the ["Build your own X"](https://github.com/codecrafters-io/build-your-own-x) repository where there's a number of tutorials out there. While I think I might build something from there, I think I want to build something that would solve something that's been a bit of a problem on my end.

Personally I do not find a reason to make or even use a to-do app because I'm so much of a mess that I can't even bother myself trying to organize things. The least I could do to organize is to actually set up a calendar of my college schedule and import the deadlines in so I can get reminded to do coursework, only for me to ignore much of it because procrastination is the law of this land which is my room. I wouldn't build a note taking app because my phone's stock note taker is good enough for me. The same thing can be said for the calculator.

So while doing my daily doombrowsing over the Web, I noticed something. I have 10 Gelbooru tabs open. I often share art a lot in my friend circle's server over on Discord. Because I suck at organizing, I tend to build up a backlog of tabs that would eventually fill up much of my tabs and make it impossible to even scroll around. So I had this great idea of making a booru browser of sorts.

I once saw this program called [ikachan](https://chino-chan.gitlab.io/programs.html#s1) which is a booru browser and it's a program that's exactly what I was looking for. It supports:
- gelbooru
- danbooru
- safebooru
- sankaku complex
- yande.re
- konachan
- tbib
- e621
- and custom boorus!

The problem is that it has no search suggestions and no tabs. I can save queries yes, but I do want to have some tabs for organizing. I'm basically trying to offload my tab load to another program. So much for trying to organize, haha!

So I decided to build something on my own. The question now becomes: what should be my tech stack? Well, the tech stack basically comes down to choosing which language should I use and whether I should use native or go cross-platform. 

I don't know anything about native coding, not to mention the pains of trying to make it cross-platform. I'm pretty much forced to use either C or C++ for this, which I really don't have the time. Checking out the repos of ikachan's author on GitLab, the program is highly likely to be a C program. Sure I can use Qt for the interface and then just vibe-code C++ but I feel like I won't learn anything from that at all. I might talk about how vibe coding sapped out my energy in a future post. Also, I don't like C++'s complex syntax and it actually makes my head spin trying to comprehend it.

## The crossplatform path (no Electron)

So this leaves me with going cross-platform. The problem is that it's often ending up making an [Electron](https://www.electronjs.org/) application. The problem with Electron is the Chromium bundle included in the program, which makes it too heavy to begin with. While the program that I want to build is somewhat simple, I'd like to at least be able to still multitask in this old ass laptop. Electron is simply not for this kind of usecase. I think there should be an alternative to Electron but I haven't seen it. I might have to research a bit more, but I'm pretty much set on rejecting Electron.

So that leaves me with another option: [Tauri](https://tauri.app/). There's also a library for connecting to imageboards too called [booru-rs](https://github.com/ajiiisai/booru-rs) by ajiiisai. The problem is that it's in Rust. I also feel like Rust is too complicated for me but I think it would be more tolerable to use it than C++. I might build something in Rust in the future but not for the project.

So I began to search for alternatives for the two. If there are no usable alternatives then I might have to force myself to learn Rust just for this little project. Google pretty much threw me what is possibly the closest thing I could get for an alternative to both Electron and Tauri: [Wails](https://wails.io/).

Wails does the same thing as Tauri but in the [Go](https://go.dev/) programming language. Go looked like an interesting language for me. It's a systems language, not necessarily low-level like C/C++ or Rust, not as high as something like Java or TypeScript. It's not object-oriented, which is an entirely new for me but I'm willing to expand beyond object-oriented languages.

The syntax seems to look rather reasonable. Variables are `var x int = 0`{ .inline-code } which is similar to that of TypeScript's `let x: int = 0`{ .inline-code }. There's also type inference so I could just do `x := 0`{ .inline-code } which cleans up the code even more though I might just keep on adding types for readability. There's also structs which are kind of objects but not necessarily something similar to that of an object-oriented language's implementation of an object. Dynamic arrays are weird because they are called slices so they won't get confused by arrays, which are static. Packaging is weird for some reason with every folder being its own package, but I might be just too used to the awfully long but somewhat structured way Java handles packaging.

Overall, the syntax is sane enough and also simple enough for me to actually try and learn it. I also heard that it has excellent concurrency features with goroutines and channels which acts like a pipeline for data. The net/http package seems to be very performant for network jobs too. Since I do plan on adding a download feature, these two things are going to be an important part for this project. Go pretty much won me over so I would be using it for this project.

## First step: library { .post-h2 }

Since I forgo using Rust and therefore the booru-rs library, this pretty much means that I have to write my own library. I tried to search for them but they seem to be dated, plus I feel like to get into the language properly then I should at least try and make a module that I can use for the program that I want to build. Sure I could've just coded it inside the Wails program but I think a library should be a good starting point for this project.

In somewhat of a funny twist, I had to learn a little bit of Rust to understand how booru-rs is written. I mostly looked at how things are structured. I think it's always good to read code when trying to learn how to build something or even trying to learn a new language. Seeing that codebase made me think that perhaps learning Rust might not be that bad after all, but I don't feel like doing a 180 turn and do this project in Rust. I have decided to write it in Go and it shall be written in Go.

## Building it small, for now

I built the library in the smallest way possible. There's only three features: search, autocomplete, and download. Search is what it says on the tin. Since Gelbooru has no tag limits, a string of tags can be used. There's also ways to limit the amount of items too. There's still no pagination yet but I will have to implement to allow for infinite scrolling in the application. Autocomplete is there so that we can get an array of tags to complete a search query. Download is just a rather a hacky solution to downloading a collection of posts and using goroutines and channels to create a concurrent workload across 5 workers. It essentially uses a worker pool and the channel pushes array contents into those workers.

It does work, but I do need to do some polishing, especially in trying to code this by following some programming standards for the language, and getting out of the object-oriented gutter as much as possible so reducing builder patterns, aside from search which is arguably more useful because you're building a search query to begin with. Downloads do need more work to make it as stable as possible, implement some dupe checking, checksum checking, and many more. I could make some of those features optional too since it's a libary and I really shouldn't force developers to do one thing only for something as configurable as the downloader.

## Finishing it off

Overall, I think this project might actually revive my interest in programming in general. Making webslop is draining my desire to code and I think this one should at least heal it. Yeah the frontend is still using web technologies but I think the important part of this is how I'm trying to build out an interesting backend for this application. Maybe I'll ditch [React](https://react.dev/) for the frontend and use something simple, perhaps [Svelte](https://svelte.dev/). I have yet to make the frontend since I want the library to at least be functional and properly structured first before trying to work on the frontend. But I'm positive that I could probably release a preview version by next month, if not next year on January.

There's so much things to do, and so long as you're learning something then it is worth the struggle!