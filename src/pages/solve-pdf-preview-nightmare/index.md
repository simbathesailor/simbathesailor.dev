---
title: Solving Pdf Preview Nightmare
date: 2021-01-26T15:08:25.728Z
tags: pdf, pdf-preview, reactjs, ecommerce
published: "true"
description: Pdfs are the most popular way of sharing large documents. But does previewing them on web is consistent and easy ? . We will check that out in this article.
---


![Photo by https://unsplash.com/@austindistel](https://images.unsplash.com/photo-1553484771-371a605b060b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

Photo from [https://unsplash.com/@austindistel](https://unsplash.com/@austindistel)

Do you ever has the need to preview `pdf` on web ?. It's so common but still draws every ounce of energy from a developer to make it work properly on every device. 

> Why it has so to be so hard ?

## My Attempts

1. Just open the pdf in the new tab and the borwser will take care of it to preview it correctly.
  
**Problem**: It's not always the best experience for the user. You don't want user to switch the context to a separate tab. It looks much bad when it happens on mobile device. The better experience would be on the same page without sacrificing context.

2. Try to open the document in a iframe. The iframe can be bit tricky across browsers. There can be security restrictions and disallow policy for certain pdfs. E.g When I tried opening some sample pdf which were opening fine on desktop device were not rendering at all on mobile device. 
   
This situation can be very difficult. You can't do much there to make it work.

---

Can we not have something straightforward where I just provide `pdf URL` and it takes care of rest. Renders properly on every device and most of the browsers.

With the above goal I started my search for the best possible library on internet. 
Nothing sort of helped until I found [Mozilla pdf.js](https://mozilla.github.io/pdf.js/).
It makes use of [Readable streams](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

After few hours of digging and reading through source I was like :

![Found it](https://media.giphy.com/media/12CcmGavTHjSOk/giphy.gif)


Notable Mentions:  There are no good Reactjs ports available. There was one [react-pdf-js](https://github.com/mikecousins/react-pdf-js/blob/master/README.md) , but was very restrictive in the way it can be used.



> But then was it ready for my Reactjs APP ?

Nopes. Not at all.


Hence I have to write my own port of mozilla pdf.js for reactjs using examples from  [https://github.com/mozilla/pdf.js/blob/master/examples]( https://github.com/mozilla/pdf.js/blob/master/examples)

## Pdf Preview implemenation.


















