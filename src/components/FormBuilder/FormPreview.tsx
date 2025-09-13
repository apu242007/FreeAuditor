import React, { useState } from 'react';
import type { FormData } from '../../types/form';
import SignatureCanvas from 'react-signature-canvas';

interface FormPreviewProps {
  formData: FormData;
}

const FormPreview: React.FC<FormPreviewProps> = ({ formData }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
    alert('Form submitted successfully!');
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      case 'select':
        return (
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map((option: string, idx: number) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, idx: number) => (
              <label key={idx} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formValues[field.id]?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = formValues[field.id] || [];
                    if (e.target.checked) {
                      handleInputChange(field.id, [...currentValues, option]);
                    } else {
                      handleInputChange(field.id, currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <span>{option}</span>
              </label>
            )) || (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formValues[field.id] || false}
                  onChange={(e) => handleInputChange(field.id, e.target.checked)}
                />
                <span>Checkbox option</span>
              </label>
            )}
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, idx: number) => (
              <label key={idx} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  className="mr-2"
                  checked={formValues[field.id] === option}
                  onChange={() => handleInputChange(field.id, option)}
                />
                <span>{option}</span>
              </label>
            )) || (
              <label className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  className="mr-2"
                  checked={formValues[field.id] === 'radio-option'}
                  onChange={() => handleInputChange(field.id, 'radio-option')}
                />
                <span>Radio option</span>
              </label>
            )}
          </div>
        );
      case 'file':
        return (
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInputChange(field.id, e.target.files?.[0])}
            required={field.required}
          />
        );
      case 'signature':
        return (
          <div className="border border-gray-300 rounded-md">
            <SignatureCanvas
              canvasProps={{
                width: 400,
                height: 200,
                className: 'signature-canvas',
              }}
              onEnd={() => {
                // Handle signature save
              }}
            />
          </div>
        );
      case 'photo':
        return (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange(field.id, e.target.files?.[0])}
              required={field.required}
            />
          </div>
        );
      default:
        return (
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
            {field.type} field (preview not available)
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{formData.title}</h1>
          {formData.description && (
            <p className="mt-2 text-gray-600">{formData.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPreview;