
const { exec } = require('node:child_process') 
const chalk = require("chalk")
const preMode = (script, path) => { 
    console.log(`You are trying to run ${chalk.green(script)} before your mode execution...`)

    exec(` cd ${path}` , (err, output) => { 
        if(err) { 
            error("We have some difficulties to acces to your project directory. Take a look  :)")

           process.exit(1) ; 
        } 
    })

} 

module.exports = preMode