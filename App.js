import React, { Component } from "react";
import styled from "styled-components";
import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import io from "socket.io-client";

import Account from "./components/Account";
import Packages from "./components/Packages";
import Scan from "./components/Scan";

const App = TabNavigator(
  {
    Packages: {
      screen: Packages,
      navigationOptions: {
        tabBarIcon: <Icon name="package" type="octicon" color="#1FB5FC" />,
        tabBarLabel: "Packages"
      }
    },
    Scan: {
      screen: Scan,
      navigationOptions: {
        tabBarIcon: <Icon name="diff-added" type="octicon" color="#1FB5FC" />,
        tabBarLabel: "Scan"
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarIcon: <Icon name="smiley" type="octicon" color="#1FB5FC" />,
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
