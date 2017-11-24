import React from 'react';
import { observer } from 'mobx-react';
import { ActionStore } from '../../stores';

const Root = observer(() => (
  <div>
    Root
    { ActionStore.action }
  </div>
));

export default Root;
