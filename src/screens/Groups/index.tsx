import { useState, useCallback } from 'react';
import { Alert, FlatList, } from 'react-native';

import { Loading } from '@components/loading';
import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import * as S from './styles'; /* Outra forma de importar o styled-componets é esse " * " significa tudo que está dentro daquele caminho/pasta "as(como)"" sendo "S" porque faz referencia a Style mas pode escolher a letra ou palavra que quiser ou se preferir pode importar normal
import { Container, Title } from './styles' conforme mostra acima */

export function Groups(){
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([])
    const navigation = useNavigation();

    function handleNewGroup(){
        navigation.navigate('new');
    };

    async function fetchGroups(){
        try {
            setIsLoading(true);

            const data = await groupsGetAll();
            setGroups(data);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
        }
    };

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group })
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []));

    return (
        <S.Container>
            <Header />

            <Highlight 
                title='Turmas'
                subtitle='jogue com a sua turma'
            />

            { isLoading ? <Loading /> :
                <FlatList 
                    data={groups}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <GroupCard 
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                        />
                    )}
                    contentContainerStyle={groups.length === 0 && {flex: 1}}
                    ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Que tal cadastrar a primeira turma?"
                    />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            }
            
                
            <Button 
                title="Criar nova turma"
                type='PRIMARY'//por padrão já é PRIMARY e não é necessario ser informado mas se for SECONDARY deve informar!
                onPress={handleNewGroup}
            />
        </S.Container>
    );
}