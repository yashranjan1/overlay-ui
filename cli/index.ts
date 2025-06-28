import { Command } from "commander";
import setup from "./commands/setup";

const program = new Command();

program
    .name('Overlay UI')
    .description('CLI tool for Overlay UI')
    .version('0.1.0')

program
    .command('setup')
    .description('Setup files for Overlay UI')
    .action(() => {
        setup();
    })

program.parse();

