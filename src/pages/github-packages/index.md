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


---

Now let's see  how we can get it done. 

### PACKAGE CREATION

**Note: If you have packages ready , Please  dive directly into next section:**

You can create packages in javascript ecosystem using **webpack, rollup or grunt/gulp** e.t.c .

I used  [TSDX](https://github.com/formium/tsdx) which is an excellent library creation helper. I also used lerna [Lerna](https://github.com/lerna/lerna) for versioining of packages.

Let's create a simple packages which just give me random numbers between any two numbers. The example is kept trivial to keep the attention into the most important aspect of this article which are *Github Packages*

Run 

```sh

npx tsdx create randomnumberlib

```


Pick name of your choice for this lib, I have kept is *randomnumberlib*. We are going to use `https:npm.pkg.github.com`(This is packages namespace  for npm for github packages) as the registry for this package. Other languages have their own registeries. 

Read more here : [Github Packages with npm](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) & [Supported github packages client and namespaces](https://docs.github.com/en/free-pro-team@latest/packages/learn-github-packages/about-github-packages#supported-clients-and-formats)



The tsdx command will create a folder , just navigate to the folder in terminal and add your library code. I have added the following code in 

`src/index.ts`
```javascript
  let times = 0

  export const random = (min: number, max: number): number => {
    if ('development' === process.env.NODE_ENV) {
      console.log(`boop ${++times}`);
    }
    
    return Math.ceil(Math.random() * (max - min) + min)
  };

```

My function does nothing more than returning a random number between min and max.


### PUBLISH PACKAGE(PRIVATE)

If you have the package already or you have created a package using the steps in above section, let's dive into how to publish the package.


> As it is a private package make sure the package name is in this format `@[username]/[packagename]`. In my case it is `@simbathesailor/randomnumberlib`


The name attribute in the package.json can be changed to the required package name.

First step to generate a personal access token from https://github.com/settings/tokens.

1. Generate the one with read and write packages permission. Copy the token and keep it handy as it is going to be needed soon.

![Token Permission snaphsot](./token_permission.png)

2. Run the following command to login to registry.

```
 npm login  --registry=https://npm.pkg.github.com

```
It will prompt for username. Put you github username

Next, it will ask for password: Paste the toke generated in step 1.

Next , enter your email attached to the github account.

If every thing works, you should see the message stating that you have successfully logged in.

3. Next step : Just run publish command for you library. Run `npm publish`.

This `npm publish` will trigger a fresh build(due to prepare npm hook) and then will try to publish the package.

By now, you should see some thing matching to the snaphsot below on your github page.

![Github page with github package](./github_package_on_page.png)





[https://github.com/npm/cli/issues/2307](https://github.com/npm/cli/issues/2307)

