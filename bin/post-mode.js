const {exec} = require('node:child_process')
const chalk = require("chalk")
const fs = require('fs')
const success = require('./success')
const error = require('./error')
 const postMode =  (script , path) => { 
   
        exec(` ls ${path}` , (err , output) => { 
             if(err)
             {
                 error("We have some difficulties to enter in your micro repositories")
                 process.exit(1)
             }

             const file = output.split("\n") ; 
             if(file.includes("package.json")) { 
                const package = fs.readFileSync(`${path}/package.json`, 'utf8') ; 
                const data = JSON.parse(package)
               if(data.scripts.hasOwnProperty(script)) { 
                console.log(`We are trying to run ${chalk.green(script)} after your mode execution...`)
                  
                exec(`cd ${path}` , (err , output) => { 
                   if(err) { 
                     error(`We have some difficulties to enter in ${path} directory`)
                     process.exit(1)
                   }

                   exec(`` , (err, output) => { 
                     if(err) { 
                        error(` Something gone wrong while we ran ${script} script `)
                        console.error(err)
                        process.exit(1)
                    }
                    success(`${script} script successfully ran`) 
                    process.exit(1)
                   })
                })

               }
             } else 
             { 
                error(`${path} doesn't contain package.json`)
                process.exit(1)
             }
        }) ; 
 }
   
module.exports = postMode 