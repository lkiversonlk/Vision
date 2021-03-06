/**
 * Created by kliu on 06/07/2015.
 * Screen use Baidu Map API to
 */

function ScreenMap(mapId){
    var self = this;
    self.map = new BMap.Map(mapId);
    self.map.centerAndZoom(new BMap.Point(116.404,39.915), 15);
    self.map.enableScrollWheelZoom();
    self.map.addControl(new BMap.NavigationControl());

    self.selectedScreens = [];
    self.selectOverlay = null;

    if(BMapLib){
        var styleOption = {
            strokeColor : "green",
            fillColor : "green",
            strokeWeight : 1,
            strokeOpacity : 0.8,
            fillOpacity : 0.3,
            strokeStyle : "solid"
        };

        self.drawingManager = new BMapLib.DrawingManager(
            self.map,
            {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: false, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5, 5), //偏离值
                    scale: 1, //工具栏缩放比例
                    drawingModes: [
                        BMAP_DRAWING_CIRCLE
                    ]
                },
                circleOptions : styleOption
            }
        );
        self.drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
        self.drawingManager.addEventListener('circlecomplete', function(e, overlay){
            self.selectOverlay = overlay;
            self.drawingManager.close();
            $(self.selectEvent).trigger("selected", overlay);
        });
    }
    self.selectEvent = {};
    self.showingScreens = [];
};

ScreenMap.prototype.addScreen = function(lon, lat){
    var self = this;
    var point = new BMap.Point(lon, lat);
    var myIcon = new BMap.Icon("/images/screen.png", new BMap.Size(50, 50), {
        offset : new BMap.Size(0, 150)
        //imageOffset: new BMap.Size(-20, 0)
    });
    var marker = new BMap.Marker(point, {icon : myIcon});
    self.map.addOverlay(marker);
    self.showingScreens.push(marker);
    marker.addEventListener("click", function(event){
        $(self).trigger("screen_click", event);
    })
};

ScreenMap.prototype.removeSelectOverlay = function(){
    var self = this;
    if(self.selectOverlay){
        self.map.removeOverlay(self.selectOverlay);
        self.selectOverlay = null;
    }
};

ScreenMap.prototype.selectScreens = function(callback){
    var self = this;
    self.drawingManager.open();
    self.removeCurrentScreens();
    $(self.selectEvent).unbind("selected");
    $(self.selectEvent).on("selected", callback);
};

ScreenMap.prototype.removeCurrentScreens = function(){
    var self = this;
    self.showingScreens.forEach(function(screen){
        self.map.removeOverlay(screen);
    });
}