// console.log(process);
// console.log(global.process);

// console.log(process.argv);
/**
 * [ 'C:\\Program Files\\nodejs\\node.exe',
  'c:\\wamp64\\www\\learnnode\\global对象\\process.js' ]
 */

// console.log(process.env);

// { ALLUSERSPROFILE: 'C:\\ProgramData',
//   AMD_ENTRYPOINT: 'vs/workbench/services/extensions/node/extensionHostProcess',
//   APPDATA: 'C:\\Users\\liang.wang\\AppData\\Roaming',
//   APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL: 'true',
//   CommonProgramFiles: 'C:\\Program Files\\Common Files',
//   'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
//   CommonProgramW6432: 'C:\\Program Files\\Common Files',
//   COMPUTERNAME: 'CNX11394',
//   ComSpec: 'C:\\WINDOWS\\system32\\cmd.exe',
//   DriverData: 'C:\\Windows\\System32\\Drivers\\DriverData',
//   ELECTRON_RUN_AS_NODE: '1',
//   FPS_BROWSER_APP_PROFILE_STRING: 'Internet Explorer',
//   FPS_BROWSER_USER_PROFILE_STRING: 'Default',
//   HOMEDRIVE: 'C:',
//   HOMEPATH: '\\Users\\liang.wang',
//   LOCALAPPDATA: 'C:\\Users\\liang.wang\\AppData\\Local',
//   LOGONSERVER: '\\\\CHDLNDCR01V',
//   NUMBER_OF_PROCESSORS: '4',
//   NVM_HOME: 'C:\\Users\\liang.wang\\AppData\\Roaming\\nvm',
//   NVM_SYMLINK: 'C:\\Program Files\\nodejs',
//   OneDrive: 'C:\\Users\\liang.wang\\OneDrive',
//   OS: 'Windows_NT',
//   Path:
//    'C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;C:\\Program Files (x86)\\ATI Technologies\\ATI.ACE\\Core-Static;C:\\Users\\liang.wang\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Program Files\\Git\\cmd;C:\\wamp64\\bin\\php\\php7.2.18;C:\\composer;C:\\Users\\liang.wang\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\liang.wang\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Users\\liang.wang\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\liang.wang\\AppData\\Roaming\\Composer\\vendor\\bin;',
//   PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC',
//   PIPE_LOGGING: 'true',
//   PROCESSOR_ARCHITECTURE: 'AMD64',
//   PROCESSOR_IDENTIFIER: 'Intel64 Family 6 Model 60 Stepping 3, GenuineIntel',
//   PROCESSOR_LEVEL: '6',
//   PROCESSOR_REVISION: '3c03',
//   ProgramData: 'C:\\ProgramData',
//   ProgramFiles: 'C:\\Program Files',
//   'ProgramFiles(x86)': 'C:\\Program Files (x86)',
//   ProgramW6432: 'C:\\Program Files',
//   PROMPT: '$P$G',
//   PSModulePath:
//    'C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules',
//   PUBLIC: 'C:\\Users\\Public',
//   SESSIONNAME: 'Console',
//   SystemDrive: 'C:',
//   SystemRoot: 'C:\\WINDOWS',
//   TEMP: 'C:\\Users\\LIANG~1.WAN\\AppData\\Local\\Temp',
//   TMP: 'C:\\Users\\LIANG~1.WAN\\AppData\\Local\\Temp',
//   USERDNSDOMAIN: 'CONCENTRIX.COM',
//   USERDOMAIN: 'CONCENTRIX',
//   USERDOMAIN_ROAMINGPROFILE: 'CONCENTRIX',
//   USERNAME: 'liang.wang',
//   USERPROFILE: 'C:\\Users\\liang.wang',
//   VERBOSE_LOGGING: 'true',
//   VSCODE_CWD:
//    'C:\\Users\\liang.wang\\AppData\\Local\\Programs\\Microsoft VS Code',
//   VSCODE_HANDLES_UNCAUGHT_ERRORS: 'true',
//   VSCODE_IPC_HOOK:
//    '\\\\.\\pipe\\312c599f8a168c0521f62b3caf0aa003-1.38.1-main-sock',
//   VSCODE_IPC_HOOK_EXTHOST:
//    '\\\\.\\pipe\\vscode-ipc-acacf5c4-b792-40f5-83e3-1fcdc66283a4-sock',
//   VSCODE_LOGS:
//    'C:\\Users\\liang.wang\\AppData\\Roaming\\Code\\logs\\20191001T141058',
//   VSCODE_LOG_STACK: 'false',
//   VSCODE_NLS_CONFIG:
//    '{"locale":"zh-cn","availableLanguages":{},"_languagePackSupport":true}',
//   VSCODE_NODE_CACHED_DATA_DIR:
//    'C:\\Users\\liang.wang\\AppData\\Roaming\\Code\\CachedData\\b37e54c98e1a74ba89e03073e5a3761284e3ffb0',
//   VSCODE_PID: '8436',
//   VSCODE_PREVENT_FOREIGN_INSPECT: 'true',
//   windir: 'C:\\WINDOWS' 
// }

// console.log(process.version); // v10.16.3

// console.log(process.versions);
// { http_parser: '2.8.0',
//   node: '10.16.3',
//   v8: '6.8.275.32-node.54',
//   uv: '1.28.0',
//   zlib: '1.2.11',
//   brotli: '1.0.7',
//   ares: '1.15.0',
//   modules: '64',
//   nghttp2: '1.39.2',
//   napi: '4',
//   openssl: '1.1.1c',
//   icu: '64.2',
//   unicode: '12.1',
//   cldr: '35.1',
//   tz: '2019a' 
// }

// console.log(process.pid); // 12616

// console.log(process.title); // C:\WINDOWS\system32\cmd.exe

// console.log(process.platform); // win32

// console.log(process.cwd()); // c:\wamp64\www\learnnode

// console.log(process.memoryUsage());
// { rss: 20475904,
//     heapTotal: 6537216,
//     heapUsed: 4051216,
//     external: 12836 
// }

// function Log(data) {
//     process.stdout.write(data);
// }

// Log('hello');   // hello

// 默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流
process.stdin.resume();
var a;
var b;
process.stdout.write('输入a值');

// 监听用户输入数据
process.stdin.on('data', function(chunk) {
    if (!a) {
        a = Number(chunk);
        process.stdout.write('输入b值');
    } else {
        b = Number(chunk);
    }
    process.stdout.write(a + b);
});