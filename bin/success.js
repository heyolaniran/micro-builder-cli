const chalk = require('chalk')
const success = (message) => { 
    console.log(chalk.green(message))
}

module.exports = success