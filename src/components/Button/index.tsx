import { TouchableOpacityProps, } from 'react-native';
import {
    TouchButton,
    ButtonText,
    ButtonTypeStyleProps,
} from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
}

export function Button({title, type = 'PRIMARY', ...rest} : Props){
    return (
            <TouchButton 
            type={type}
            {...rest} 
            >
                <ButtonText>
                    {title}
                </ButtonText>
            </TouchButton>
    );
}