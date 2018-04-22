import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components";
import { List, ListItem } from "react-native-elements";

class PackagesOverview extends Component {
  _sendNotification(key) {
    this.props.socketClient.emit("delivery:change-home-notification", {
      packageId: key
    });
  }

  render() {
    return (
      <List>
        <FlatList
          data={[
            {
              key: "a",
              name: "Karel Appelman",
              address: "Bergweg 127A",
              note: "bla bla bla bla bla"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              note: "bla bla bla bla bla"
            }
          ]}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this._sendNotification(item.key)}
              underlayColor="#7CE065"
              key={item.key}
              title={item.name}
              address={item.address}
              note={item.note}
            />
          )}
        />
      </List>
    );
  }
}

export default PackagesOverview;
