# goToDefinition.ts
registerDefinitionProvider用のDefinitionProviderをつくる.  
`Definition: Location | Location[]`  
<br>
## provideDefinition
hover.tsと同じ.
<br>
## returnABSDefinition
外部のtheorem,definition等の定義を返す.  
```
let definition = new vscode.Location(
    vscode.Uri.file(fileName),
    definitionRange
);
```
Locationオブジェクトを作成.  
`new Location(uri: Uri, rangeOrPosition: Range | Position): Location`  
- uri: filename(.absファイルの絶対パス)からURIを作成.
- rangeOrPosition: 定義を参照するファイルの定義個所のRange.
<br>
## returnDefinition


