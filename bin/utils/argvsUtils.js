const argvsExist = (argv) => { 
    if(argv != true && argv !== undefined && argv !== "")
    return true ; 

    return false 
}

const preScriptExist = (prescipt ,  postscript) => { 
    if(argvsExist(prescipt) && argvsExist(postscript))
    return true ; 

    return false ; 
}

module.exports = {argvsExist , preScriptExist}