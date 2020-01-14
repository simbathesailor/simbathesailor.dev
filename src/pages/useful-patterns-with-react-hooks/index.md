---
title: Useful Patterns with React hooks
date: 2020-01-04T16:38:25.728Z
tags: patterns,react-hook,usecallback,useref
published: "true"
description: Some useful patterns that worked for me using hooks for 1 year.
---

![](https://cdn-images-1.medium.com/max/1024/0*nJLkAHTH68MGsDbi)<figcaption>Photo by <a href="https://unsplash.com/@abeso?utm_source=medium&amp;utm_medium=referral">Sebastian Bednarek</a> on <a href="https://unsplash.com?utm_source=medium&amp;utm_medium=referral">Unsplash</a></figcaption>

Well, here I am explaining the pattern in React hooks. Who am I ? No body !! Don’t be mad because this is opinionated. Things which worked for me and the people around me.  
That’s it.

First let’s take a step back, and understand what changed with react hooks. Well, A lot has changed but we will talk about those things which are going to be relevant for the the discussion ahead.

From now on I will be calling React hooks as just hooks. I am tired of adding React in front of every hook word :).

So the hooks come with a beautiful way of sharing stateful logic between components and also make the reusability of logic much easier. The hooks allows to segregate the logical concerns properly. Remember how we were adding a functionality spread across various lifecycle methods with classes approach.

`gist:simbathesailor/26e6ca02db451604e8cee2d3e219a5d5`

It is all good, but problem starts when we think how do we share the logic to other components. we then use to take on HOC patterns and render props pattern, which are very good patterns for sharing the logic. But with all goodness, they also bring lot more not needed verbosity and false hierarchy of our components. It also bring in friction to extract reusable logics.

We will not discuss more on class based components. Because I think you are here to see the patterns with hooks and some food for thought.

Hooks are very good, but there are certain thing which can make situations difficult for even a seasoned developer. One of the problem which I used to encounter is with the custom hooks. A simple custom hooks is quite straight forward to work on. But its start’s getting confusing when it takes multiple arguments.

Even multiple arguments are good, but when the argument are objects, array or functions , It becomes very difficult to wrap your head around the hook.  
Yes, React has provided certain hooks which allows me to mix and match them and solve the issue. I felt myself putting in a lot of focus and head while writing a custom hook which now has started accepting functions. Damn why I have to be so cautious. Why I can’t just pass functions as make it work. Why the infinite loops are getting triggered, why I have to every time think , Should I use useRef or useCallback ? At the time , I would be like

![Image from giphy](https://media.giphy.com/media/UQOjUuqeyIjAzJJ169/source.gif)

Yes, but some would say ohh, so you are experienced and you are not able to figure out closures and references. Oh yes my friends, I find myself good with those concepts , but does not like the fact of thinking it every time ,when i am passing references to the hooks. For me custom hooks are just a utility that does processing and return back something which I use in my visual components.

So some might say, I have not felt that way. I am totally ok with how to write hooks. I would say cool, you have got it. May god teach all of us that finesse.

But before we see some code, let’s understand why objects, arrays and especially objects are little complicated with hooks.

My opinion is different for (object, arrays) and different for functions. I would say nothing has changed for objects and arrays as such. If we pass a new reference of arrays or object in class based component, the componentDidUpdate will get triggered. With hooks similarly, a hook with dependencies as arrays or object will rerun and do it’s thing.

But when it comes to functions we are so used to write them as component instance, that function does not change very often with class based component

`gist:simbathesailor/c105910fff564b1238634da5e2e6ebd8`

Notice above how the Child component (SomeChildComponent) is taking two props:

```
callback : available on instance, does not change on re-render
callback2: same as above
```

But with hooks, there are no lifecycles now, mental model has changed to an extent.we still write the functions we need to pass on to other hooks or component inside the function. I think that comes natural. It means every time the component re-render the new reference is being passed to the respective hook or components.Btw It has benefits as we are having access to value outside due to closure. Could have been a dragged effort to pull the functions out of the components every time.

`gist:simbathesailor/63ed95843e4b5f115f99468c3eaa039a`

Now for simple cases , it’s all ok, but as the logic progresses inside component and the components around it, it demands a lot of focus.

To the readers who are still with me, let’s see some code and understand various ways of handlings references with hooks. We will go through various cases and by the end we will have correct mental model and patterns to work with hooks. Take all these cases below as some of the ways of working with hooks , not all.

We will be taking small examples, base code will not change much across cases except certain parts of them. Every example will have base problem and the ways to fix it.

#### **CASE 1:**

Input

`gist:simbathesailor/c63c46028c5f2a099f29b652c82d9e78`

**Problem** : In above code snippet , we are passing **fn function** as the argument to useFunctionHook. The **fn** reference changes on every render of component App. It can cause the effect to re-run again even when it is not desired. Let’s give our first try to fix this issue.

**CASE 1 TRY 1:**

`gist:simbathesailor/384244f57d55d3be401b129fcf1ed208`

Above we moved out the fn definition and now, it will have same reference across re-render. But it’s not always possible to do. We most of the times need access to the local variables available in Components and custom hooks. Following the approach above , will make it difficult to do so.

**CASE 1 TRY 2:**

React also gives us a special hook named as useCallback, which allows us to keep the reference intact based on dependency list passed as the second argument. Here is the API for useCallback

```jsx
const fn = useCallback(function A() {}, [a, b, c])
```

The first argument function is synchronised with the elements in dependency lists. The fn will only point to a new reference when a, b or c changes in this example. Let’s make use of it to solve our problem.

`gist:simbathesailor/e837d57d107218049513e8ba22d179c9`

In the example above, now the fn is again part of the component, but now fn has the access to all the variables inside component due to closures. And also the useFunctionHook makes use of useCallback to persist the reference of fn. In the example the reference of fn will not change across re-render.

Now lets say the fn access some value from the component something like this:

`gist:simbathesailor/e5cb03e08748dd984c0c085722d9927a`

But the the fn reference will not change across re-render as the dependency is blank array in our case.

```jsx
const fnCallback = React.useCallback(fn, [])
```

So in our case , The count referenced by function fn will refer to same initial value across re-render.

**The closures created once will persist across re-renders unless the  
callback runs again.**

Fix is easy, now add count as the dependency for useCallback. For that we must pass countInparent also now to useFunctionHook.

`gist:simbathesailor/e784b4b8b57a06eeb30959f10776ac36`

One more alternate adjustment we could have done here is instead of having memoized the callback in useFunctionHook, we could have done it in App component.

But I think that’s not a good way to go ahead. It’s better if consumer of a custom hook has to do less things to make it work. In our case , we pulled the burden for maintaining the reference to function fn from App component. I think that’s good developer experience.

On the same lines, some may say useRef is also a viable option here. I would say the typical answer which is it depends. So let’s try the solutions with useRef.

**CASE 1 TRY 3 :**

`gist:simbathesailor/f5636b077f21b25eba02892fc5c2fcc1`

This approach also work for various scenarios. But there are few things to keep in mind before choosing useRef.

1. Like useCallback there is no separate dependencies like array, so what could have been achieved with single line may require multiple lines with useRef. we can also write a custom hook like this, which removes some of verbosity from the above code.

   `gist:simbathesailor/a7d2fe631528853dc218cfd2e51e81cc`

Now the above example can be written as :

`gist:simbathesailor/f9e9a420290b28b4b36b1ed63722494c`

The ref approach becomes silent dependencies. What do I mean by silent dependencies ? . Let’s see that

```jsx
useEffect(() => {
  // some logic
}, [refDependency, nonRefDependency1, nonRefDependency2])
```

Here above , refDependency will never change after first run. But the values refDependency might be carrying will be updated on every run .

```
const { current: updatedValueAlways } = refDependency
//The value updates always but not the ref(refDependency) reference
```

But nonRefDependency1 and nonRefDependency2 are non ref dependency which will change when their respective value changes on re-render.  
At times, it becomes impossible to trigger rerun of the effect callback on value change.  
So if only refDependency.current changes , it will not trigger the effect callback to run because refDependency itself has not changed.

Before, we move ahead let’s see one of the pattern that can used for avoiding the more work from consumers of custom hooks.

**CASE 2**

Let’s call it **ref callback pattern** for now(So this name is pretty common, that I have heard recently, but sounds legit). Now let’s observe the code below:

`gist:simbathesailor/d3f268668bb8eb3ba920d050cd51cd78`

**PROBLEM:** In the code above , the App holds the responsibility of passing ref to useFunctionHook. But again as discussed above, we should avoid the effort from the consumer of the hook as much as possible. I think same concept applies for almost every thing in programming. So let’s try to do so.

**CASE 2 TRY 1** :

`gist:simbathesailor/16ad6c8403a9786e5a92fb74c06fdc2f`

Notice above , how we are using the our callback way of setting up ref. We have also pulled out the responsibility of creating ref from the App component.  
Now consumers do not need to worry about creating a ref every time to consume the hook. It would be good if we can extract the functionality of creating callback refs in a common hook. Let’s do that.

`gist:simbathesailor/31602de84f48f0cb80ca4e23bf87eb86`

Now the code changes to this:

`gist:simbathesailor/01719b76788388c239c5a7082d8a7315`

To summarise the ways we can handle callbacks with react hooks are:

**1.** If possible move out the callback outside the component. This will not be possible almost every time. So mind it.

**2.** If the callback is not dependent on any of the values in component scope, then go for useCallback approach or useRef approach with blank dependencies.Remember they become silent in those cases. Can be tricky as the closure created once will not update itself unless it runs again.

**3.** If the callback need to change when certain values changes, go for useCallback approach, passing in desired dependencies.

**4.** Try to minimize the things that consumer of a hook or component have to do to get things working.

Now we talked about various ways of handling functions with custom hooks. Let’s understand how we are going to handle array and objects with custom hooks.

`gist:simbathesailor/7b3dea5dca91f62bf1401d56ecd8058b`

Notice Type 1 and Type 2 versions of useAcceptOptions hook. Doing the Type 1 will make the the debugging difficult. But the Type 2 can be more deterministic and debugging can be easy. For arrays and objects, nothing has changed. Try to avoid putting dependency like this:

`gist:simbathesailor/27498b370bb290fa9bd0e66ec0f0378e`

It’s very common to pass the options inline , so writing like above will run the callback of effect hook to run every time. Try to keep the options as small set of values. Having big objects and array argument to custom hooks becomes difficult to reason later.  
Let’s see one more example having functions, object and arrays in it.

`gist:simbathesailor/db4ba66be41d62d62ffcff9856302345`

In the example we are just using the knowledge which we have discussed in this article till now. I am not going to explain the code above. I think you should go ahead and read it.

I think mix of **useCallback, useRefValues and useCallbackRef** solves almost all of the issues.

---

Feel free to point if any issues with the code snippets above. I have also written a handy library to debug hooks. Feel free to try it and let me know. A babel plugin is also available for it.

- [@simbathesailor/use-what-changed](https://www.npmjs.com/package/@simbathesailor/use-what-changed)
- [Anil Chaudhary](https://twitter.com/simbatheesailor)

As told above, these are my experiences while writing hooks since last year. Please let me know if there are any other good patterns that you guys have been using.

Thanks
