import React,{useState} from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView, Animated} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';


const icon = require("../../assets/logo.png");

// Array de imagens do slider
const sliderImages = [
  { id: '3',  image: require('../../assets/slide2.jpg') },
  { id: '1',  image: require('../../assets/slide6.jpg') },
  { id: '2',  image: require('../../assets/slide4.jpg') },
 
];

// Dados das notícias com imagens
const newsData = [
  { id: '1', image: require('../../assets/slide1.jpg') },
  { id: '2', image: require('../../assets/slide3.jpg')},
  { id: '3', image: require('../../assets/slide5.jpg')},
];

export default function HomeScreen({ navigation }) {
 
  const renderSliderItem = ({ item }) => (
    <View style={styles.sliderItem}>
      <Image source={item.image} style={styles.sliderImage} />
    </View>
  );

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('Details', { newsId: item.id, title: item.title })} 
    >
      <Image source={item.image} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.navHeader}>
          <Image style={styles.image} source={icon} />

       
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <MaterialIcons name="person-outline" size={35} color="black" />
          </TouchableOpacity>

        </View>
      </View>

 
      <View style={styles.slider}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sliderImages.map((item) => renderSliderItem({ item }))}
        </ScrollView>
        <View style={styles.dotsContainer}>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Chat de Discussão</Text>
        <Text style={styles.parag}> Escolha um tema abaixo para acessar o chat!</Text>
      </View>
   
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        
        contentContainerStyle={styles.newsContainer}
      />
     <View style={styles.footer}>
        <Text style={styles.footerText}>©2024 Mona,Mobile</Text>
        <Text style={styles.footerText}>Todos os direitos reservados</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title:{
    textAlign: 'center',
    fontSize: 30
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 5,
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  containerTitle:{
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
    width:"100%",
    paddingHorizontal: 25,
    paddingBottom: 12,
  },

  textTitle:{
    fontSize:20,
  },
  parag:{

  },
  text: {
    fontSize: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#99CD85',
    height: 100,
  },
  navHeader:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    width:'100%',
    height: 80,
    marginTop:35,
  },
  image: {
    height: 60, 
    width: 110,
    resizeMode: 'cover',

  },
  slider: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
  },
  sliderItem: {
    width: 400,
    height: '100%',
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  newsContainer: {
    width: "100%",
    // flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    padding: 8, 
  },
  newsItem: {
    width: '100%',
    aspectRatio: 2.5, 
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  newsTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: "",
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: 'white',
  },
});



