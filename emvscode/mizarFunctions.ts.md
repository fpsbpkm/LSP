# mizarFunctions.ts

## mizar_verify
```
let makeenvProcess = require('child_process').spawn(makeenv,[fileName]);
runningCmd['process'] = makeenvProcess;
```
<br>

```
carrier.carry(makeenvProcess.stdout, (line:string) => {
    if (!/^-/.test(line)){
        channel.appendLine(line);
    }
    if (line.indexOf('*') !== -1){
        isMakeenvSuccess = false;
    }
});
```
<br>

```
Make Environment, Mizar Ver. 8.1.11 (Win32/FPC)
Copyright (c) 1990-2021 Association of Mizar Users

Running verifier on c:\Users\i072ff\Desktop\test-mizar\test.miz

   Start |------------------------------------------------->| End
Parser   :##################################################
MSM      :##################################################
Analyzer :##################################################
Checker  :##################################################

End.
```
