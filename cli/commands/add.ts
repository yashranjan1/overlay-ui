import { intro, log, outro, spinner } from "@clack/prompts";
import readConfig from "../utilites/readConfig";
import FileDoesntExist from "../types/FileDoesntExistError";
import * as links from "../utilites/links.json"
import { join } from "path"
import DownloadFailedError from "../types/DownloadFailedError";
import { downloadFile } from "../utilites/fileDownloader";
import picocolors from "picocolors";

type Components = keyof typeof links.components;

async function add(component: string) {
    const s = spinner()
    try {
        const config = readConfig()

        if (!(component in links.components)) {
            log.error("This component does not exist")
            return
        }

        intro(picocolors.inverse(`Adding ${component}`))

        const parsed = JSON.parse(config)
        parsed["components"][component] = `${component}.js`

        const downloadLocation = join(parsed["componentsBaseURL"], parsed["components"][component])

        s.start("Downloading component")

        await downloadFile(links.components[component as Components], downloadLocation)

        s.stop("Done!")

        outro(`The ${component} component is now available at ${downloadLocation}`)

    }
    catch (error) {
        if (error instanceof FileDoesntExist) {
            log.error("Config not found, are you in the right directory?")
        }
        else if (error instanceof DownloadFailedError) {
            s.stop(`Download failed: ${error.message}`)
            outro("Download was interrupted")
        }
        else {
            log.error("An error occured, dumping error here")
            outro("Download was interrupted")
            console.error(error)
        }
    }
}

export default add;
