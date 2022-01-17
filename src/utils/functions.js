// importing local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
// import SimpleAlert from './SimpleAlert';
import { Share } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { urls } from './Api_urls';
import { navigate } from '../../Navigations';

// local storage function that retreives the data
async function retrieveItem(key) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}


// store data in lcoalstorage
async function storeItem(key, item) {
  try {
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}


//validing email
function validateEmail(text) {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {

    return false;
  }
  else {
    return true;
  }
}


// simple console log, so I can turn it off later
function doConsole(d) {
  console.log(d)
}


// simple alert
function doAlertPlease(a, b, c) {

  // let shown = true

  // return (
  //     <>
  //     {shown && <SimpleAlert
  //         Confirm={()=>{ shown = false}}
  //         title={b ?? "Alert"}
  //         text={c ?? "Error"}
  //         btn2="Okay"
  //     />}
  //     </>
  // )

  alert(c)



}


function timeZoneTry(timeNow) {
  var tzo = -timeNow.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
  return dif + pad(tzo / 60) + ':' + pad(tzo % 60);
}

const onShare = async (msg) => {
  try {
    const result = await Share.share({
      message: msg
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
  }
};


function getParamFromURL(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

export const useForceUpdate = () => {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}



export const update_dp = async (dp_type = 1, userToken, url_plus) => {

  console.log(Permissions.MEDIA_LIBRARY);

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.MEDIA_LIBRARY
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    finalStatus = status;

  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    var err = 'You need to allow storage permission manually from your phone settings in order add this data';
    alert(err)
    return;
  }
  else {

    var result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [4, 4],
      base64: false,
    });
    if (result) {
      return do_update_dp(result.uri, result, dp_type, userToken, url_plus)
        .then(data => {
          console.log('data 1 = ')
          console.log(data)
          return data
        })
    }



  }

}



export const update_dp_2 = async (dp_type = 1, userToken, url_plus) => {

  console.log(Permissions.CAMERA);

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    finalStatus = status;

  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    var err = 'You need to allow storage permission manually from your phone settings in order add this data';
    alert(err)
    return;
  }
  else {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [4, 4],
      base64: false,
    });

    if (result) {
      return do_update_dp(result.uri, result, dp_type, userToken, url_plus)
        .then(data => {
          console.log('data 1 = ')
          console.log(data)
          return data
        })
    }

    // if (result.uri) {
    //   do_update_dp(result.uri, result, dp_type, userToken, url_plus);
    // }
  }

}

async function do_update_dp(url, response, type__, userToken, url_plus) {

  // setLoading(true)

  // console.log("gallery response");
  // console.log(response);

  // var response = this.state.selected_modal_image[0];
  var my_ext = response.uri.split('.');
  var _ext = my_ext[my_ext.length - 1];


  var real_name = response.uri.split('/');
  var _real_name = real_name[real_name.length - 1];



  const data = new FormData();

  data.append("photo", {
    name: _real_name,
    type: Platform.OS === "android" ? "image/jpeg" : response.type,
    uri: Platform.OS === "android" ? response.uri : response.uri?.replace("file://", "")
  });
  data.append("token", userToken);
  console.log("this is wat I'm submitting");
  console.log(data);
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  };
  console.log('I request @' + urls.Image_Uri + url_plus)
  return (
    fetch(urls.Image_Uri + url_plus, config)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        // console.log("final_server_photo_response");
        // console.log(1);
        // console.log(responseJson);
        // console.log(2);
        // if (responseJson.action == "success") {
        // console.log(3);
        // console.log("here");
        var final_url = responseJson.filename;
        var profile_pic_url = responseJson.url;
        console.log('data0= ')
        console.log(final_url)
        console.log(profile_pic_url)
        return responseJson

        // responseJson.filename is used to send to the server again
        // responseJson.url is used to display the image to user

        // setImagesArray([...imagesArray, profile_pic_url]);
        // setImagesArrayFile([...imagesArrayFile, __final__url__]);
        // setLoading(false)
        // setImage(__final__url__)
        // setLoading(false)
        // }
        // else {
        // return { error: responseJson.error }
        // console.log(4);
        // setLoading(false)
        // dropDownAlertRef.alertWithType('error', 'error', responseJson.error);
        // }
      })
      .catch((error) => {
        console.log(error)
        console.log(5);
        // setLoading(false)
        return { error: "Internet Error" }
        // dropDownAlertRef.alertWithType('error', 'error', "Internet Error");
        // setLoading(false)
      })
  )
}

export function formatDate(dateObj) {
  var month = dateObj.getMonth() + 1;
  if (month < 10) {
      month = "0" + month;
      if (dateObj.getDate() < 10) {
          const dat = "0" + dateObj.getDate();
          let date = dateObj.getFullYear() + "-" + month + "-" + dat;
          return date
      }
      else {
          let date = dateObj.getFullYear() + "-" + month + "-" + dateObj.getDate()
          return date
      }
  }
  else {
      if (dateObj.getDate() < 10) {
          const dat = "0" + dateObj.getDate()
          let date = dateObj.getFullYear() + "-" + month + "-" + dat
          return date
      }
      else {
          let date = dateObj.getFullYear() + "-" + month + "-" + dateObj.getDate()
          return date
      }

  }
}


// common Navigations

module.exports.storeItem = storeItem;
module.exports.retrieveItem = retrieveItem;
module.exports.doConsole = doConsole;
module.exports.validateEmail = validateEmail;
module.exports.doAlertPlease = doAlertPlease;
module.exports.timeZoneTry = timeZoneTry;
module.exports.onShare = onShare;
module.exports.getParamFromURL = getParamFromURL;


