import fetch from "node-fetch";
import { writeFile, mkdir } from "fs/promises"
import { dirname } from "path";
import { arrayBuffer } from "stream/consumers";


export async function downloadFile(url: string, pathToDownload: string) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`)
    }
    const buffer = await response.arrayBuffer()

    const dir = dirname(pathToDownload)
    await mkdir(dir, {
        recursive: true,
    })

    await writeFile(pathToDownload, Buffer.from(buffer))

}
