import React, { Component } from 'react';
import { get } from 'axios';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import { List, ListItem } from 'react-native-elements';

const data = [
    {
        name: 'Karel Appelman',
        address: 'Bergweg 127A',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    },
    {
        name: 'Jan de Groot',
        address: 'Bergweg 127B',
        avatar: 'https://source.unsplash.com/category/objects/200x150/'
    }
];

class Packages extends Component {
    state = {
        data: []
    };

    async fetchDeliveryList(delivererId) {
        const {
            data: { deliveries: data }
        } = await get(`http://127.0.0.1:7000/delivery/${delivererId}`);
        this.setState({
            data: data.map((item, i) => {
                item.key = String(i);
                return item;
            })
        });
    }

    async componentDidMount() {
        await this.fetchDeliveryList('5ac38977f36d287dbca60345');

        // this.props.socketClient.on('delivery:data-update', async () => {
        //     const { data } = await this.fetchDeliveryList(
        //         '5ac38977f36d287dbca60345'
        //     );
        //     this.setState({ data });
        // });

        console.log(this.state.data);
    }

    render() {
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    extraData={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            hideChevron
                            underlayColor="#7CE065"
                            key={item.key}
                            title={item.deliverer}
                            // subtitle={item.address}
                            // avatar={item.avatar}
                        />
                    )}
                />
            </List>
        );
    }
}

export default Packages;
