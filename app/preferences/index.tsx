import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const steps = [
  'Target Gender',
  'Shyness Level',
  'Flirting Style'
];

export default function PreferencesScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<string | null>(null);
  const [shyness, setShyness] = useState(3);
  const [style, setStyle] = useState<string | null>(null);

  const progress = useRef(new Animated.Value((step + 1) / steps.length)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (step + 1) / steps.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/home'); 
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View className="space-y-4">
            <Text className="text-xl font-bold text-center text-gray-800">Who are you interested in flirting with?</Text>
            {['Women', 'Men', 'Everyone'].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setGender(g)}
                className={`p-4 rounded-full mt-4 border-2 ${gender === g ? 'border-pink-600' : 'border-gray-300'}`}
              >
                <Text className="text-center text-lg">{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 1:
        return (
          <View className="space-y-4">
            <Text className="text-xl font-bold text-center text-gray-800">How shy are you when flirting?</Text>
            <View className="flex-row justify-between px-6">
              {[1, 2, 3, 4, 5].map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setShyness(level)}
                  className={`w-10 h-10 mt-4 rounded-full ${shyness >= level ? 'bg-pink-500' : 'bg-gray-300'}`}
                />
              ))}
            </View>
          </View>
        );
      case 2:
        return (
          <View className="space-y-4">
            <Text className="text-xl font-bold text-center text-gray-800">What best describes your flirting style?</Text>
            {['Funny', 'Direct', 'Playful', 'Sweet'].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStyle(s)}
                className={`p-4 mt-4 rounded-full border-2 ${style === s ? 'border-pink-600' : 'border-gray-300'}`}
              >
                <Text className="text-center text-lg">{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-10">
      <StatusBar backgroundColor="#fce7f3" />
      <View className="mb-6">
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <Animated.View
            style={{
              height: 8,
              backgroundColor: '#ec4899',
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
              borderRadius: 10,
            }}
          />
        </View>
        <Text className="text-center mt-2 text-gray-500">Step {step + 1} of {steps.length}</Text>
      </View>

      {renderStep()}

      <TouchableOpacity
        onPress={handleNext}
        className="mt-10 bg-pink-600 px-8 py-3 rounded-full self-center"
        disabled={step === 0 && !gender || step === 2 && !style}
      >
        <Text className="text-white text-lg font-bold">
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}