import React from 'react';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { QuestionToolbox } from './QuestionToolbox';
import { FormPreview } from './FormPreview';

export const FormBuilder: React.FC = () => {
  const { currentForm, updateFormTitle } = useFormBuilderStore();

  return (
    <div className="form-builder">
      <div className="form-builder__header">
        <input
          type="text"
          value={currentForm?.titulo || ''}
          onChange={(e) => updateFormTitle(e.target.value)}
          placeholder="Título del formulario"
          className="form-builder__title-input"
        />
      </div>
      
      <div className="form-builder__content">
        <QuestionToolbox />
        <FormPreview />
      </div>
    </div>
  );
};