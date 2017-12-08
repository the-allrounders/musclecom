import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Components
import Level from './Level';
// Styled
import LevelWrapper from './styled/LevelWrapper';

@inject('actionStore')
@observer
class MenuScene extends Component {
  state = {
    categories: [],
    offset: 0,
    current: 0,
    total: 6,
  };

  componentDidMount() {
    const { actionStore } = this.props;

    let total = 6;
    if (actionStore.actionsAvailable > 3) {
      total = actionStore.actionsAvailable * 2;
    }
    this.setState({ total }, this.getCategories());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    this.setState({ categories }, () => this.startTimer());
  };

  // Start timer and select categories in component
  startTimer = () => {
    const { actionStore } = this.props;
    clearInterval(this.interval);

    // Only continue when there are more categories
    if (this.state.categories.length <= 0) return false;

    // Set interval, each interval the categories are selected based on the
    // total categories.
    this.interval = setInterval(() => {
      let categories = this.state.categories;
      let { offset, current, total } = this.state;

      categories = categories.map(category => {
        category.action = 0;
        category.selected = false;
        return category;
      });

      for (let i = 0; i < actionStore.actionsAvailable; i++) {
        const pointer = offset % categories.length;
        categories[pointer].selected = true;
        offset += 1;
      }

      if (offset > current + total) {
        current += total;
      }

      if (offset > categories.length) {
        offset = 0;
        current = 0;
      }

      this.setState({ categories, offset, current });
    }, actionStore.timer);
  };

  render() {
    const { current, total } = this.state;
    const categories = this.state.categories.slice(current, current + total);
    const renderCategories = categories.map(category => (
      <Level
        key={category.id}
        name={category.name}
        action={0}
        active={category.selected}
      />
    ));

    return (
      <div>
        <LevelWrapper>{renderCategories}</LevelWrapper>
      </div>
    );
  }
}

export default MenuScene;
