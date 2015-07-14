/**
 * Created by kliu on 09/07/2015.
 */

var screenMap = new ScreenMap("screen-map");

$("#screen-select-table").DataTable({
    scrollY : 300,
    paging : false,
    searching : false,
    ordering : false,
    info : false
});

var selecting = false;
function changeState(){
    selecting = !selecting;
    if(selecting){
        $("#select_gis_screens").addClass("BMapLib_hander_hover");
        $("#select_gis_screens").removeClass("BMapLib_hander");
    }else{
        $("#select_gis_screens").removeClass("BMapLib_hander_hover");
        $("#select_gis_screens").addClass("BMapLib_hander");
    }
};


function applyScreens(screens){
    screenMap.removeCurrentScreens();
    screens.forEach(function(screen){
        screenMap.addScreen(screen.longitude, screen.latitude);
    });
    $("#screen-select-table tbody").html(Templates["screen-list-item"]({
        screens : screens
    }));
};

$("#select_gis_screens").on("click", function(){
    screenMap.removeSelectOverlay();
    applyScreens([]);
    changeState();
    screenMap.selectScreens(function(range){
        changeState();
        $.post(
            "/query/screens",
            {},
            function(data){
                if(data.error){
                    alert("failt to load screens")
                }else{
                    applyScreens(data);
                }
            }
        );
    });
});

/*
$("#confirm_gis_screens").on("click", function() {

    changeState();
    $("#select_gis_screens").show();
    $("#confirm_gis_screens").hide();
    $("#cancel_gis_screens").hide();
    var selectedScreens = [];
    $("#screen-select-table tbody tr").each(function(index){
        if($(this).find("td input").get(0).checked){
            selectedScreens.push($(this).attr('screen'));
        }
    });

    applyScreens([]);
});

$("#cancel_gis_screens").on("click", function() {
    changeState();
    $("#select_gis_screens").show();
    $("#confirm_gis_screens").hide();
    $("#cancel_gis_screens").hide();
    applyScreens([]);
});
*/

var filterOpts = [

];