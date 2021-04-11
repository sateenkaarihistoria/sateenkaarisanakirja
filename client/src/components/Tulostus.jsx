import React, { useState, useEffect, useContext } from 'react';
import { Container, Loader, Confirm, Message, Responsive } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { getSuojattuData, deleteData } from '../api/api';
import UserContext from '../context/userContext';

const Tulostus = () => {
  const sessioData = useContext(UserContext);
  const [sanaData, setSanaData] = useState("");
  const [ladataan, setLadataan] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setLadataan(true)
    getSuojattuData('/api/tulostus', sessioData.token).then(result => {
      if (result.status === 'success') {
        setSanaData(result.data);
      } 
      else {
        setErrors(result.data.response.data.error);
        //console.log(result.data.response);
      }
    }).then(setLadataan(false));
  // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{__html: sanaData}}>
      </div>
    </Container>
  );
}

export default Tulostus;