export const clipBoardText = (vaga: string, observation: string, skills: any[], budget: string, exp: string) => {
  const skillNames = skills.map((value) => value.name).join('\n');

  const text = `
${vaga}
Tempo de experiência: ${exp}
Budget: ${budget}

Descrição:
${observation}

Requisitos:
${skillNames}
    `;

  return text;
};
