#!/usr/bin/env node

import { Command } from "commander";
import init from "./commands/init";
import add from "./commands/add";

const program = new Command();

program
    .name('Overlay UI')
    .description('CLI tool for Overlay UI')
    .version('0.1.0')

program
    .command('init')
    .description('Setup files for Overlay UI')
    .action(() => {
        init();
    })

program
    .command('add')
    .description('Setup files for Overlay UI')
    .argument('<component>', "The component you would like to add")
    .action((component: string) => {
        add(component)
    })

program.parse();

