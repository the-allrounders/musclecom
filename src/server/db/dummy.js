import MenuItem from './models/menu-item';
import Settings from './models/settings';

export default async function() {
  if ((await MenuItem.count()) === 0) {
    console.log(
      '⚠️ There were no menu items found. Creating some default items...',
    );
    const menuParent1 = new MenuItem({
      parent: '',
      name: 'Primair',
      icon: '',
      order: 0,
    });
    await menuParent1.save();

    const menuItems = [
      {
        parent: '',
        name: 'Alarm',
        icon: '',
        order: 0,
      },
      {
        parent: menuParent1._id,
        name: 'Honger',
        icon: '',
        order: 1,
      },
      {
        parent: menuParent1._id,
        name: 'WC',
        icon: '',
        order: 2,
      },
      {
        parent: menuParent1._id,
        name: 'Spelletje',
        icon: '',
        order: 3,
      },
      {
        parent: menuParent1._id,
        name: 'Naar buiten',
        icon: '',
        order: 4,
      },
    ];

    const results = await MenuItem.create(menuItems);
    console.info(`✅ Created ${results.length + 1} menu items.`);
  }

  if ((await Settings.count()) === 0) {
    console.warn('⚠️ There were no settings found... saving default settings.');
    const timeOutSetting = new Settings({
      key: 'actionDelayTimeout',
      value: 2000,
    });
    await timeOutSetting.save();
    console.debug(`✅ Saved default settings to database.`);
  }
}
