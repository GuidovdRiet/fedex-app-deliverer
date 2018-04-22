import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import io from "socket.io-client";

import PackagesOverview from "./components/PackagesOverview";
import Confirmation from "./components/Confirmation";

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

const App = StackNavigator({
  Home: { screen: mapSocketClientToNavigation(PackagesOverview) },
  Confirm: { screen: mapSocketClientToNavigation(Confirmation) }
});

export default () => <App />;
