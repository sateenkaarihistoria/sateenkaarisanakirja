import React, { useState, useEffect, useContext } from 'react';
import { Container, Loader, Confirm, Message, Responsive } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { getSuojattuData, deleteData } from '../api/api';
import { useStateValue, logOut } from '../context';

const Tulostus = () => {
  const [sanaData, setSanaData] = useState("");
  const [ladataan, setLadataan] = useState(false);
  const [errors, setErrors] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setLadataan(true)
    getSuojattuData('/api/tulostus', user.token).then(result => {
      if (result.status === 'success') {
        setSanaData(result.data);
      } 
      else {
        setErrors(result.data.response.data.error);
      }
    }).then(setLadataan(false));
  }, []);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{__html: sanaData}}>
      </div>
    </Container>
  );
}

export default Tulostus;