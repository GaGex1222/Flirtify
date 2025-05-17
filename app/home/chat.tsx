import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // optional icon
export default function ChatScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState([
        {role: 'system', content: "You are a charming, confident, and playful woman who's texting with a guy. Your goal is to flirt, tease, and keep the conversation fun and flirty. If he seems shy, uninterested, or tries to back away, turn it around — make him curious, make him laugh, and pull him back in with confidence and charm. Always keep a light, fun, and irresistibly playful tone."},
        { role: 'assistant', content: "Hey there 😏 Ready to practice your flirting?" }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<ScrollView>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const sendMessage = async () => {
        console.log("sent message")
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        // Fake AI reply for now
        // here call route and get response back from server
        console.log(messages)
        try{
          const response = await fetch("http://10.0.0.12:3001/flirt/chat", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userMessage: input,
                conversation: messages
            })
          })

          if (!response.ok) {

            const errorText = await response.text(); 
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
          }

          const data = await response.json()
          const aiMessage = data['aiMessage']
          setTimeout(() => {
          setMessages(prev => [
              ...prev,
              { role: 'assistant', content: aiMessage }
          ]);
          }, 800);
        } catch (error) {
          console.error("Error during fetch or processing:", error);

        }
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
            msg.role == "system" ? null : (
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
            )
          ))}
        </ScrollView>

        <View className="flex-row items-center px-4 py-2   border-t border-background bg-white">
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
