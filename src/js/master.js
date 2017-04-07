$(function(){
    $('img').on('dragstart', function(event) { event.preventDefault(); });
    $('.selectize').selectize();
    $('textarea').froalaEditor({
        placeholderText: '',
        toolbarButtons:['undo','redo','|','bold','italic','underline','|','fontFamily',
                        'fontSize','paragraphFormat','color','|','align','formatUL','formatOL','|','insertImage',
                        'insertTable','|','clearFormatting','html','fullscreen',],
        language: 'tr',
        height:200,
        fileAllowedTypes: ['application/pdf', 'application/msword', 'application/msexcel'],
        imageUploadParam: 'photo',
        imageUploadURL: 'http://makineikmal.dijitaladam.com/post',
        imageMaxSize: 3 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],


    }).on('froalaEditor.image.removed', function (e, editor, $img) {
        $.ajax({
            method: "POST",
            url: "http://makineikmal.dijitaladam.com/post/delete",
            data: {
                src: $img.attr('src')
            }
        })
        .done (function (data) {
            console.log ('image was deleted');
        })
        .fail (function () {
            console.log ('image delete problem');
        });
    });

    $(".sidebar .profile .image").on('click',function () {
       $(".sidebar .profile .dropdown").toggleClass("active");
       $(this).toggleClass("active");
    });
    $(".sidebar .profile .toggle").on('click',function () {
       $(".sidebar").toggleClass("small");
       $(".mainPanel").toggleClass("wide");
        $(this).toggleClass("active");
    });
    $(".notification .toggle").on('click',function () {
       $(".notification .content").toggleClass("active");
    });

    $(window).resize(function() {
        Resize();
    });
    Resize();    
});

function Resize(){
    if($(window).width()<820){
        $(".sidebar").addClass("small");
        $(".mainPanel").addClass("wide");
        $(".sidebar .profile .toggle").addClass("active");
    }else{
        $(".sidebar").removeClass("small");
        $(".mainPanel").removeClass("wide");
        $(".sidebar .profile .toggle").removeClass("active");
    }
}

