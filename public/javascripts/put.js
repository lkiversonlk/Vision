/**
 * Created by kliu on 09/07/2015.
 */

var screenMap = new ScreenMap("screen-map");
screenMap.addScreen(116.404, 39.915);

$(screenMap).on("screen_click", function(){
    alert("clicked");
});

$("#select_gis_screens").on("click", function(){
    screenMap.selectScreens(function(range){
        //first ignore the range
        $.post(
            "/query/screens",
            {},
            function(data){
                if(data.error){
                    alert("failt to load screens")
                }else{
                    data.forEach(function(screen){
                        screenMap.addScreen(screen.longitude, screen.latitude);
                    })
                }
            }
        )
    });
});