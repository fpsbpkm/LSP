- [x] textDocument gettext
- [x] MarkupContentまたはMarkedStringに変換  
  - MarkedStringは非推奨と表示されるがtypescript-language-serverでは利用している
    ```
		const contents: MarkedString[] = [
			{ language: 'Mizar', value: documentText.slice(startIndex,endIndex) }
		];
    ```
     ```
    const contents: MarkupContent = {
			kind: MarkupKind.PlainText,
			value: documentText.slice(startIndex,endIndex)
		};
    ```
- [x] match,正規表現で単語を抽出
```
const paragraph = 'A5: a divides k by A1,A2,A4,NAT_D:def 5;';
const regex = /(by\s+(\w+(,|\s|:)*)+|from\s+\w+(:sch\s+\d+)*\((\w+,*)+\))/g;
const found = paragraph.match(regex);
console.log(found);

if (found){
  const found2 = found[0].match(/\w+/g);
  console.log(found2);
}
console.log(found);
```
- [x] getWordRangeAtPositionの修正（by A13,FINSEQ_3:25;のときどこでもFINSEQ_3:25のRangeになる）
  - if文を一つにまとめる
  - 
- [ ] 改行している場合2行目は対象外
  - emvscodeでも同じ
    ```
    A1: for a being Element of the adjectives of T holds f.a = F(a) from
    FUNCT_2:sch 4;
    ```
    ```
         hence (Rev p).(1+(j+1)) = apply(r, t2).(1+(j+1)) by A19,A21,A29,A30,A31
    ,A33,A24,A26,Def19,NAT_1:13;
    ```
- [ ] hover.tsのreturnMMLHoverのvscode.workspace.openTextDocument(fileName)
  - [ ] promiseの処理
  - [ ] 
  ~~- fileNameをuriに変換~~
    - vscode-uriを使えばできる
    ```
    C:\mizar\abstr\abcmiz_0.abs
    ↓
    file:///c%3A/mizar/abstr/abcmiz_0.abs
    ```
    - そのuriではdocument.getができない
    - test.mizのuri
    ```
    file:///c%3A/Users/i072ff/Desktop/test-mizar/test.miz
    ```
- [x] Rangeとcontentsを返す関数に分けなければならない
  
  - 型指定する必要があるのか
- [ ]   
<br>

- document.ts
- slackみる

### 序論
- Mizarとほかの定理証明支援系（coq,lean）のこととそのエディタについて
- LSPとは何か
- LSPが使われている定理証明支援系、プログラム言語について
- LSPが対応しているエディタについて
- 背景
  - webでmizarを動作させる 


### デバッグ
- クライアント側のデバッグ
  - クライアントコードのところでブレークポイントを設定して、F5 を実行すればデバッグ実行できる。このあたりの操作感はVisualStudioと同じ
- サーバー側のデバッグ
  - launch configuration を "Launch Client" にして起動しただけでは、サーバー側のデバッグができないので以下の操作が必要。
  - launch configuration を "Launch Client"で起動
  - 拡張機能開発ホストが起動した後、launch configuration を "Attach to Server" にしてデバッグを開始（※なぜか Attach to Server の時は F5 が効かないのでメニューかボタンで実行する）。
