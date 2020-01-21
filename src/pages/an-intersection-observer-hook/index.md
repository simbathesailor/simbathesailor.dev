---
title: An intersection observer hook
date: 2020-01-21T16:38:25.728Z
tags: patterns,react-hook,usecallback,useref, intersection observer
published: "true"
description: This article implements intersection observer hook.
---

![Intersection observer](./coverpage.png)
[Image built using Excalidraw](https://excalidraw.com/)

**Have you guys heard about intersection observer ?**. It' a cool web technology which allow us to observe the element on any page efficiently. It has a great browser support and polyfill is also [Polyfill IntersectionObserver](https://github.com/w3c/IntersectionObserver). In this article, I am going to talk about a intersection observer reactjs hook, few patterns and intersection observer.

---

### Intersection Observer

I would just point to the offical page, if you are looking for something formal [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). But to the people who are cool with an informal explanation to intersection observer can stay with me for this section. Those who chose formal one, do not go away. You can jump to the new section. So, Let's start !!

Before I explain you what the code is doing. Let me tell you whay intersection observer does.

> It basically tells you how much of the proportion of a DOM element(or target element) is
> visible in the area covered by parent.

So any time you need to say whether an element is visible in the parent's area, you recall intersection observer.

One of the best part is you do not need to take care of screen resizes, It takes care of that automatically.

It **asynchronously** observe changes in the proportion changes. Hence very performant.

![Intersection Observer API to image](./intersectionobserver.png)

`gist:simbathesailor/0ef2579026dc77ad78f5f571caf58551`

Notice both, image and the code snippet.

Intersection Observer is just a constructor function. which you can call with options and callback(we will talk about this)

```jsx
let observer = new IntersectionObserver(callback, options)
```

Let's say now we want to observe the DOM element with id #listItem. We can do that by following statements.

```jsx
let target = document.querySelector("#listItem")
observer.observe(target)
```

To start unobserving the same element, we can write following statement:

```jsx
observer.unobserve(target)
```

Let's see the options also:

1. **#scrollArea** is the root element. If passed nothing it will take browser view port.

2. **rootMargin** is the distance between the parent boundary and the target element boundary. Notice the image above and think if this point make sense there. Frankly speaking trying out few examples will helo more.
   The values that you give can take value similar to how we give margin, padding in css. (top, left, bottom, right).

3. **threshold**: is the value of proportion , when you run the callback. Sp, 0.25 means 25% of target element is intersecting.

**callback** gets called with complete entry object and observer , which tells about various information about the target element and root element. You can read more about it here. [Entry object](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
You can place your logic in response to the intersection change inside this callback. This callback is the place where you will sepending most of your time.

Now we discussed about intersection observer. Now let's try to write an intersection observer reactjs hook.

**Note: I assume a basic understanding of React.useRef, React.useCallback, React.useReducer and React.useEffect. If you haven't read them. Please give it a read at [Reactjs hooks](https://reactjs.org/docs/hooks-intro.html)**

Before I start getting into implementation, I think it's better to look at the hook API first. Then we will work backwards.

```jsx {1-20}
// optional
const defaultVisibilityCondition = (entry: IntersectionObserverEntry) => {
  if (entry.intersectionRatio >= 1) {
    return true
  }
  return false
}

// optional
const defaultOptions = {
  rootMargin: "0px 0px 0px 0px",
  threshold: "0, 1",
  when: true,
  visibilityCondition: defaultVisibilityCondition,
}

const App = () => {
  const [isVisible, boxElemCallback, rootCallbackRef] = useIntersectionObserver(
    defaultOptions
  )

  return (
    <div className="App">
      <div ref={boxElemCallback} className="box">
        {isVisible ? "Box is visible" : "Box is not visible"}
      </div>
      {isVisible ? "Box is visible" : "Box is not visible"}
    </div>
  )
}
```

## Return Data Types and Description

The hook returns an array. Let's say that array name is **Arr**.

| Index  | Name                   | Type     | Description                                                                               |
| ------ | ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| Arr[0] | isVisible              | boolean  | Tells whether the target element is visible or not                                        |
| Arr[1] | targetElementRef       | Function | The target element ref, add it to target element                                          |
| Arr[2] | rootElementCallbackRef | Function | The root element ref, add it to root element or can just leave it if document is the root |
