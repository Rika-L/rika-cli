import {DOWNLOAD_DIRECTORY, GIT_URL} from "./constant.js";
import axios from "axios";
import ora from "ora";
import {gitClonePromise} from '@rika_/git-clone'
import {rimraf, rimrafSync} from 'rimraf'
import path from "node:path";
import ncp from "ncp";

async function fetchRepoLists() {
    const {data} = await axios.get(GIT_URL)
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


async function downDir(repo) {
    let dest = `${DOWNLOAD_DIRECTORY}/${repo}`;
    // 下载文件的路径
    await rimraf(dest)
    try {
        await gitClonePromise(`git@github.com:rika-template/${repo}.git`, dest)
        await rimraf(dest + '/.git')
    } catch (e) {
        console.log(e);
    }
}

async function copyTempToTarget(repo, projectName) {
    let dest = `${DOWNLOAD_DIRECTORY}/${repo}`;
    const resolvePath = path.join(path.resolve(), projectName);
    await ncp(dest, resolvePath);
}

export {fetchRepoLists, fnLoadingByOra, downDir, copyTempToTarget}
