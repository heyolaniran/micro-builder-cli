#! /usr/bin/env node
const yargs = require("yargs/yargs")
const availableMode = ['build' , 'start'] ; 
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

const defaultMode = "build" ; 
var mode = argv.m || argv.mode   ; 
var path = argv.p  || argv.path ; 

if(path !== undefined) { 
   path =  path === true? '.' : path ; 
    console.log("path to apply" , path); 
}else 
{
    path = '.' ; 
    console.log("default path is ."); 
}

if(mode !== undefined) { 
    if(availableMode.includes(mode)) {
        console.log(' Your current valid  mode is  : ',  mode) ; 
    }else {
        mode = defaultMode ; 
        console.log(' Your default valid  mode is  : ',  mode) ; 
    }
}

