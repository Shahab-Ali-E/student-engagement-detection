import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';

export default function Detection() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);

  // Load your TFLite model
  const tfPlugin = useTensorflowModel(
    require('../../../assets/engagement_detection_model_tf_lite/engagement_model_89.tflite')
  );

  // Ask for camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (tfPlugin.state === 'error') {
        Alert.alert('Model Load Error', tfPlugin.error?.message || 'Unknown');
      }
    })();
  }, [tfPlugin.state]);

  // Periodically take a picture and run inference
  useEffect(() => {
    let interval;
    if (hasPermission && tfPlugin.state === 'loaded') {
      interval = setInterval(async () => {
        if (cameraRef.current) {
          try {
            // Grab a low-res base64 snapshot
            const photo = await cameraRef.current.takePictureAsync({
              base64: true,
              skipProcessing: true,
              quality: 0.3,
            });
            // Convert base64 to Uint8Array
            const raw = atob(photo.base64);
            const inputBuffer = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; i++) {
              inputBuffer[i] = raw.charCodeAt(i);
            }
            // Run model
            const output = await tfPlugin.model.run(inputBuffer);
            console.log('Inference outputs:', output);
          } catch (e) {
            console.warn('Capture/Inference error:', e);
          }
        }
      }, 1000); // every 1 second
    }
    return () => clearInterval(interval);
  }, [hasPermission, tfPlugin]);

  // Loading & permission states
  if (hasPermission === null || tfPlugin.state === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Initializing…</Text>
      </View>
    );
  }
  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        type={cameraType}
        ref={cameraRef}
      />
      <View style={styles.flipButton}>
        <Button
          title="Flip Camera"
          onPress={() =>
            setCameraType((t) =>
              t === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#00000088',
    borderRadius: 8,
  },
});
