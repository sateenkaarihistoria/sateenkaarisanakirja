import axios from 'axios';

export function getSuojattuData(osoite, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(osoite, { headers: { 'Authorization' : 'Bearer ' + token }})
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failure', data: result.data });
      })
      .catch(error => {
        resolve({ status: 'failure', data: error });
      });
  });
}

export function postData(osoite, data, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(osoite, data, { headers: { 'Authorization' : 'Bearer ' + token }})
      .then(result => {
        result.status === 201
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failure' });
      })
      .catch(error => {
        resolve({ status: 'error', data: error });
      });
  });
}

export function putData(osoite, data, id, token) {
  return new Promise((resolve, reject) => {
    axios
      .put(osoite + id, data, { headers: { 'Authorization' : 'Bearer ' + token }})
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success' })
          : resolve({ status: 'failure' });
      })
      .catch(error => {
        resolve({ status: 'error', data: error });
      });
  });
}

export function deleteData(osoite, id, token) {
  return new Promise((resolve, reject) => {
    axios
      .delete(osoite + id, { headers: { 'Authorization' : 'Bearer ' + token }})
      .then(result => {
        result.status === 200 || 204
          ? resolve({ status: 'success' })
          : resolve({ status: 'failure', data: result.data });
      })
      .catch(error => {
        resolve({ status: 'failure', data: error });
      });
  });
}

export function postLogin(nimi, salasana) {
  return new Promise((resolve, reject) => {
    axios
      .post('/login/', {
        nimi: nimi,
        salasana: salasana,
      })
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failed', data: null });
      })
      .catch(error => {
        resolve({ status: 'failed', data: error });
      });
  });
}

/**
 * Hakee kaikki asiasanat.
 * Tekee HTTP GET -requestin resurssiin /api/asiasana. Palauttaa taulukon objekteja.
 */
export function getAsiasanat() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/hakusana')
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failure', data: null });
      })
      .catch(error => {
        reject({ status: 'error', data: error });
      });
  });
}

export function getKulttuurituotteet() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/kulttuuriteos')
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failure', data: null });
      })
      .catch(error => {
        reject({ status: 'error', data: error });
      });
  });
}

export function getHenkilot() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/henkilo')
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failure', data: null });
      })
      .catch(error => {
        reject({ status: 'error', data: error });
      });
  });
}

export function getOrganisaatiot() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/organisaatio')
      .then(result => {
        result.status === 200
          ? resolve({ status: 'success', data: result.data })
          : resolve({ status: 'failure', data: null });
      })
      .catch(error => {
        reject({ status: 'error', data: error });
      });
  });
}