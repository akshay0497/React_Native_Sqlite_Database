import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';
import Home from './Home';

let db = openDatabase({name: 'StudentDatabases.db'});

const Task = () => {
  const navigation = useNavigation();
  const [studentname, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [maths, setMaths] = useState('');
  const [physics, setPhysics] = useState('');
  const [chemistry, setChemistry] = useState('');
  const [biology, setBiology] = useState('');
  const [hindi, setHindi] = useState('');
  const [english, setEnglish] = useState('');

  const saveUser = () => {
    console.log(studentname,rollNo,physics,chemistry,biology,maths,hindi,english);

    if (!studentname) {
      alert('Please fill your name');
      return;
    }
    if (!rollNo) {
      alert('Please fill Roll No.');
      return;
    }
    if (!maths) {
      alert('Please fill Maths Marks');
      return;
    }
    if (!physics) {
      alert('Please fill Physics Marks');
      return;
    }
    if (!chemistry) {
      alert('Please fill Chemistry Marks');
      return;
    }
    if (!biology) {
      alert('Please fill Biology Marks');
      return;
    }
    if (!hindi) {
      alert('Please fill Hindi Marks');
      return;
    }
    if (!english) {
      alert('Please fill English Marks');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (studentname, rollNo, physics, chemistry, biology, maths, hindi, english) VALUES (?,?,?,?,?,?,?,?)',
        [studentname,rollNo,physics,chemistry,biology,maths,hindi,english],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              // 'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: true }
            );
          } else alert('Registration Failed');
        }
      );})
    
  }


  useEffect(()=>{
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, studentname VARCHAR(255), rollNo INT(3), physics INT(3), chemistry INT(3), biology INT(3), maths INT(3), hindi INT(3), english INT(3))',
              []
            );
          }
          error => {
            console.log(error);
          }
        }
      );
    });
  },[])


  const ResetData = () => {
    setStudentName('');
    setRollNo('');
    setPhysics('');
    setChemistry('');
    setBiology('');
    setMaths('');
    setHindi('');
    setEnglish('');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{backgroundColor: "#ebf5cb", paddingHorizontal:5}}>
      <KeyboardAvoidingView style={[styles.formsy,{flex: 1, justifyContent: 'space-between'}]}>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Student Name:</Text>
          <TextInput
            placeholder="Enter your full name"
            value={studentname}
            onChangeText={name => setStudentName(name)}
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Roll No. :</Text>
          <TextInput
            value={rollNo}
            onChangeText={txt => setRollNo(txt)}
            keyboardType="number-pad"
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Maths mark:</Text>
          <TextInput
            value={maths}
            onChangeText={txt => setMaths(txt)}
            keyboardType="number-pad"
            maxLength={3}
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Physics mark:</Text>
          <TextInput
            value={physics}
            onChangeText={txt => setPhysics(txt)}
            keyboardType="number-pad"
            maxLength={3}
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Chemistry mark:</Text>
          <TextInput
            value={chemistry}
            onChangeText={txt => setChemistry(txt)}
            keyboardType="number-pad"
            maxLength={3}
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Biology mark:</Text>
          <TextInput
            value={biology}
            onChangeText={txt => setBiology(txt)}
            maxLength={3}
            keyboardType="number-pad"
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>Hindi mark:</Text>
          <TextInput
            value={hindi}
            onChangeText={txt => setHindi(txt)}
            keyboardType="number-pad"
            maxLength={3}
            style={styles.inputstys}
          />
        </View>
        <View style={[styles.input, {marginTop: 20}]}>
          <Text style={styles.headsinput}>English mark:</Text>
          <TextInput
            value={english}
            onChangeText={txt => setEnglish(txt)}
            keyboardType="number-pad"
            style={styles.inputstys}
            maxLength={3}
          />
        </View>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:15}}>
          <View>
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                saveUser();
              }}>
              <Text style={styles.btnText}> Save Data </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                ResetData();
              }}>
              <Text style={styles.btnText}> Clear Data </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainheading:{
    fontSize:25, 
    textAlign:"center", 
    color: "#000", 
    fontWeight:"600",
  },
  formsy:{
    backgroundColor: "#223548",
    marginVertical:20,
    marginHorizontal:10,
    borderTopRightRadius:80,
    borderTopLeftRadius:700,
    borderBottomRightRadius:700,
    borderBottomLeftRadius:80
  },
  input: {
    width: '80%',
    height: 60,
    borderRadius: 15,
    borderWidth: 0.5,
    alignSelf: 'center',
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  headsinput:{
    fontStyle:"italic",
    fontSize:16,
    paddingHorizontal:2,
    fontWeight:"600",
    paddingTop:2,
  },
  inputstys:{
    padding:2,
    width:"90%",
    marginLeft:20,
    fontStyle:"italic",
    color:"#000",
  },
  Btn: {
    backgroundColor: 'purple',
    width: 180,
    height: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  }
});

