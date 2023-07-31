const error = require('./error') 
const { exec } = require('node:child_process') 
const chalk = require("chalk")
const fs = require('fs')
const success = require('./success')
const preMode = (script, path, mode) => { 
  
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
                    success(`${script} script successfully ran`)
                    exec(`npm --prefix ${path} ${mode}`, (err, output) => { 
                        if(err) 
                        {
                            error(`There is not script adapted to ${mode} your project in ${directory}. \n Please take a look for your scripts in your package.json`)
                            process.exit(1)
                        } 
                        else { 
                          success(`Your ${mode} process is successfully completed`)
                        }
                    })
                 })
            })
          
           }
        }

           
    })

} 

module.exports = preMode