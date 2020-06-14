import React, { useState } from 'react'
import { Dropdown, Segment, Input, Button } from 'semantic-ui-react'

import './HakuKomponentti.css'

const Hakukomponentti = ({ suodatusMuutettu, hakuOptiot, defaultHaku }) => {

  const [suodatusPaalla, setSuodatusPaalla] = useState(false)
  const [hakutermi, setHakutermi] = useState('')
  const [hakutermiValittu, setHakutermiValittu] = useState('')
  const [valittuSuodatusOptio, setValittuSuodatusOptio] = useState(defaultHaku)

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
