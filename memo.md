### デバッグ
- クライアント側のデバッグ
  - クライアントコードのところでブレークポイントを設定して、F5 を実行すればデバッグ実行できる。このあたりの操作感はVisualStudioと同じ
- サーバー側のデバッグ
  - launch configuration を "Launch Client" にして起動しただけでは、サーバー側のデバッグができないので以下の操作が必要。
  - launch configuration を "Launch Client"で起動
  - 拡張機能開発ホストが起動した後、launch configuration を "Attach to Server" にしてデバッグを開始（※なぜか Attach to Server の時は F5 が効かないのでメニューかボタンで実行する）。
