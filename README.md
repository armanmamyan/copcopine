# copcopine

# Be sure to have latest recommended version of node and nmp(yarn)
  - npm install --global gulp-cli
  - cd project-directory
  - npm install
  - open index.html file via live server
  - on terminal run __gulp__ command

  ```It will automatically build all sass files,inject partial components to all html files, primarily added in src folder.```

## Header/Footer for all Files(in progress)
  Now we have partials folder where we store all links and script thast must be injected for all html files.
  Just add Your link/script there and gulp automatically inject it to html file (__now only for index.html__)
  
  ### When you create new html file and add some new scripts and link in your partial, you need the following comments in your new html file, so the gulp can understand where to    put those partials. For us, we need to put that comments inside the head tag and after closing the body tag:
  `<!-- partial:partials/_headLinks.html -->`
  `<!-- partial -->`
  
  ##### Treat these comment like opening and closing tags
  
  ##### If you want to remove them after gulp compilation pass the `{removeTags: true}` prop to you __injectPartials()__ method __gulpfile.js__
   

## Background Types
  - Transparent (background- -transparent)
  - Blur(background- -blur)
  - With Opacity (background- -opacity)

## Top/Bottom Ad header variablers
  - --header-top-bg: #000;
  - --header-top-color: #fff;
  - --header-bottom-bg: #CDC3B3;
  - --header-bottom-color: #000;
