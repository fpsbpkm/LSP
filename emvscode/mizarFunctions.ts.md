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


