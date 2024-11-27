import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, get, push, serverTimestamp } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function ForumScreen({ route }) {
  const { newsId, title } = route.params;
  const [comments, setComments] = useState([]);  
  const [newComment, setNewComment] = useState('');  

  const db = getDatabase();  
  const auth = getAuth();  

  const fetchComments = async () => {
    const commentsRef = ref(db, `/forum/topicos/${newsId}/comentarios`);
    const commentsSnapshot = await get(commentsRef);

    const commentsData = commentsSnapshot.val(); 

    if (commentsData) {
      const commentList = await Promise.all(
        Object.entries(commentsData).map(async ([commentId, comment]) => {
          return {
            commentId,
            userId: comment.userId,
            username: comment.username, 
            comment: comment.comment,
            timestamp: comment.timestamp,
          };
        })
      );
      commentList.sort((a, b) => b.timestamp - a.timestamp);
      setComments(commentList);
    }
  };

  useEffect(() => {
    fetchComments(); 
  }, [newsId]); 

  const handleAddComment = async () => {
    if (newComment.trim() === '') return; 

    const userId = auth.currentUser.uid;
    const username = auth.currentUser.displayName || auth.currentUser.email;  
    try {
      const commentRef = ref(db, `/forum/topicos/${newsId}/comentarios`);
      await push(commentRef, {
        userId,
        username,  
        comment: newComment,
        timestamp: serverTimestamp(), 
      });

      setNewComment('');

      fetchComments(); 
    } catch (error) {
      console.error('Erro ao enviar comentário: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.chatComunidade}>Chat da comunidade</Text>
        <View style={styles.commentsContainer}>
          {comments.map((item, index) => (
            <View key={item.commentId} style={styles.commentCard}>
              <Text style={styles.commentAuthor}>{item.username}</Text>
              <Text style={styles.commentContent}>{item.comment}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva seu comentário..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button
            title="Enviar"
            onPress={handleAddComment}
            disabled={newComment.trim() === ''} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
    marginTop: 90,
    height:"60%"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chatComunidade:{
    fontSize:18,
    width:"100%",
    marginBottom: 15,
  },
  commentsContainer: {
    marginBottom: 16,
    height:"100%"
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginRight: 8,
  },
});





















