import { useState } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Icon } from './styles'
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '../../storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup(){
    const navigation = useNavigation();
    const [group, setGroup] = useState('')

    async function handleNew(){
        try {
            if(group.trim().length === 0) {
                return Alert.alert('Nova turma', 'Informe o nome da turma.')
            }

            await groupCreate(group);
            navigation.navigate('players', {group: group}); // em casos assim {group: group} o JS permite especificar só como { group } faça o teste.
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova turma', error.message);
            } else {
                Alert.alert('Nova turma', 'Não foi possivel criar uma nova turma.');
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <Header 
                showBackButton
            />

            <Content>
                <Icon />

                <Highlight 
                    title="Criar turma"
                    subtitle="crie uma turma para adicionar pessoas"
                />
            </Content>

            <Input 
                placeholder="Nome da turma"
                onChangeText={setGroup}
            />

            <Button 
                title='Criar'
                style={{marginTop: 20}}
                onPress={handleNew}
            />
        </Container>
    );
}