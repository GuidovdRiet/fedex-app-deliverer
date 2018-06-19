import React, { Component } from "react";
import { get, post } from "axios";
import fetch from "node-fetch";
import { FlatList } from "react-native";
import uniq from "lodash/uniq";
import { List, ListItem, Button } from "react-native-elements";
import call from "react-native-phone-call";

class Packages extends Component {
    state = {
        data: [],
        refresh: false
    };

    async fetchDeliveryList(delivererId, timestamp) {
        const {
            data: { deliveries: data }
        } = await get(`http://45.63.12.46:8080/delivery/${delivererId}`);
        const dataUniqueByAddress = uniq(data, "packages[0].address.zip");

        const dataCopy = {
            deliveries: dataUniqueByAddress,
            timestamp_start_day: timestamp
        };

        const res = await fetch("http://fing3rgaming.com/fedex_ai", {
            body: JSON.stringify(dataCopy),
            headers: {
                // @prettier-ignore
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        if (res.status === 200) {
            const { deliveries: deliveriesWithETA } = await res.json();

            if (deliveriesWithETA && deliveriesWithETA.length > 0)
                this.setState({
                    data: dataUniqueByAddress
                        .map((item, i) => {
                            const del = deliveriesWithETA.find(
                                d => d._id == item._id
                            );

                            item.eta_timestamp = del.eta_timestamp;
                            item.time = del.time;

                            const diff =
                                item.eta_timestamp -
                                new Date().getTime() / 1000;
                            item.eta = Math.floor(diff / 60);
                            item.key = String(i);
                            return item;
                        })
                        .sort((a, b) => {
                            return a.eta_timestamp - b.eta_timestamp;
                        }),
                    refresh: !this.state.refresh
                });
        }
    }

    async componentDidMount() {
        await this.fetchDeliveryList(
            "5ac38977f36d287dbca60345",
            this.props.navigation.state.params.timestamp
        );

        if (this.props.socketClient) {
            // this.props.socketClient
            this.props.socketClient.on("delivery:data-update", async () => {
                await this.fetchDeliveryList(
                    "5ac38977f36d287dbca60345",
                    this.props.navigation.state.params.timestamp
                );
            });
        }
    }

    renderItems = ({ item }) => {
        const { consumer, address } = item.packages[0];
        console.log(item.isAtHome);
        const backgroundColor =
            item.isAtHome === undefined
                ? "#fff"
                : item.isAtHome === false
                    ? "#ffc6c6"
                    : "#c6ffdb";

        return (
            <ListItem
                roundAvatar
                key={item.key}
                title={`${consumer.name} - ETA: ${item.eta} min`}
                subtitle={item.note}
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
                    extraData={this.state.refresh}
                    renderItem={this.renderItems}
                />
            </List>
        );
    }
}

export default Packages;
