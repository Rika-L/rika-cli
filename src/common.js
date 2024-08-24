import {GIT_URL} from "./constant.js";
import axios from "axios";
import ora from "ora";

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

export {fetchRepoLists,fnLoadingByOra}
