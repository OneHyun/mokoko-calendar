const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 720,
        height: 1080,
        resizable: false,
        icon: path.join(__dirname, 'assets/icons/png/icon.png')
    });
    window.loadFile("index.html");
    const template = [
        {
            label: "Calendar",
            submenu: []
        },
        {
            label: "😃",
            sument: []
        }
    ];

    const customMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(customMenu);
}

app.whenReady().then(() => {
    createWindow();
});