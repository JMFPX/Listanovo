import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  function App() {
  
  const [lista, setLista] = useState([]);
  const [novaLista, setnovaLista] = useState('');

  async function addlista() {
   
    if(novaLista === ''){
     return;
   }
    
   const search = lista.filter(lista => lista == novaLista);
    if (search.length !== 0) {
      Alert.alert('Aviso', 'Nome da Tarefa está repetido!');
      return;
    } else {
    }
    
    setLista([...lista, novaLista]);
    setnovaLista('');

    Keyboard.dismiss();
    
    const salvardados = () => {
      AsyncStorage.setItem('lista', JSON.stringify(lista));
    }
    
    salvardados();
  }
  
  

  async function removerlista(item){
      Alert.alert(
        'Deletar lista',
        'Tem certeza que você quer remove a anotação?',
        [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => setLista(lista.filter(lista => lista != item))
        }
        ],
        {cancelable: false}
      );
      
    }
  
      async function carregaDados(props){
       const listareceber = await AsyncStorage.getItem('lista');
      // console.log(props.item)
      console.log(listareceber);
      }
       
      // console.log(lista)
    
     
   
    
  

  
   return(
  
      <KeyboardAvoidingView keyboardVerticalOffset={0} style={{flex: 1}}>
        <View style={style.container}>
         <TouchableOpacity onPress={carregaDados}>
          <Image
          style={{ width: 50, height: 50, left: 330}}
          source={require('../test/Componentes/Imagens/engenharia-reversa.png')}/>
         <Text>{{listareceber}}</Text>
         </TouchableOpacity>
          <View style={style.body}>
            <FlatList
              style={style.FlatList}
              data={lista}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={style.ContainerView}>
                  <Text style={style.text}>{item}</Text>
                  <TouchableOpacity onPress={() => removerlista(item)}>
                    <Image
                      style={{height: 30, width: 30}}
                      source={require('../test/Componentes/Imagens/excluir.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <View style={style.Form}>
            <TextInput
              style={style.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              placeholder="Adicione uma Tarefa"
              maxLength={50}
              onChangeText={text => setnovaLista(text)}
              value={novaLista}
            />
            <TouchableOpacity style={style.Button} onPress={addlista}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../test/Componentes/Imagens/sinal-de-adicao.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  body: {
    flex: 1,
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundcolor: '#eee',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c6cce',
    borderRadius: 4,
    marginLeft: 10,
  },
  FlatList: {
    flex: 1,
    marginTop: 5,
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#777',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
});
export default App;
