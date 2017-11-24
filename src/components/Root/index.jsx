import React from 'react';
import { observer, Provider  } from 'mobx-react';
import stores from '../../stores';

const Root = observer(() => (
  <Provider {...stores}>
    <div>
      Root
    </div>
  </Provider>
));

export default Root;
