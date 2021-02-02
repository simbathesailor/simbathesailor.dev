---
title: Qrcode Scan with Reactjs
date: 2021-01-23T15:08:25.728Z
tags: qrcode, reactjs, ecommerce
published: "true"
description: Let's see what it takes to build a decent qrcode scanner in reactjs which works.
cover: https://images.unsplash.com/photo-1559131397-f94da358f7ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---
![Photo by https://unsplash.com/@proxyclick](https://images.unsplash.com/photo-1559131397-f94da358f7ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

Photo from [https://unsplash.com/@proxyclick](https://unsplash.com/@proxyclick)


QrCode is a common way of sharing information without getting into long URLs. Most common of them which everybody must have used are how we make payments todays. Payment infrastructures like *GPay, UPI, PAYtm, PapPal* e.t.c , all make use of QRCode scanning for easy payment process. Today you go to any shop, you can find payment QRCodes in most of the places.

Recently I had a a problem statement of  implementing QRCode scan for web (desktop and mobile both) . 

>I thought that should be easy and readily available. 
 
---

## Expectations
Let's see what were my **expectations** with a qrcode scanning solution in reactjs.

1. It should be a simple named  import in my code.
2. It should work deterministically for almost all the time.
3. It should handle the cases when camera access is not there or camera is itself not there.
4. It should work across mobile browsers and web browsers atleast the major ones. (safari, chrome, mozilla, edge). Why I am specifing mobile browsers ? Because most of the time qr code scanning will be done via mobile phone's camera.


## Am I asking too much ?

Some of you might say :

![Am i asking too much ?](https://media.giphy.com/media/fRc4IDQktRMAupJbnY/giphy.gif)

Let's start the adventure now keeping in mind the above expectations.


I made use of  [html5-qrcode](https://github.com/mebjas/html5-qrcode#readme) library for qrcode scanning. [mebjas](https://github.com/mebjas) created this wrapper around [jsqrcode](https://github.com/LazarSoft/jsqrcode) which is a port of [zxing](https://github.com/zxing/zxing) written in java. 


Whoaa !! so many people are involved to bring qrcode scan to web. They truly deserve the applaud.

First step is to include **html-qrcode.min.js**(from the library) as the part of index.html.
There are two ways of doing it. 

1. Add the following script tab above your end body tag.
  ```
  <script src="https://raw.githubusercontent.com/mebjas/html5-qrcode/master/minified/html5-qrcode.min.js"></script>
  ```
2. Add it via using npm.
    
    ```
    yarn add html5-qrcode
    ```
    I am going to show how i did it for an App bootstrapped from [Create-react-app](https://facebook.github.io/create-react-app/docs/getting-started) which is ejected. For non-ejected mode continue reading.

  
    
    We basically want to load html5-qrcode.min.js into the topmost context when your page loads in the browser. So that we can get the constructor function defined in the libary available on the window object. why so ?
    
    Because the library is structured in this fashion.

  
    We will make use of two webpack plugins to do so

    RUN 

    ```sh
    yarn add copy-webpack-plugin --dev

    yarn add html-webpack-tags-plugin --dev

    ```


    Add following lines to `config/webpack.config.js`

    ```javascript
    const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    ```

    HtmlWebpackTagsPlugin is used to add a script tag in the template html(index.html)

    Copywebpackplugin  is used to copy the html5-qrcode.min.js from node_modules to build folder.

    In the webpack plugin section add following section:

    ```javascript
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/html5-qrcode/minified/html5-qrcode.min.js",
            to: `static/js/html5-qrcode.min.js`,
          },
        ],
      });
      new HtmlWebpackTagsPlugin({
        tags: ["/static/js/html5-qrcode.min.js"],
        append: true,
        publicPath: false,
      });

    ```

    For apps which are in non-ejected mode , make use of [https://www.npmjs.com/package/@craco/craco](https://www.npmjs.com/package/@craco/craco) to customize the webpack config using the steps above.

    Once all this is done, when you run you app , you should be able to see `Html5Qrcode` in the global scope. Just type `Html5Qrcode` in the console and you should see something.

    If you are not seeing `Html5Qrcode` available in console. Don't move ahead, nothing will help in upcoming sentences. Please try to fix it.


    
---

### Are we done yet ?


![We are not done yet](https://media.giphy.com/media/ItjO4QS1WeAjATXrid/giphy.gif)

Exactly, it took me a lot more time. Just keep reading till we get the whole thing right.


Let's create a custom hook which takes cares of starting the html5qrcode scanning, parsing the data and giving back the result or error information.


`gist:simbathesailor/40988ca6bf8fbc7a26073648bf36be8e`

The custom hook takes `qrcodeMountNodeID`(html element id) where the camera will be mounted. That is mandatory. If you are not passing `qrcodeMountNodeID` code might fail.

It also gives back you the function `startQrCode` which can be called to start the qrcode scanning. You can also programatically close the qrcode by calling `stopQrCode`. Better way of doing can be to just remove the `qrcodeMountNodeID` node from the html.


Now to use the above custom hook, you can have a sample code like this:

```javascript
const { startQrCode, decodedQRData } = useQRCodeScan({
  qrcodeMountNodeID: "qrcodemountnode",
});

```

In your JSX

```jsx
<div id="qrcodemountnode"></div>
```
**Note**: Make sure you have a DOM node with id `qrcodemountnode` before you start the scanning.

Once you have access to `startQrCode`  you can call it either on button click , or on mount of the component or any other way.


### How I did it ?

I kept the `qrcodemountnode` html element in a modal. On click of some button, I am opening the modal. Modal is making use of `useQRCodeScan` hook. On mount of the component I am making a call to start the camera and start scanning. 

```javascript
  useEffect(() => {
    // Add logic to add the camera and scan it
    startQrCode();
  }, []);
```

Whenever the scan is successful, you will get the data in `decodedQRData`, which can be read by your component to trigger either an API or any action.

## But then does the story ends here ?

![Absolutely not](https://media.giphy.com/media/cIE7Ilw4o0Tz7706ir/giphy.gif)

### Development Challenges

There are some facts which i came to know, when doing development.


First the camera access will only be allowed for `https` connections.

Ok , so how do we do that in `CRA`

Just start the server like this : 

```sh
HTTPS=true npm start

```
[HTTPS in development](https://create-react-app.dev/docs/using-https-in-development)

---

Next one was How do you test in the phone, while doing development on the laptop. You can't be waiting for the deployment to happen to some environment first and then do the testing.

To get around this: I ran following command in the terminal to find out the my laptop ip address.(Mine is mac machine,  for window and various linux distros it can be different).

```
ifconfig
```
**Note:** Make sure your laptop and phone are connected to same internet

Once you have the IP,  you can open the application in phone browser.
If you are running the server at `https://localhost:3000` and let's say your machine ip is
`192.168.43.56`, then open `https://192.168.43.56:3000` in your phone.

This should open the application successfully. But will it ?

It definitely opens the application successfully, but with one problem (atleast in my case).
There was the problem in a way we were setting cookies. The cookies were still being tried to set for localhost on my phone. One domain cannot set the cookie for some other domain. Why it was happening in my application ?

We were reading domain from `.env` file to set the auth cookies. To fix it I also added the  code to set the cookie for `192.168.43.56` domain. (only for development, removed before pushing it to git).

Lastly , how will we debug the app running in your phone ? I mean how we will see the console.log statement in phone. I didn't find any solution there. So to get around that, I tried  maximum of things on laptop only. But for testing decoded value, I kept a DOM node to hold the parsed result.

### Notable moments:

1. You can also scan the QR code from laptop camera , just by putting a qrcode image in front of it.

2. If the image is not clear, sometime the decoded value will not be something which you expected. So please validate the decoded value of a qrcode.

3. I once thought to implement qrcode scanner on my own , then realized there is a lot of mathematics, logic and genius involved. I cannot implement it on my own or atleast in a finite time.

If you are able to create a qrcode scanner using this article. Scan the below qrcode to follow me. Don't use any readymade qrcode scanner 😜

![qrcode-twitter](./twitter.png)

Best of luck !!






  























    







