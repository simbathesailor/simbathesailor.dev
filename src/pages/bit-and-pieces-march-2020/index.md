---

title: Bits and Pieces March 2020

date: 2020-03-23T09:38:25.728Z

tags: yarn, component library, tsdx, npm, styled-components, npm-scripts

published: "true"

description: My learnings over last two to three weeks.
---![](https://images.unsplash.com/photo-1460380410874-537ecece3984?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80)<figcaption>Photo by <a  href="https://unsplash.com/@heftiba?utm_source=medium&amp;utm_medium=referral">Toa Heftiba</a> on <a  href="https://unsplash.com?utm_source=medium&amp;utm_medium=referral">Unsplash</a></figcaption>

The last two months have been really uncertain for the whole world.

World is hit by COVID-19, which make coming times more difficult for everyone. At the same time everyone around the world has shown a lot of courage and fight against this situation. I believe , we together can overcome this pandemic. Always value your relations including your family and friends. One should not take them for granted.

The learning has been slow for last two months, but I think that is ok.

> Our health and family is the most important thing in these unprecedented times.

Although I managed to learn few new things that i will be sharing here for my own learning and for others.

## Bit and Pieces

I learn a lot of things on a daily basis and forgot to document it for my own reference later. Some time I put in github gist , but not every time. Blog seems more natural to me at times. From now on, I will be writing occasional 1 or 2 articles on random stuff that I learned over few weeks with Bits and Pieces category articles . Let's see what bit's and pieces I have from last couple of weeks

I have been working mainly on setting up a component, utilities and hooks library at my organization. It is yet not released and right now exist in private . I will surely write a detailed article once released it public on our organization blog.

## Created a design system

The idea is almost same as other design systems , but this projects also keeps react hooks and utilities. Also we did not have private npm repos(for now). so consuming it was a challenge. We made use of following tools to set it up:

1.  **[Lerna](<[https://github.com/lerna/lerna](https://github.com/lerna/lerna)>)**: For creating or project mono-repo and fine linking of packages.

2.  **[tsdx](<[https://github.com/jaredpalmer/tsdx](https://github.com/jaredpalmer/tsdx)>)** : Thanks to [Jared Palmer](<[https://twitter.com/jaredpalmer](https://twitter.com/jaredpalmer)>) and the team for wonderful package which eases the library development with react and typescript.

3.  **[styled components](<[https://styled-components.com/](https://styled-components.com/)>)**. made use of easy deterministic styles and dumb components out of the box.

4.  **[styled-system](<[https://styled-system.com/](https://styled-system.com/)>)**. Used for constraint based component development . This was very much needed for enforcing design systems for every one.

5.  **[storybook](<[https://storybook.js.org/](https://storybook.js.org/)>)**: For writing stories for out components, hooks and libraries.

Let's see some bits and pieces while doing all that above:

1. Lerna is a great tool. It provides you various commands to execute and run command in all the packages in parallel manner. Once the npm client is yarn and you are using workspaces also, linking is all taken care by yarn. As we have a private repo now, we have not seen full potential of lerna yet.

2)  **yarn** does not allow installing a package and not adding package in package.json. This is ok in most of the cases, but I reached a situation where i needed it badly.

```

yarn add package --no-save . // ❌ not available

```

3.  **npm-scripts** limitation: I wanted to install a private repository from github in postinstall script. But if I am done with install , postinstall will be called again. How can i stop this loop ➰? I looked for it but no luck there

4.  How would you pass command line param to a npm-scripts like postinstall. I needed that, but no solution. I had to go for manual steps.

```

node ./somescript.js --option hello

```

5.  **npm install process** : It was a game changer for me. Read it here [https://docs.npmjs.com/cli/install#algorithm](https://docs.npmjs.com/cli/install#algorithm)

After I read this, I was able to figure out of lots of solutions to my private repo install process.

6. You can do git clone for commit ids and for tags also. Like this:

```

// commitish way

git clone -b master git@github.com:yourproject.git {commitID} --depth 1



//Tag way

git clone -b ${tag} git@github.com:yourproject.git --depth 1

```

7.  **chokidar** is a great package to watch for file.

[https://www.npmjs.com/package/chokidar](https://www.npmjs.com/package/chokidar)

8.  **execa** gives you great promise based way of executing nodejs commands .

[https://www.npmjs.com/package/execa](https://www.npmjs.com/package/execa)

9. you can run following command at any place in your terminal and you will get the node module resolution path and folders:

```

> node

> module.paths



```

10. Once you understand the node module resolution and npm install algorithm which i have linked above, it becomes way easy to reason about packages and dependencies

11) Got to know something called figcaption html element [https://www.w3schools.com/tags/tag_figcaption.asp](https://www.w3schools.com/tags/tag_figcaption.asp)

12. [Tailwind.css](https://tailwindcss.com/) is great. But I use grid a lot for responsiveness. grid support is not that great there. I can think of reasons. But again becomes a road blocker sometimes and have to fallback to native react css.

13) styled-system is great. But still I don't get a better way of writing styled-components and styled-system together. It becomes very verbose at times.

14. Nodejs is very important for a frontend developer when you need to mix and match various packages, tools e.t.c. Without the understanding of it, great packages become blackboxes. Sometimes it is ok. But down the lane, you need that understanding.

15. You can add custom attributes in package.json, which can be read in scripts. Btw it is just object. For me we need to maintain the version of component library somewhere. I chose to put version in package.json and use it my scripts to install specific version. e.g


    ```
     yourlibrary: {
        version: "v1.4"
     }
    ```

16. Did playaround with nodejs child processs while writing build scripts. Very good to have child processes in single threaded world.

17. FileReader is someething which can be used to read the blobs easily.

18. There cannot be multiple instances of styled components on the same page. Keep in mind library authors. [Link](https://styled-components.com/docs/faqs#why-am-i-getting-a-warning-about-several-instances-of-module-on-the-page)

19. Understood, how styled-components and styled-system work together. [https://rangle.io/blog/styled-components-styled-systems-and-how-they-work/](https://rangle.io/blog/styled-components-styled-systems-and-how-they-work/)

Let's not finish with odd number 😁. Here is the last one.

20. Wrote a docker config and read more about the various command. I am sure, i will forget it. But that is ok, atleast I just understand it at higlevel and can write it again.

Thank you. That's the wrap for now. Stay safe and live in the moment 😄. Hit me up on twitter.

https://twitter.com/simbatheesailor
