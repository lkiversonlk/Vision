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

$(screenMap).on("screen_click", function(){
    alert("clicked");
});

function changeState(){
    selecting = !selecting;
    $("#select_gis_screens").text( selecting ? "取消" : "选取");
};

function clearSelection(){
    screenMap.cancelSelect();
    screenMap.removeCurrentScreens();
    $("#screen-select-table tbody").html("");
};

var selecting = false;
$("#select_gis_screens").on("click", function(){
    if(selecting){
        changeState();
        screenMap.cancelSelect();
    }else{
        changeState();
        screenMap.selectScreens(function(range){
            //first ignore the range
            $("#confirm_gis_screens").show();
            $("#cancel_gis_screens").show();
            $("#select_gis_screens").hide();
            $.post(
                "/query/screens",
                {},
                function(data){
                    if(data.error){
                        alert("failt to load screens")
                    }else{
                        data.forEach(function(screen){
                            screenMap.addScreen(screen.longitude, screen.latitude);
                        });
                        $("#screen-select-table tbody").html(Templates["screen-list-item"]({
                            screens : data
                        }));
                    }
                }
            )
        });
    }
});

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

    clearSelection();
});

$("#cancel_gis_screens").on("click", function() {
    changeState();
    $("#select_gis_screens").show();
    $("#confirm_gis_screens").hide();
    $("#cancel_gis_screens").hide();
    clearSelection();
});