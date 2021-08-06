# hover.ts
registerHoverProvider用のHoverProviderをつくる  
`provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover>`  
  - `TextDocument`   
  - `Position (line: number, character: number)`  
    - カーソルの位置など行と文字の位置を表す
  
## HoverProvider
 - provideHover には現在開いているドキュメント(document)と、カーソルの位置(position)が渡される
 - 外部ファイル（MML）の定義、定理、スキームを参照する場合 -> returnMMLHover
 - 自身のファイル内の定義、定理、ラベルを参照する場合 -> returnHover
   - ーの時なにも返さない
<br>

`getWordRangeAtPosition(position: Position, regex?: RegExp): Range | undefined`  
- 指定位置にある正規表現に合った単語を取り出す  
- 開始位置と終了位置が入ったRangeが返される  

`getText(range?: Range): string`  
- 指定した範囲内のテキストを取り出す  

## returnMMLHover

## returnHover
