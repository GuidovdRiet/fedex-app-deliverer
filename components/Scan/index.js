"use strict";

import React, { Component } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import styled from "styled-components";
import { addresses } from "../../helpers/addresses";
import { StyleSheet } from 'react-native';

class Scan extends Component {
    state = {
        counter: 0
    };
    nextPackage() {
        this.scanner.reactivate();
    }

    doneScanning() {
        const timestamp = Date.now();
        this.emitSocket("package:done-scanning", {
            delivererId: "5ac38977f36d287dbca60345",
            timestamp
        });
        this.props.navigation.navigate("Packages", { timestamp });
    }

    onSuccess(e) {
        const { data } = e;
        const address = addresses[this.state.counter];

        const dataToSend = JSON.parse(data);
        dataToSend.zip = address.zip;
        dataToSend.street = address.street;
        dataToSend.number = address.number;

        this.emitSocket("package:scanned", dataToSend);
        this.setState({ counter: this.state.counter + 1 }, () => {
            console.log(this.state.counter);
        });
    }

    emitSocket(e, payload) {
        this.props.socketClient.emit(e, payload);
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                ref={node => {
                    this.scanner = node;
                }}
                bottomContent={
                    <ButtonContainer>
                        <DoneScanningBadgeButton
                            onPress={() => this.doneScanning()}
                            underlayColor="#6A7097"
                        >
                            <DoneScanningBadgeButtonText>
                                Done scanning
                            </DoneScanningBadgeButtonText>
                        </DoneScanningBadgeButton>
                        <NextPackageButton
                            onPress={() => this.nextPackage()}
                            underlayColor="#91C53D"
                        >
                            <NextPackageButtonText>
                                Next package
                            </NextPackageButtonText>
                        </NextPackageButton>
                    </ButtonContainer>
                }
            />
        );
    }
}

export default Scan;

const ButtonContainer = styled.View`
    flex: 1;
    flex-direction: row;
    margin-top: 15px;
`;

const NextPackageButton = styled.TouchableHighlight`
    background-color: #f8662e;
    height: 50px;
    width: 100;
    justify-content: center;
    align-items: center;
`;

const NextPackageButtonText = styled.Text`
    color: #fff;
    font-size: 12;
    text-align: center;
`;

const DoneScanningBadgeButton = styled(NextPackageButton)`
    background-color: #6f7078;
    margin-right: 15;
`;

const DoneScanningBadgeButtonText = styled(NextPackageButtonText)``;
