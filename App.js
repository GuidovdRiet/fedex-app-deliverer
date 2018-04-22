import React, { Component } from "react";
import styled from "styled-components";
import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import io from "socket.io-client";

import Account from "./components/Account";
import Packages from "./components/Packages";
import Scan from "./components/Scan";

const socketClient = io("http://45.77.159.108:7000");

const mapSocketClientToNavigation = Component => {
  return class extends Component {
    render() {
      const { navigation, ...other } = this.props;
      const {
        state: { params }
      } = navigation;
      return (
        <Component {...this.props} {...params} socketClient={socketClient} />
      );
    }
  };
};

const App = TabNavigator(
  {
    Packages: {
      screen: mapSocketClientToNavigation(Packages),
      navigationOptions: {
        tabBarIcon: <Icon name="package-down" type="material-community" color="#1FB5FC" />,
        tabBarLabel: "Packages"
      }
    },
    Scan: {
      screen: mapSocketClientToNavigation(Scan),
      navigationOptions: {
        tabBarIcon: <Icon reverse name="qrcode-scan" type="material-community" color="#1FB5FC" />,
        tabBarLabel: " "
      }
    },
    Account: {
      screen: mapSocketClientToNavigation(Account),
      navigationOptions: {
        tabBarIcon: <Icon name="account" type="material-community" color="#1FB5FC" />,
        tabBarLabel: "Account"
      }
    }
  },
  {
    order: ["Packages", "Scan", "Account"],
    animationEnabled: true
  }
);

export default () => <App />;
