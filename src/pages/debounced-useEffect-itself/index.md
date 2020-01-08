---
title: Write a debounced useEffect itself
date: 2020-01-07T16:38:25.728Z
tags: patterns,react-hook,usecallback,useref
published: "true"
---

![Photo by Mark Rabe on Unsplash](https://images.unsplash.com/photo-1502780809386-f4ed7a4a4c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)

So, the other day I was working on a controlled component and I want to debounce certain actions and not debounce certain actions at the same time in useEffect. I start wondering , Can we make a debounced effect ?
While answering this question in my mind, I went through few ideas which are good in their respective scenarios. Now I think it is worth sharing all those ideas and a debounced effect itself that I was able to write finally.

---

Let's see the problem at hand and then we will see various approaches to solve it.
https://gist.github.com/simbathesailor/709974316e8268b195fece9bc95a561c

{% gist https://gist.github.com/simbathesailor/709974316e8268b195fece9bc95a561c %}

```jsx
function ChildComponent({ value, onChange }) {
  function makeApiCallRaw(value) {
    console.log("make api call with value", value)
  }

  return (
    <input
      defaultValue={value}
      value={value}
      onChange={e => {
        onChange(e.target.value) // Has to be non debounced
        makeApiCall(e.target.value) // Has to be debounced
      }}
    />
  )
}

function App() {
  const [value, setValue] = React.useState("")
  return (
    <div>
      Hello World
      <ChildComponent value={value} onChange={setValue} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
```

Notice above **App** is a parent component and then **ChildComponent** as the name specifies is a child component. The input in child is dependent on the parent component for it's value. We call then controlled component. Some people must be thinking why I have to keep the value in parent component? Why I can't keep it in Child Component. The answer is , these scenarios are pretty common in all real world applications. For example, I had the following case:

input value was kept in Redux store, because that input value is used at other locations in app to determine certain behaviour. That's where I got stuck with the question mentioned in the start of the article.

Hence an example based on controlled components.

Notice few things above.

1. OnChange function need to do two things.

2. A non debounced change which changes the value. It can't be debounced. Making it debounced will stop the values to reflect in the input as it is a controlled component.

3. A debounced change. In the above example we are just logging something but in real application it can be anything e.g making api call, updating filter e.t.c. That has to be debounced for the performance sake.

---

Here is an image showing the visual representation of what's going on here. Made with [excalidraw](https://www.excalidraw.com). Quite smiple and amazing to use.

![Problem Image](./debouncedeffectdraw1.png)

### First Try :

{% gist https://gist.github.com/simbathesailor/fe73dc6cefd6f59d50730bd65e9bacfa
%}

```jsx
import debounce from "lodash/debounce"

function makeApiCallRaw(value) {
  console.log("make api call with value", value)
}

const debouncedmakeApiCall = debounce(makeApiCallRaw, 200, { trailing: true })
function ChildComponent({ value, setValue }) {
  return (
    <input
      defaultValue={value}
      value={value}
      onChange={e => {
        setValue(e.target.value) // non debounced
        debouncedmakeApiCall(e.target.value) // debounced
      }}
    />
  )
}

function App() {
  const [value, setValue] = React.useState("")
  return (
    <div>
      Hello World
      <ChildComponent value={value} setValue={setValue} />
    </div>
  )
}
```

Notice above our **makeApiCallRaw** is not dependent on any thing in the
