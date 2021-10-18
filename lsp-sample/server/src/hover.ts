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
	Position
} from 'vscode-languageserver/node';

import {
	Range,
	TextDocument,
} from 'vscode-languageserver-textdocument';

import { URI } from 'vscode-uri';

import * as path from 'path';

const Abstr = "abstr";
const mizfiles = process.env.MIZFILES;

const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

export function returnHover(
	document: TextDocument,
	wordRange: Range
): Hover
{
	const documentText = document.getText();
	const hoveredWord = document.getText(wordRange);
	// ホバーによって示されるテキストの開始・終了インデックスを格納する変数
	let startIndex = -1;
	let endIndex = -1;
	// 定義・定理・ラベルの参照する箇所のパターンをそれぞれ格納
	const definitionPattern = ":" + hoveredWord + ":";
	const theoremPattern = "theorem " + hoveredWord + ":";
	const labelPattern = hoveredWord + ":";

	// 定義を参照する場合
	if ( (startIndex = documentText.indexOf(definitionPattern)) > -1 ){
		startIndex = documentText.lastIndexOf('definition', startIndex);
		endIndex = startIndex
				+ documentText.slice(startIndex).search(/\send\s*;/g)
				+ '\nend;'.length;
	}
	// 定理を参照する場合
	else if ( (startIndex = documentText.indexOf(theoremPattern)) > -1 ){
		endIndex = startIndex 
				+ documentText.slice(startIndex).search(/(\sproof|;)/g)
				+ '\n'.length;
	}
	// ラベルを参照する場合
	else if ( (startIndex = documentText.lastIndexOf(labelPattern, 
								document.offsetAt(wordRange.start)-1)) > -1)
	{
		endIndex = startIndex 
				+ documentText.slice(startIndex).search(/;/)
				+ ';'.length;
	}
	// ホバー対象でない場合
	else{
		return{ contents: [] };
	}
	const contents: MarkupContent = {
		kind: MarkupKind.PlainText,
		value: documentText.slice(startIndex,endIndex)
	};	
	
	return{
		contents,
		range: wordRange
	};
}

export function returnMMLHover(
    document: TextDocument,
    wordRange: Range
):Hover
{
    if(mizfiles === undefined){
        return{ contents: [] };
    }
    const absDir = path.join(mizfiles,Abstr);

	const hoveredWord = document.getText(wordRange);
	let [fileName, referenceWord] = hoveredWord.split(':');
	// .absのファイルを参照する
	fileName = path.join(absDir,fileName.toLowerCase() + '.abs');

	console.log(document.uri);
	console.log(uriToPath(document.uri));
	console.log(pathToUri(document.uri,undefined));
	console.log(fileName);
	console.log(uriToPath(fileName));
	console.log(pathToUri(fileName,undefined));

	const MMLdocument = documents.get(pathToUri(fileName,undefined));
	if (MMLdocument === undefined) {
		return{ contents: [] };
	}
	const documentText = MMLdocument.getText();
	// ホバーによって示されるテキストの開始・終了インデックスを格納する変数
	let startIndex = 0;
	let endIndex = 0;
	// hoveredWordは.absファイルで一意のキーになる
	const wordIndex = documentText.indexOf(hoveredWord);
	// definitionを参照する場合
	if (/def\s+\d+/.test(referenceWord)){
		startIndex = documentText.lastIndexOf(
			'definition', 
			wordIndex
		);
		endIndex = wordIndex 
					+ documentText.slice(wordIndex).search(/\send\s*;/)
					+ 'end;'.length;
	}
	// schemeを参照する場合
	else if(/sch\s+\d+/.test(referenceWord)){
		startIndex = documentText.lastIndexOf(
			'scheme',
			wordIndex
		);
		endIndex = wordIndex + documentText.slice(wordIndex).search(/;/);
	}
	// theoremを参照する場合
	else{
		startIndex = documentText.lastIndexOf(
			'theorem',
			wordIndex
		);
		endIndex = wordIndex + documentText.slice(wordIndex).search(/;/)
					+ ';'.length;
	}
	const contents: MarkupContent = {
		kind: MarkupKind.PlainText,
		value: documentText.slice(startIndex,endIndex)
	};
	
    return{
		contents,
		range: wordRange
	};
}

export function getWordRange(
	document: TextDocument,
    position: Position
): Range | undefined
{
	// ホバーしている一行のテキスト
	const text = document.getText({
		"start": { "line": position.line, "character": 0 },
		"end": { "line": position.line, "character": 100 }
	});
	// by以降を正規表現で取得
	const found = /(by\s+(\w+(,|\s|:)*)+|from\s+\w+(:sch\s+\d+)*\((\w+,*)+\))/g.exec(text);
	let wordRange: Range;

	if (found){
		const index = found.index;
		const regex = /\w+:def\s+\d+|\w+:\s*\d+|\w+:sch\s+\d+|\w+/g;
		let result;
		// 正規表現で一単語ずつ取得しマウスのポジションにある単語のwordRangeを返す
		while (result = regex.exec(found[0])) {
			if(position.character < index+regex.lastIndex){
				wordRange = {
					"start": { "line": position.line, "character": index+result.index },
					"end": { "line": position.line, "character": index+regex.lastIndex }
				};
				return wordRange;
			}
		}
	}
}



export function uriToPath(stringUri: string): string | undefined {
    const uri = URI.parse(stringUri);
    if (uri.scheme !== 'file') {
        return undefined;
    }
    return uri.fsPath;
}

function parsePathOrUri(filepath: string): URI {
    // handles valid URIs from yarn pnp, will error if doesn't have scheme
    // zipfile:/foo/bar/baz.zip::path/to/module
    if (filepath.startsWith('zipfile:')) {
        return URI.parse(filepath);
    }
    // handles valid filepaths from everything else /path/to/module
    return URI.file(filepath);
}

export function pathToUri(filepath: string, documents: TextDocuments<TextDocument> | undefined): string {
    const fileUri = parsePathOrUri(filepath);
    const document = documents && documents.get(fileUri.fsPath);
    return document ? document.uri : fileUri.toString();
}