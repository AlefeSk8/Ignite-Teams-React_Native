import { TextInput, TextInputProps } from 'react-native';
import { Container, } from './styles';
import { useTheme } from 'styled-components/native'; //Para acessar o thema fora do styled components

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>
}

export function Input({inputRef, ...rest} : Props){
    const { COLORS } = useTheme(); //const theme = useTheme() importa todos os parametros ou entre { COLORS, FONT-FAMILY, FONT-SIZE } desinstrutura... e recupera só o que especificar.

    return (
        <Container
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
            {...rest} 
        />
    );
}