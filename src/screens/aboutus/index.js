import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        📘 About Us
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        Welcome to the Student Engagement Detection System!
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Our mission is to enhance online learning by monitoring and improving student engagement during virtual classes. Using advanced deep learning techniques like <Text style={{ fontWeight: 'bold' }}>ResNet50</Text>, our system analyzes video inputs to detect whether students are attentive or distracted, helping educators tailor their teaching strategies more effectively.
      </Text>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
        🔑 Key Features:
      </Text>
      <Text style={{ fontSize: 16 }}>• 🎥 Real-time engagement monitoring</Text>
      <Text style={{ fontSize: 16 }}>• 📊 Analytics dashboard for academic performance</Text>
      <Text style={{ fontSize: 16 }}>• 🧠 Smart detection using ResNet50</Text>
      <Text style={{ fontSize: 16 }}>• 📁 Secure and privacy-focused data handling</Text>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
        🎯 Our Goal:
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        To create a supportive and data-driven online learning environment where every student can thrive academically.
      </Text>
    </ScrollView>
  );
};

export default AboutUsScreen;
