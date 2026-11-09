
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

export default function App() {
  const [showDetail, setShowDetail] = useState(true);

  return (
    <SafeAreaProvider>
      {showDetail ? (
        <DetailScreen
          onBack={() => setShowDetail(false)}
        />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}
