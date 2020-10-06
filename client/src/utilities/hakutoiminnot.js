// PREDIKAATTIFUNKTIOT HAKUA VARTEN

// isArray check koska kohde voi olla string tai [string]
const sisaltaa = hakutermi => kohde => 
  //(Array.isArray(kohde) ? kohde[0] : kohde ).toUpperCase().indexOf( hakutermi.toUpperCase() ) >= 0
  (Array.isArray(kohde) ? kohde[0] : kohde ).toUpperCase().includes( hakutermi.toUpperCase())

const alkaa = hakutermi => kohde => 
  //(Array.isArray(kohde) ? kohde[0] : kohde).toUpperCase().indexOf( hakutermi.toUpperCase() ) === 0
  (Array.isArray(kohde) ? kohde[0] : kohde).toUpperCase().startsWith( hakutermi.toUpperCase());

const paattyy = hakutermi => kohde => {
  return (Array.isArray(kohde) ? kohde[0] : kohde).toUpperCase().endsWith( hakutermi.toUpperCase())
}
  
// SUODATUSFUNKTIO

export const suodata = attribuutti => hakutermi => suodatin => taulukko => {
  return taulukko.filter(objekti => {
    return suodatin (hakutermi) (objekti[attribuutti])
  })
}


export const suodataKokoelma = kokoelma => attribuutti => hakutermi => suodatin => taulukko => 
  taulukko.filter(objekti => objekti[kokoelma]
    .some(ilmentyma => ilmentyma[attribuutti].some(sana => suodatin (hakutermi) (sana)))
  )

  // export const suodataKokoelma = kokoelma => attribuutti => hakutermi => suodatin => taulukko =>
  // taulukko.filter(objekti => objekti[kokoelma]
  //   .some(ilmentyma => suodatin (hakutermi) (ilmentyma[attribuutti][0]))
  // )

// HAKUSANAN TRIMMAUS JA PREDIKAATIN VALINTA
export const valitseHakumetodi = hakusana => {
  if (hakusana[0] === '*' && hakusana[hakusana.length - 1] === '*') {
    return {
      hakutermiTrim: hakusana.slice(1, hakusana.length - 1),
      predikaatti: sisaltaa
    }
  } else if (hakusana[0] === '*') {
    return {
      hakutermiTrim: hakusana.slice(1),
      predikaatti: paattyy
    }
  } else if (hakusana[hakusana.length - 1] === '*') {
    return {
      hakutermiTrim: hakusana.slice(0, hakusana.length - 1),
      predikaatti: alkaa
    }
  } else {
    return {
      hakutermiTrim: hakusana,
      predikaatti: alkaa
    }
  }
}
