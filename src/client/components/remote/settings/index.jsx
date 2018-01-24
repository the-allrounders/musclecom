import React, { Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import SettingsInputIcon from 'material-ui-icons/SettingsInputComponent';
import ListIcon from 'material-ui-icons/List';
import SpeakerPhoneIcon from 'material-ui-icons/SpeakerPhone';
import TimelineIcon from 'material-ui-icons/Timeline';
import { actionStore } from '../../../stores';

function RemoteSettingsScene() {
  const items = [
    {
      icon: SettingsInputIcon,
      label: 'Opnieuw kalibreren',
      onClick: () => actionStore.setStep(2),
    },
    {
      icon: ListIcon,
      label: 'Menu items aanpassen',
    },
    {
      icon: SpeakerPhoneIcon,
      label: 'Menu acties configureren',
    },
    {
      icon: TimelineIcon,
      label: 'Sensor data bekijken',
    },
  ];
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            MuscleCom
          </Typography>
        </Toolbar>
      </AppBar>
      <MenuList>
        {items.map(({ icon: Icon, label, onClick }) => (
          <MenuItem key={label} onClick={onClick}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText inset primary={label} />
          </MenuItem>
        ))}
      </MenuList>
    </Fragment>
  );
}

export default RemoteSettingsScene;
