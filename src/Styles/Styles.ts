import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    itemContainer: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      width:'100%'
    },
    content: {
      fontSize: 16,
      marginBottom: 10,
      color: '#555',
      
    },
    editButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#007bff',
      borderRadius: 5,
    },
    deleteButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'red',
      borderRadius: 5,
    },
    saveButton: {
      padding: 10,
      backgroundColor: '#28a745',
      borderRadius: 5,
      flex: 1,
      marginRight: 5,
    },
    cancelButton: {
      padding: 10,
      backgroundColor: '#dc3545',
      borderRadius: 5,
      flex: 1,
      marginLeft: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    value: {
      fontSize: 16,
      color: "#555",
      marginBottom: 10,
    },
    key: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 5,
      color: "#333",
    },
    item: {
        alignSelf:'center',
        padding: 20,
        marginVertical: 5,
        backgroundColor: 'grey',
        width:'95%',
        borderRadius: 8,
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    titleItem: {
        fontSize: 16,
        fontWeight: 'condensed',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 11,
        color: '#333',
        marginTop: 10,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderColor: '#ddd',
      borderWidth: 1,
      fontSize: 16,
      color:'#333'
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#007BFF',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    buttonGreen: {
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonDisabled: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        opacity:0.4,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      },
    errorText: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red',
    },
    buttonText: {
      textAlign:'center',
      paddingRight:20,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    forgotPassword: {
      color: '#007BFF',
      fontSize: 16,
    },
});


export default styles;