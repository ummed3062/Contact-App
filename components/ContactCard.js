/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';


function ContactCard({contactInfo}) {

    // const { displayName } = contactInfo;
    // console.warn(displayName.Name);
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.icon}>
            <Text style={styles.iconContent}>{contactInfo[0]}</Text>
        </View>
        <Text style={styles.primaryText}>{contactInfo}</Text>

      </View>
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

export default ContactCard;
