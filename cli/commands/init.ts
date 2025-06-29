import {
    intro,
    outro,
    select,
    log,
    spinner,
    isCancel,
    cancel,
    text,
} from '@clack/prompts';
import fs from "fs"
import { mkdir } from 'fs/promises';
import gradient from 'gradient-string';
import { downloadFile } from '../utilites/fileDownloader';
import { writeFile } from 'fs/promises';
import path from 'path';
import * as links from "../utilites/links.json"
import DownloadFailedError from '../types/DownloadFailedError';


async function init() {

    const logo = gradient([
        {
            r: 142,
            g: 81,
            b: 255
        },
        {
            r: 0,
            g: 146,
            b: 184
        }
    ]).multiline(logoPrompt)


    console.log(logo)

    intro("Setup")

    const dirName = await text({
        message: 'Where would you like your components being stored? (default ./)',
        placeholder: './relative/path/to/dir',
        defaultValue: './'
    });

    if (isCancel(dirName)) {
        cancel('Operation cancelled');
        return process.exit(0);
    }

    if (!fs.existsSync(dirName) || !fs.statSync(dirName).isDirectory()) {
        log.error("Folder does not exist, please enter a valid folder")
        return process.exit(1);
    }


    const s = spinner();

    s.start("Starting")
    s.message("Setting up tailwind")
    try {
        await downloadFile(links.tailwindConfig, "./tailwind.config.ts")
    }
    catch (error) {
        if (error instanceof DownloadFailedError) {
            log.error(`Download failed: ${error.message}`)
            s.stop("Exiting")
            outro("Setup failed")
            return
        }
        log.error(error as string)
        s.stop("An error occured")
        outro("Setup failed")
        return
    }

    s.message("Making config for components")

    const basePath = path.join(dirName, "components")

    if (fs.existsSync(basePath)) {
        log.info(`Using existing components folder at ${dirName}\n`)
    }
    else {
        await mkdir(basePath)
    }

    const config = {
        componentsBaseURL: basePath,
        components: {}
    }

    await writeFile("./overlay-components.json", JSON.stringify(config))

    s.stop('Setup complete');

    outro("You're all set!");

}

const logoPrompt = `
 ██████╗ ██╗   ██╗███████╗██████╗ ██╗      █████╗ ██╗   ██╗    ██╗   ██╗██╗
██╔═══██╗██║   ██║██╔════╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ██║   ██║██║
██║   ██║██║   ██║█████╗  ██████╔╝██║     ███████║ ╚████╔╝     ██║   ██║██║
██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║     ██╔══██║  ╚██╔╝      ██║   ██║██║
╚██████╔╝ ╚████╔╝ ███████╗██║  ██║███████╗██║  ██║   ██║       ╚██████╔╝██║
 ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═╝
                                                                           
                                                                           `


export default init;

