/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactCard from '../components/ContactCard';
import {openDatabase} from 'react-native-sqlite-storage';
import Mybutton from '../components/Mybutton';
import CreateNewContact from './CreateNewContact';

var db = openDatabase({name: 'ContactDatabase.db'});

function ContactList({navigation}) {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_contact'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_contact', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_contact(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name VARCHAR(20), mobile_number VARCHAR(20), landline_number VARCHAR(20), is_favorite BOOLEAN)',
              [],
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_contact', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
      });
    });
  });

  return (
    <View>
      <FlatList
        data={flatListItems}
        keyExtractor={item => item.person_id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                contactInfo: {id: item.person_id},
              })
            }>
            <ContactCard contactInfo={item.person_name} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#000000',
          position: 'absolute',
          right: 20,
          top: 550,
        }}
        onPress={() => navigation.navigate('CreateNewContact')}>
        <Image
          source={require('./images/plus.png')}
          style={{width: 30, height: 30, tintColor: '#fff'}}
        />
      </TouchableOpacity>
    </View>
  );
}

function FavoriteListScreen() {
  return (
    <View>
      <Text>Favorite List</Text>
    </View>
  );
}

// const Drawer = createDrawerNavigator();

// function ContactList({ navigation }) {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="ContactList">
//         <Drawer.Screen name="ContactList" component={ContactListScreen} />
//         <Drawer.Screen name="FavoriteList" component={FavoriteListScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({});

export default ContactList;
