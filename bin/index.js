#! /usr/bin/env node
const yargs = require("yargs/yargs")
const { exec } = require('node:child_process')
const availableMode = ['build' , 'start'] ; 
var repositories = [] ; 
yargs(process.argv.slice(2))
.options('mode' , {
    alias : 'm' , 
    describe : "Would you 'build' your project for production or just 'start' your servers ?"
})
.option('path', {
    alias: 'p',
    describe: 'Where is located your amazing project on your Disk ? '
  })
  .demandOption(['mode', ], 'Please provide mode argument to launch your project with this tool')
  .help()
  .argv

const argv = yargs(process.argv).argv ; 

const defaultMode = "start" ; 
var mode = argv.m || argv.mode   ; 
var path = argv.p  || argv.path ; 



if(mode !== undefined) { 
    if(availableMode.includes(mode)) {
        console.log(' Your current valid  mode is  : ',  mode) ; 
    }else {
        mode = defaultMode ; 
        console.log(' Your default valid  mode is  : ',  mode) ; 
    }
}

if(path !== undefined) { 
    path =  path === true? '.' : path ; 
     console.log("path to apply" , path); 
 }else 
 {
     path = '.' ; 
     console.log("default path is ."); 
 }


  
       exec(`cd ${path}`, (err, output) => { 
            if(err) { 
                console.log("We have some difficulties to acces to your project directory. Take a look  :)")

               process.exit(1) ; 
            } 
    
            console.log("We're in your amazing project directory") ; 
            return true; 

        })

       


    



 exec(`ls ${path}`, (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command; something went wrong. Take a look ! ")
        process.exit(1)
      
    }
    // log the output received from the command
   var repo = output.split("\n") ; 
    repo.map(element => { 
      if(element.includes("micro")) { 
        repositories.push(element)
      }
   })

  if(repositories.length > 0) { 
    repositories.map((directory) => { 
        exec(`cd ${directory}`)
    })
  }else {
    console.log(`Nothing to ${mode} in this directory`) ; 
  }
})





