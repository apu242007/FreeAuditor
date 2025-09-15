import React from 'react';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { QuestionEditor } from './QuestionEditor';

export const FormPreview: React.FC = () => {
  const { currentForm } = useFormBuilderStore();

  if (!currentForm) {
    return (
      <div className="form-preview">
        <h3>Vista previa</h3>
        <p>Comienza agregando preguntas desde el panel lateral</p>
      </div>
    );
  }

  return (
    <div className="form-preview">
      <h3>Vista previa</h3>
      <div className="form-preview__content">
        {currentForm.secciones.map((seccion) => (
          <div key={seccion.id} className="section">
            <h4>{seccion.titulo}</h4>
            {seccion.preguntas.map((pregunta) => (
              <QuestionEditor key={pregunta.id} question={pregunta} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};