import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
	Hover,
	MarkupContent,
	MarkupKind,
	Position,
	Definition
} from 'vscode-languageserver/node';

import {
	Range,
	TextDocument,
} from 'vscode-languageserver-textdocument';

import * as path from 'path';
import { URI } from 'vscode-uri';

const Abstr = "abstr";
const mizfiles = process.env.MIZFILES;
const fs = require('fs');

export function returnDefinition(
	document: TextDocument,
	wordRange: Range
): Definition
{
	const documentText = document.getText();
	const selectedWord = document.getText(wordRange);
	// 定義箇所のインデックスを格納する変数
	let startIndex = 0;
	let endIndex = 0;
	// 定義・定理・ラベルの参照する箇所のパターンをそれぞれ格納
	const definitionPattern = ":" + selectedWord + ":";
	const theoremPattern = "theorem " + selectedWord + ":";
	const labelPattern = selectedWord + ":";

    // 定義を参照する場合
    if ((startIndex = documentText.indexOf(definitionPattern)) > -1){
        endIndex = startIndex + definitionPattern.length;
    }
    // 定理を参照する場合
    else if ((startIndex = documentText.indexOf(theoremPattern)) > -1){
        endIndex = startIndex + theoremPattern.length;
    }
    // ラベルを参照する場合
    else if ((startIndex = documentText.lastIndexOf(labelPattern, 
            document.offsetAt(wordRange.start)-1)) > -1){
        endIndex = startIndex + labelPattern.length;
    }
    
    return {
        uri: document.uri,
        range: {
            start: document.positionAt(startIndex),
            end: document.positionAt(endIndex)
        }
    };
}

export function returnABSDefinition(
    document: TextDocument,
    wordRange: Range
): Definition
{
    if(mizfiles === undefined){
        return [];
    }
    const absDir = path.join(mizfiles,Abstr);
	const selectedWord = document.getText(wordRange);
	let [fileName] = selectedWord.split(':');
	// .absのファイルを参照する
	fileName = path.join(absDir,fileName.toLowerCase() + '.abs');
	const documentText = fs.readFileSync(fileName, "utf-8");
	let index = documentText.indexOf(selectedWord);
	let uri = URI.file(fileName).toString();

    return {
        uri,
        range: {
            start: document.positionAt(index),
            end: document.positionAt(index + selectedWord.length)
        }
    };
}