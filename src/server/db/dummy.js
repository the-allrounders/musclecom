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
      icon: '/images/image4.png',
      order: 0,
    });
    await menuParent1.save();

    const menuItems = [
      {
        parent: '',
        name: 'Alarm',
        icon: '/images/image91.png',
        order: 0,
      },
      {
        parent: menuParent1._id,
        name: 'Honger',
        icon: '/images/image42.png',
        order: 1,
      },
      {
        parent: menuParent1._id,
        name: 'WC',
        icon: '/images/image87.png',
        order: 2,
      },
      {
        parent: menuParent1._id,
        name: 'Spelletje',
        icon: '/images/image69.png',
        order: 3,
      },
      {
        parent: menuParent1._id,
        name: 'Naar buiten',
        icon: '/images/image23.png',
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
