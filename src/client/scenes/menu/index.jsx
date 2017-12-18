import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import socket from '../../Socket';

// Components
import Level from './Level';
// Styled
import LevelWrapper from './styled/LevelWrapper';

@inject('actionStore')
@observer
class MenuScene extends Component {
  static propTypes = {
    actionStore: PropTypes.shape({
      actionsAvailable: PropTypes.number,
      timer: PropTypes.number,
    }).isRequired,
  };

  state = {
    categories: [],
    offset: 0,
    current: 0,
  };

  componentWillMount() {
    this.getCategories();
  }

  componentDidMount() {
    socket.on('chosenAction', this.action);
    socket.on('intendedAction', action => console.log(action));
  }

  // Get all the categories.
  getCategories = () => {
    const categories = [
      {
        id: '1234567890',
        name: 'Category 1',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '1234567891',
        name: 'Category 2',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [
          {
            id: '1234567892',
            name: 'Category 3',
            image:
              'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
            children: [],
          },
          {
            id: '1234567893',
            name: 'Category 4',
            image:
              'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
            children: [],
          },
        ],
      },
      {
        id: '1234567892',
        name: 'Category 3',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '1234567893',
        name: 'Category 4',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '1234567898',
        name: 'Category 5',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '123456789',
        name: 'Category 6',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '123456790',
        name: 'Category 7',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '123456791',
        name: 'Category 8',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '123456792',
        name: 'Category 9',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
      {
        id: '123456793',
        name: 'Category 10',
        image:
          'https://image.freepik.com/iconen-gratis/restaurant-datumkalender-pagina_318-58075.jpg',
        children: [],
      },
    ];
    this.setState({ categories });
  };

  action = ({ action }) => {
    // Stop if there are no categories
    if (this.state.categories.length <= 0) return;

    const { actionStore } = this.props;
    // If action is not 0 then don't continue the loop.
    if (action !== 0) return;

    let { categories, offset, current } = this.state;

    categories = categories.map(category => {
      category.action = null; // eslint-disable-line no-param-reassign
      category.selected = false; // eslint-disable-line no-param-reassign
      return category;
    });

    if (
      (categories.length > current && categories.length < offset) ||
      offset === categories.length
    ) {
      offset = 0;
      current = 0;
    }

    for (let i = 0; i < actionStore.actionsAvailable; i += 1) {
      const pointer = offset % categories.length;
      categories[pointer].selected = true;
      categories[pointer].action = i;
      offset += 1;
    }

    if (offset > current + actionStore.totalMenuItems) {
      current += actionStore.totalMenuItems;
    }

    this.setState({ categories, offset, current });
  };

  render() {
    const { actionStore } = this.props;
    const { current } = this.state;

    const categories = this.state.categories.slice(
      current,
      current + actionStore.totalMenuItems,
    );
    const renderCategories = categories.map(
      ({ id, name, selected, action }) => (
        <Level
          key={id}
          name={name}
          action={action}
          active={selected}
          total={actionStore.totalMenuItems}
        />
      ),
    );

    return (
      <div>
        <LevelWrapper actions={actionStore.actionsAvailable}>
          {renderCategories}
        </LevelWrapper>
      </div>
    );
  }
}

export default MenuScene;
