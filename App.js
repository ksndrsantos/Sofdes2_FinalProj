import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,      
  StatusBar,     
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

// --- Color Palette ---
const colors = {
  background: '#FEFCEF', // Cream
  bannerBackground: '#00503F', // Dark Green
  textMain: '#000000',
  textSecondary: '#555555',
  buttonBackground: '#5F4633', // Brown
  buttonText: '#FFFFFF',
  inputBorder: '#C5C59F', // Light grey-brown
  placeholder: '#A8A88E',
  headerLabel: '#D3D3D3',
  alertBackground: '#FFFFFF',
  alertText: '#333333',
  alertButton: '#5F4633',
};

// --- Custom Alert Component ---
const CustomSuccessAlert = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Feedback Submitted</Text>
          <Text style={styles.alertMessage}>
            Your insights matter! Thank you for sharing your feedback with White Hat Coffee.
          </Text>
          <TouchableOpacity style={styles.alertButton} onPress={onClose}>
            <Text style={styles.alertButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// --- Main App Component ---
export default function App() {
  const [feedbackText, setFeedbackText] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // --- Mock Database Save Function ---
  // In a real app, this would be an API call (e.g., fetch, axios) to your backend.
  const mockSaveToDB = async (text) => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        console.log(`[MOCK DB] Saving feedback: "${text}"`);
        // We'll simulate success. In real scenarios, this function should
        // handle errors if the backend call fails.
        resolve(true);
      }, 1000);
    });
  };

  // --- Submit Handler ---
  const handleSubmit = async () => {
    // 1. Validate: check if text is empty (trimmed)
    if (!feedbackText.trim()) {
      // Do nothing, as requested. (Optionally log to console or provide minor feedback)
      console.log('Submission attempted, but feedback is empty.');
      return;
    }

    // 2. Clear input and show alert immediately for UX,
    // then process saving in the background (mock).
    const textToSave = feedbackText; // Capture to use in mock DB
    setFeedbackText('');
    setIsAlertVisible(true);

    // 3. (Simulate) Save to Backend Database
    try {
      await mockSaveToDB(textToSave);
      console.log('Feedback process completed successfully (simulated).');
    } catch (error) {
      console.error('Error in feedback submission process:', error);
      // In a real app, you might want to show an error alert here.
    }
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 2. Top Green Banner */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerBannerText}>
          start your day right with <Text style={{ textDecorationLine: 'underline' }}>White Hat.</Text>
        </Text>
      </View>

      {/* 3. Main Feedback Form Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContent}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.innerContent}>
            <Text style={styles.titleText}>THANK YOU FOR CHOOSING WHITE HAT COFFEE!</Text>
            <Text style={styles.descriptionText}>
              Your insights matter to us. Let us know what you think about our products and services by submitting your feedback.
            </Text>

            {/* 4. Text Input Area */}
            <View style={styles.textInputArea}>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Insert Text Here"
                placeholderTextColor={colors.placeholder}
                multiline={true}
                numberOfLines={10}
                value={feedbackText}
                onChangeText={setFeedbackText}
                textAlignVertical="top"
              />
            </View>

            {/* 5. Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 6. Custom Alert */}
      <CustomSuccessAlert visible={isAlertVisible} onClose={handleCloseAlert} />
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  // --- General layout ---
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerLabel: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 12,
    color: colors.headerLabel,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 10,
    zIndex: 10,
  },
headerBanner: {
    backgroundColor: colors.bannerBackground,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    ...Platform.select({
      web: {
        top: 30, // Original position for the web
        paddingVertical: 15,
      },
      default: {
        // Mobile: Pin to the top and add green padding for the notification bar
        top: 0,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 5 : 65,
        paddingBottom: 15,
      },
    }),
  },
  headerBannerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    marginTop: 80,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  innerContent: {
    width: '85%',
    alignItems: 'center',
  },

  // --- Form Elements ---
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  textInputArea: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // Clean white background inside the box
    marginBottom: 30,
    overflow: 'hidden'
  },
  feedbackInput: {
    width: '100%',
    minHeight: 180, // Approximate height for 10 lines
    fontSize: 16,
    color: colors.textMain,
    padding: 15,
    outlineStyle: 'none',
  },
  submitButton: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2, // Slight shadow for depth
  },
  submitButtonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },

  // --- Custom Alert ---
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  alertContainer: {
    width: '80%',
    backgroundColor: colors.alertBackground,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.alertButton,
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: colors.alertButton,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  alertButtonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});
