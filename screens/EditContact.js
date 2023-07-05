/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'ContactDatabase.db' });

const EditContact = ({ navigation,route }) => {
  let person_id = route.params.contactInfo.person_id;

  let [personName, setPersonName] = useState('');
  let [mobileNumber, setMobileNumber] = useState('');
  let [landlineNumber, setLandlineNumber] = useState('');

  let updateAllStates = (person_name, mobile_number, landline_number) => {
    setPersonName(person_name);
    setMobileNumber(mobile_number);
    setLandlineNumber(landline_number);
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_contact where person_id = ?',
        [person_id],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.person_name,
              res.mobile_number,
              res.landline_number
            );
          } else {
            alert('Contact not found');
            updateAllStates('', '', '');
          }
        }
      );
    });
  },[]);
  
  let editContact = () => {
    console.log(person_id, personName, mobileNumber, landlineNumber);
    if (!personName) {
      alert('Please fill name');
      return;
    }
    if (!mobileNumber) {
      alert('Please fill mobile Number');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE table_contact set person_name=?, mobile_number=? , landline_number=? where person_id=?',
        [personName, mobileNumber, landlineNumber, person_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ContactList'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Name"
                value={personName}
                style={{ padding: 10 }}
                onChangeText={
                  (personName) => setPersonName(personName)
                }
              />
              <Mytextinput
                value={'' + mobileNumber}
                onChangeText={
                  (mobileNumber) => setMobileNumber(mobileNumber)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={landlineNumber}
                onChangeText={
                  (landlineNumber) => setLandlineNumber(landlineNumber)
                }
                maxLength={15}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Edit Contact"
                customClick={editContact}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditContact;