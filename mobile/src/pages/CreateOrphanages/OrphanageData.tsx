import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude: number
    longitude: number
  }
}

export default function OrphanageData() {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [phone1, setPhone1] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [opened_on_weekends, setOpenedOnWeekends] = useState(true)
  const [images, setImages] = useState<string[]>([])
  
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params as OrphanageDataRouteParams
  console.log('params: ', params)
  
  function handleCreateOrphanage() {
    console.log('handleCreateOrphanage')
    
    const { latitude, longitude } = params.position;

    const data = new FormData
    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('phone1', phone1)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('opened_on_weekends', String(opened_on_weekends))
    data.append('email', ' ')
    data.append('website', ' ')
    data.append('street', ' ')
    data.append('number', ' ')
    data.append('district', ' ')
    data.append('city', ' ')
    data.append('state', 'RS')
    data.append('zip_code', ' ')
    data.append('phone2', ' ')
    data.append('bank', ' ')
    data.append('agency', ' ')
    data.append('account', ' ')
    data.append('entity_register', ' ')

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    })
    console.log('data: ', data)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    } 

    api.post('orphanages', data, config)
      .then(result => {
        console.log('result: ', result)
        
        if (result.status!==201) {
          alert(result.data.message)
        }

        alert('Cadastro realizado com sucesso!')

        navigation.navigate('OrphanagesMap')
      })
      .catch(err => {
        console.log('err: ', err)

        alert('Ops... algo deu errado ao tentar cadastrar')
      })
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso a suas fotos...')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1, 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (result.cancelled) {
      return
    }

    const { uri: image } = result

    setImages([...images, image])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={phone1}
        onChangeText={setPhone1}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image key={image} source={{ uri: image }} style={styles.uploadedImage} />
          )
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={opened_on_weekends}
          onValueChange={setOpenedOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',    
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})