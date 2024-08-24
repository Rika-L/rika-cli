import {copyTempToTarget, downDir, fetchRepoLists, fnLoadingByOra} from './common.js';
import {select} from '@inquirer/prompts';
import chalk from "chalk";


export async function createProject(projectName) {
    const lang = await select({
        message: 'select language',
        choices: [{name: 'zh-cn', value: 'zh-cn'}, {name: 'en-us', value: 'en-us'}]
    });
    let repos = await fnLoadingByOra(fetchRepoLists, lang === 'zh-cn' ? '加载模板中...' : 'loading template...')
    let list = repos.map(item => item.name)
    list = list.map(item => ({
        name: item,
        value: item
    }));
    const answer = await select({
        message: lang === 'zh-cn' ? '选择模板' : 'select a template',
        choices: list
    });
    await fnLoadingByOra(downDir, lang === 'zh-cn' ? '下载文件中...' : 'download file...', answer);
    await fnLoadingByOra(copyTempToTarget, lang === 'zh-cn' ? '移动文件' : 'move file', answer, projectName)
    console.log(chalk.green('\nsuccess🎆'))
    console.log(chalk.yellow(`\n $ cd ${projectName}`))
    console.log(chalk.yellow(`\n $ pnpm install`))
    console.log(chalk.yellow(`\n $ pnpm run dev\n`))
}
