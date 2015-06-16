// this file does not uses jQuery nor zepto

;(function(window, document) {

  // Hide body until we're done fiddling with the DOM
  document.body.style.display = 'none';

  //////////////////////////////////////////////////////////////////////
  //
  // Shims for IE < 9
  //

  document.head = document.getElementsByTagName('head')[0];

  if (!('getElementsByClassName' in document)) {
    document.getElementsByClassName = function(name) {
      function getElementsByClassName(node, classname) {
        var a = [];
        var re = new RegExp('(^| )'+classname+'( |$)');
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))a.push(els[i]);
        return a;
      }
      return getElementsByClassName(document.body, name);
    }
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Get user elements we need
  //

  var markdownEl = document.getElementsByTagName('xmp')[0],
      titleEl = document.getElementsByTagName('title')[0],
      navbarEl = document.getElementsByClassName('navbar')[0];

  //////////////////////////////////////////////////////////////////////
  //
  // <head> stuff
  //

  // Use <meta> viewport so that Bootstrap is actually responsive on mobile
  var metaEl = document.createElement('meta');
  metaEl.name = 'viewport';
  metaEl.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
  if (document.head.firstChild)
    document.head.insertBefore(metaEl, document.head.firstChild);
  else
    document.head.appendChild(metaEl);


  //////////////////////////////////////////////////////////////////////
  //
  // <body> stuff
  //

  var markdown = markdownEl.textContent || markdownEl.innerText;

  var newNode = document.createElement('div');
  newNode.className = 'container';
  newNode.id = 'content';
  document.body.replaceChild(newNode, markdownEl);

  // Insert navbar if there's none
  var newNode = document.createElement('div');
  newNode.className = 'navbar navbar-fixed-top';
  if (!navbarEl && titleEl) {
    newNode.innerHTML = '<div class="navbar-inner"> <div class="container"> <div id="headline" class="brand"> </div> </div> </div>';
    document.body.insertBefore(newNode, document.body.firstChild);
    var title = titleEl.innerHTML;
    var headlineEl = document.getElementById('headline');
    if (headlineEl)
      headlineEl.innerHTML = title;
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Markdown!
  //

  // Generate Markdown
  var html = marked(markdown, {
      highlight: function(code, lang, callback){
          if(!lang){
              return code;
          }
          return Prism.highlight(code, Prism.languages[lang], lang)
      }
  });
  document.getElementById('content').innerHTML = html;

  // Style tables
  var tableEls = document.getElementsByTagName('table');
  for (var i=0, ii=tableEls.length; i<ii; i++) {
    var tableEl = tableEls[i];
    tableEl.className = 'table table-striped table-bordered';
  }

  // All done - show body
  document.body.style.display = '';

})(window, document);


(function(){
    if(!String.prototype.hashCode){
        String.prototype.hashCode = function(){
            if (Array.prototype.reduce){
                return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
            }
            var hash = 0;
            if (this.length === 0) return hash;
            for (var i = 0; i < this.length; i++) {
                var character  = this.charCodeAt(i);
                hash  = ((hash<<5)-hash)+character;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }
    }

    // 建立目录
    function getId(elem){
        var id = elem.id;
        if(!id){
            id = 'id_' + elem.innerHtml.hashCode();
            elem.id = id
        }
        return id;
    }

    var $ul = $('<ul>');
    $('h2,h3').each(function(){
        var $t = $(this);
        var $li = $('<li>').append($('<a>').attr('href', '#' + getId($t)).addClass($t.prop('tagName')).text($t.text()));
        $li.appendTo($ul);
    });
    $('nav').append($('<h2>').text('目录')).append($ul);

    // 处理页面内的 # 链接
    $('a[href^="#"]').click(function(){
        var hash = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 250);
        location.hash = hash;
        return false;
    });
})();
