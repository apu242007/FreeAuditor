import React from 'react';
import { TipoPregunta } from '../../types';
import { useFormBuilderStore } from '../../store/formBuilderStore';

export const QuestionToolbox: React.FC = () => {
  const { addQuestion } = useFormBuilderStore();

  const questionTypes = [
    { type: TipoPregunta.TEXTO_CORTO, label: 'Texto corto' },
    { type: TipoPregunta.TEXTO_LARGO, label: 'Texto largo' },
    { type: TipoPregunta.SELECCION_UNICA, label: 'Selección única' },
    { type: TipoPregunta.SELECCION_MULTIPLE, label: 'Selección múltiple' },
    { type: TipoPregunta.SI_NO, label: 'Sí/No' },
    { type: TipoPregunta.ESCALA, label: 'Escala' },
    { type: TipoPregunta.FECHA, label: 'Fecha' },
    { type: TipoPregunta.EMAIL, label: 'Email' },
    { type: TipoPregunta.NUMERO, label: 'Número' },
  ];

  return (
    <div className="question-toolbox">
      <h3>Componentes</h3>
      <div className="question-toolbox__items">
        {questionTypes.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => addQuestion(type)}
            className="question-toolbox__button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};