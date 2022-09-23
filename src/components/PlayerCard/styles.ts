import styledNative, { css } from 'styled-components/native';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const Container = styledNative.View`
    width: 100%;
    height: 56px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_500};
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    border-radius: 6px;
`;

export const Name = styledNative.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLORS.GRAY_200};
    `};
    flex: 1;
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_200,

}))`
    margin-left: 16px;
    margin-right: 4px;
`;