import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { getSuojattuData } from '../api/api';
import { useStateValue } from '../context';

const Tulostus = () => {
  const [sanaData, setSanaData] = useState('');
  const [, setLadataan] = useState(false);
  const [, setErrors] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    // console.log("Tulostus.jsx");
    setLadataan(true);
    getSuojattuData('/api/tulostus', user.token)
      .then((result) => {
        if (result.status === 'success') {
          setSanaData(result.data);
          // setSanaData("Helloworld!");
        } else {
          setErrors(result.data.response.data.error);
        }
      })
      .then(setLadataan(false));
  }, []);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: sanaData }} />
    </Container>
  );
};

export default Tulostus;
