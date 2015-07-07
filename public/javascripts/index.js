/**
 * Created by kliu on 07/07/2015.
 */


var fake_puttings = [
    {
        name : "test1"
    },
    {
        name : "test2"
    },
    {
        name : "test3"
    }
];

var fn = jade.compile("div\n    | #{hello}");
var html = fn({
    "hello" : "this is jsut a test"
});
alert(html);