import menuItem from './models/menu-item';

export default function setDummyData()
{
  const menuItems =
      [
        {
          parent: '',
          name: 'Alarm',
          icon: '',
          order: 0,
        },
        {
          parent: '',
          name: 'Honger',
          icon: '',
          order: 1,
        },
        {
          parent: '',
          name: 'WC',
          icon: '',
          order: 2,
        },
        {
          parent: '',
          name: 'Spelletje',
          icon: '',
          order: 3,
        },
        {
          parent: '',
          name: 'Naar buiten',
          icon: '',
          order: 4,
        },
      ];

  menuItem.count({}, (err, count) => {
    if( count <= 0) {
       menuItem.create(menuItems, (error, results) => {
         console.info(`Inserted into the db${  results}`);
      });
    }
  });
}
