import React from 'react';
import {View, Text, ScrollView, Button, StyleSheet, Switch, TextInput} from 'react-native'
import Constants from 'expo-constants'

let id = 0

const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onValueChange={props.onToggle}/>
    <Button onPress={props.onDelete} title='DELETE' />
    <Text>{props.todo.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  todoContainer : {flexDirection:'row', alignItems:'center', paddingTop:20},
  bar : {paddingTop: Constants.statusBarHeight},
  flex : {flex:1}
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      input:"",
    }
  }
  
  addTodo() {
    const text = this.state.input;
    this.setState({
      todos: [
        ...this.state.todos,
        {id: id++, text: text, checked: false},
      ],
    })
  }
  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={[styles.bar, styles.flex]} >
        <Text style={{paddingTop:20, textAlign:"center", paddingBottom:20, borderColor:"black", borderWidth:2, borderRadius:10,}}>Todo count: {this.state.todos.length}</Text>
        <Text style={{paddingTop:20, textAlign:"center", paddingBottom:20, borderColor:"black", borderWidth:2, borderRadius:10,}}>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</Text>
        <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 5 }}
          onChangeText={(text) => this.setState({input: text})}
          value = {this.state.input}
          />
        <Button onPress={() => this.addTodo()} title='Add TODO' />
        <ScrollView style={{flex:1}}>
          {this.state.todos.map(todo => (
            <Todo style={{paddingTop: 20}}
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}
