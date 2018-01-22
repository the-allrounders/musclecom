/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { actionStore } from '../../stores';
import socket from '../../socket';

// Components
import Level from './Level';
import SingleLevel from './SingleLevel';
// Styled
import globalClientStyles from '../../styles/global.client';
import LevelWrapper from './styled/LevelWrapper';
import IntendedActionWrapper from './styled/IntendedActionWrapper';
import {
  IntendedAction,
  LeftCircle,
  RightCircle,
  RightFill,
  LeftFill,
} from './styled/IntendedAction';

const BACK_LEVEL = {
  _id: 1,
  parent: '',
  name: 'Terug',
  icon: '/images/back.png',
  order: 0,
};

@observer
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
    // Stop if there are no menu items.
    if (actionStore.menuItems.length <= 0) return false;

    if (action !== 0) return this.chooseMenuItem(action);

    return this.nextMenuItems();
  };

  chooseMenuItem(action) {
    const currentMenuItem = this.state.selectedMenuItems[action - 1];

    if (currentMenuItem._id === 1) {
      return this.reset();
    }

    if (!currentMenuItem || typeof currentMenuItem === 'undefined') {
      return false;
    }

    const currentMenuItems = actionStore.getMenuItems(currentMenuItem._id);

    currentMenuItems.unshift(BACK_LEVEL);

    return this.setState({
      currentMenuItems,
      currentMenuItem,
      offset: 0,
      current: 0,
    });
  }

  nextMenuItems = () => {
    let { offset, current } = this.state;

    const currentMenuItems = actionStore.getMenuItems(
      this.state.currentMenuItem._id,
    );

    if (Object.keys(this.state.currentMenuItem).length >= 1) {
      currentMenuItems.unshift(BACK_LEVEL);
    }

    if (
      (currentMenuItems.length > current && currentMenuItems.length < offset) ||
      offset === currentMenuItems.length
    ) {
      offset = 0;
      current = 0;
    }

    const selectedMenuItems = [];

    for (let i = 0; i < actionStore.actionsAvailable; i += 1) {
      selectedMenuItems.push(currentMenuItems[offset]);
      offset += 1;
    }

    if (offset > current + actionStore.totalMenuItems) {
      current += actionStore.totalMenuItems;
    }

    this.setState({ offset, current, selectedMenuItems, currentMenuItems });
  };

  reset() {
    const currentMenuItems = actionStore.getMenuItems();
    return this.setState({
      currentMenuItems,
      offset: 0,
      current: 0,
      currentMenuItem: {},
    });
  }

  intendedAction = ({ action: intendedAction }) => {
    this.setState({ intendedAction });
  };

  render() {
    const { current } = this.state;

    const categories = this.state.currentMenuItems.slice(
      current,
      current + actionStore.totalMenuItems,
    );

    let i = 0;
    const renderCategories = categories.map(category => {
      const selected = this.state.selectedMenuItems.includes(category);
      if (selected) i += 1;
      return (
        <Level
          icon={category.icon}
          key={category._id}
          name={category.name}
          total={actionStore.totalMenuItems}
          active={selected}
          action={selected ? i : null}
        />
      );
    });

    return (
      <div style={{ height: '100%' }}>
        <style>{globalClientStyles}</style>
        <LevelWrapper actions={actionStore.actionsAvailable}>
          {renderCategories}
          {this.state.currentMenuItems.length <= 1 &&
            Object.keys(this.state.currentMenuItem).length > 0 &&
            typeof this.state.currentMenuItem === 'object' && (
              <SingleLevel {...this.state.currentMenuItem} />
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

export default MenuScene;
