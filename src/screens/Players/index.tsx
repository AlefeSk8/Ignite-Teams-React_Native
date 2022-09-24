import { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playerStorageDTO } from '@storage/player/playerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { AppError } from '@utils/AppError'

type RouteParams = {
    group: string;
};

export function Players(){
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<playerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleNewPlayer(){
        if (newPlayerName.trim().length === 0) {
            Alert.alert('Novo Jogador', 'Digite o nome do jogador para adicionar.')
        };

        const newPlayer = {
            name: newPlayerName, 
            team,
        }
        
        try {
            await playerAddByGroup(newPlayer, group);
            
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName('')
            fetchPlayersByTeam();

        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Novo Jogador', error.message);
            } else {
                console.log(error);
                Alert.alert('Novo Jogador', 'Não foi possivel adicionar.')
            }
        }        
    }

    async function fetchPlayersByTeam(){
        try {
            setIsLoading(true)
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam)
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado');
        }
    }

    async function handlePlayerRemove(playerName: string){
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();

        } catch (error) {
            console.log(error);
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo.');
        }
    }

    async function handleGroupRemove(){
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                { text: 'Não', style: 'cancel'},
                { text: 'Sim', onPress: () => groupRemove()}
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header 
                showBackButton
            />

            <Highlight 
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleNewPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    icon='add'
                    onPress={() => handleNewPlayer()}
                />
            </Form>
        
            {
                isLoading ? <Loading /> :
                <HeaderList>
                    <FlatList
                        data={['Time A', 'Time B']}//array para gerar 2 times A e B
                        keyExtractor={item => item} //A Key de cada item é o proprio item
                        renderItem={({ item }) => (//Da acesso ao 'item' para o conteudo da renderização
                            <Filter
                                title={item} //Ex. 1 exibe o nome de 'item' em title
                                isActive={item === team} //Se 'item' for identico a variavel 'team' então isActive={True}
                                onPress={() => setTeam(item)}//Define a Variavel 'team' com o nome do 'item'
                            />
                        )}
                        horizontal //Por padrão já é 'horizontal={true}' por isso não há necessidade de especificar...
                    />

                    <NumberOfPlayers>
                        {players.length}
                    </NumberOfPlayers>
                </HeaderList>
            }

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Não há pessoas nesse time."
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />
            
            <Button
                title="Remover turma"
                type='SECONDARY'
                onPress={handleGroupRemove}
            />
        </Container>
    );
}