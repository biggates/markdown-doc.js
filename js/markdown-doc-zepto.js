Zepto(function($){
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
    function getId($elem){
        var id = $elem.attr('id');
        if(!id){
            id = 'id_' + $elem.text().hashCode();
            $elem.attr('id', id)
        }
        return id;
    }

    var $ul = $('<ul>');
    $('h2').each(function(){
        var $t = $(this);
        var $li = $('<li>').append($('<a>').attr('href', '#' + getId($t)).text($t.text()));
        $li.appendTo($ul);
        var $h2ul = $('<ul>').appendTo($li);
        $t.next('h3').each(function(){
            var $u = $(this);
            $h2ul.append($('<li>').append($('<a>').attr('href', '#' + getId($u)).text($u.text())));
        });
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
});
