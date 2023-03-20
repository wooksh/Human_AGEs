$( document ).ready(function() {
    $(".icon-radiobuttons input").change(function () {
        let img = $(this).siblings('img');
        let input = $(this);
    
        if (input.is(':checked')) {
            $(img).attr('src', $(img).attr('checked-url'));
    
            let uncheckedImgs = $('.icon-radiobuttons input:not(:checked) + img');
            uncheckedImgs = ! uncheckedImgs instanceof Array ? [ uncheckedImgs ] : uncheckedImgs;
    
            for(var i = 0; i < uncheckedImgs.length; ++i) {
                let img = uncheckedImgs[i];
                $(img).attr('src', $(img).attr('unchecked-url'));
            }
        }
        else
            $(img).attr('src', $(img).attr('unchecked-url'));
    });
});