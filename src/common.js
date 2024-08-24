import {GIT_URL} from "./constant.js";
import axios from "axios";

async function fetchRepoLists() {
    const {data} = await axios.get(GIT_URL)
    return data
}

export {fetchRepoLists}
