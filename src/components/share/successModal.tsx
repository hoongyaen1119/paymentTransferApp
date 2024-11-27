import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface SuccessModalProps {
    modalAction: () => void; 
}

const SuccessModal: React.FC<SuccessModalProps> = ({ modalAction}) => {

    const hideModal = () => {
        modalAction(null)
    };

    return (
        <View>
            <Modal
                animationType="fade" 
                transparent={true}
                visible={true}
                onRequestClose={hideModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.successText}>Thank you!</Text>
                        <Image source={require("../../assets/gif/payment_done.gif")} style={styles.image}/>
                        <Text style={styles.successText}>Payment done successfully.</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  image: {
    width:100,
    height:100, 
    marginVertical:10
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#014766',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:"bold"
  },
});

export default SuccessModal;