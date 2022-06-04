---
title: Getting into Google 🦄
date: 2022-06-04T17:25:26.345Z
tags: interviews, new role, fullstack, future goals
published: "true"
description: The Year 2022, I got into Google as a Full Stack Developer. Let the journey of innovation, impact and adventures start. I will share my preparation for the interviews.
cover: https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3VjY2Vzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60
---

![Photo by Ian Stauffer on Unsplash](https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3VjY2Vzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)

[**Photo by Ian Stauffer on Unsplash**](https://unsplash.com/@ianstauffer)

It all started in November 2021, when I chatted with a Google recruiter and my interview dates got finalized. The recruiter gave me complete flexibility in deciding dates and the time I need for preparation. At that time, I thought let's give it a try. Why not?
It is google. Whatever I was doing in other companies can be done in Google also. You get talented mentors, colleagues and whatnot.

There are a lot of things that go through your mind when you say yes to an interview like from any MAANG company. The preparation has to be done in data structures, and algorithms with the best clarity possible. Anything can be asked. There are other skills as well like coding patterns, the ways of structuring the code and a lot more thing which comes to you if you have been working on it every day in your office work.

Now let's cut to the chase, I am going to explain the resources that were useful to me plus the kind of things you should focus on before interview and while in the interview.

## I followed these important resources:

### **1. Books: Narsimha karumanchi Data structures and algorithm**

I used this book to revise the concepts I did long back. I have been in the industry for 8 and a half years. And the last time I did such concrete data structures with varying complexity was 5 years back.
I just had to revise the basics with it. I read this same book 5 years back also. I had the hard copy

### **2. Geeksforgeeks**

I did it for a few questions, But is now very confusing and looks like an ad banner website.
Not enough good roadmaps there. You can find some gems there, but it is going to take a lot of time

### **3. Leetcode**

This was the change that I did this time. Leetcode was very impactful. It quickly brings you into
the zone where you will find the reality of your skills. It sets you up for the kind of questions that will mostly be asked in such interviews.

you know the concept, go and try leetcode and you will know the reality. Very impactful I would recommend buying a monthly subscription for leetcode and getting done with some questions already asked in FAANG interviews.

### **4. Algoexpert**

How would I have missed that, when you see its ad so many times on your youtube.

![Algoexpert](./algoexpert.jpeg)

I just thought of giving it a try. The content was focused and gave me confidence in my skills. Very good explanations. I think Clement has cracked the code of teaching algorithms and yes a lot of marketing on youtube :).

### **Lots of paper practice**

I did a lot of paper practice which cleared my doubts over everything. It was very impactful.

With all the basic resources above, you have to decide for yourselves how much you can do. Target medium and hard questions on leetcode to get the maximum exposure. How many? I don't know. Maybe as much as you can do. I could solve 8-9 questions per day. Not more than that. I could do this from a mix of medium or hard questions. You need time to digest the concepts also. I did this for almost 2 months, even while my interviews were going on.

To the people thinking 8-9 questions is too less. Maybe it is. But again decide for yourselves.

There were some good youtube channels also which made me fit into this interview groove. Most useful were **freecodecamp** algorithms track, striver live sessions on solving leetcode challenge. And man, when you see **striver** doing live leetcode without sweating it out and with complete clarity, you will go wow. I learned a lot of concepts quickly on those youtube streams than by reading any fat books. I am not adding any links here, go ahead and search for them on youtube.

> Clarity and ability to manoeuvre data structures is that needed in the interview.

---

## Now coming back to actual topics which are worth getting clarity on.

```
BFS, DFS for graphs.
Multi-source bfs. cycles in graphs directed and undirected shortest path.
Matrix-based questions


Binary search: Simple Binary Search,

Binary search on answers (a new one for me)
These questions on the face are really difficult to reason unless
you know the concept of binary search on answers


Recursion with memoization (DP),
Heaps(questions are more common than not),
Suffix trees,
Kadanes algorithm,
Dijkstra,

linked list (single, double, cyclic)(objects) should be
very clear as they get used a lot while solving iterator based google questions,

sliding window problem


Trees DFS BFS (iterative and recursive).
Bits manipulation if you have time.
Backtracking is very important.

```

> Remember this
>
> _Any information in the question is given for a reason. Due to that info, the answer has to use a very specific type of data structure and solution which might not be the case without that info. So keep close heed to the various constraints in the question. This is most important_

## What can you do in the interview?

Usually in the interview, when you get the question. clarify the question input and output. Clarify the edge cases input and their output. Once you understand the question and output. then only you take time to come up with the approach.

While doing so, make sure you are letting your interviewer know what you are thinking. It is more difficult than you think. Take some initial time to organize your thoughts and then start engaging the interviewer.

Write pseudo code if you think the time left is sufficient or the question is more complicated.

Finding a working pseudo-code is very important as it is going to act as a blueprint for your actual code which is needed finally.

Once you think your pseudo code solves the problem. try to run the pseudo-code with the edge case that you clarified above with the interviewer. This step is the most important in the whole interview. This is the time when you are engaging with the interviewer most. If the interviewers understand your algorithm and the test cases work fine with pseudo code, then you are mostly set. If you can get an optimal algorithm working at this stage with proper test cases running, you have already got a major nod from the interviewer.

> Keep the pseudo-code somewhat readable. Believe me, you are going to need it later.

Am I done? You ask.

Unfortunately whatever we have done till now is not enough. You have to take the interview to the finish line for which you must read ahead.

Now you can start writing the actual code. you can use the previous pseudocode for writing actual code.

To write the actual code. start commenting pseudocode and start writing the actual code below it for easy reference and less thinking this time.

something like

Let’s take the example of the two sum problem

```
// start with two-pointer  on left end and right end

let l = 0;

let j = arr.length - 1;

while (i < j) {
  // requiredSum === sum[l] + sum[j]

  if (sum[l] + sum[j] === requiredSum) {
    return true;
  }

  // left++ when requiredSum < sum[l] + sum[j]

  if (sum[l] + sum[j] < requiredSum) {
    i++;
  }

  // right— when requiredSum > sum[l] + sum[j]

  if (sum[l] + sum[j] > requiredSum) {
    j--;
  }
}

```

You have already done the heavy lifting above while writing and testing the pseudocode. Ideally, the test cases should also pass for the actual code because it passed for pseudocode.

Any mistakes here are also noticed by the interviewer, but if your psuedo code worked, you will either make a silly mistake or no mistake at all.

Once after the actual code, try to run one or two test cases if time permits.

### Few points to focus on :

The most important challenge is to get things right in a limited time. If you get confused or redo the work. things become difficult to get back as not much time is left. There will be outliers.

Throughout the interview, the interviewer wants to understand what you are thinking and how you are making deductions. That is the reason, that just mugging up certain types of algorithms will not help in the interviews.

Write clean and production-ready code(it is already ready if you have been coding for a long time, it was my case). Once you are done with the question do one most important thing which is dry run your code. In most cases, you get some cases left while you do the dry run.

After all, this, take a moment and then say to the interviewer that, the test cases are working fine and I think I am done.

This is for the one round. Keep patience and try to repeat for the next 4-5 interviews.

Best of luck to all of you reading this. I hope these all pointers will give you a clearer perspective on interviews.

Here is me wearing Noogler hat .

![Anil wearing noogler hat](./nooglerhat.jpeg)

Bye Bye, hoping to write more developers related learning on my blogs.
