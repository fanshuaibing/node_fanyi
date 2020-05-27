#!/usr/bin/env node
import * as commander from "commander";
import { translate } from "./main";

const program = new commander.Command();

program
  .version("0.0.6")
  .name("fy")
  .usage("<English||中文>")
  .arguments("<English||中文>")
  .action(function (word) {
    translate(word);
  });
program.parse(process.argv);
