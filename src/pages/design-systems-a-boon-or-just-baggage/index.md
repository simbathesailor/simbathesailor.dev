---
title: Design Systems a boon or a heavy baggage
date: 2021-07-09T16:38:25.728Z
tags: design systems, frontend
published: "true"
description: Are the design systems boon or a heavy baggage ?
---

![](https://images.unsplash.com/photo-1558655146-d09347e92766?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)

Photo by <a href="https://unsplash.com/@balazsketyi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Balázs Kétyi</a> on <a href="https://unsplash.com/s/photos/design?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

I like Design Systems. The idea itself is so great to think about. Once your design system is ready, your whole organization starts delivering
consistent UI interfaces . Less bugs and less efforts.

> But I wanted to ask, Is it always the case ?

### Startups can't afford it

Creating and Maintaining Design Systems is a full-time job.

It is definitely not for startup. They generally don't have the resources and bandwidth to work on a design system.

Most of the time, the benefits of design systems look far-fetched, mostly not align with any startup's immediate goals. This is big.

### Tooling Around Design Systems

The tooling around design systems is broken.

There are so many ways you can create your design systems
based on CSS variables, javascript objects e.t.c You can do it by a CSS-in-js solution, tailwind approach, or by just simple CSS variables.

Editors have integration with a few of them , so that they can suggest you the
tokens. But then that is not at all helpful for someone who has a different flow of working

**e.g** I copy the CSS from Figma and then paste into the browser devtool. Try everything in the devtool. Once I am satisfied, I copy-paste it into my code. This feels natural to me.

Some people just type out the CSS in code and just see the visual on a separate screen. This approach sometimes feels like a lot of work when you are having only one screen

### Just Remember a lot

Design tokens are just another thing to remember. People might say, why do you have to remember when it is suggested by the editor. Again don't tell me that also doesn't require some remember when choosing from options

Those extra design tokens that you have to remember don't translate well
when you shift to some other design system or to a system having no system at all. I fear someday people will ask tailwind class names in the interview.

We all know plain CSS which can work across frameworks because the browser is constant.

A shout out to _**styled-components**_ here. The creators of it have just done a
perfect job of making sure that you just copy and paste basic CSS and it just works. That's such a small thing, but very impactful.
You know CSS, you know _**styled-components**_.

Even when you are looking at the elements tabs when working with styled components. You get clear information of what an HTML element is referring to. Thanks to _**styled-components**_ babel plugin.

I drifted a little towards _**styled-components**_,but it are just perfect for most of the cases. Obviously, _**styled-components**_ has other benefits which are pretty common. But let's not drift away further. Let's go back to design systems.

Today just writing a valid CSS in the browser is not the end of the job. You added new styles in devtool.Now you have to write the corresponding design system code in the editor, which will look entirely different.

You see, such a waste of CSS skills that actually could have been transferable.

### Long discussions pulling out every ounce of energy

The unnecessary long discussions that happen for design token naming. Oh my god. That can take an eternity to end. You see here why startups cannot afford to have their own design system.

These discussion leave a bad taste for one or another most of the time.

### UX and UI Bridge

Now, let's talk about UX and UI bridge. How many companies do you really think to have a team where UX and UI teams have agreed on common conventions.
If you are lucky in terms of team, understanding, plus you have lots of time to make everyone happy, then that can be done. Again you see why startups cannot afford to have their own design system.

Dark and Light mode options are such a necessity for their obvious benefits(https://web.dev/prefers-color-scheme/). Now working from home during this pandemic, we sometime work in the late evenings.
How about watching a white screen at night ? Does it please your eyes?
Of course not.

If creating a design system would have been an easy thing. We would have seen a lot more websites having both modes.
Some people might say, you don't require a design system for having dark mode and light mode. Yes, you dont need it at times. But if in a bigger app, the styles are controlled by the design system. It becomes very easy for you to roll out any mode.

I wish we could have great tooling and ecosystem around this design system.

---

> > **That's all the major items, which I feel are broken in and around design systems.**

### What do I expect from a design system?

1. Quick to roll out with standard naming conventions. Should be available to
   every company irrespective of their size.

2. Ways to extend it if needed

3. Tools to work both ways, either the code first or browser devtool first. You should be able to copy something and paste it directly into your code. That way there is no extra repetitive thinking required.

4. Should not be very tightly coupled with UX work. They should be able to roll out designs and once you find certain inconsistencies e.g fontsize is 15px instead of multiple of 2. You can very well make it 16px or 14px.
   If there any common components which designer might have introduced new behavior or dimensions. Most of the time design team is ok when you tell them we have this component already and this is the design that is slightly different than what you have provided.

5. No long discussions. UX and UI Teams should be able to move independently.

In the conclusion, I would say we have come a long way with the design systems, but lots of major problems are still unsolved.

## Is it a boon or a baggage?

I would say for most it's baggage.

They can just use one open-source framework. This all doesnot help with all the problems e.g like dev experience still pretty bad.

**I wish the design systems could be a small investment and a good gains stuff.**

But boy not now. I can see lots of ongoing development happening around these problems in the community. The frontend community keeps on tackling bigger and difficult problems. I hope that it will be solved soon.
