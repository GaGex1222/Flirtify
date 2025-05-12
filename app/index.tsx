import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import "@/global.css"; // assuming Tailwind is working
import { useRouter } from 'expo-router';


export default function FlirtifyWelcomeScreen() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-background items-center justify-center px-6 pt-10">
        <StatusBar backgroundColor="#fce7f3" /> {/* Tailwind pink-500 */}
        {/* Hero Image */}
            <Image
                source={require('@/assets/images/flirtify.png')}
                className="w-96 h-96 mb-6"
                resizeMode="contain"
            />

        {/* App Title */}
        <Text className="text-5xl font-extrabold text-pink-600 mb-4 text-center">
            Flirtify
        </Text>

        {/* Bold Subtext */}
        <Text className="text-xl text-gray-800 font-semibold text-center mb-8 px-2">
            Level up your flirting game — with real tips, practice, and confidence boosters.
        </Text>

        {/* Features List */}
        <View className="space-y-3 mb-10">
            <Text className="text-base font-medium text-center text-gray-700">
            💬 Talk smooth with AI-guided conversations.
            </Text>
            <Text className="text-base font-medium text-center text-gray-700">
            🧠 Learn psychology-backed techniques.
            </Text>
            <Text className="text-base font-medium text-center text-gray-700">
            💖 Get confident, authentic, and attractive.
            </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
            onPress={() => router.push("/preferences")}
            className="bg-pink-600 px-8 py-3 rounded-full shadow-lg active:opacity-90"
        >
            <Text className="text-white text-lg font-bold">Get Started</Text>
        </TouchableOpacity>
        </View>
    );
}
