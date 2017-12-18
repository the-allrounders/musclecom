import SignalController from '../signal-controller';
import SignalProcessing from '../signal-processing';
import { emit, listen } from '../middleware/sockets';
import RawSensorLog from '../db/models/raw-sensor-log';
import UserInputLog from '../db/models/user-input-log';
import ProcessedSensorLog from '../db/models/processed-sensor-log';
import Settings from '../db/models/settings';
import MenuItem from '../db/models/menu-item';

class SignalInterpretation {
  static async init() {
    this.addSCEventListeners();
    await SignalController.init();
  }

  static addSCEventListeners() {
    // Chosen menu items listener from frontend.
    listen('chosenMenuItem', chosenMenuItem => {
      const userInputLog = new UserInputLog({
        menuItemID: chosenMenuItem,
      });
      userInputLog.save();
    });

    listen('menuChanged', async menuArgs => {
      let menuItem = null;
      switch (menuArgs.action) {
        case 'add':
          menuItem = new MenuItem({
            parent: menuArgs.menuItem.parent,
            name: menuArgs.menuItem.name,
            icon: menuArgs.menuItem.icon,
            order: menuArgs.menuItem.order,
          });
          await menuItem.save();
          break;
        case 'delete':
          MenuItem.deleteOne({ name: menuArgs.menuItem.name }, () => {
            console.info(`Deleted menu item:${menuArgs.menuItem.name}`);
          });
          break;
        case 'update':
          MenuItem.findOneAndUpdate(
            { name: menuArgs.menuItem.name },
            {
              parent: menuArgs.menuItem.parent,
              icon: menuArgs.menuItem.parent,
              order: menuArgs.menuItem.order,
            },
            () => {
              console.info(`Updated menu item:${menuArgs.menuItem.name}`);
            },
          );
          break;
        default:
          console.info('You can only add / delete or update');
      }
    });

    listen('settingChanged', settingArgs => {
      let newSetting = null;
      switch (settingArgs.action) {
        case 'add':
          newSetting = new Settings({
            key: settingArgs.setting.key,
            value: settingArgs.setting.value,
          });
          newSetting.save();
          break;
        case 'delete':
          Settings.deleteOne({ key: settingArgs.setting.key }, () => {
            console.info(`Deleted setting: ${settingArgs.setting.key}`);
          });
          break;
        case 'update':
          Settings.findOneAndUpdate(
            { key: settingArgs.setting.key },
            {
              value: settingArgs.setting.value,
            },
            () => {
              console.info(`Updated setting: ${settingArgs.setting.key}`);
            },
          );
          break;
        default:
          console.info('You can only add / delete or update');
      }
    });

    SignalController.addListener('chosenAction', action => {
      if (action > 0) {
        console.info('chosen action', action);
      }
      emit('chosenAction', { action });
    });

    SignalController.addListener('intendedAction', action => {
      console.info('intended action', action);
      emit('intendedAction', { action });
    });

    SignalController.addListener('recievedSignal', (sensor, value) => {
      console.info('received signal', sensor, value);
      const processedSensorLog = new ProcessedSensorLog({
        sensor,
        value,
      });
      processedSensorLog.save();
    });

    SignalController.addListener('sensors', sensors => {
      console.info('sensor data', sensors);
      emit('sensors', sensors);
    });

    SignalProcessing.addListener('receivedSignal', ({ sensor, value }) => {
      const rawSensorLog = new RawSensorLog({
        sensor,
        value,
      });
      rawSensorLog.save();
    });
  }
}

export default SignalInterpretation;
