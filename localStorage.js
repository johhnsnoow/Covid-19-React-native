import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    let storedVal = JSON.stringify(value);
    await AsyncStorage.setItem(key, storedVal);
  } catch (e) {
    return Promise.reject(e);
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return value;
    }

    let returnVal = JSON.parse(value);
    return returnVal;
  } catch (e) {
    return Promise.reject(e);
  }
};

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }

  console.log('Done.');
};

export {storeData, getData, removeValue};
