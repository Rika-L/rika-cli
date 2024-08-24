const VERSION = '1.0.0'

const GIT_URL = 'https://api.github.com/orgs/rika-template/repos'

const DOWNLOAD_DIRECTORY = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}\\.myTemplate`;


export {VERSION, GIT_URL, DOWNLOAD_DIRECTORY}


