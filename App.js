import { useState } from 'react';
import { StatusBar } from 'expo-status-bar'; // component which we can use to finetune to look our status bar
import uniqueKey from 'unique-key'; // for unique keys
import {isNullOrEmpty, isNullOrUndefined} from 'isnullorempty'; // is null or empty string
import isWhitespace from 'is-whitespace'; // is white space string
import { 
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
  FlatList, // like ScrollView. However it's better if we have 100+ elements for scrolling. All items will be rendering here correctly
  VirtualizedList,
} from 'react-native';
//Components
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (!isNullOrEmpty(enteredGoalText) && !isNullOrUndefined(enteredGoalText) && !isWhitespace(enteredGoalText)) {
      setCourseGoals((currentCourseGoals) => [...currentCourseGoals, {text: enteredGoalText, key: uniqueKey(32)}, ]);
      endAddGoalHandler();
      return true;
      // setCourseGoals([]);
    }
    return false;
  };

  function deleteGoalHandler(key) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((g) => g.key !== key);
    });
  }

  return (
    // <View  style={styles.container}>
    //   <Text numberOfLines={1} >Hello React Native</Text>
    //   <Image 
    //     blurRadius={3} // blur of the image
    //     // fadeDuration={1000} // loading the image when you open the app
    //     source={{ 
    //       width: 200,
    //       height: 300, // треба розширення, щоб фотка була видима, бо так просто її ховає реакт нейтів
    //       uri: 'https://picsum.photos/seed/picsum/200/300' 
    //     }} />  
    // {/* <StatusBar style="auto" /> */}
    // </View >
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <View style={styles.addNewGoalContainer}>
          <Button 
            title="Add New Goal"
            color="#a065ec"
            onPress={startAddGoalHandler}
          />
        </View>
        {/* {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />} */}
        <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
        <View style={styles.goalsContainer}>
          {/* for scrolling
              alwaysBounceVertical={false} -> forbids the scrolling when we have a small count of goals
          */}
          {/* <ScrollView alwaysBounceVertical={false}> 
            {viewList}
          </ScrollView> */}


          {/*
            like ScrollView but better for a huge amount of items for scrolling
          */}
          <FlatList 
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem 
                text={itemData.item.text}
                _key={itemData.item.key}
                onDeleteItem={deleteGoalHandler}
              /> // Use own-created react component
            )}
            keyExtractor={(item) => { // this is our key for each item
              return item.key
            }}
            alwaysBounceVertical={false}

          />
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({ // is made with css create
  appContainer: {
    flex: 1,
    paddingTop: 50, // automatically takes 'px' extension
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },  
  goalsContainer: {
    flex: 5, // will take five-quarter (1/5) of space
  },
  addNewGoalContainer: {
    marginBottom: 20
  }   
});
