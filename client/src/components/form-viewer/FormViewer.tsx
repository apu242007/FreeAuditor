import React from 'react';
import { useFormBuilderStore } from '../../store/formBuilderStore';

export const FormViewer: React.FC = () => {
  const { currentForm } = useFormBuilderStore();

  if (!currentForm) {
    return (
      <div className="form-viewer">
        <p>No hay formulario para mostrar</p>
      </div>
    );
  }

  return (
    <div className="form-viewer">
      <h2>{currentForm.titulo}</h2>
      {currentForm.descripcion && (
        <p className="form-description">{currentForm.descripcion}</p>
      )}
      
      <form className="form-viewer__form">
        {currentForm.secciones.map((seccion) => (
          <div key={seccion.id} className="form-section">
            <h3>{seccion.titulo}</h3>
            {seccion.descripcion && (
              <p className="section-description">{seccion.descripcion}</p>
            )}
            
            {seccion.preguntas.map((pregunta) => (
              <div key={pregunta.id} className="form-question">
                <label>
                  {pregunta.texto}
                  {pregunta.obligatoria && <span className="required">*</span>}
                </label>
                
                {/* Render question input based on type */}
                {/* This would be expanded with proper form handling */}
                <input type="text" placeholder="Respuesta" />
              </div>
            ))}
          </div>
        ))}
        
        <button type="submit" className="submit-button">
          Enviar respuestas
        </button>
      </form>
    </div>
  );
};