"use strict";

import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import styled from "styled-components";

class Scan extends Component {
    nextPackage() {
        this.scanner.reactivate();
    }

    doneScanning() {
        console.log("done scanning");
    }

    onSuccess(e) {
        //TODO:
        this.emitSocket("package:scanned", {
            delivererId,
            consumerId: "5afad0f28e12c10c40f1873f",
            zip: "3037EE",
            number: "127a"
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
    margin-top: 25px;
`;

const NextPackageButton = styled.TouchableHighlight`
    background-color: #f8662e;
    height: 70px;
    width: 150px;
    justify-content: center;
    align-items: center;
`;

const NextPackageButtonText = styled.Text`
    color: #fff;
    font-size: 16;
    text-align: center;
`;

const DoneScanningBadgeButton = styled(NextPackageButton)`
    background-color: #6f7078;
    margin-right: 15;
`;

const DoneScanningBadgeButtonText = styled(NextPackageButtonText)``;
