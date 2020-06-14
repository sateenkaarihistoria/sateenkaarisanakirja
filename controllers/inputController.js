'use strict';

// Funktio muuntaa syötettyn sana-datan ensimmäiset kirjaimet oikeaan muotoon
exports.muunnaSanojenKirjaimet = function (req, res, next) {
  Object.entries(req.body).forEach(
    (key, value) => {
      if (key[0] === 'hs_osio') {
        req.body.hs_osio = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'sana') {
        req.body.sana = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'selite') {
        req.body.selite = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'sanaluokka') {
        req.body.sanaluokka = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'tyyli') {
        req.body.tyyli = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'kayttoala') {
        req.body.kayttoala = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'lause') {
        req.body.lause = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'kuvaus') {
        req.body.kuvaus = key[1][0].toLowerCase() + key[1].slice(1);
      }
    }
  );

  next();
}

// Funktio muuntaa syötettyn organisaatio-datan ensimmäiset kirjaimet oikeaan muotoon
exports.muunnaOrganisaatioidenKirjaimet = function (req, res, next) {
  Object.entries(req.body).forEach(
    (key, value) => {
      if (key[0] === 'org_nimi') {
        req.body.org_nimi = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'maa') {
        req.body.maa = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'paikkakunta') {
        req.body.paikkakunta = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'tapahtuma_nimi') {
        req.body.tapahtuma_nimi = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'luonne') {
        req.body.luonne = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'kuvaus') {
        req.body.kuvaus = key[1][0].toLowerCase() + key[1].slice(1);
      }
    }
  );

  next();
}

// Funktio muuntaa syötettyn kulttuuriteos-datan ensimmäiset kirjaimet oikeaan muotoon
exports.muunnaKulttuuriteostenKirjaimet = function (req, res, next) {
  Object.entries(req.body).forEach(
    (key, value) => {
      if (key[0] === 'etunimi') {
        req.body.etunimi = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'sukunimi') {
        req.body.sukunimi = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'ammattinimike') {
        req.body.ammattinimike = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'henkilo_maa') {
        req.body.henkilo_maa = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'henkilo_paikkakunta') {
        req.body.henkilo_paikkakunta = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'nimi') {
        req.body.nimi = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'lajityyppi') {
        req.body.lajityyppi = key[1][0].toLowerCase() + key[1].slice(1);
      }
      else if (key[0] === 'teos_maa') {
        req.body.teos_maa = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'teos_paikkakunta') {
        req.body.teos_paikkakunta = key[1][0].toUpperCase() + key[1].slice(1);
      }
      else if (key[0] === 'kuvaus') {
        req.body.kuvaus = key[1][0].toLowerCase() + key[1].slice(1);
      }
    }
  );

  next();
}