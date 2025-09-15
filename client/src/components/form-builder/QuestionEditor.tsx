import React from 'react';
import { Pregunta, TipoPregunta } from '../../types';
import { useFormBuilderStore } from '../../store/formBuilderStore';

interface QuestionEditorProps {
  question: Pregunta;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({ question }) => {
  const { updateQuestion, removeQuestion } = useFormBuilderStore();

  const handleTextChange = (field: keyof Pregunta, value: string) => {
    updateQuestion(question.id, { [field]: value });
  };

  const renderQuestionInput = () => {
    switch (question.tipo) {
      case TipoPregunta.TEXTO_CORTO:
        return <input type="text" placeholder="Respuesta de texto corto" disabled />;
      
      case TipoPregunta.TEXTO_LARGO:
        return <textarea placeholder="Respuesta de texto largo" disabled />;
      
      case TipoPregunta.SELECCION_UNICA:
        return (
          <div>
            {question.opciones?.map((opcion) => (
              <label key={opcion.id}>
                <input type="radio" name={question.id} disabled />
                {opcion.texto}
              </label>
            ))}
          </div>
        );
      
      case TipoPregunta.SELECCION_MULTIPLE:
        return (
          <div>
            {question.opciones?.map((opcion) => (
              <label key={opcion.id}>
                <input type="checkbox" disabled />
                {opcion.texto}
              </label>
            ))}
          </div>
        );
      
      case TipoPregunta.SI_NO:
        return (
          <div>
            <label><input type="radio" name={question.id} disabled /> Sí</label>
            <label><input type="radio" name={question.id} disabled /> No</label>
          </div>
        );
      
      case TipoPregunta.EMAIL:
        return <input type="email" placeholder="Correo electrónico" disabled />;
      
      case TipoPregunta.NUMERO:
        return <input type="number" placeholder="Número" disabled />;
      
      case TipoPregunta.FECHA:
        return <input type="date" disabled />;
      
      default:
        return <input type="text" placeholder="Respuesta" disabled />;
    }
  };

  return (
    <div className="question-editor">
      <div className="question-editor__header">
        <input
          type="text"
          value={question.texto}
          onChange={(e) => handleTextChange('texto', e.target.value)}
          placeholder="Texto de la pregunta"
          className="question-editor__title"
        />
        <button
          onClick={() => removeQuestion(question.id)}
          className="question-editor__remove"
        >
          Eliminar
        </button>
      </div>
      
      <div className="question-editor__content">
        {renderQuestionInput()}
      </div>
      
      <div className="question-editor__options">
        <label>
          <input
            type="checkbox"
            checked={question.obligatoria}
            onChange={(e) => handleTextChange('obligatoria', e.target.checked.toString())}
          />
          Obligatoria
        </label>
      </div>
    </div>
  );
};