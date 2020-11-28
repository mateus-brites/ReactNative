import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App(){
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            console.log(1);
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject(){
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()},
            owner: 'Bixerano carai`,
        });

        const project = response.data; 

        setProjects([...projects, project]);
    }
        

    return (
    <>
        <StatusBar barStyle='light-content' backgroundColor= '#7159c1'/>

        <FlatList
        style={style.container}
        data= {projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project }) =>
        <Text style={style.projects}>{project.title}</Text>} />

        <TouchableOpacity 
        style={style.button} 
        onPress={handleAddProject}
        >
            <Text style={style.buttonText}>add project</Text>
        </TouchableOpacity>
    </>
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    projects: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    },

    button: {
        margin: 20,
        height: 30,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});