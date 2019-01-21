# Out Of The Vox
HackCambridge 2019 

Out of the Vox is a brainstorming smartphone app that makes mind maps by only listening to your voice!


## Inspiration
We all know this feeling – you get a perfect world-changing breath-taking idea. Anywhere. It can be in a bus on the way home, it can be in your bed a second before you fall asleep. Your head is about to explode, especially in the first moment, there is tons of stuff you need to mark down – tasks you have to do, tools you need to use, people you have to call. Otherwise the idea might be lost forever. 

## What it does
Out of the Vox is a brainstorming smartphone app that makes mind maps by only listening to your voice! It's pretty simple – let's suppose you get this idea on the go. Forget having to take out any paper. Turn on Out of the Vox and start telling it your ideas. Based on what you say and how you structure it, VOX will start creating text bubbles, their sub-bubbles and connecting them.
But how is VOX different? By not having to write anything down and only using your voice, your flow of your ideas does not have to be interrupted and you don't have to lose any single ideas. Traditional voice memo apps result in lengthy clips that contain a lot of unnecessary information, and transcription tools out there cannot handle long form data. By isolating the key statements, Out of the Vox prevents data overload!
## How we built it

Front end design is built with **D3.js**, **jQuery**, **Ajax**, and to process the speech input we use **Google Speech-to-text API**, and send the transcribed text to a **Flask** backend server hosted on **Google Cloud Platform - App Engine** - where we use machine learning (**Google Natural Language Processing API**) to find the most important keywords and group them by topic. We send these keywords and their properties to the frontend to display as bubbles.

## Challenges we ran into

Integrating the Google Natural Language Processing API was difficult due to out-dated and inconsistent documentation (the main issue was with the Python versioning and the integration with Flask).
D3 JS - getting bubbles to update dynamically.


## Accomplishments that we're proud of

Implementing state-of-the-art speech recognition API and using machine learning

## What we learned

Integrating Flask on Google Cloud Platform and using Google App Engine as well as using  D3 JS on the front end

## What's next for Out of the Vox

Out of the Vox can be used in many situations - from lectures (to jot key ideas in lecture) to todo-lists. It still has so much potential - in another 24 hours, we could for example implement new features, such as pie charts or hierarchy maps, to make organisation even easier and faster. We could also use the learnt grouping to suggest new words, to help promote brainstorming. We would also suggest images and videos for more visual learners.

