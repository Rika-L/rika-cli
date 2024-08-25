import {
    downDirByGitee,
    downDirByGitHub,
    fetchRepoListsByGitEE,
    fetchRepoListsByGitHub,
    fnLoadingByOra
} from './common.js';
import {select} from '@inquirer/prompts';
import chalk from "chalk";


export async function createProject(projectName) {

    const lang = await select({
        message: 'select language',
        choices: [{name: 'zh-cn', value: 'zh-cn'}, {name: 'en-us', value: 'en-us'}]
    });
    const git = await select({
        message: lang === 'zh-cn' ? "选择仓库" : "select git",
        choices: [{name: 'GITHUB', value: 'github'}, {name: 'GITEE', value: 'gitee'}]
    });
    if (git === 'gitee') {
        let repos = await fnLoadingByOra(fetchRepoListsByGitEE, lang === 'zh-cn' ? '加载模板中...' : 'loading template...')
        let list = repos.map(item => item.name)
        list = list.map(item => ({
            name: item,
            value: item
        }));
        const answer = await select({
            message: lang === 'zh-cn' ? '选择模板' : 'select a template',
            choices: list
        });
        await fnLoadingByOra(downDirByGitee, lang === 'zh-cn' ? '下载文件中...' : 'download file...', answer, projectName);
    }
    if (git === 'github') {
        let repos = await fnLoadingByOra(fetchRepoListsByGitHub, lang === 'zh-cn' ? '加载模板中...' : 'loading template...')
        let list = repos.map(item => item.name)
        list = list.map(item => ({
            name: item,
            value: item
        }));
        const answer = await select({
            message: lang === 'zh-cn' ? '选择模板' : 'select a template',
            choices: list
        });
        await fnLoadingByOra(downDirByGitHub, lang === 'zh-cn' ? '下载文件中...' : 'download file...', answer, projectName);
    }
    console.log(chalk.green('\nsuccess🎆'))
    console.log(chalk.yellow(`\n $ cd ${projectName}`))
    console.log(chalk.yellow(`\n $ pnpm install`))
    console.log(chalk.yellow(`\n $ pnpm run dev\n`))
}
