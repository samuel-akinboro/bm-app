import { Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, ViewProps } from '../Themed'
import React, { useState } from 'react'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'

const FilterByColor = ({
  style,
  data,
  selected,
  setSelected
}) => {
  const [activeTab, setActiveTab] = useState(selected)
  
  return (
    <FlatList 
      data={data}
      style={[styles.container, style]}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, i) => `${item}-${i}`}
      renderItem={({item}) => (
        <TouchableOpacity 
          style={[
            styles.filter,
            {borderColor: activeTab === item.name.toLowerCase() ? Colors.light.text : '#E7E7E7'}
          ]}
          onPress={() => {
            setActiveTab(item.name.toLowerCase())
            setSelected(item.name.toLowerCase())
          }}
        >
          <View style={{
            height: 20,
            width: 20,
            borderRadius: 30,
            backgroundColor: item.value,
            borderWidth: item.name.toLowerCase() === 'white' ? 1 : 0,
            borderColor: '#E7E7E7'
          }} />
          <Text style={[styles.text]}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default FilterByColor

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.padding,
    flexShrink: 1,
    flexGrow: 0,
  },
  filter: {
    marginRight: 10,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderColor: '#E7E7E7',
    flexDirection: 'row',
    gap: 10
  },
  text: {
    fontFamily: 'semibold',
    fontSize: 16
  }
})