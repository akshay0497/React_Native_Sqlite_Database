import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'StudentDatabases.db'});

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setStudentData(temp);
      });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={studentData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.userItem}>
              <Text style={[styles.itemText, {color:"darkgreen", fontStyle:'italic',textDecorationLine:"underline", paddingVertical:5}]}>{"Student_id : "+ item.user_id}</Text>
              <View style={styles.flexsy}>
                <Text style={styles.itemText}>{'Student Name : ' + item.studentname}</Text>
                <Text style={styles.itemText}>{'Roll No. : ' + item.rollNo}</Text>
              </View>
              <View style={styles.flexsy}>
                <Text style={styles.itemText}>{'Maths Marks : ' + item.maths}</Text>
                <Text style={styles.itemText}>{'Physics Marks : ' + item.physics}</Text>
              </View>
              <View style={styles.flexsy}>
                <Text style={styles.itemText}>{'Chemistry Marks : ' + item.chemistry}</Text>
                <Text style={styles.itemText}>{'Biology Marks : ' + item.biology}</Text>
              </View>
              <View style={styles.flexsy}>
                <Text style={styles.itemText}>{'Hindi Marks : ' + item.hindi}</Text>
                <Text style={styles.itemText}>{'English Marks : ' + item.english}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddUser');
        }}>
        <Text style={styles.btnText}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addNewBtn: {
    backgroundColor: 'purple',
    width: 150,
    height: 50,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexsy:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:5,
    backgroundColor: "#ffeaf4",
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
  userItem: {
    width: '100%',
    padding: 10,
  },
  itemText: {
    // backgroundColor: 'lightgrey',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});
