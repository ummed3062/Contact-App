/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'ContactDatabase.db'});

function Profile({navigation, route}) {
  // const { displayId } = contactInfo;
  let person_id = route.params.contactInfo.id;
  const [isFavorite, setIsFavorite] = useState(false);
  let [personData, setPersonData] = useState({});

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_contact where person_id = ?',
        [person_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setPersonData(results.rows.item(0));
          } else {
            alert('Contact Not found');
          }
        },
      );
    });
  }, []);

  let deleteContact = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_contact where person_id=?',
        [person_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ContactList'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Contact not found');
          }
        },
      );
    });
  };

  function favoriteContact(){

  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_contact SET is_favorite = ? WHERE person_id = ?',
        [isFavorite ? 1 : 0, person_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Favorite status updated successfully',isFavorite);
          } else {
            console.log('Failed to update favorite status');
            console.warn("failed.......")
          }
        }
      );
    });
  },[isFavorite]);
  

  return (
    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <MaterialIcons name="person" size={120} color="#666" />
      </View>
      <Text style={styles.name}>{personData.person_name}</Text>
      <Text style={styles.phoneNumber}>{personData.mobile_number}</Text>
      <Text style={styles.phoneNumber}>{personData.landline_number}</Text>

      <TouchableOpacity
        style={[
          styles.favoriteButton,
          {backgroundColor: isFavorite ? '#FFD700' : '#fff'},
        ]}
        onPress={toggleFavorite}>
        <MaterialIcons
          name="star"
          size={20}
          color={isFavorite ? '#fff' : '#FFD700'}
        />
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={deleteContact}>
          <MaterialIcons name="delete" size={20} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() =>
            navigation.navigate('FavoriteList', {
              contactInfo: {person_id},
            })
          }>
          <MaterialIcons name="favorite" size={20} color="#fff" />
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('EditContact', {
              contactInfo: {person_id},
            })
          }>
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  phoneNumber: {
    fontSize: 18,
    marginBottom: 5,
    color: '#666',
  },
  favoriteButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#666',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff',
  },
});

export default Profile;
