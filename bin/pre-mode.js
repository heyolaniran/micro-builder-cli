const error = require('./error') 
const { exec } = require('node:child_process') 
const chalk = require("chalk")
const fs = require('fs')
const success = require('./success')
const preMode = (script, path) => { 
  
    exec(` ls ${path}` , (err, output) => { 
        if(err) { 
            error(`We have some difficulties to access to ${path} Take a look  :)`)
           process.exit(1) ; 
        } 
        var files = output.split("\n") ; 
        
        if(!files.includes('package.json'))
        {
            error(`${path} doesn't contain package.json`)
            process.exit(1)
        }else { 
            const package = fs.readFileSync(`${path}/package.json`, 'utf8') ; 
            const data = JSON.parse(package)
           if(data.scripts.hasOwnProperty(script)) { 
            console.log(`We are trying to run ${chalk.green(script)} before your mode execution...`)
            exec(`cd ${path}` , (err , output) => { 
                if(err) { 
                    error(`We have some difficulties to enter in ${path} directory`)
                    process.exit(1)
                }
              
                exec(`npm --prefix ${path} ${script}`, (err , output) => { 
                    if(err) { 
                        error(` Something gone wrong while we ran ${script} script `)
                        console.error(err)
                        process.exit(1)
                    }
                    console.log(output)
                    success(`${script} script successfully ran`)
                 })
            })
          
           }
        }

           
    })

} 

module.exports = preMode