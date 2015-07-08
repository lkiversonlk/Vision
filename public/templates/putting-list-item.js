function template(locals) {
var jade_debug = [ new jade.DebugItem( 1, "public/templates/putting-list-item.jade" ) ];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (puttings, undefined) {
jade_debug.unshift(new jade.DebugItem( 0, "public/templates/putting-list-item.jade" ));
jade_debug.unshift(new jade.DebugItem( 1, "public/templates/putting-list-item.jade" ));
buf.push("<!--");
jade_debug.unshift(new jade.DebugItem( 1, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
buf.push("Created by kliu on 07/07/2015.");
jade_debug.shift();
jade_debug.shift();
buf.push("-->");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 3, "public/templates/putting-list-item.jade" ));
buf.push("<!--render every putting in puttings,-->");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 4, "public/templates/putting-list-item.jade" ));
buf.push("<!--generate the html content-->");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 5, "public/templates/putting-list-item.jade" ));
buf.push("");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 6, "public/templates/putting-list-item.jade" ));
// iterate puttings
;(function(){
  var $$obj = puttings;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var putting = $$obj[$index];

jade_debug.unshift(new jade.DebugItem( 6, "public/templates/putting-list-item.jade" ));
jade_debug.unshift(new jade.DebugItem( 7, "public/templates/putting-list-item.jade" ));
buf.push("<li>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 8, "public/templates/putting-list-item.jade" ));
buf.push("" + (jade.escape((jade_interp = putting.name) == null ? '' : jade_interp)) + "");
jade_debug.shift();
jade_debug.shift();
buf.push("</li>");
jade_debug.shift();
jade_debug.shift();
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var putting = $$obj[$index];

jade_debug.unshift(new jade.DebugItem( 6, "public/templates/putting-list-item.jade" ));
jade_debug.unshift(new jade.DebugItem( 7, "public/templates/putting-list-item.jade" ));
buf.push("<li>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 8, "public/templates/putting-list-item.jade" ));
buf.push("" + (jade.escape((jade_interp = putting.name) == null ? '' : jade_interp)) + "");
jade_debug.shift();
jade_debug.shift();
buf.push("</li>");
jade_debug.shift();
jade_debug.shift();
    }

  }
}).call(this);

jade_debug.shift();
jade_debug.shift();}.call(this,"puttings" in locals_for_with?locals_for_with.puttings:typeof puttings!=="undefined"?puttings:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "//\r\n   Created by kliu on 07/07/2015.\r\n//render every putting in puttings,\r\n//generate the html content\r\n\r\neach putting in puttings\r\n   li\r\n       | #{putting.name}\r\n");
}
}