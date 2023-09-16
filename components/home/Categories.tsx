import { Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, ViewProps } from '../Themed'
import React, { useState } from 'react'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'

const categories = ['All', 'Nike', 'Jordan', 'Adidas', 'Reebok', 'Vans', 'Puma', '']

const Categories = ({
  style
}: ViewProps) => {
  const [activeTab, setActiveTab] = useState('all')
  
  return (
    <FlatList 
      data={categories}
      style={[styles.container, style]}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, i) => `${item}-${i}`}
      renderItem={({item}) => (
        <TouchableOpacity 
          style={{marginRight: 20}}
          onPress={() => {
            setActiveTab(item.toLowerCase())
          }}
        >
          <Text style={[styles.text, {color: activeTab === item.toLowerCase() ? Colors.light.text : Colors.light.inactiveText}]}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.padding,
    flexShrink: 1,
    flexGrow: 0,
    paddingVertical: 10
  },
  text: {
    fontFamily: 'bold',
    fontSize: 20
  }
})