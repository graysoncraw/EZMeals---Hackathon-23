import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal, PixelRatio, Alert } from 'react-native';
require('dotenv').config();

const scale = PixelRatio.get();

const Pantry = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setSelectedItem(item);
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = () => {
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/ingredients`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handlePress = () => {
    // Function 1
    handleDeleteIngredient();

    handleNavigation();

  };

  const handleNavigation = () => {
    // Navigate to the "AnotherPage" screen
    navigation.navigate('MainMenu');
  };

  const handleDeleteIngredient = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/deleteIngredient/${selectedItem._id}`, {
          method: 'DELETE',
        });
  
        const data = await response.json();
  
        if (data.success) {
          Alert.alert(
            'Success',
            'This ingredient has been removed.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
  
          // Refetch data after deletion
          fetchData();
        } else {
          Alert.alert('Error', 'Failed to delete ingredient');
        }
      } catch (error) {
        console.error('Error deleting ingredient:', error);
        Alert.alert('Error', 'Failed to delete ingredient');
      }
    }
  };
  

  const handleCountChange = async (id, amount, change) => {
    if (amount+change >= 1){
    setData(prevData => {
      return prevData.map(item => {
        if (item._id === id) {
          console.log(item.Amount);
          console.log('Data sent to server:', JSON.stringify({ id, change }));
  
          return { ...item, Amount: item.Amount + change };
        }
        return item;
      });
    });
  
    try {
      // Make API call to update the database using fetch
      const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/updateCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          change,
        }),
      });
  
      const data = await response.json();
      console.log('Database updated successfully:', data);
    } catch (error) {
      console.error('Error updating database:', error);
      // If there's an error, handle it accordingly
      fetchData();
    }
  }};
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Pantry</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#F07167" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.gridContainer}>
          {data.map(item => (
          <TouchableOpacity key={item._id} onPress={() => toggleModal(item)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.Name}</Text>
            <View style={styles.countContainer}>
              <TouchableOpacity onPress={() => handleCountChange(item._id, item.Amount, -1)}>
                <Text style={styles.countButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.number}>{item.Amount || 0}</Text>
              <TouchableOpacity onPress={() => handleCountChange(item._id, item.Amount, 1)}>
                <Text style={styles.countButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {selectedItem && (
          <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
          >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.data}>Name: {selectedItem.Name}</Text>
          <Text style={styles.data}>Amount: {selectedItem.Amount}</Text>
          <Text style={styles.data}>Calories: {selectedItem.Calories}</Text>
          <Text style={styles.data}>Total Fat: {selectedItem['Total Fat']}</Text>
          <Text style={styles.data}>Cholesterol: {selectedItem.Cholesterol}</Text>
          <Text style={styles.data}>Sodium: {selectedItem.Sodium}</Text>
          <Text style={styles.data}>Total Carbohydrate: {selectedItem['Total Carbohydrates']}</Text>
          <Text style={styles.data}>Protein: {selectedItem.Protein}</Text>
          {selectedItem.Protein > 15 && <Text style={styles.data}>High in Protein!</Text>}
          {selectedItem['Total Fat'] > 40 && <Text style={styles.data}>High in Fat!</Text>}
          {selectedItem['Total Carbohydrates'] > 50 && <Text style={styles.data}>High in Carbs!</Text>}
          {selectedItem.Sodium > 300 && <Text style={styles.data}>High in Sodium!</Text>}
          {selectedItem.Cholesterol > 100 && <Text style={styles.data}>High in Cholesterol!</Text>}
          <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Delete Ingredient</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          )}
        </TouchableOpacity>
))}

          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 20,
    marginTop: 30,
  },
  scrollView: {
    height: '80%', // Adjust the height as needed
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: 100 * scale,
    height: 50 * scale,
    backgroundColor: '#fed9b7',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#f07167',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  countButton: {
    color: '#00afb9',
    fontSize: 40,
    marginHorizontal: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#fdfcdc',
    padding: 50,
    borderRadius: 10,
    elevation: 5, 
  },
  button: {
    backgroundColor: '#f07167',
    padding: 8,
    borderRadius: 12,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#7fe2ff',
    padding: 8,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    padding: 10,
    color: '#000000',
    textAlign: 'center',
  },
  data: {
    textAlign: 'center',
    fontSize: 24, // Change the font size for the first text
    color: '#0081a7',
  },
  number: {
    fontSize: 20,
  },
});

export default Pantry;
