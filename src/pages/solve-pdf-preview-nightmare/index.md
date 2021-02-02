---
title: Solving Pdf Preview Nightmare
date: 2021-01-27T15:08:25.728Z
tags: pdf, pdf-preview, reactjs
published: "true"
description: Pdfs are the most popular way of sharing large documents. But does previewing them on web is consistent and easy ? . We will check that out in this article.
cover: https://images.unsplash.com/photo-1553484771-371a605b060b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---


![Photo by https://unsplash.com/@austindistel](https://images.unsplash.com/photo-1553484771-371a605b060b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

Photo from [https://unsplash.com/@austindistel](https://unsplash.com/@austindistel)

Do you ever has the need to preview `pdf` on web ?. It's so common but still draws every ounce of energy from a developer to make it work properly on every device. 

> Why it has to be so hard ?

## My Attempts

1. Just open the pdf in the new tab and the browser will take care of it to preview  correctly.
  
**Problem**: It's not always the best experience for the user. You don't want user to switch the context by moving to a separate tab. It looks much bad when it happens on mobile device. The better experience would be on the same page without sacrificing context.

2. Try to open the document in a iframe. The iframe can be bit tricky across browsers. There can be security restrictions and disallow policy for certain pdfs. E.g When I tried opening some sample pdf which were opening fine on desktop device were not rendering at all on mobile device. 
   
This situation can be very difficult. You can't do much there to make it work.

---

Can we not have something straightforward where I just provide `pdf URL` and it takes care of rest. Renders properly on every device and most of the browsers.

With the above goal I started my search for the best possible library on internet. 
Nothing sort of helped until I found [Mozilla pdf.js](https://mozilla.github.io/pdf.js/).
It makes use of [Readable streams](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

After few hours of digging and reading through source I was like :

![Found it](https://media.giphy.com/media/12CcmGavTHjSOk/giphy.gif)




> But then was it ready for my Reactjs APP ?

Nopes. Not at all.


Hence I have to write my own port of mozilla pdf.js for reactjs using examples from  [https://github.com/mozilla/pdf.js/blob/master/examples]( https://github.com/mozilla/pdf.js/blob/master/examples)

## Pdf Preview implementation


I wanted a pdf mobile previewer and it seemed that mozilla pdf.js has example folder available.

I just needed to `Reactify` it.



First step is to add certain script to your html.

Add following scripts in your body tag.

```
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/web/pdf_viewer.min.js"></script>
```

Once these scripts are added properly we should have `pdfjsViewer` and  `pdfjsLib` available in the global scope.


**Note:** Make sure we get it right, before we move ahead


Now we will create a React component called `PdfPreview`.

Let's see the boiler-plate code for the `PdfPreview` component:


`gist:simbathesailor/9abf373bf9a3c985c10c0aea340347d9`

This component takes in three props: 

```
docUrl: String -> It is the pdf URL.

uniqueContainerId: String -> It is uniqueContainerId 

styles: Object -> styles need to appended to the base styles

```

Take some time to go through the code above. Nothing fancy just some JSX and an useEffect.


We need to add pdf preview initialization inside useEffect.

Now let's add Mozilla pdf.js code copied from their [example folder](https://github.com/mozilla/pdf.js/blob/master/examples) with slight changes. The changes made are just to accomodate handling when pdf Url itself is not there or not valid. 

The code below can seem daunting at first, but most of it is just handling the pdf preview various case and updating UI. I have copied most of the content directly from mozilla pdf.js examples. They have done a splendid work by putting up great examples.


`gist:simbathesailor/7d0b3a3ba9b44c5540e1a5c4bfde1f53`


If everything worked you should see  the pdf rendered properly.

But you all must be thinking :

> Dude , without **Demo**

![Not done](https://media.giphy.com/media/QGZBpodY7Kdtw99y04/giphy.gif)



Ohh alrighty !! Here is your demo below. Feel free to check the code, fork it and play with it.


<iframe src="https://codesandbox.io/embed/practical-firefly-i5yly?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="practical-firefly-i5yly"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>

I spent more than 6-7 hours to find out the solution. I hope someone who finds it will not.

The best part of this solution is now it is supported across devices and modern browsers.There will be surely be certain browsers where it might fail, but haven't found any yet.
Tested it on mozilla(82.0.3 (64-bit)) , chrome(Version 87.0.4280.141), safari (Version 13.1.3 (15609.4.1)) for both desktop and mobile versions.

I wrote this article for my future self and for others, because I know that pdf preview is very common use case and will comeback often.

This pdf previewer for react is not packaged yet. May package it if I get good response or someone else can try it doing.


Thanks

Best of luck



**Helpful Links** :  There are no good Reactjs ports available. There was [react-pdf-js](https://github.com/mikecousins/react-pdf-js/blob/master/README.md) library , but was very restrictive in the way it can be used.
- https://github.com/mozilla/pdf.js























