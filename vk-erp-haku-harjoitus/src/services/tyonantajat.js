/// ----------------------------------------------
/// Kotkan suurimmat työnantajat Tammikuussa 2010
/// tyonantajat -api
/// Paul Kallio 15.02.2021
/// for Meritta Bra Oy Ab
/// ----------------------------------------------
import axios from 'axios'

const tyonantajatUrl = 'http://localhost:3003/tyonantajat'

const getAll = () => {
  const request = axios.get(tyonantajatUrl)
  return request.then(response=> response.data)
}

export default { getAll }