//import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
    flex: 1;
    flex-direction: column;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding: 24px;
    height: 100%;
`;

/*export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101010',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',

    }
})*/