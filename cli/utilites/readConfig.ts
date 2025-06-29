import { existsSync, readFileSync } from "fs"
import FileDoesntExist from "../types/FileDoesntExistError";

function readConfig() {
    if (!existsSync("./overlay-components.json"))
        throw new FileDoesntExist()
    const data = readFileSync("./overlay-components.json", "utf8")
    return data
}

export default readConfig;
