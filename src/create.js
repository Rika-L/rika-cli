import {fetchRepoLists, fnLoadingByOra} from './common.js';
import {select} from '@inquirer/prompts';
import ora from "ora";

export async function createProject(projectName) {
    let repos = await fnLoadingByOra(fetchRepoLists,'加载模板中')
    let list = repos.map(item => item.name)
    list = list.map(item => ({
        name: item,
        value: item
    }));
    const answer = await select({
        message: '请选择一个项目模板',
        choices: list
    });
    console.log(answer);
    // const target = await fnLoadingByOra(downDir, '下载项目中...',answer);

}
