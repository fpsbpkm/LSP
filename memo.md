- [x] textDocument gettext
- [x] markdownに変換
- [ ] match,正規表現で単語を抽出
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
- [ ] getWordRangeAtPositionの修正（by A13,FINSEQ_3:25;のときどこでもFINSEQ_3:25のRangeになる）
- [ ] 改行している場合
    ```
    A1: for a being Element of the adjectives of T holds f.a = F(a) from
    FUNCT_2:sch 4;
    ```
    ```
        is_properly_applicable_to t1 "\/" t2 & A ast (t1 "\/" t2) = t1 by A5,A6
    ,Def30;
    ```
- [ ] hover.tsのreturnMMLHoverのvscode.workspace.openTextDocument(fileName)
- [ ] Rangeとcontentsを返す関数に分けなければならない
  - : Rangeのreturn
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
