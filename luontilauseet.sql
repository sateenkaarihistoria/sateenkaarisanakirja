DROP DATABASE sanat;

CREATE DATABASE sanat;

\c sanat;

--ASIASANA
CREATE TABLE asiasana(
    id SERIAL,
    kuvaus VARCHAR(200) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);
--SIJAINTI
CREATE TABLE sijainti(
    id SERIAL,
    maa VARCHAR(100) NOT NULL,
    paikkakunta VARCHAR(100),
    UNIQUE(maa, paikkakunta),
    PRIMARY KEY(id)
);
--SANAKIRJA
CREATE TABLE hakusana(
    id SERIAL,
    sana VARCHAR(100) NOT NULL,
    sanaluokka VARCHAR(30),
    UNIQUE(sana, sanaluokka),
    PRIMARY KEY(id)
);
CREATE TABLE ilmentyma(
    id SERIAL,
    sana_id INTEGER REFERENCES hakusana(id),
    lause TEXT,
    paivays DATE,
    sivunumero VARCHAR(50),
    hs_osio VARCHAR(30),
    tyyli VARCHAR(100),
    kayttoala VARCHAR(100),
    selite VARCHAR(255),
    valmis BOOLEAN,
    viesti TEXT,
    PRIMARY KEY(id),
    CONSTRAINT uniikki_ilmentyma UNIQUE(sana_id, lause, paivays, sivunumero, hs_osio, tyyli, kayttoala, selite)
);
--ASIASANA LIITOS
CREATE TABLE edustaa(
    asiasana_id INTEGER REFERENCES asiasana(id) NOT NULL,
    ilmentyma_id INTEGER NOT NULL REFERENCES ilmentyma(id) ON DELETE CASCADE,
    PRIMARY KEY(asiasana_id, ilmentyma_id)
);

-- ORGANISAATIO JA TAPAHTUMA
CREATE TABLE organisaatio(
    id SERIAL,
    nimi VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE tapahtuma(
    id SERIAL,
    nimi VARCHAR(100),
    luonne VARCHAR(255),
    paivays VARCHAR(13),
    organisaatio_id INTEGER REFERENCES organisaatio(id) ON DELETE CASCADE,
    valmis BOOLEAN,
    viesti TEXT,
    PRIMARY KEY(id),
    CONSTRAINT uniikki_tapahtuma UNIQUE(nimi, luonne, paivays, organisaatio_id)
);
--SIJAINTI LIITOS
CREATE TABLE org_toimii(
    organisaatio_id INTEGER REFERENCES organisaatio(id) ON DELETE CASCADE,
    sijainti_id INTEGER REFERENCES sijainti(id),
    PRIMARY KEY(sijainti_id, organisaatio_id)
);
--ASIASANA LIITOS
CREATE TABLE liittyy(
    asiasana_id INTEGER REFERENCES asiasana(id) NOT NULL,
    tapahtuma_id INTEGER NOT NULL REFERENCES tapahtuma(id) ON DELETE CASCADE,
    PRIMARY KEY(asiasana_id, tapahtuma_id)
);

--TEOS
CREATE TABLE teos(
    id SERIAL,
    nimi VARCHAR(100) NOT NULL,
    lajityyppi VARCHAR(255) NOT NULL,
    valmis BOOLEAN,
    viesti TEXT,
    UNIQUE(nimi, lajityyppi),
    PRIMARY KEY(id)
);
--SIJAINTI LIITOS
CREATE TABLE tapahtuu_teos(
    sijainti_id INTEGER REFERENCES sijainti(id),
    teos_id INTEGER REFERENCES teos(id) ON DELETE CASCADE,
    PRIMARY KEY(sijainti_id, teos_id)
);
--ASIASANA LIITOS
CREATE TABLE sisaltaa(
    asiasana_id INTEGER REFERENCES asiasana(id) NOT NULL,
    teos_id INTEGER NOT NULL REFERENCES teos(id) ON DELETE CASCADE,
    PRIMARY KEY(asiasana_id, teos_id)
);

--HENKILÖ
CREATE TABLE henkilo(
    id SERIAL,
    etunimi VARCHAR(50) NOT NULL,
    sukunimi VARCHAR(50) NOT NULL,
    ammattinimike VARCHAR(50),
    UNIQUE(etunimi, sukunimi, ammattinimike),
    PRIMARY KEY(id)
);
CREATE TABLE tekee(
    henkilo_id INTEGER NOT NULL REFERENCES henkilo(id) ON DELETE CASCADE,
    teos_id INTEGER NOT NULL REFERENCES teos(id) ON DELETE CASCADE,
    PRIMARY KEY(henkilo_id, teos_id)
);
--SIJAINTI LIITOS
CREATE TABLE toimii_henkilo(
    sijainti_id INTEGER REFERENCES sijainti(id),
    henkilo_id INTEGER REFERENCES henkilo(id) ON DELETE CASCADE,
    PRIMARY KEY(sijainti_id, henkilo_id)
);

--KÄYTTÄJÄ
CREATE TABLE kayttaja(
    id SERIAL,
    nimi VARCHAR(255) UNIQUE NOT NULL,
    salasana VARCHAR(255) NOT NULL,
    rooli VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
);
