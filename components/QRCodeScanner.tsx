import React, {useCallback, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {CameraView} from 'expo-camera/next';
import {Camera, PermissionStatus} from 'expo-camera';
import Button from './Button';

type Props = {
  onCodeScanned: (code: string) => void;
};

export function QRCodeScanner({onCodeScanned}: Props) {
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const onPress = useCallback(async () => {
    if (barcodeModalVisible) {
      setBarcodeModalVisible(false);
      return;
    }
    const {status: cameraStatus} = await Camera.requestCameraPermissionsAsync();
    if (cameraStatus === 'granted') {
      setBarcodeModalVisible(true);
    }
  }, [barcodeModalVisible]);

  const onBarCodeScanned = useCallback(
    ({data}: {data: string}) => {
      onCodeScanned(data);
      setBarcodeModalVisible(false);
    },
    [onCodeScanned],
  );

  return (
    <>
      <Modal
        visible={barcodeModalVisible}
        onRequestClose={() => setBarcodeModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet">
        <View style={styles.barcodeWrapper}>
          <CameraView
            onBarcodeScanned={onBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{barcodeTypes: ['qr']}}
          />
        </View>
      </Modal>
      <Button onPress={onPress} title="Scan QR code" />
    </>
  );
}

export default QRCodeScanner;

const styles = StyleSheet.create({
  barcode: {
    flex: 1,
  },
  barcodeWrapper: {
    backgroundColor: 'black',
    flex: 1,
  },
});
