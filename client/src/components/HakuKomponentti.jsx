import React, { useState } from 'react'
import { Dropdown, Segment, Input, Button, Checkbox } from 'semantic-ui-react'

import './HakuKomponentti.css'

const Hakukomponentti = ({ suodatusMuutettu, hakuOptiot, defaultHaku }) => {

  const [suodatusPaalla, setSuodatusPaalla] = useState(false)
  const [hakutermi, setHakutermi] = useState('')
  const [hakutermiValittu, setHakutermiValittu] = useState('')
  const [valittuSuodatusOptio, setValittuSuodatusOptio] = useState(defaultHaku)
  const [alkuvuosi, setAlkuvuosi] = useState('1900')
  const [loppuvuosi, setLoppuvuosi] = useState('2021')
  const [lisaOptiot, setLisaOptiot] = useState(false)

  const hakuoptioMuutettu = (e, data) => {
    setValittuSuodatusOptio(data.value)
  }

  const hakuTermiMuutettu = (e, data) => {
    setHakutermi(data.value)
  }

  const hakuKlikattu = (e, data) => {
    suodatusMuutettu(true, valittuSuodatusOptio, hakutermi)
    setSuodatusPaalla(true)
    setHakutermiValittu(hakutermi)
    setHakutermi('')
    //console.log(alkuvuosi + " - " + loppuvuosi)
  }

  const resetoiHaku = () => {
    setSuodatusPaalla(false);
    suodatusMuutettu(false, valittuSuodatusOptio, hakutermi)
    setHakutermiValittu('')
    setHakutermi('')
  }

  const nappainPainettu = e => {
    if (e.key === 'Enter') {
      hakuKlikattu()
    }
  }

  const lisaOptiotMuutettu = () => {
    setLisaOptiot(!lisaOptiot);
  }

  const alkuvuosiMuutettu = (e, data) => {
    setAlkuvuosi(data.value)
  }

  const loppuvuosiMuutettu = (e, data) => {
    setLoppuvuosi(data.value)
  }

  let hakuKentta;
  if (!suodatusPaalla) {
    hakuKentta = (
      <Segment basic>
        <Input 
          className="hakukentta"
          onChange={hakuTermiMuutettu}
          onKeyPress={nappainPainettu}
          style={{ marginTop: '0rem', }}
          value={hakutermi}
        />
        <Button onClick={hakuKlikattu}>Hae</Button>
        <Dropdown selection
          defaultValue={valittuSuodatusOptio}
          options={hakuOptiot}
          onChange={hakuoptioMuutettu}
        >
        </Dropdown>
        <div>
          <Checkbox toggle 
            label="Suodata"
            onChange={lisaOptiotMuutettu}
            />
          { lisaOptiot ?
            <div>
            Alku: 
            <Input 
              className="hakukentta"
              style={{ marginTop: '0rem', }}
              value={alkuvuosi}
              onChange={alkuvuosiMuutettu}
            />
            Loppu: 
            <Input 
              className="hakukentta"
              style={{ marginTop: '0rem', }}
              value={loppuvuosi}
              onChange={loppuvuosiMuutettu}
            />
            </div> : null
          }
        </div>
      </Segment>
      ) 
  } else {
    hakuKentta = (
      <Segment basic>
        <p>Suodatettu näkymä, kriteeri: <b>{valittuSuodatusOptio}</b>, suodatustermi: <b>{hakutermiValittu}</b></p>
        <Button onClick={resetoiHaku} name="reset">Poista suodatus</Button>
      </Segment>        
    )
  }
  
  return (
    <>
      {hakuKentta}
    </>
  )
}

export default Hakukomponentti
