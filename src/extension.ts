// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { child_process as childProcess } from 'mz';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerDocumentRangeFormattingEditProvider('haskell', {
		async provideDocumentRangeFormattingEdits(document, range, options, token) {
			const conf = vscode.workspace.getConfiguration('stylish-hindent');
			const cwd = vscode.workspace.rootPath;
			const stylishHaskell = conf.executables['stylish-haskell'];
			const hindent = conf.executables.hindent;
			const stylishArgs = conf.commandline['stylish-haskell'];
			const hindentArgs = conf.commandline.hindent;

			const report = (msg: string, err: Error) => {
				vscode.window.showErrorMessage(`${msg}: ${err.message}`);
				return [];
			};

			// Check for existence
			try {
				await childProcess.exec(`${hindent} --version`);
			} catch (e) {
				return report('Cannot execute hindent', e);
			}

			try {
				await childProcess.exec(`${stylishHaskell} --version`);
			} catch (e) {
				return report('Cannot execute stylish-haskell', e);
			}

			// Get the selection
			const text = document.getText();
			// TODO: Don't use synchronous calls here
			let newText = '';
			try {
				newText = childProcess
					.execSync(`${hindent} ${hindentArgs}`, { input: text, cwd })
					.toString();
			} catch (e) {
				return report('Execute of hindent failed with error: ', e);
			}
			try {
				newText = childProcess
					.execSync(`${stylishHaskell} ${stylishArgs}`, {
						input: newText,
						cwd,
					})
					.toString();
			} catch (e) {
				return report('Execute of stylish-haskell failed with error: ', e);
			}

			return [vscode.TextEdit.replace(range, newText)];
		},
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
