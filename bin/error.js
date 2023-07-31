const chalk = require('chalk')
const error = (message) => { 
    console.log(chalk.red(message))
}

module.exports = error