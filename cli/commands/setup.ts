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
import gradient from 'gradient-string';
import fetch from 'node-fetch';
import { downloadFile } from '../utilites/fileDownloader';


async function setup() {

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

    if (!fs.existsSync(dirName)) {
        log.error("Folder does not exist, please enter a valid folder")
        return process.exit(1);
    }

    let tailwindExist = false
    let overwriteConfig: boolean | symbol = false

    if (fs.existsSync('./tailwind.config.ts') || fs.existsSync('./tailwind.config.js')) {
        tailwindExist = true

        log.info("Tailwind config detected")

        overwriteConfig = await select({
            message: 'Would you like me to overwrite your tailwind config? This will completely delete your existing config',
            options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
            ],
        });

        if (isCancel(overwriteConfig)) {
            cancel('Operation cancelled');
            return process.exit(0);
        }

        if (!overwriteConfig) {
            log.warn("You have chosen not to overwrite your config, please make sure you take a look at the tailwind section of the docs to add the necessary config")
        }
    }


    const s = spinner();

    if (!tailwindExist || overwriteConfig) {
        s.start("Making Tailwind Config")
        await downloadFile("https://raw.githubusercontent.com/yashranjan1/overlay-ui/refs/heads/master/tailwind.config.ts", "./tailwind.config.ts")

    }


    s.stop('Installed via npm');

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

export default setup;

