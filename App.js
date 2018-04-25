import React, { Component } from 'react';
import styled from 'styled-components';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import io from 'socket.io-client';

import Account from './components/Account';
import Packages from './components/Packages';
import Scan from './components/Scan';

// const socketClient = io('http://45.77.159.108:7000');
const socketClient = io('http://localhost:7000');

const mapSocketClientToNavigation = Component => {
    return class extends Component {
        render() {
            const { navigation, ...other } = this.props;
            const {
                state: { params }
            } = navigation;
            return (
                <Component
                    {...this.props}
                    {...params}
                    socketClient={socketClient}
                />
            );
        }
    };
};

const App = TabNavigator(
    {
        Packages: {
            screen: mapSocketClientToNavigation(Packages),
            navigationOptions: {
                tabBarIcon: (
                    <Icon
                        name="package-down"
                        type="material-community"
                        color="#fff"
                    />
                ),
                tabBarLabel: 'Packages'
            }
        },
        Scan: {
            screen: mapSocketClientToNavigation(Scan),
            navigationOptions: {
                tabBarIcon: (
                    <Icon
                        reverse
                        name="qrcode-scan"
                        type="material-community"
                        color="#FC6621"
                    />
                ),
                tabBarLabel: ' '
            }
        },
        Account: {
            screen: mapSocketClientToNavigation(Account),
            navigationOptions: {
                tabBarIcon: (
                    <Icon
                        name="account"
                        type="material-community"
                        color="#fff"
                    />
                ),
                tabBarLabel: 'Account'
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#4D1C8A'
                // inactiveBackgroundColor: "red",
                // inactiveTintColor: 'blue',
                // activeTintColor: 'red'
            }
        },
        order: ['Packages', 'Scan', 'Account'],
        animationEnabled: true
    }
);

export default () => <App />;
