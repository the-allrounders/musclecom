import React from 'react';
import { Redirect } from 'react-router-dom';
import setupCheckDecorator from './SetupCheckDecorator';

const StartScene = () => <Redirect to='/main' />;

export default setupCheckDecorator(StartScene);
