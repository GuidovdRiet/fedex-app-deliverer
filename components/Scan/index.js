import React, { Component } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

class Scan extends Component {
  //TODO: move to parent (propMapper to be exact)
  _emitSocket(e, payload) {
    this.props.socketClient.emit(e, payload);
  }

  render() {
    const delivererId = "5ac38977f36d287dbca60345";
    return (
      <Container>
        <ScanButtonContainer
          onPress={() => {
            this._emitSocket("package:scanned", {
              delivererId,
              consumerId: "5afad0f28e12c10c40f1873f",
              zip: "3037EE",
              number: "127a"
            });

            this._emitSocket("package:scanned", {
              delivererId,
              consumerId: "5ae1bae313a850016734496f",
              zip: "1234AB",
              number: "56"
            });
          }}
          underlayColor="#4747CB"
        >
          <ScanButton>Scanning package..</ScanButton>
        </ScanButtonContainer>
        <DoneScanningButton
          onPress={() =>
            this._emitSocket("package:done-scanning", {
              delivererId
            })
          }
        >
          <ScanButton>Done scanning batch</ScanButton>
        </DoneScanningButton>
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

const DoneScanningButton = styled.TouchableHighlight``;
