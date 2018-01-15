/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import socket from '../../socket';

// Components
import Level from './Level';
// Styled
import LevelWrapper from './styled/LevelWrapper';
import IntendedActionWrapper from './styled/IntendedActionWrapper';
import {
  IntendedAction,
  LeftCircle,
  RightCircle,
  RightFill,
  LeftFill,
} from './styled/IntendedAction';

class MenuScene extends Component {
  state = {
    currentMenuItem: {},
    currentMenuItems: [],
    selectedMenuItems: [],
    offset: 0,
    current: 0,
    intendedAction: 0,
  };

  componentDidMount() {
    socket.on('chosenAction', this.onAction);
    socket.on('intendedAction', this.intendedAction);
  }

  onAction = ({ action }) => {
    const { actionStore } = this.props;
    // Stop if there are no menu items.
    if (actionStore.menuItems.length <= 0) return false;

    if (action !== 0) return this.chooseMenuItem(action);

    return this.nextMenuItems();
  };

  chooseMenuItem(action) {
    const currentMenuItem = this.state.selectedMenuItems[action - 1];

    if (!currentMenuItem || typeof currentMenuItem === 'undefined') {
      return false;
    }

    return this.setState({ currentMenuItem, offset: 0, current: 0 });
  }

  nextMenuItems = () => {
    const { actionStore } = this.props;
    let { offset, current } = this.state;

    const currentMenuItems = actionStore.getMenuItems(
      this.state.currentMenuItem._id,
    );

    if (
      (currentMenuItems.length > current && currentMenuItems.length < offset) ||
      offset === currentMenuItems.length
    ) {
      offset = 0;
      current = 0;
    }

    const selectedMenuItems = [];

    for (let i = 0; i < actionStore.actionsAvailable; i += 1) {
      const pointer = offset % currentMenuItems.length;
      selectedMenuItems.push(currentMenuItems[pointer]);
      offset += 1;
    }

    if (offset > current + actionStore.totalMenuItems) {
      current += actionStore.totalMenuItems;
    }

    this.setState({ offset, current, selectedMenuItems, currentMenuItems });
  };

  intendedAction = ({ action: intendedAction }) => {
    this.setState({ intendedAction });
  };

  render() {
    const { actionStore } = this.props;
    const { current } = this.state;

    const categories = this.state.currentMenuItems.slice(
      current,
      current + actionStore.totalMenuItems,
    );

    const renderCategories = categories.map(category => {
      const selected = this.state.selectedMenuItems.includes(category);
      return (
        <Level
          key={category._id}
          name={category.name}
          total={actionStore.totalMenuItems}
          active={selected}
        />
      );
    });

    return (
      <div>
        <LevelWrapper actions={actionStore.actionsAvailable}>
          {renderCategories}
          {this.state.currentMenuItems.length <= 0 &&
            typeof this.state.currentMenuItem === 'object' && (
              <Level
                total={actionStore.totalMenuItems}
                name={this.state.currentMenuItem.name}
              />
            )}
        </LevelWrapper>
        {this.state.intendedAction > 0 && (
          <IntendedActionWrapper>
            <IntendedAction>{this.state.intendedAction}</IntendedAction>
            <LeftCircle>
              <LeftFill />
            </LeftCircle>
            <RightCircle>
              <RightFill />
            </RightCircle>
          </IntendedActionWrapper>
        )}
      </div>
    );
  }
}

MenuScene.propTypes = {
  actionStore: PropTypes.shape({
    actionsAvailable: PropTypes.number,
    totalMenuItems: PropTypes.number,
  }).isRequired,
};

export default inject('actionStore')(observer(MenuScene));
