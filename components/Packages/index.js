import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components";
import { List, ListItem } from "react-native-elements";

class Packages extends Component {
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
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
            {
              key: "b",
              name: "Jan de Groot",
              address: "Bergweg 127B",
              avatar: "https://source.unsplash.com/category/objects/200x150/"
            },
          ]}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this._sendNotification(item.key)}
              roundAvatar
              hideChevron
              underlayColor="#7CE065"
              key={item.key}
              title={item.name}
              subtitle={item.address}
              avatar={item.avatar}
            />
          )}
        />
      </List>
    );
  }
}

export default Packages;
