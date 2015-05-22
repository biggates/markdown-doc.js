# markdown-doc.js
Embedded markdown and menu utility with syntax highlight

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

## Usage
### Default Usage
Just write your documentation in ```<xmp></xmp>``` section.

### All-in-one pages
Two types of all-in-one pages are proviced

### Customized Usage (TODO)
```
$(function(){
    // ...
});
```

## Configuration (TODO)

## TODO 
* Convert from jQuery to Zepto to reduce all-in-one file size
* Fix initialization problems in all-in-one pages
* Modify ```<nav>``` sidebar element to adapt the Bootstrap style (Affix?)