import {DOWNLOAD_DIRECTORY, GITHUB_URL,GITEE_URL} from "./constant.js";
import axios from "axios";
import ora from "ora";
import {gitClonePromise} from '@rika_/git-clone'
import {rimraf} from 'rimraf'
import path from "node:path";

async function fetchRepoListsByGitHub() {
    const {data} = await axios.get(GITHUB_URL)
    return data
}

async function fetchRepoListsByGitEE() {
    const {data} = await axios.get(GITEE_URL)
    return data
}

const fnLoadingByOra = async (fn, message, ...args) => {
    const spinner = ora(message);
    spinner.color = "blue"
    spinner.start();
    let result = await fn(...args);
    spinner.succeed(); // 结束loading
    return result;
}


async function downDirByGitee(repo, projectName) {
    let dest = `${DOWNLOAD_DIRECTORY}/${repo}`;
    // 下载文件的路径
    await rimraf(dest)
    const resolvePath = path.join(path.resolve(), projectName);
    try {
        // await gitClonePromise(`git@github.com:rika-template/${repo}.git`, resolvePath)
        await gitClonePromise(`https://gitee.com/rika-template/${repo}.git`, resolvePath)
        await rimraf(resolvePath + '/.git')
    } catch (e) {
        console.log('下载失败')
        process.exit(0)
    }
}

async function downDirByGitHub(repo, projectName) {
    let dest = `${DOWNLOAD_DIRECTORY}/${repo}`;
    // 下载文件的路径
    await rimraf(dest)
    const resolvePath = path.join(path.resolve(), projectName);
    try {
        await gitClonePromise(`https://github.com/rika-template/${repo}.git`, resolvePath)
        // await gitClonePromise(`https://gitee.com/rika-template/${repo}.git`, resolvePath)
        await rimraf(resolvePath + '/.git')
    } catch (e) {
        console.log('下载失败')
        process.exit(0)
    }
}

export {fetchRepoListsByGitEE,fetchRepoListsByGitHub, fnLoadingByOra, downDirByGitee, downDirByGitHub}
