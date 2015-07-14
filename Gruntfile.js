/**
 * Created by kliu on 08/07/2015.
 */

module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json')
    });
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['compile-client']);
};