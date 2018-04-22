import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import io from "socket.io-client";

import PackagesOverview from "./components/PackagesOverview";
import Confirmation from "./components/Confirmation";

const socketClient = io("http://45.77.159.108:7000");

const App = StackNavigator({
  Home: { screen: PackagesOverview },
  Confirm: { screen: Confirmation }
});

export default () => <App />;
