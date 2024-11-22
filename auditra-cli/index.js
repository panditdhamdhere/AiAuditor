#!/usr/bin/env node

const { Command } = require("commander");

const inquirer = require("inquirer");

const { analyzeContract } = require("./src/ai-prompt");

const fs = require("fs");

const path = require("path");

const program = new Command();

program
  .name("auditai")
  .description("A CLI tool to audit the smart contracts using OpenAI")
  .version("1.0.0");

const getApiKey = async () => {
  const { apiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your OpenAI API Key",
      validate: (input) =>
        input.length > 0 || "Please enter your OpenAI API Key",
    },
  ]);

  return apiKey;
};

program
  .command("check <file>")
  .description("Analyze a smart contract")
  .action(async (file) => {
    try {
      const apiKey = await getApiKey();
      const contractPath = path.resolve(process.cwd(), file);
      console.log(`Checking file at path: ${contractPath}`);

      if (!fs.existsSync(contractPath)) {
        console.error(`File not found at path: ${contractPath}`);
        process.exit(1);
      }

      if (fs.statSync(contractPath).isDirectory()) {
        console.error(`Path is a directory, not a file: ${contractPath}`);
        process.exit(1);
      }

      const contract = fs.readFileSync(contractPath, "utf8");

      await analyzeContract(contract, apiKey);
    } catch (error) {
      console.error("Error analyzing contract:", error.message);
    }
  });

program.parse(process.argv);