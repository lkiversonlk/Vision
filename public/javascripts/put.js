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
                    var filterFunc = generateFilterFuction();
                    data = data.filter(function(screen){
                        return filterFunc(screen);
                    })
                    applyScreens(data);
                }
            }
        );
    });
});

/*

$("#cancel_gis_screens").on("click", function() {
    changeState();
    $("#select_gis_screens").show();
    $("#confirm_gis_screens").hide();
    $("#cancel_gis_screens").hide();
    applyScreens([]);
});
*/

var filters = [
    {
        title: "房价/平方米",
        property : "price",
        type: "checkbox",
        options:[
            {
                value:"1至2万",
                func :function(value){
                    return 1<=value && value <= 2;
                }
            },
            {
                value:"2至5万",
                func :function(value){
                    return 2<=value && value <=5;
                }
            },
            {
                value:"5至10万",
                func :function(value){
                    return 5<= value && value <=10;
                }
            },
            {
                value:"10万以上",
                func :function(value){
                    return 10 <= value;
                }
            }
        ]
    },
    {
        title: "房龄",
        property : "age",
        type: "checkbox",
        options:[
            {
                value:"1至3年",
                func :function(value){
                    return 1<= value && value<= 3;
                }
            },
            {
                value:"3至8年",
                func :function(value){
                    return 3<= value && value <=8;
                }
            },
            {
                value:"8至15年",
                func :function(value){
                    return 8 <= value && value <= 15;
                }
            },
            {
                value:"15年以上",
                func :function(value){
                    return 15 <= value;
                }
            }
        ]
    }
];

/**
 * according to the filter params and selection generate the filter function corresponding to this filter option
 * @param filter
 * @param selections
 * @returns {Function}
 */
function generateSingleFilterFunction(filter, selections){
    return function(screen){
        return selections.some(function(item){
            return filter.options[item].func(screen[filter.property]);
        });
    }
};

/**
 * according to current selection result generate the filter function
 */
function generateFilterFuction(){
    var filtersHtmls = $("#filter-body span.filter-options");
    var filterFunctions = filtersHtmls.map(function(filterIndex,filterHtml){
        var selections = [];
        $(filterHtml).find("span.filter-select").each(function(conditionIndex, conditionHtml){
            var input = $(conditionHtml).find("input").get(0);
            if(filters[filterIndex].type == "checkbox"){
                if(input.checked){
                    selections.push(conditionIndex);
                }
            }
        });

        return generateSingleFilterFunction(filters[filterIndex], selections);
    }).toArray();

    return function(screen){
        return filterFunctions.every(function(filterFunc){
            var ret = filterFunc(screen);
            return ret;
        })
    }
};

$("#filter-body").html(Templates['screen-filter-div']({filters : filters}));

$("#confirm-screen-selection").on("click", function() {
    var selectedScreens = [];
    $("#screen-select-table tbody tr").each(function(index){
        if($(this).find("td input").get(0).checked){
            selectedScreens.push($(this).attr('screen'));
        }
    });
    addScreensToSelection(selectedScreens);
    printSelection(finalSelections);
});

var finalSelections = [];
function addScreensToSelection(screens){
    screens.forEach(function(screenid){
        if(finalSelections.indexOf(screenid) == -1){
            finalSelections.push(screenid);
        }
    })
}
function printSelection(screens){
    $("#selection-stats").find("i").html(
        screens.length
    );
    $("#screen-info-div").find("div.panel-body ul").html("");
    screens.forEach(function(screenid){
        $("#screen-info-div").find("div.panel-body ul").append(
            '<li class="list-group-item">' + screenid + '</li>'
        )
    });
}

$("#make-strategy").on("click", function(){
    $("#select-panel").hide({
        duration : 1000,
        done : function(){
            $("#strategy-panel").show({
                duration : 1000
            });
        }
    });
});