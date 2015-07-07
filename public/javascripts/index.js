/**
 * Created by kliu on 07/07/2015.
 */

$(".icon").on('click', function(){
    $(".icon.active").removeClass("active");
    $(this).addClass("active");
});