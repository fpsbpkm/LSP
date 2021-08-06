# hover.ts
registerHoverProvider用のHoverProviderをつくる.  
`provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover>`  
  - `TextDocument`   
  - `Position (line: number, character: number)`  
    - カーソルの位置など行と文字の位置を表す.
  
## HoverProvider
 - provideHover には現在開いているドキュメント(document)と、カーソルの位置(position)が渡される.
 - 外部ファイル（MML）の定義、定理、スキームを参照する場合 -> returnMMLHover
 - 自身のファイル内の定義、定理、ラベルを参照する場合 -> returnHover
   - ーの時なにも返さない.
<br>

`getWordRangeAtPosition(position: Position, regex?: RegExp): Range | undefined`  
- 指定位置にある正規表現に合った単語を取り出す. 
- 開始位置と終了位置が入ったRangeが返される.  

`getText(range?: Range): string`  
- 指定した範囲内のテキストを取り出す.  

## returnMMLHover
外部のファイルの定義・定理・スキームのホバー情報を抽出して返す関数.
```
let hoveredWord = document.getText(wordRange);
let [fileName, referenceWord] = hoveredWord.split(':');

fileName = path.join(absDir,fileName.toLowerCase() + '.abs');
vscode.workspace.openTextDocument(fileName)
```
ホバーしている単語を：の左右で分け、その定義が書かれている.absのファイルを参照する.
```
hoveredWord:'YELLOW_0:def 2'
fileName: 'YELLOW_0' -> "C:\\mizar\\abstr\\yellow_0.abs"
referenceWord: 'def 2'
```
<br>

```
let documentText = document.getText();

let wordIndex = documentText.indexOf(hoveredWord);
```
参照したファイルの中でホバーした単語の位置を探す.  
definition,scheme,theoremで場合分け.
```
startIndex = documentText.lastIndexOf(
    'definition', 
     wordIndex
);
endIndex = wordIndex 
            + documentText.slice(wordIndex).search(/\send\s*;/)
            + 'end;'.length;
```
抽出するホバー情報の開始位置と終了位置を取得する.  
startIndexはwordIndexより前に最初にdefinition,scheme,theoremが出現した位置.  
endIndexはwordIndexに終了を示すもの(end,;)が出現した位置とそれを足したものになる.  
<br>

```
let markdownString = new vscode.MarkdownString();
markdownString.appendCodeblock(
    documentText.slice(startIndex,endIndex), 'mizar');
resolve(new vscode.Hover(markdownString, wordRange));
```
指定された言語で、指定された文字列をコードブロックとして追加する.
`new Hover(contents: MarkdownString | MarkedString | Array<MarkdownString | MarkedString>, range?: Range): Hover`  
ホバーオブジェクトがつくられる.

## returnHover
