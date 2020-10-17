import axios from 'axios'

import { API_URL } from '../../env.json'

// Quando estiver rodando a aplicaçõa no DISPOSITIVO FÍSICO:
// o localhost do dispositivo físico não vai ser a sua máquina
// (não vai conseguir enxergar sua máquina acessando por localhost)
// deve-se colocar o ip da máquina na rede
// obtem-se o ip na janela: "meu app" On Expo Development Tools
// apenas o ip, sem o exp:// e sem a porta
// Exemplo:
//   baseURL: 'http://10.0.0.104:3333'

// Para EMULADOR NO IOS:
// usar localhost
// Exemplo:
//   baseURL: 'http://localhost:3333'

// para EMULADOR NO ANDROID:
// Executar no terminal:
//   adb reverse tcp:3333 tcp:3333
// usar localhost
// Exemplo:
//   baseURL: 'http://localhost:3333'

// OBS 1: http://localhost:3333 é o mesmo endereço que usamos para acessar a api no insomnia
// OBS 2: utilizar o ip da máquina vai funcionar para todos os casos

const api = axios.create({
  baseURL: API_URL
})

export default api
