import fetch from "node-fetch";
import { confirm, log } from "@clack/prompts";
import { writeFile, mkdir } from "fs/promises"
import { dirname } from "path";
import DownloadFailedError from "../types/DownloadFailedError";
import { existsSync } from "fs";


export async function downloadFile(url: string, pathToDownload: string) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new DownloadFailedError(`Failed to download file - Fileserver responded with ${response.statusText}`)
    }
    const buffer = await response.arrayBuffer()

    if (existsSync(pathToDownload)) {
        const shouldContinue = await confirm({
            message: `A file already exists at ${pathToDownload}. Would you like to overwrite this?`
        })
        if (!shouldContinue) {
            log.error("Stopping download\n")
            throw new DownloadFailedError("Stopped by user")
        }
        log.message("")
    }

    const dir = dirname(pathToDownload)

    await mkdir(dir, {
        recursive: true,
    })

    await writeFile(pathToDownload, Buffer.from(buffer))

}
