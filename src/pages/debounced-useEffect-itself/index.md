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

**1.** OnChange function need to do two things.

**2.** A non debounced change which changes the value. It can't be debounced. Making it debounced will stop the values to reflect in the input as it is a controlled component.

**3.** A debounced change. In the above example we are just logging something but in real application it can be anything e.g making api call, updating filter e.t.c. That has to be debounced for the performance sake.

Here is an image showing the visual representation of what's going on here. Made with [excalidraw](https://www.excalidraw.com). Quite smiple and amazing to use.

![Problem Visual Image](./debouncedeffectdraw1.png)

### First Try :

`gist:simbathesailor/fe73dc6cefd6f59d50730bd65e9bacfa`

Notice above our **makeApiCallRaw** is not dependent on any thing in the component and its all good to move the pull the functiin outside of the component. In this case the makeApiCallRow will be debounced.

But as you must be thinking this is not always possible to do. And you are right.

So let's try 2nd approach.

### Second Try

`gist:simbathesailor/1d00a0ac510b3577b9c6e5eb6c458569`

Notice we bring in **debouncedmakeApiCall** inside the **ChildComponent**. We are making use of useCallback to persist the reference of function intact across rerender. And it works correctly. Checkout this codepen link.

https://codepen.io/stack26/pen/qBExgGV?editors=1011

But this approach is more or less same as the first one. If you can do this method, you can very well
do the first method. With the useCallback and blank dependency, the closure is going to get created only once for the callback passed. It means the returned value from useCallback function will return same function reference across rerender.

```jsx
const returnedCallback = React.useCallback(() => {}, [])
// returnedCallback will point to same function, until the component unmounts
```

If the debouncedmakeApiCall is dependent on any other value (e.g props, any variable in scope), the new values will not get reflected while the debounce function runs.

```jsx
const returnedCallback = React.useCallback(value => {
  // using some value available in the scope
  makeApiCallRaw(value, someValueFromOuterScope)
}, [])
```

Now someValueFromOuterScope will keep on referring to its initial value across rerender. To see this case, lets add something to our callback as dependency and see the results. We only have value variable available in outside scope. So let's add it.

https://codepen.io/stack26/pen/MWYQxVo?editors=1111

Notice how the effect runs for all the value changes.
It is definitely something which we don't want.

> So what approach should be followed?. The second approach looks quite useful ,but has the problem of changing its reference for every run.

One way can be if we force all the dependencies as the argument of the debounce function and keep the dependency as the blank array. We solve both the issues.

**1.** The reference to the function will remain persisted across rerender.

**2.** The debounce function will be getting all the latest values.No stale data and no closure issues.

But then, Is it always possible ? . May be or May be not!!. Some time it can be easy as something exaplained above or sometimes it can be very difficult to do dependending on the logic involved.

> What If we can build a custom hook which does it fo us. Something like **useDebouncedEffect**.

The API can be similar to useEffect.

```jsx
useDebouncedEffect(callback, dependencyArr)
```

It can be very handy and prevent all those arguments passing and reference maintainance hustles. Any thing available in scope should be available having expected values.

Let's try this. First let me explain you the idea which has been used.

So useEffect only run again when dependency list changes.

> What if we can debounce the change
> to the dependency list ?

If we are able to do so , we should be able to debounce the useEffect callback run also.

Yes friends. The hook we are going to write is just based on this idea.

I am going to use of usePrevious custom hook.

```jsx
function usePrevious(value) {
  const ref = React.useRef(value)
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
```

Why ?

We will see below

`gist:simbathesailor/59fa57cdaf9240fe94a5069543d2e1c3`

**1.** We are doing book keeping for dependency passed to the hook. (Line no: 3)

**3.** useEffect on line 28 is dependent on
**\_dependency** not on **dependency**. This is most important part. We are debouncing the change to \_dependency and hence the effect callback is also debounced.

**3.** From line 9 - 19, we are essentially making change to the \_dependency in debounced fashion. We are also updating a **testRef.current** value which is crucial.

> Note: I have tried the useDebouncedEffect hook for my projects and it worked fine for all the usecases.
> I am still have some questions , which are kind of unanswered. More on this below.
