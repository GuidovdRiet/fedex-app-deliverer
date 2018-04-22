import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

class PackagesOverview extends Component {
  render() {
    return (
      <FlatList
        data={[
          {
            key: "a",
            name: "Karel Appelman",
            adress: "Bergweg 127A",
            note: "bla bla bla bla bla"
          },
          {
            key: "b",
            name: "Jan de Groot",
            adress: "Bergweg 127B",
            note: "bla bla bla bla bla"
          }
        ]}
        renderItem={({ item }) => 
            <View>
                <Text>{item.key}</Text>
                <Text>{item.name}</Text>
                <Text>{item.adress}</Text>
                <Text>{item.note}</Text>
            </View>
        }
      />
    );
  }
}

export default PackagesOverview;
