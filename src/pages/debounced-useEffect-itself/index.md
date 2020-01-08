---
title: Write a debounced useEffect itself !!
date: 2020-01-07T16:38:25.728Z
tags: patterns,react-hook,usecallback,useref
published: "true"
---

![Photo by Mark Rabe on Unsplash](https://images.unsplash.com/photo-1502780809386-f4ed7a4a4c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)

So, the other day I was working on a controlled component and I want to debounce certain actions and not debounce certain actions at the same time in useEffect. I start wondering , Can we make a debounced effect ?
While answering this question in my mind, I went through few ideas which are good in their respective scenarios. Now I think it is worth sharing all those ideas and a debounced effect itself that I was able to write finally.

Let's see the problem at hand and then we will see various approaches to solve it.

`gist:simbathesailor/709974316e8268b195fece9bc95a561c`

Notice above **App** is a parent component and then **ChildComponent** as the name specifies is a child component. The input in child is dependent on the parent component for it's value. We call then controlled component. Some people must be thinking why I have to keep the value in parent component? Why I can't keep it in Child Component. The answer is , these scenarios are pretty common in all real world applications. For example, I had the following case:

input value was kept in Redux store, because that input value is used at other locations in app to determine certain behaviour. That's where I got stuck with the question mentioned in the start of the article.

Hence an example based on controlled components.

Notice few things above.

1. OnChange function need to do two things.

2. A non debounced change which changes the value. It can't be debounced. Making it debounced will stop the values to reflect in the input as it is a controlled component.

3. A debounced change. In the above example we are just logging something but in real application it can be anything e.g making api call, updating filter e.t.c. That has to be debounced for the performance sake.

Here is an image showing the visual representation of what's going on here. Made with [excalidraw](https://www.excalidraw.com). Quite smiple and amazing to use.

![Problem Visual Image](./debouncedeffectdraw1.png)

### First Try :

`gist:simbathesailor/fe73dc6cefd6f59d50730bd65e9bacfa`

Notice above our **makeApiCallRaw** is not dependent on any thing in the component and its all good to move the pull the functiin outside of the component. In this case the makeApiCallRow will be debounced.

But as you must be thinking this is not always possible to do. And you are right.

So let's try 2nd approach.

### Second Try
