---
title: Talk to React components from outside React
date: 2020-08-06T23:30:25.728Z
tags: patterns,react-hook,usecallback,useref
published: "true"
description: How to trigger react component from outside React in a React App
---

![Photo by stephen momot on Unsplash](https://images.unsplash.com/photo-1551131618-3f0a5cf594b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80)

What if I have to control the react components from `non-react` codebases ? Let me re-phrase it with some concrete scenario.

What if I need to open a react modal from non-react codebase like utils functions, fetch wrapper e.t.c

This is such a common use case. We want to show the modal, then and there , when some condition passes. That condition can be in a non-react codebase.

Let see how we can do it.

---

All the modern applications, make use ES6 modules and they have live bindings.
These live binding can be really useful when accessed from other files (any file react component or outside react component)

What is a live binding can be understood quickly by seeing the answer to [this](https://stackoverflow.com/questions/52211309/what-does-it-mean-by-live-bindings) stackoverflow question.

> Make sure you understand the above stackoverflow answer before diving ahead.

As we asked the question in context of a modal in the start, let's start with some modal code.

`gist:simbathesailor/e5afd9dc846f46c519d4dea8bc76943a`

Modal component is a not important here as it is a usual modal making use of react portal.

But notice , line no. 30, where I have declared and defined a variable `toggleModal` outside `ModalFromOutsideReact`. The component `ModalFromOutsideReact` has the access to the `toggleModal` from inside the component (Javascript closures at play here) and I can also change the value of toggle modal from inside the component.

So on the every re-render of this component, we can update the toggleModal with some state setter (or anything).

But in this example we can set it to the function below, which takes care of toggling the modal show/unshow

```jsx
toggleModal = (showVal, dataFromAPI) => {
  setData(dataFromAPI) // ignore this part
  setShow(showVal)
}
```

Now whenever the `show` value is truthy in the components, modal will show up.

We need 2 more steps to achieve our goal

We need to add this components somewhere in the APP react hirerarchy , possibly at the very top in this specific case.

Let's say I have App.js which is at the very top in the App React hirerarchy.
I can safely render the `ModalFromOutsideReact` component unconditionally here
Rendering in the App.js will make sure that the `toggleModal` is instantiated
before any other component gets render in our App

_App.js_

```jsx
import ModalFromOutsideReact from "path/to/ModalFromOutsideReact"
function App() {
  return (
    <div>
      <ModalFromOutsideReact />
      // Rest of the APP
    </div>
  )
}
```

Secondly we need to export the `toggleModal` from `ModalFromOutsideReact`. See the line no. 70 in github gist

Now, you are all set to trigger the modal from anywhere in the app, be it React component, non-react codebases like fetch wrappers, utils e.t.c.

You are not forced to go through all your component render cycle to show a modal. you can decalaritively do that now.

This example is pretty basic and can be improved a lot. But the core idea was to demonstrate the how's of interaction between react and non react world.

Thanks

Feel free to connect with me on https://twitter.com/simbatheesailor
