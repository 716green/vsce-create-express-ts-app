/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import {
  createTsFiles,
  initProject,
  createDefaultFiles,
  installDeps,
  createTsConfig,
  updateScripts,
  buildDist,
} from "./terminalFunctions";

const createApp = async () => {
  vscode.window.showInformationMessage("creating app - please wait");
  const terminalA = vscode.window.createTerminal("app");
  const terminalB = vscode.window.createTerminal("config");
  const terminalC = vscode.window.createTerminal("scripts");

  //* initialize project
  (async () => {
    await createTsFiles(terminalA);
    await initProject(terminalA);
    await createDefaultFiles(terminalA);
    await installDeps(terminalA);
    await createTsConfig(terminalC);

    await updateScripts(terminalB);
    await buildDist(terminalA);
  })().then(async () => {
    setTimeout(() => {
      //? close terminals
      terminalB.dispose();
      terminalC.dispose();

      //? run app
      vscode.window.showInformationMessage("app created - starting server");
      terminalA.show();
      terminalA.sendText("npm run serve");
    }, 10000);
  });
};

export const activate = (context: vscode.ExtensionContext) => {
  const createExpressApp = vscode.commands.registerCommand(
    "create-node-ts-app.createApp",
    createApp
  );

  const commands = [createExpressApp];

  commands.forEach((command) => context.subscriptions.push(command));
};

export const deactivate = () => {};
