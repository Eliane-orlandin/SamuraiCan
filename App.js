import React, { useState } from "react";
import {
  Alert,
  Modal,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RNCamera } from "react-native-camera";

const App = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const onChangePhoto = (newPhoto) => {
    setPhoto(newPhoto);
    setIsCameraVisible(false);
  };
  const onCloseCamera = () => {
    setIsCameraVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{ uri: photo }}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsCameraVisible(true);
          }}
        >
          <Icon name="camera-alt" size={40} color={"#f37272"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPhoto(null);
          }}
        >
          <Icon name="delete" size={40} color={"f37272"} />
        </TouchableOpacity>
      </View>
      <Camera
        isVisible={isCameraVisible}
        onChangePhoto={onChangePhoto}
        onCloseCamera={onCloseCamera}
      />
    </View>
  );
};
const Camera = ({ isVisible, onChangePhoto, onCloseCamera }) => {
  const [camera, setCamera] = useState();
  const onTakePicture = async () => {
    try {
      const { uri } = await camera.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
        skipProcessing: true,
      });
      onChangePhoto(uri);
    } catch (error) {
      Alert.alert("Erro", "Erro ao tirar a foto.");
    }
  };
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <RNCamera
        ref={(ref) => setCamera(ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: "Uso da câmera",
          message: "Liberar permissão para câmera.",
          buttonPositive: "Ok",
          buttonNegative: "Cancelar",
        }}
        captureAudio={false}
      >
        <Icon
          name="photo-camera"
          size={40}
          color={"#fff"}
          onPress={onTakePicture}
          style={styles.buttonTakePicture}
        />
        <Icon
          name="close"
          size={50}
          color={"#fff"}
          onPress={onCloseCamera}
          style={styles.buttonCloseCamera}
        />
      </RNCamera>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f37272" },
  photo: {
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 80,
  },
  buttons: { marginTop: 10, flexDirection: "row", justifyContent: "center" },
  button: {
    backgroundColor: "fff",
    margin: 20,
    borderRadius: 150,
    width: 80,
    height: 80,
  },
  alignItems: "center",
  justifyContent: "center",
  buttonTakePicture: {
    flex: 0,
    alignSelf: "center",
    positions: "absolute",
    bottom: 20,
  },
  buttonsCloseCamera: { flex: 0, positions: "absolute", top: 20, right: 20 },
});
export default App;
