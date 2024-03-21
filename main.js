const { app, BrowserWindow,dialog } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');


let win;


function createWindow() {

    const folderPath = '/home/turbbo/Desktop/AditiFolder/angular-learning/demo-ags/folderOutputAgs';

    if (!fs.existsSync(folderPath)) {
      try {
        fs.mkdirSync(folderPath);
        console.log('Folder created successfully.');
      } catch (err) {
        console.error('Error creating folder:', err);
        dialog.showErrorBox('Error', 'Failed to create folder.');
      }
    }
  
  
  
 win = new BrowserWindow({
   width: 800,
   height: 600,
   webPreferences: {
     nodeIntegration: true
   }
 });


 win.loadURL('http://localhost:4200');

 // Open the DevTools.
 win.webContents.openDevTools();
 

 win.on('closed', () => {
   win = null;
 });
}


app.on('ready', createWindow);


app.on('window-all-closed', () => {
 if (process.platform !== 'darwin') {
   app.quit();
 }
});


app.on('activate', () => {
 if (win === null) {
   createWindow();
 }
});
