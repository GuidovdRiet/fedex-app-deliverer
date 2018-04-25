import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

class Scan extends Component {
    _scanPackage() {
        this.props.socketClient.emit('package:scanned', {
            delivererId: '5ac38977f36d287dbca60345',
            consumerId: '5ac383eb7746fb3c67364b84',
            zip: '3037EE',
            number: '127a'
        });
    }

    render() {
        return (
            <Container>
                <ScanButtonContainer
                    onPress={() => this._scanPackage()}
                    underlayColor="#4747CB"
                >
                    <ScanButton>Scanning package..</ScanButton>
                </ScanButtonContainer>
            </Container>
        );
    }
}

export default Scan;

const Container = styled.View`
    flex: 1;
`;

const ScanButtonContainer = styled.TouchableHighlight`
    background-color: #4c1d89;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
`;

const ScanButton = styled.Text`
    color: #efeded;
    font-size: 18;
    margin-left: 15;
`;
