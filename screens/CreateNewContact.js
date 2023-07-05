/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {openDatabase} from 'react-native-sqlite-storage';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
var db = openDatabase({name: 'ContactDatabase.db'});

function CreateNewContact({navigation}) {
  let [personName, setPersonName] = useState('');
  let [mobileNumber, setMobileNumber] = useState('');
  let [landlineNumber, setLandlineNumber] = useState('');
  let [isFavorite, setIsFavorite] = useState(false);

  // const toggleFavorite = () => {
  //   setIsFavorite(!isFavorite);
  // };

  let addNewContact = () => {
    console.log(personName, mobileNumber, landlineNumber);
    // console.warn("try---",isFavorite);

    if (!personName) {
      alert('Please fill Person Name');
      return;
    }
    if (!mobileNumber) {
      alert('Please fill Mobile Number');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_contact (person_name, mobile_number, landline_number, is_favorite) VALUES (?,?,?,?)',
        [personName, mobileNumber, landlineNumber,isFavorite],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact Added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ContactList'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Contact Not Added');
        },
      );
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={personeName => setPersonName(personeName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Mobile Number"
                onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                maxLength={15}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Landline Number"
                onChangeText={landlineNumber =>
                  setLandlineNumber(landlineNumber)
                }
                maxLength={15}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
              <Mybutton title="save" customClick={addNewContact} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
})

export default CreateNewContact;
