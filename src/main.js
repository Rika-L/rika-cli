import {program} from "commander";
import {createProject} from "./create.js";
import chalk from 'chalk';

console.log(chalk.cyan('\n' +
    '         _                _              _                 _          \n' +
    '        /\\ \\             /\\ \\           /\\_\\              / /\\        \n' +
    '       /  \\ \\            \\ \\ \\         / / /  _          / /  \\       \n' +
    '      / /\\ \\ \\           /\\ \\_\\       / / /  /\\_\\       / / /\\ \\      \n' +
    '     / / /\\ \\_\\         / /\\/_/      / / /__/ / /      / / /\\ \\ \\     \n' +
    '    / / /_/ / /        / / /        / /\\_____/ /      / / /  \\ \\ \\    \n' +
    '   / / /__\\/ /        / / /        / /\\_______/      / / /___/ /\\ \\   \n' +
    '  / / /_____/        / / /        / / /\\ \\ \\        / / /_____/ /\\ \\  \n' +
    ' / / /\\ \\ \\      ___/ / /__      / / /  \\ \\ \\      / /_________/\\ \\ \\ \n' +
    '/ / /  \\ \\ \\    /\\__\\/_/___\\    / / /    \\ \\ \\    / / /_       __\\ \\_\\\n' +
    '\\/_/    \\_\\/    \\/_________/    \\/_/      \\_\\_\\   \\_\\___\\     /____/_/\n' +
    '                                                                      \n'))

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
