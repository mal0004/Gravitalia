const { app, BrowserWindow, Menu } = require('electron');
const { join, resolve, basename } = require("path");

if (require('electron-squirrel-startup')) return;
if (handleSquirrelEvent()) {
  return;
}
 
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }
 
  const ChildProcess = require('child_process');
 
  const appFolder = resolve(process.execPath, '..');
  const rootAtomFolder = resolve(appFolder, '..');
  const updateDotExe = resolve(join(rootAtomFolder, 'Update.exe'));
  const exeName = basename(process.execPath);
 
  const spawn = function(command, args) {
    let spawnedProcess, error;
 
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}
 
    return spawnedProcess;
  };
 
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };
 
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      spawnUpdate(['--createShortcut', exeName]);
 
      setTimeout(app.quit, 1000);
      return true;
 
    case '--squirrel-uninstall':
      spawnUpdate(['--removeShortcut', exeName]);
 
      setTimeout(app.quit, 1000);
      return true;
 
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
};

require('update-electron-app')({
  repo: 'ZusoWorld/Gravitalia',
  updateInterval: '5 minutes',
  notifyUser: true
})

Menu.setApplicationMenu(Menu.buildFromTemplate([]));

let window;
app.on("ready", () => {
  const loading = new BrowserWindow({
    movable: false,
    transparent: true,
    darkTheme: true,
    center: true,
    width: 300,
    height: 400,
    frame: false,
    titleBarStyle: 'hidden',
    icon: "src/public/img/icon.ico"
  })
  loading.loadFile(join(__dirname+"/src/views/loading.html"))

  const main = new(require("./src/main"))(window, app);main.loadEvents();
  new(require("./src/helpers/Express"))(window, app).load()

  setTimeout(() => {
    window = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
      enableLargerThanScreen: false,
      movable: true,
      width: 800,
      height: 600,
      title: "Gravitalia",
      icon: "src/public/img/icon.ico"
    })
    window.loadURL("http://localhost:4506")

    setTimeout(() => {
      loading.destroy()
    }, 2000)
  }, 4000)
})