# extension.ts

## コマンド登録
```
for (let cmd in MIZAR_COMMANDS){
    context.subscriptions.push(
        vscode.commands.registerCommand(
            cmd,
            returnExecutingFunction(
                channel, runningCmd, diagnosticCollection, MIZAR_COMMANDS[cmd],
            )
        )
    );
}
````
registerCommand(command: string, callback: (args: any[]) => any, thisArg?: any): Disposable  

### returnExecutingFunction
```
let prevCwd = process.cwd();
try {
    process.chdir(path.join( path.dirname(fileName), '..') );
    result = await mizar_verify(channel, fileName, command, runningCmd);
} finally {
    process.chdir(prevCwd);
}
```
- prevCwdにカレントディレクトリを保存
- カレントディレクトリを対象ファイルの1つ上へ変更
- mizar_verify -> mizarFunctions.ts
- カレントディレクトリをprevCwdに戻す

## ホバー機能
```
 vscode.languages.registerHoverProvider(
            {scheme: 'file', language: 'Mizar'}, hover
        )
```
registerHoverProvider(selector: DocumentSelector, provider: HoverProvider): Disposable  
HoverProvider -> hover.ts

## 定義ジャンプ
```
vscode.languages.registerDefinitionProvider(
            {scheme:'file', language:'Mizar'}, definition
        )
```
registerDefinitionProvider(selector: DocumentSelector, provider: DefinitionProvider): Disposable  
DefinitionProvider -> goToDefinition.ts

## コマンド停止
