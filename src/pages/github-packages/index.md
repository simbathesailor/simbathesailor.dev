---
title: Github private packages and docker 🚧
date: 2020-11-18T16:27:25.728Z
tags: library, reactjs, github packages
published: "true"
description: Github packages provide a good alternative for private / public packages . We will see how we can create a library and publish it to github packages and how to consume it. We will see how we can modify our docker files to allow private github packages installation.
---
![Photo by https://unsplash.com/@element5digital](https://images.unsplash.com/photo-1511895307821-692dc4ad27c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80)

Photo from https://unsplash.com/@element5digital 


Github packages have been around for a while now. As a developer we spend so much time on github either for our office work or for opensource projects.


Couple of months back , our team rolled out a design system, which have a library component also. These library have to be hosted somewhere so that , we can consume it wherever we want. 

The installation should be very similar to how we do it today mostly with frontend projects using `npm install / yarn` 

We were already having teams licence for organization. we were having  all our codebases available on github already. 

So we chose to give github packages a try for our design system's  packages. We call it `Eureka`.


---

Now let's see  how we can get it done. 

## PACKAGE CREATION

**Note: If you have packages ready , Please  dive directly into next section:**

You can create packages in javascript ecosystem using **webpack, rollup or grunt/gulp** e.t.c .

I used  [TSDX](https://github.com/formium/tsdx) which is an excellent library creation helper. I also used lerna [Lerna](https://github.com/lerna/lerna) for versioining of packages.

Let's create a simple packages which just give me random numbers between any two numbers. The example is kept trivial to keep the attention into the most important aspect of this article which are *Github Packages*

Run 

```sh
npx tsdx create randomnumberlib
```
Pick name of your choice for this lib, i have kept is *randomnumberlib*. Make sure the package name is available on the **npm** . We are using npm as the registry for this package. Other languages have their own registeries. Read more here : [Github Packages with npm](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)
