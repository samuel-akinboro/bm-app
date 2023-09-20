import { Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, ViewProps } from '../Themed'
import React, { useState } from 'react'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'

const FilterBy = ({
  style,
  data,
  selected,
  setSelected
}) => {
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
            {backgroundColor: selected === item.toLowerCase() ? Colors.light.text : '#fff'}
          ]}
          onPress={() => {
            setSelected(item.toLowerCase())
          }}
        >
          <Text style={[styles.text, {color: selected === item.toLowerCase() ? '#fff' : Colors.light.text}]}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default FilterBy

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
    paddingHorizontal: 20,
    borderColor: '#E7E7E7'
  },
  text: {
    fontFamily: 'semibold',
    fontSize: 16,
    textTransform: 'capitalize'
  }
})