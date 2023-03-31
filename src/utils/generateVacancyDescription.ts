export const generateVacancyDescription = (
  vaga: string,
  observation: string,
  skills: any[],
  budget: string,
  exp: string
) => {
  const skillNames = skills.map((value) => value.name).join('<br />');

  const text = `
  <h1>${vaga}</h1>
  <h2>Tempo de experiência: ${exp}</h2>
  <h2>Budget: ${budget}</h2>
  
  <h2>Descrição:</h2>
  <p>${observation}</p>
  
  <h2>Requisitos:</h2>
  <p>${skillNames}</p>
      `;

  return text;
};
