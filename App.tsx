import { ThemeProvider, } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar, } from 'react-native';
import theme from './src/theme';
import { Loading } from '@components/loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold }); //Confere se a fonte já foi carregada por ser assincrono

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      
      {fontsLoaded ? <Routes /> : <Loading /> /*Confere se a fonte já foi carregada antes de rederizar o conteudo caso contrario mostra o Loading*/
      }
      
    </ThemeProvider>
  );
}