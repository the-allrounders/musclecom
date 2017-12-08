import MenuItem from './models/menu-item';

export default function() {
  MenuItem.count({}, (err, count) => {
    if (count <= 0) {
      const menuParent1 = new MenuItem({
        parent: '',
        name: 'Primair',
        icon: '',
        order: 0,
      });
      menuParent1.save();

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

      MenuItem.create(menuItems, (error, results) => {
        console.info(`Inserted into the db${results}`);
      });
    }
  });
}
