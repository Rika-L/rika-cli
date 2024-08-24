import {program} from "commander";
import {createProject} from "./create.js";

program.command('*')
    .alias('')
    .description('command not found')
    .action(() => {
        console.log('command not found')
        console.log("try 'rika-cli --help'")
    })

program.command('create')
    .alias('c')
    .description('create project')
    .action(() => {
        createProject(process.argv[3])
    })

// 监听用户的help事件
program.on('--help', () => {
    console.log('\nExamples:')
    console.log('rika-cli create <project-name>')
})


program.parse(process.argv)
