# package.json
| 名称 | タイプ | 説明 |
|:---:|:---:|:---:|
| name | string | 拡張機能の名称。　スペースなしの小文字 |
| displayName | string | Marketplaceで使用する拡張機能の表示名 |
| description | string | 拡張機能の説明 |
| version | string | バージョン。フォーマットは、「MAJOR.MINOR.PATCH」<br> MAJOR 互換性がないAPIの変更 <br>MINOR 後方互換性があり機能性を追加した <br> PATCH　後方互換性を伴うバグ修正をした |
| publisher | string | 公開者名。Marketplaceにアップするときに使用する |
| engines | object | VS Codeの最小バージョンを指定 |
| categories | string[] | 拡張機能の使用するカテゴリを指定。<br> [Languages, Snippets, Linters, Themes, Debuggers, Other] |
| repository | object | ソースコードが管理されている場所を指定する |
| activationEvents | array | 拡張機能をロードするタイミングを指定 |
| main | stirng | 拡張機能のエントリーポイントを指定 |
| contributes | object | 拡張機能のコントリビューション |
| scripts | object | 様々なタイミングで実行される script コマンド |
| devDependencies | object | 開発時のテストやドキュメンテーションに利用する外部のフレームワークの設定 |
| icon | string | 128x128pxアイコンへのファイルパスを指定 |
| dependencies | object | 依存するモジュールとバージョンを記述する |
  
<br>

## contributes
### commands
コマンド パレット('Ctrl+Shift+P')にコマンドを提供する  
<br>
category:　  
command:　コマンド名  
title:　VSCode 上に表示されるコマンド名  
> コマンドが(キーバインドかコマンドパレットから)呼び出されたとき、VS CodeはactivationEvent 'onCommand:${command}' を発行する  

### languages
### menus
### grammars

