import { StyleSheet, View, Text, Pressable } from 'react-native'

function GoalItem(props) { // create functional component

    return (
        // bind - its a method where we put 'this', and made-up prop what we want to get
        // <Pressable android_ripple={{color: '#dddddd'}} onPress={props.onDeleteItem.bind(this, props._key)}> 
        //     <View style={styles.goalItem}>
        //         <Text style={styles.goalText}>{props.text}</Text>
        //     </View>
        // </Pressable>

        <View style={styles.goalItem}>
            <Pressable 
                // adds cool thing when you press the component
                android_ripple={{color: '#210644'}}
                // bind - its a method where we put 'this', and made-up prop what we want to get
                onPress={props.onDeleteItem.bind(this, props._key)}
                // use function is style. If we press this component we use our styles.pressedItem
                style={({pressed}) => pressed && styles.pressedItem}
            >
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    )
}; 

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc', 
    },
    pressedItem: {
        opacity: 0.5
    },
    goalText: {
        color: 'white',
        padding: 8,
    },
});

export default GoalItem;

