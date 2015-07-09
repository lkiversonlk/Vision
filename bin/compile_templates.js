/**
 * Created by kliu on 09/07/2015.
 */
var jade = require("jade");
var fs = require("fs");
var path = require("path");
var winston = require("winston");

var template_folder = "public/templates";

templates = fs.readdirSync(template_folder);

templates.forEach(function(template){
    var template_path = path.join(template_folder, template);
    if(fs.lstatSync(template_path).isDirectory()){
        var components = fs.readdirSync(template_path);
        var compiled_template = {};
        components.forEach(function(componnet){
            if(1){
                var name = path.basename(componnet, ".jade");
                var component_path = path.join(template_path, componnet);
                winston.log("debug", "parsing file " + component_path);
                var content = fs.readFileSync(component_path, {encoding : "utf8"});
                compiled_template[name] = jade.compileClient(content, {
                    debug : false,
                    compileDebug : true,
                    filename : component_path
                });
            }
        });
        var properties = []
        for(var key in compiled_template){
            properties.push(JSON.stringify(key) + ':\n' + compiled_template[key].toString());
        };
        var output = 'var Templates = {\n' + properties.join(',\n\n') + '};';
        var outname = template_path + ".js";
        fs.writeFile(outname, output);
    }
});