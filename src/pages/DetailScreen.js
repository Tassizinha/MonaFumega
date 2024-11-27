import React from 'react';
import { SafeAreaView, ScrollView, Image, Text, Button, StyleSheet, View } from 'react-native';
import { db } from '../services/database/firebase'; 
import { ref, push, set } from 'firebase/database'; 

export default function DetailScreen({ route, navigation }) {
  const { newsId, title } = route.params;

  const newsDetails = {
    '1': {
      title: 'Mudanças climáticas e o impacto ambiental',
      description: 'As mudanças climáticas representam um dos maiores desafios globais da atualidade. Causadas principalmente pela queima de combustíveis fósseis, desmatamento e práticas agrícolas insustentáveis, elas resultam no aumento da temperatura global, elevação do nível do mar e eventos climáticos extremos, como secas, inundações e tempestades intensas. Combater essas mudanças exige esforços coletivos para reduzir emissões de gases de efeito estufa e adotar práticas mais sustentáveis.',
      image: require('../../assets/img1.png'),
      stats: {
        impact: 'Eventos climáticos extremos causaram prejuízos econômicos de aproximadamente $300 bilhões em 2023, afetando milhões de pessoas, conforme a Organização Meteorológica Mundial.',
        usage: 'Segundo o relatório do Global Carbon Project (2023), as emissões globais de dióxido de carbono atingiram 36,8 bilhões de toneladas, um novo recorde histórico.',
        
      }
    },
    '2': {
      title: 'Agricultura sustentável',
      description: 'A agricultura sustentável é uma abordagem inovadora e essencial para equilibrar a produção de alimentos com a preservação ambiental. Esse modelo busca minimizar os impactos negativos ao meio ambiente, promovendo práticas como rotação de culturas, uso de fertilizantes naturais e manejo eficiente dos recursos hídricos. Além de aumentar a produtividade a longo prazo, a agricultura sustentável fortalece os ecossistemas e melhora a qualidade de vida das comunidades rurais.',
      image: require('../../assets/img2.png'),
      stats: {
        impact: 'Fazendas que utilizam agricultura sustentável reduziram em até 30% as emissões de gases de efeito estufa, conforme estudos recentes.',
        usage: 'De acordo com a FAO (2023), cerca de 20% das áreas agrícolas globais já adotaram métodos sustentáveis, mostrando crescimento em relação aos anos anteriores.',
      }
    },
    '3': {
      title: 'Energia Renovável',
      description: 'A energia renovável é uma solução essencial para enfrentar os desafios ambientais e energéticos do mundo atual. Fontes como energia solar, eólica e hidrelétrica são constantemente reabastecidas pela natureza, tornando-se alternativas viáveis aos combustíveis fósseis, que são finitos e altamente poluentes.',
      image: require('../../assets/img3.png'),
      stats: {
        impact: 'Emissões de gases de efeito estufa são consideravelmente menores em comparação às fontes tradicionais.',
        usage: 'A energia solar cresceu 20% em 2023 globalmente, com países em desenvolvimento liderando a adoção. A energia eólica evitou a emissão de 500 milhões de toneladas de CO₂ no mesmo período.',
      }
    },
  };

  const news = newsDetails[newsId];

  const createTopic = async () => {
    try {
      const newTopicRef = push(ref(db, '/forum/topicos')); 
      const topicId = newTopicRef.key;

      await set(newTopicRef, {
        titulo: news.title,
        descricao: news.description,
        comentarios: {}, 
      });

      console.log(`Tópico criado com sucesso, ID: ${topicId}`);
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
    }
  };

  const navigateToForum = async () => {
    try {
      await createTopic(); 
      navigation.navigate('ForumScreen', { newsId: newsId, title: news.title });
    } catch (error) {
      console.error('Erro ao navegar para o fórum:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={news.image} style={styles.newsImage} />
        <View style={styles.spacing}>

          <Text style={styles.title}>{news.title}</Text>
          
          <Text style={styles.description}>{news.description}</Text>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Impacto e Estatísticas:</Text>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Impacto Ambiental:</Text>
              <Text style={styles.statValue}>{news.stats.impact}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Uso Anual Substituído:</Text>
              <Text style={styles.statValue}>{news.stats.usage}</Text>
            </View>
          </View>

          <Button title="Ir para o Fórum" onPress={navigateToForum} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  spacing:{
    paddingHorizontal: 16,
  },
  newsImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 16,
  },

  statsContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#19AB6E',
    marginBottom: 12,
  },
  statItem: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 16,
    color: '#19AB6E',
    marginLeft: 8,
  },
});





































