import React, { useState } from 'react';

import SkillRatingsChild from '../SkillRatingsChild';
import Table from '../Table';
import { ButtonAddComponent, Container, SkillRatingsChildContainer } from './styles';

interface IProps {
  isProfessionals?: boolean;
  isView?: boolean;
  values?: any;
  handleAddSkill?: any;
  type?: 'technical' | 'behavioral';
}

interface IRow {
  id: number;
  weight: number;
  note?: number;
  name: string;
}

function SkillRating({ isProfessionals = true, isView = false, values, handleAddSkill, type }: IProps) {
  const [components, setComponents] = useState<any[]>([
    <SkillRatingsChild isProfessionals={isProfessionals} type={type} />,
  ]);

  React.useEffect(() => {
    if (!values) {
      return;
    }

    const comps = values.map((value: any, index: number) => (
      <SkillRatingsChild key={index} isProfessionals={isProfessionals} type={type} index={index} />
    ));

    setComponents(comps);
  }, [values, type]);

  function createColumn(field: string, headerName: string, width: number) {
    return {
      field,
      headerName,
      width,
    };
  }

  function createRow(value: any) {
    if (!isProfessionals) {
      return {
        id: value.id,
        weight: value.weight,
        ability: value.ability,
      };
    }

    return {
      id: value.id,
      weight: value.weight,
      note: value.note,
      ability: value.ability,
    };
  }

  const columns: any[] = isProfessionals
    ? [createColumn('weight', 'Peso', 75), createColumn('note', 'Nota', 75), createColumn('ability', 'Habilidade', 200)]
    : [createColumn('weight', 'Peso', 75), createColumn('ability', 'Habilidade', 300)];

  const rows = values ? values.map((value: IRow) => createRow(value)) : [];

  const handleClick = () => {
    const index = handleAddSkill(type);
    setComponents([
      ...components,
      <SkillRatingsChild key={index} isProfessionals={isProfessionals} type={type} index={index} />,
    ]);
  };

  return (
    <>
      <Container>
        {!isView ? (
          <>
            <SkillRatingsChildContainer>
              <div>
                <label>Peso</label>
                {isProfessionals ? <label>Nota</label> : null}
                <label>Habilidade</label>
              </div>

              {components}
            </SkillRatingsChildContainer>

            {!isProfessionals ? (
              <ButtonAddComponent onClick={handleClick}>ADICIONAR NOVO CAMPO</ButtonAddComponent>
            ) : null}
          </>
        ) : (
          <Table columns={columns} rows={rows} hideFooter={true} pageSize={rows.length} />
        )}
      </Container>
    </>
  );
}

export default SkillRating;
