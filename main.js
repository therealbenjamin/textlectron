const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  // Create browser window
  win = new BrowserWindow({width: 1000, height: 800})

  // Load index
  win.loadUrl(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open devtools
  win.webContents.openDevTools()

  // Emitted when the window is closed
  win.on('closed', () => {
    win = null
  })
}

// Call createWindow function once
// the app has been initialized
app.on('ready', createWindow)

// Stop the app when all the windows
// are closed
app.on('window-all-closed', () =>{
  // Account for mac defaults
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Recreate window when icon is clicked
// if no other windows are open
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
