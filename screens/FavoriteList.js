/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ContactCard from '../components/ContactCard';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'ContactDatabase.db'});


function FavoriteList({navigation}) {

    const [favoriteContacts, setFavoriteContacts] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM table_contact WHERE is_favorite = ?',
            [1], // Fetch only the favorite contacts (is_favorite = 1)
            (tx, results) => {
              const len = results.rows.length;
              const favoriteContactsArray = [];
              for (let i = 0; i < len; i++) {
                favoriteContactsArray.push(results.rows.item(i));
              }
              setFavoriteContacts(favoriteContactsArray);
            }
          );
        });
      }, []);
      

  return (
    <View>
        <FlatList
        data={favoriteContacts}
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


    </View>
  );
}

const styles = StyleSheet.create({

    card: {
        padding: 10,
        margin: 5
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    primaryText: {
        fontSize: 18
    },
    iconContent: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 24,
        color: 'white',
        marginHorizontal: 10
    },
    icon: {
        borderRadius: 25,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        padding: 1,
        backgroundColor: 'green'
    }
})

export default FavoriteList;
