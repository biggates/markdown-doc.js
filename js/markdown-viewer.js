/**
 * This script contains the drag-and-drop viewer for markdown files
 */

$(function() {
    // Feature detection
    if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
        // file API not supported
        alert('Your browser does not support file handling.');
    }

    var hideDropZone = function(){
        $('nav').show();
        $('#closebutton').show();
        $('.hcenter').hide();
    };
    var showDropZone = function(){
        $('nav').hide();
        $('#closebutton').hide();
        $('.hcenter').show();
        $('#dropzone').removeClass('over');
    };

    // drop events
    $('#dropzone').on('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.originalEvent.dataTransfer.files;

        for (var i in files) {
            var f = files[i];
            //          console.log(f.type);
            //          if(!f.type.match('text.*')){
            //              continue;
            //          }

            var reader = new FileReader();

            reader.onload = (function(file) {
                return function(e) {
                    // render the file as string
                    var m = e.target.result;
                    $('xmp').text(m);

                    if (m != null && m.length > 0) {
                        $('title').text(file.name);
                        markdown.init(window, document);
                        hideDropZone();
                    }
                }
            })(f);

            reader.readAsText(f);

            break;
        }
    }).on('dragend', function(e) {

    }).on('dragstart', function(e) {
        e.originalTarget.dataTransfer.effectAllowed = 'copy';
    }).on('dragover', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        $(this).addClass('over');
        e.originalEvent.dataTransfer.dropEffect = 'copy';
    }).on('dragenter', function() {
        $(this).addClass('over');
    }).on('dragleave', function() {
        $(this).removeClass('over');
    });

    // reset
    $('#closebutton').click(function(){
        $('#content').empty().remove();
        $('.navbar').empty().remove();
        $('<xmp>').insertAfter($('nav').empty());
        var title = 'Markdown viewer';
        $('title').text(title);
        showDropZone();
    });
});