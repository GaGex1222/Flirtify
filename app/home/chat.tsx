import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // optional icon
export default function ChatScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hey there 😏 Ready to practice your flirting?" }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<ScrollView>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        // Fake AI reply for now
        setTimeout(() => {
        setMessages(prev => [
            ...prev,
            { role: 'ai', content: `Ooh, smooth 😏 Tell me more.` }
        ]);
        }, 800);
    };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          className="px-4 pt-4"
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              className={`max-w-[80%] my-2 p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-pink-600 self-end rounded-tr-none'
                  : 'bg-white self-start rounded-tl-none'
              }`}
            >
              <Text className={`${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                {msg.content}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row items-center px-4 py-3 border-t border-background bg-white">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type something flirty..."
            className="flex-1 bg-background px-4 py-2 rounded-full text-base"
          />
          <TouchableOpacity
            onPress={sendMessage}
            className="ml-3 bg-pink-600 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
