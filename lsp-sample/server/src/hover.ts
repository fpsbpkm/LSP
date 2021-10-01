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
	TextDocument
} from 'vscode-languageserver-textdocument';

import * as path from 'path';


export function provideHover(
	document: TextDocument,
    position: Position
):Hover{
	const text = document.getText({
		"start": { "line": position.line, "character": 0 },
		"end": { "line": position.line, "character": 100 }
	});

	let found;
	let wordRange: Range | undefined;
	if (/(\w+:def\s+\d+|\w+:\s*\d+|\w+:sch\s+\d+)/g.test(text)){
		let result;
		const p = /(\w+:def\s+\d+|\w+:\s*\d+|\w+:sch\s+\d+)/g;
		while (result = p.exec(text)) {
			if(position.character < p.lastIndex){
				wordRange = {
					"start": { "line": position.line, "character": result.index },
					"end": { "line": position.line, "character": p.lastIndex }
				}
				break;
			}
		}			
	}
	else if (found = /(by\s+(\w+(,|\s|:)*)+|from\s+\w+(:sch\s+\d+)*\((\w+,*)+\))/g.exec(text)){
		const index = found.index;
		let result;
		const p = /\w+/g;
		while (result = p.exec(found[0])) {
			if(position.character < index+p.lastIndex){
				wordRange = {
					"start": { "line": position.line, "character": index+result.index },
					"end": { "line": position.line, "character": index+p.lastIndex }
				}
				break;
			}
		}
	}
}