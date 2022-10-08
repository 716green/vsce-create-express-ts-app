import { appFile } from "./collections";
import * as vscode from "vscode";

export const createTsConfig = async (terminal: vscode.Terminal) => {
  terminal.sendText("npx tsconfig.json");
  terminal.sendText("node(Default)");
};

//? generate ENV, README, and .gitignore files
export const createDefaultFiles = async (terminal: vscode.Terminal) => {
  terminal.sendText("echo 'PORT=3000' >> .env");
  const folderName = vscode.workspace.name;
  terminal.sendText(`echo '# ${folderName}' >> .README.md`);
  terminal.sendText("echo 'node_modules\ndist\n*.env*' >> .gitignore");
};

export const initProject = async (terminal: vscode.Terminal) => {
  terminal.sendText("echo 'creating app'");
  terminal.sendText("npm init -y");
  terminal.sendText("npm i express dotenv");
  terminal.sendText("npm i -D typescript nodemon @types/express @types/node");
  terminal.sendText("git init");
};

export const createTsFiles = async (terminal: vscode.Terminal) => {
  terminal.sendText("mkdir src");
  terminal.sendText(`echo "${appFile}" >> src/index.ts`);
};

export const installDeps = async (terminal: vscode.Terminal) => {
  terminal.sendText("npm install");
};

export const updateScripts = async (terminal: vscode.Terminal) => {
  terminal.sendText("echo 'updating scripts'");
  terminal.sendText('nodemon -w src/* --exec "tsc && node dist/index.js"');

  terminal.sendText(`
  npx npm-add-script \
  -k "serve" \
  -v \"nodemon -w src/* --exec \\\"tsc && node dist/index.js\\\"\" \
  --force`);
  terminal.sendText("");
};

export const buildDist = async (terminal: vscode.Terminal) => {
  terminal.sendText("npx tsc");
};
