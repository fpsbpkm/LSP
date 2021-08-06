# extension.ts

## コマンド登録

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
