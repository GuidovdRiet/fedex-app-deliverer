import React, { Component } from "react";
import { get } from "axios";
import { FlatList } from "react-native";
import { List, ListItem, Button } from "react-native-elements";
import call from "react-native-phone-call";

class Packages extends Component {
    state = {
        data: []
    };

    async fetchDeliveryList(delivererId) {
    const {
        data: { deliveries: data }
    } = await get(`http://45.63.12.46:8080/delivery/${delivererId}`);

    this.setState({
        data: data.map((item, i) => {
        item.key = String(i);
        return item;
        })
    });
    console.log("DATA", data);
    }

    async componentDidMount() {
        await this.fetchDeliveryList("5ac38977f36d287dbca60345");
        console.log("CLIENT", this.props.socketClient.on);
        // this.props.socketClient.on("delivery:init", async () => {
        //   console.log("INIT");
        //   await this.fetchDeliveryList("5ac38977f36d287dbca60345");
        // });
        this.props.socketClient.on("delivery:data-update", async () => {
        console.log("bla");
        await this.fetchDeliveryList("5ac38977f36d287dbca60345");
        });
    }

    renderItems = ({ item }) => {
        const { consumer, address } = item.packages[0];
        const backgroundColor =
        item.isAtHome === undefined
            ? "#fff"
            : item.isAtHome === false
            ? "#ffc6c6"
            : "#c6ffdb";
        // console.log(item.isAtHome);
        return (
        <ListItem
            roundAvatar
            // hideChevron
            // underlayColor="#7CE065"
            key={item.key}
            title={consumer.name}
            subtitle={`${address.zip}`}
            containerStyle={{
            backgroundColor
            }}
            rightIcon={{ name: "phone", style: { color: "green" } }}
            onPress={() => {
            call({
                number: `+31${String(consumer.phone)}`,
                prompt: true
            }).catch(console.error);
            }}
            avatar={"https://unsplash.it/400"}
        />
        );
    };

    render() {
        return (
        <List>
            <FlatList
            data={this.state.data}
            extraData={this.state.data}
            renderItem={this.renderItems}
            />
        </List>
        );
    }
}

export default Packages;
