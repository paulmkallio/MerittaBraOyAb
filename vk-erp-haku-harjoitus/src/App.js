/// ----------------------------------------------
/// Kotkan suurimmat työnantajat Tammikuussa 2010
/// App -komponentti
/// Paul Kallio 15.02.2021
/// for Meritta Bra Oy Ab
/// ----------------------------------------------
import React, { useState, useEffect } from 'react'
import tyonantajaData from './services/tyonantajat'
import TyonantajatList from './components/TyonantajatList'


const App = () => {
  const [tyonantajat, setTyonantajat] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      const resp = await tyonantajaData.getAll()
      setTyonantajat(resp)
    }
    getCompanies()
    // eslint-disable-next-line
  }, [])


  return (
    <div className="App">
      <TyonantajatList tyonantajat={tyonantajat}/>
    </div>
  );
}

export default App;
