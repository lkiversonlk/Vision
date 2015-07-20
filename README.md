Vision
===

The outdoor ad management system written in nodejs.

##Installation

* download the code from repository

        git clone %address%
        cd Vision
    
* install the necessary packages

        npm install
        
* install grunt-cli in global

        npm install -g grunt-cli
        
* run the grunt default task

        grunt
          
* write the config.yaml file in the project root dir

        nano config.yaml
  
    config.yaml:         
    > database: data
    
* at last, you should be able to run the server

        node bin/www
        
* we highly suggest you use supervisor to start the server

        npm install -g supervisor
        supervisor bin/www
        