---
title: Create Custom Terminal Commands
date: 2020-12-30T15:03:23.710Z
tags: command-line,scripting
published: "true"
description: Custom commands are so prevelant in our day to day work. Let's see how they work and how we can create one in any of our favorite language.
---

![https://unsplash.com/@hannahjoshua](https://images.unsplash.com/photo-1524741978410-350ba91a70d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3244&q=80)

Photo by [Photos by hannah joshua
](https://unsplash.com/@hannahjoshua)


## TLDR: 

1. Shebangs lines are added on top of command line files. The line tells the system which executable has to be used to run the current file.

2. System looks for command files or executables on all the directories pointed by `PATH` environment variable. You can also run different scripting executables using right shebang syntax.
3. So to have a valid command , mostly you need to have the executable file in one of the `PATH` directories and correct shebang for right executables.

---
![Let's go](https://media.giphy.com/media/vn5gXxYdQZkaTepBW9/giphy.gif)


Ever wondered how custom commands works at all. 🕺 I wondered this today and took up the task to dig more into it. 

> I will try to keep it simple because who doesn't love simplicity.


Before we start let's define our end goal. We want to basically run a script from command line using their name only !!

Let's say we  have a file named `somework.js`. 

Let's assume the only content of the file is:

// somework.js
```
console.log("Hello World")

```

How will you run in nodejs ?

You will run it something like : `node somework.js`

Now, If I want to run this script withour the node command.

```
somework
```

It works the same way as it was working with node command. It should output `Hello World` in the terminal.

So let's go and see various elements involved when you run a command.

---

## Shebangs 



I work mainly in javascript ecosystem , So I have a good enough idea about how commands are working. I knew that putting a `bin` field in the `package.json` and pointing to your script will be enough([Read more](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin)). 


I never went back to figure out what happens after that. 

This time I did more like with this attitude.

![Let's do it](https://media.giphy.com/media/iKBAAfYNDu1dowhnEj/giphy.gif)

I started looking at one of the `bin` files in `node_modules`
One thing I could see was a special line on top of the file, which looked something like this.

```
#!/usr/bin/env node

```

If you are having a nodejs application, go ahead and check any file in the `node_modules/bin`. You should find a similar line.



I felt , this is interesting. I searched again. and landed to this [link](https://en.wikipedia.org/wiki/Shebang_(Unix)). These are called **shebang | hashbang | pound bang | hash-pling**


Turned out shebang is **interpretor-directive**

Woahhhhhh!!

But, What is **interpretor-directive** ? . In simple words, it is just way to tell the system how to react to the commands you enter ( what executable need to be run ?)


Now What needs to be done ?

Let's add the below shebang line on top of our  file. 

```
#!/usr/bin/env node

```

Here we are just telling the system that use `node` to run the following file. 


Give executable permission to the file also.

```
 chmod +x somework.js

```

Still, This will not be enough. Try running it and you should see some error.


## PATH

We need to figure out how a system looks for executables. Again, I searched for it. and then came across this [link](https://en.wikipedia.org/wiki/PATH_(variable)). 

Note: These are just the final links. In reality it tooks me much more time to reach to these files.

Now coming back to business

As the definition says : 

>PATH is an environment variable on Unix-like operating systems, DOS, OS/2, and Microsoft Windows, specifying a set of directories where executable programs are located


Hmm , great !! But how do we  see what is the value of `PATH` right now in my system ? 

RUN (Should work on Linux based Teminals)

```
echo $PATH
```

Note: For windows OS , check the following  [link](https://superuser.com/questions/1216658/path-environment-variable-windows-10-echo-path-on-command-prompt-shows-only/1216663)


You will get some sort of this as an output:

```
/Users/wolfgupta/.nvm/versions/node/v14.15.3/bin:/Applications/mongo/bin:/usr/local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Library/Apple/usr/bin:$GOPATH/bin:$GOROOT/bin:/Users/wolfgupta/Library/Android/sdk/emulator:/Users/wolfgupta/Library/Android/sdk/tools:/Users/wolfgupta/Library/Android/sdk/tools/bin:/Users/wolfgupta/Library/Android/sdk/platform-tools:/usr/local/mysql/bin
```

These are set of directories, which are looked up for the files having same name as the command. The files(somework.js) can contain the logic.
### How do we update PATH ?

This should be a very simple search on google. I will leave this task to you guys.

Here are some of the links which you might find it useful.

https://stackoverflow.com/questions/24219627/how-to-update-system-path-variable-permanently-from-cmd

https://www.architectryan.com/2012/10/02/add-to-the-path-on-mac-os-x-mountain-lion/#.Uydjga1dXDg



If you really want to check other common nodejs command definitions that you use on a daily basis. 

Run

```
cd /usr/local/bin

ls
```

you can do `vi` to any of it to understand the commands better

Now to convert `node somework.js` to `somework`. we will first **rename** the file to just `somework` without extension and then move it to `/usr/local/bin`

Run 

```
mv ./somework /usr/local/bin

```

Now, just close the current teminal tab and open a new tab.

Run 

```
somework
```

You should see your beautiful `Hello World` printed on the terminal.


This is about node, how about you are a python guy and  want to write your script in python. You can very well do it with the help of shebangs

Change the content of file in `somework` file at /usr/local/bin to 

```
#!/usr/bin/env python3

print("Hello, World!")

```

In this file you can write any python script and will work how nodejs version of the file was running.

There are so many other details which I am not mentioning here. But yes, you can definitely have this article act as a good starting point to create command line 
utilities for your software.



Finally, Wishing a great new 2021 to all of you. May the world be a better place for all of us in coming years.



[Anil Chaudhary](https://twitter.com/simbatheesailor)
