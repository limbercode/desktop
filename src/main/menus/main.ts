import { Menu, webContents } from 'electron';
import { defaultTabOptions } from '~/constants/tabs';
import { WindowsManager } from '../windows-manager';
import { viewSource, saveAs, printPage } from './common-actions';

export const getMainMenu = (windowsManager: WindowsManager) => {
  return Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+T',
          label: 'New tab',
          click() {
            windowsManager.currentWindow.viewManager.create(defaultTabOptions);
          },
        },
        {
          accelerator: 'CmdOrCtrl+N',
          label: 'New window',
          click() {
            windowsManager.createWindow();
          },
        },
        {
          accelerator: 'CmdOrCtrl+Shift+N',
          label: 'New incognito window',
          click() {
            windowsManager.createWindow(true);
          },
        },
        {
          type: 'separator',
        },
        {
          accelerator: 'CmdOrCtrl+W',
          label: 'Close tab',
          click() {
            windowsManager.currentWindow.webContents.send(
              'remove-tab',
              windowsManager.currentWindow.viewManager.selectedId,
            );
          },
        },
        {
          accelerator: 'CmdOrCtrl+Shift+W',
          label: 'Close current window',
          click() {
            windowsManager.currentWindow.close();
          },
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
          accelerator: 'CmdOrCtrl+Shift+Q',
        },
        {
          label: 'Reload',
          visible: false,
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            windowsManager.currentWindow.viewManager.selected.webContents.reload();
          },
        },
        {
          label: 'Reload',
          visible: false,
          accelerator: 'F5',
          click: () => {
            windowsManager.currentWindow.viewManager.selected.webContents.reload();
          },
        },
        {
          accelerator: 'CmdOrCtrl+F',
          label: 'Find in page',
          visible: false,
          click() {
            windowsManager.currentWindow.webContents.send('find');
          },
        },
        {
          accelerator: 'CmdOrCtrl+F4',
          label: 'Close tab',
          visible: false,
          click() {
            windowsManager.currentWindow.webContents.send(
              'remove-tab',
              windowsManager.currentWindow.viewManager.selectedId,
            );
          },
        },
        {
          accelerator: 'CmdOrCtrl+Shift+T',
          label: 'Revert closed tab',
          visible: false,
          click() {
            windowsManager.currentWindow.webContents.send('revert-closed-tab');
          },
        },
        {
          accelerator: 'CmdOrCtrl+Tab',
          label: 'Select next tab',
          visible: false,
          click() {
            windowsManager.currentWindow.webContents.send('select-next-tab');
          },
        },
        {
          accelerator: 'Ctrl+Space',
          label: 'Toggle search',
          visible: false,
          click() {
            windowsManager.currentWindow.dialogs.searchDialog.show();
          },
        },
        {
          accelerator: 'CmdOrCtrl+L',
          label: 'Toggle search',
          visible: false,
          click() {
            windowsManager.currentWindow.dialogs.searchDialog.show();
          },
        },
        {
          accelerator: 'Alt+F',
          label: 'Toggle menu',
          visible: false,
          click() {
            windowsManager.currentWindow.dialogs.menuDialog.show();
          },
        },
        {
          accelerator: 'Alt+E',
          label: 'Toggle menu',
          visible: false,
          click() {
            windowsManager.currentWindow.dialogs.menuDialog.show();
          },
        },
        {
          accelerator: 'Alt+Left',
          label: 'Go back',
          visible: false,
          click() {
            const { selected } = windowsManager.currentWindow.viewManager;
            if (selected) {
              selected.webContents.goBack();
            }
          },
        },
        {
          accelerator: 'Alt+Right',
          label: 'Go forward',
          visible: false,
          click() {
            const { selected } = windowsManager.currentWindow.viewManager;
            if (selected) {
              selected.webContents.goForward();
            }
          },
        },
        {
          accelerator: 'CmdOrCtrl+Shift+F12',
          label: 'Toggle developer tools (window)',
          visible: false,
          click() {
            setTimeout(() => {
              webContents
                .getFocusedWebContents()
                .openDevTools({ mode: 'detach' });
            });
          },
        },
        {
          accelerator: 'F12',
          label: 'Toggle developer tools (contents)',
          visible: false,
          click() {
            setTimeout(() => {
              windowsManager.currentWindow.viewManager.selected.webContents.toggleDevTools();
            });
          },
        },
        {
          accelerator: 'Ctrl+Shift+I',
          label: 'Toggle developer tools (contents)',
          visible: false,
          click() {
            setTimeout(() => {
              windowsManager.currentWindow.viewManager.selected.webContents.toggleDevTools();
            });
          },
        },
        {
          label: 'View page source',
          accelerator: 'CmdOrCtrl+U',
          click: () => {
            viewSource();
          },
        },
        {
          label: 'Save as',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            saveAs();
          },
        },
        {
          label: 'Print',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            printPage();
          },
        },
      ],
    },
    { role: 'editMenu' },
  ]);
};
