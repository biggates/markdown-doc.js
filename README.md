# markdown-doc.js
A documentation utility that parses markdown, renders html and generates a sidebar menu to your document.
This utility enables you to get beautiful documentation with plain text markdown syntax, just like ```README.md``` on [Github](https://github.com) except it can be read offline.

## Current Status
This project is under development now and NO stable version is released yet.

## Default Structure

```html
<html>
    <head>
        <!-- your title of documentation -->
        <title></title>

        <!-- necessary css files -->
        <link rel="stylesheet" href="..." />
    </head>
    <body>
        <!-- generated Table of Contents -->
        <nav></nav>

        <!-- your content of documentation, in markdown -->
        <xmp></xmp>

        <!-- author, version, copyright, etc. -->
        <footer></footer>

        <!-- necessary js files -->
        <script type="text/javascript" src="..." ></script>
    </body>
</html>
```

## Building
Currently all-in-one pages and minimized files are created only after built the project.
To build, just execute ```grunt``` .

## Demo
See [example.html](example.html) and [example-zepto.html](example-zepto.html)

## Usage
### Default Usage
(First you will have to build your all-in-one pages).
Copy the generated all-in-one page to your own project, and just start writing your documentation in ```<xmp></xmp>``` section.

### All-in-one pages
Currently two types of all-in-one pages are provided, one with Bootstrap styles and another is not.

### Customized Usage (TODO)
```
$(function(){
    // ...
});
```

## Configuration (TODO)
You can configure the theme of the document, and the theme of the syntax highlighted code, before generation of the all-in-one pages.

## TODO
* Fix initialization problems in all-in-one pages.
* ~~Base lib: migrate from [jQuery](http://jquery.com) to [Zepto.js](http://zeptojs.com), or even plain JavaScript to reduce all-in-one file size~~
* Modify ```<nav>``` sidebar element to adapt the Bootstrap struct and style ([Affix](http://getbootstrap.com/javascript/#affix)?)
* ~~Syntax highlighter: migrate from [Google Code Pretty](http://code.google.com/p/google-code-prettify/) to [Prism.js](http://prismjs.com/)~~
* ~~Markdown parser: migrate from [Strapdown.js](http://strapdownjs.com/) to [Marked](https://github.com/chjj/marked/)~~
* Style: improve the css style in the standalone all-in-one page.
* Style: select and integrate some themes that both Bootstrap and Prism.js styles will blend.
* Add one-page online html using hosted JavaScript and CSS. Of course this one-page document can only be rendered (and read by human) in an environment with access to the internet.

## Credits
* [jQuery](http://jquery.com) and [Zepto.js](http://zeptojs.com) as the base JavaScript library
* [Strapdown.js](http://strapdownjs.com) as the idea comes from the base project
* Javascript libraries mentioned in Strapdown.js, inclucing [Bootstrap](http://getbootstrap.com), [Bootswatch](http://bootswatch.com), [Marked](https://github.com/chjj/marked) and [Google Code Prettify](https://github.com/google/code-prettify)
