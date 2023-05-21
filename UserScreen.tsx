import React, { useContext } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import { UserContext } from './UserContext';
import { ScrollView } from 'react-native-gesture-handler';


const db = SQLite.openDatabase(
  {
    name: 'QuanLiChiTieu',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const ButtonUpdate = ({ onPress }: any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#00977E' }]}>Cập nhật</Text>
    </TouchableOpacity>
  );
}

const ButtonLogout = ({ onPress }: any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#D69500' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#D69500' }]}>Đăng xuất</Text>
    </TouchableOpacity>
  )
}
type ItemProps = { title: any, value: any, onChangeText: any, placeholder: string }
const InputInfo = ({ title, value, onChangeText, placeholder }: ItemProps) => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>{title}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  )
}

const UserScreen = ({ navigation }: any) => {
  // access userName in global variables
  const { userName } = useContext(UserContext); // get global variable
  const { password } = useContext(UserContext); // get global variable
  const { fullname } = useContext(UserContext); // get global variable
  const { birthday } = useContext(UserContext); // get global variable
  const { email } = useContext(UserContext); // get global variable

  console.log(" đang lấy dữ liệu từ biến global")
  console.log(userName, password, fullname, birthday, email)

  //for new update infomation
  const [newUsername, setNewUsername] = React.useState('');
  const [newFullname, setNewFullname] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newBirthday, setNewBirthday] = React.useState('');

  const [text, onChangeText] = React.useState('');

  // log out
  const Logout = () => {
    navigation.popToTop()
  }

  // handle update
  const HandleUpdate = () => {
    console.log("đang thực hiện truy vấn DB để cập nhật ...")
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Users SET username = ?, password = ?, fullname = ?, birthday = ?, email = ? WHERE username = ?",
        [newUsername, newPassword, newFullname, newBirthday, newEmail, userName],
        (tx, results) => {
          // Xử lý kết quả sau khi cập nhật dữ liệu
          if (results.rowsAffected > 0) {
            Alert.alert("Cập nhật thành công");
            // chuyển hướng trang 
            navigation.navigate("HomeScreen");
            console.log("Ghi dữ liệu thành công");
          } else {
            console.log("Điều kiện fasle, check lại điều kiện");
            Alert.alert("Cập nhật không thành công");
          }
        }
      );
    });
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
          <View style={{ width: 80, height: 80, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 45 }}>
            <Image source={require('./assets/src/img/icon-account.png')} />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', alignSelf: 'flex-end' }}>  Xin chào, {userName}</Text>
          </View>
        </View>

        <InputInfo
          title="Tên đăng nhập"
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder={userName}
        />
        <InputInfo
          title="Họ và Tên"
          value={newFullname}
          onChangeText={setNewFullname}
          placeholder={fullname}
        />

        <InputInfo
          title="Ngày sinh"
          value={newBirthday}
          onChangeText={null}
          placeholder={birthday}
        />

        <InputInfo
          title="Gmail"
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder={email}
        />
        <InputInfo
          title="Mật khẩu"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder={password}
        />


        <ButtonUpdate onPress={HandleUpdate} />
        <ButtonLogout onPress={Logout} />

      </View>
    </ScrollView>

  )
}

export default UserScreen





const styles = StyleSheet.create({
  btn: {
    marginTop: 15,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    marginLeft: 230,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  titleBtn: {
    fontSize: 20, fontWeight: 'bold',
  },
  textInput: {

    height: 45,
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    paddingLeft: 15,
  },
})