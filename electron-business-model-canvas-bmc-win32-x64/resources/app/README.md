### Business Model Canvas BMC Generator  
This BMC generator can be used to create a business modal canvas in a very simple and intuitive way.  
There are other BMC generators available but I realized some of them are paid and some are just bad user experience for me personally.  
I preferred a snapped version, which you type and go no need to worry so much on alignment issues, yet keeping it originally professional and clean black text..  
If you realize, this app is similar to how Trello task creation works.  

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

### Why build this?  
I built this in the intention to have fun, learn and try out Electron, Vue, ElementUI, and webpack features, opening the source code and to time myself  
how quickly can I build a desktop app with some of the state of the art tools. I took about 8Hrs.  

###Features  
Save a file.
Import a file.  
Drag and drop textarea around the canvas and not to be worried about misalignment since it snaps like a grid.  
Understand how vue reactivity works around the code such as changing properties, this does not include vuex  
Deploying an EXE file with Electron  

### How do I print?  
Use an image snipping tool, snap the image, and print that is one way to do it.  

### How do I run this source code?  
cd to directory  
npm install  
npm start  

### How do I compile to EXE  
npm run exe  
the exe can be found in electron-business-model-canvas-bmc-win32x64  
you should be able to find the exe file there just open it :)  

### How do I read and trace the source code?  
1. package.json contains all the libraries needed to be installed when you run npm install  
1. main.js file will be the executed first entry, which will set the desktop app window screen size, and all initial startups  
1. main.js will execute index.html  
1. index.html file contains two require known as renderer.js and build.js  
1. renderer.js is not needed, its part of electron to access NodeJs  
1. build.js file is generated from webpack once you run npm start  
1. build.js is generated, which webpack will compile vue.js  
1. vue.js is where vue will take your HTML and DOM, which you can now use vue features  
1. vue.js includes element-ui and renders bmc.vue  
1. bmc.vue is where the real source code of HTML, javascript begins  
1. bmc.vue includes a note.vue component  
1. note.vue is each of the small boxes, which user input the textarea  


### What tools was used to build this?  
This desktop app is webpacked with Electron, Vue 2.0, NodeJs, Element-UI and ES6.  


### Can I use it?  
This source code is meant for learning purposes and you are free to use it for any usage.  
Would be nice to have a mention :)  


###disclaimer  
This was created just for fun!  


##Author - Nicholas Ooi  
