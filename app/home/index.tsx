import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons'; // Feather has a good "edit" icon

export default function HomeScreen() {
  const router = useRouter();

  // Simulated preferences (replace with actual state or context)
  const preferences = {
    gender: 'Women',
    shyness: 3,
    style: 'Playful',
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="items-center mb-10">
            <Text className="text-4xl font-extrabold text-pink-600">💘 Flirtify</Text>
            <Text className="text-lg text-gray-600 mt-2 text-center">
              Practice flirting, boost your confidence, and get real-time feedback.
            </Text>
                        <Image
                            source={require('@/assets/images/flirtify.png')}
                            className="w-96 h-96 mb-6"
                            resizeMode="contain"
                        />
          </View>

          {/* Preferences Card */}
            <View className="relative">
                <View className="bg-white rounded-2xl shadow-md p-6 space-y-4 mb-12">
                    <Text className="text-xl font-bold text-pink-600 mb-2 text-center">Your Preferences</Text>
                    <Text className="text-lg">🎯 <Text className="font-semibold">Target:</Text> {preferences.gender}</Text>
                    <Text className="text-lg">😳 <Text className="font-semibold">Shyness:</Text> {preferences.shyness} / 5</Text>
                    <Text className="text-lg">💁 <Text className="font-semibold">Style:</Text> {preferences.style}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/preferences')}
                    className="absolute top-2 right-2 bg-pink-100 p-2 rounded-full"
                >
                    <Feather name="edit-3" size={20} color="#ec4899" />
                </TouchableOpacity>
            </View>


          {/* CTA Button */}
          <TouchableOpacity
            onPress={() => router.push('/home/chat')}
            className="bg-pink-600 px-8 py-4 rounded-full self-center shadow-lg"
          >
            <Text className="text-white text-xl font-bold">💬 Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
