import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RangeSlider } from '@react-native-assets/slider'
import Colors from '../../constants/Colors'

const RangePicker = ({range, setRange}) => {
  return (
    <View>
      <RangeSlider
        range={range}                  
        minimumValue={0}
        maximumValue={1750}
        step={1}
        onValueChange={setRange}
        crossingAllowed={false} 
        trackStyle={{backgroundColor: Colors.light.text}}
        minTrackStyle={{backgroundColor: Colors.light.gray}}   
        maxTrackStyle={{backgroundColor: Colors.light.gray}} 
        CustomThumb={({value}) => (
          <View style={styles.thumbContainer}>
            <View style={styles.thumb}></View>
            <Text style={styles.thumbValue}>${value}</Text>
          </View>
        )}
      />
      <View style={styles.indicators}>
        <Text style={styles.indicator}>{range[0] > 150 && '$0'}</Text>
        <Text style={styles.indicator}>{range[1] < 1500 && '$1750'}</Text>
      </View>
    </View>
  )
}

export default RangePicker

const styles = StyleSheet.create({
  thumbContainer: {
    top: -13,
    alignItems: 'center',
    position: 'absolute'
  },
  thumb: {
    height: 24,
    width: 24,
    borderRadius: 17,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: Colors.light.text,
    position: 'absolute'
  },
  thumbValue: {
    color: Colors.light.text,
    fontSize: 12,
    flexShrink: 0,
    // position: 'absolute',
    fontFamily: 'bold',
    top: 30,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 5
  },
  indicator: {
    color: Colors.light.inactiveText,
    fontSize: 12,
    fontFamily: 'bold',
  }
})