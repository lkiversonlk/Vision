/**
 * Created by kliu on 08/07/2015.
 */

var Datastore = require("nedb");

function Dao(param){
    var self = this;
    self.db = {};
    self.db.logins = new Datastore({
        filename: param + "/logins.nedb",
        autoload : true
    });
    self.db.users = new Datastore({
        filename : param + "/users.nedb",
        autoload : true
    });
};

Dao.prototype.add = function(type, docs, callback){
    var self = this;
    self.db[type].insert(docs, callback);
};

Dao.prototype.all = function(type, callback){
    var self = this;
    self.db[type].find({}).exec(callback);
};

Dao.prototype.get = function(type, query, callback){
    var self = this;
    self.db[type].find(query, callback);
};

Dao.prototype.set = function(type, query, fields, callback){
    var self = this;
    self.db[type].update(query,
        {
            $set : fields
        },
        {
            multi : true
        },
        callback);
};

/**
 * message structure
 * from:
 * date:
 * title:
 * body:
 * read:
 * @type {*[]}
 */
var fakeMessages = [
    {
        id   : "sdfasfff",
        from : "物料管理系统",
        date : "2012.12.20",
        title : "物料23x83已经通过审核",
        body : "尊敬的用户，您上传的广告物料‘美味披萨’已经通过了审核，可以开始投放",
        seen : true
    },
    {
        id   : "sdfasdaaaa",
        from : "投放管理系统",
        date : "2013.4.22",
        title : "物料23x83已经开始播放",
        body : "尊敬的用户，您的广告物料‘美味披萨’已经在朝阳区，海淀区的广告屏上开始播放啦"
    },
    {
        id : "sdfaaaaffef",
        from : "账户中心",
        date : "2013.6.10",
        title : "账户余额不足",
        body : "尊敬的用户，您上传的广告物料‘美味披萨’已经通过了审核，可以开始投放",
        seen : true
    },
    {
        id  : "sdfasdfasf",
        from : "物料管理系统",
        date : "2012.12.20",
        title : "物料23x83已经通过审核",
        body : "尊敬的用户，您上传的广告物料‘美味披萨’已经通过了审核，可以开始投放"
    }
];

var fakeScreens = [
    {
        "id": "20140101",			//屏幕ID
        "longitude":"116.460323",
        "latitude": "39.920912",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "160cm",				//屏幕摆放高度
        "utility": "1.2",				//物业费
        "prices": 30000,			//房价
        "age": 10,					//房龄
        "avg": 100,					//单元居住人数
        "traffic": 2000,				//日均人流
        "size": "10.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120101",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 2.2,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140104",			//屏幕ID
        "longitude":"116.442213",
        "latitude": "39.94271",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "4.2",				//物业费
        "prices": 46000,			//房价
        "age": 9,					//房龄
        "avg": 120,					//单元居住人数
        "traffic": 2580,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 1,					//是否有wifi热点
        "uid": "20120104",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 2.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140103",			//屏幕ID
        "longitude":"116.200317",
        "latitude": "39.926113",	//屏幕地理位置坐标
        "position": "right",			//屏幕摆放位置
        "put": "180cm",				//屏幕摆放高度
        "utility": "2.2",				//物业费
        "prices": 26000,			//房价
        "age": 12,					//房龄
        "avg": 140,					//单元居住人数
        "traffic": 1580,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 0,					//有无声音
        "online": 0,					//是否在线
        "wifi": 1,					//是否有wifi热点
        "uid": "20120103",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 2.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140102",			//屏幕ID
        "longitude":"113.052799",
        "latitude": "28.248992",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "160cm",				//屏幕摆放高度
        "utility": "3.2",				//物业费
        "prices": 38000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 2500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120102",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.2,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140105",			//屏幕ID
        "longitude":"116.487703",
        "latitude": "40.002041",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "2.8",				//物业费
        "prices": 34000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 3500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120105",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140106",			//屏幕ID
        "longitude":"116.336716",
        "latitude": "39.969631",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "1.8",				//物业费
        "prices": 32000,			//房价
        "age": 13,					//房龄
        "avg": 140,					//单元居住人数
        "traffic": 2200,				//日均人流
        "size": "10.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120106",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 2.8,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140129",			//屏幕ID
        "longitude":"116.487703",
        "latitude": "40.002041",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "2.8",				//物业费
        "prices": 34000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 3500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120105",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140168",			//屏幕ID
        "longitude":"116.487703",
        "latitude": "40.002041",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "2.8",				//物业费
        "prices": 34000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 3500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120105",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140145",			//屏幕ID
        "longitude":"116.487703",
        "latitude": "40.002041",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "2.8",				//物业费
        "prices": 34000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 3500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120105",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140126",			//屏幕ID
        "longitude":"116.487703",
        "latitude": "40.002041",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "2.8",				//物业费
        "prices": 34000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 3500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120105",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    },
    {
        "id": "20140122",			//屏幕ID
        "longitude":"116.487703",
        "latitude": "40.002041",	//屏幕地理位置坐标
        "position": "left",			//屏幕摆放位置
        "put": "170cm",				//屏幕摆放高度
        "utility": "2.8",				//物业费
        "prices": 34000,			//房价
        "age": 6,					//房龄
        "avg": 200,					//单元居住人数
        "traffic": 3500,				//日均人流
        "size": "18.5",				//屏幕尺寸
        "screen": "1028,720",		//屏幕分辨率
        "sound": 1,					//有无声音
        "online": 0,					//是否在线
        "wifi": 0,					//是否有wifi热点
        "uid": "20120105",			//WiFi UID
        "interactive": 0,				//有无互动
        "feedback": 1,				//有无反馈图片
        "avg_compet": 3.6,			//历史平均竞得价
        "format": "flv"				//可供选择的视屏文件格式
    }
];

Dao.prototype.rest = function(path, params, callback){
    var self = this;
    switch (path) {
        case "/balance":
            callback(null, Math.random());
            break;
        case "/creatives":
            callback(null, Math.random());
            break;
        case "/messages":
            callback(null, fakeMessages);
            break;
        case "/screens":
            callback(null, fakeScreens);
            break;
        default :
            callback({});
    }
};

exports.Dao = Dao;
