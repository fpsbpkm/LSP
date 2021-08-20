# goToDefinition.ts
registerDefinitionProvider用のDefinitionProviderをつくる.  
`Definition: Location | Location[]`  

## provideDefinition
hover.tsのHoverProviderとほぼ同じ.
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

## returnDefinition
- hover.tsのreturnHoverとほぼ同じ.  
- endIndexのとる値が違う.
- returnABSDefinitionと同じようにLocationオブジェクトを作成して返す.


