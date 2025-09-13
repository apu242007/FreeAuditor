import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import FieldPalette from './FieldPalette';
import FormField from './FormField';
import FormPreview from './FormPreview';
import ConditionalLogicEditor from '../ConditionalLogic/ConditionalLogicEditor';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import CollaborationStatus from '../Collaboration/CollaborationStatus';
import type { FormField as FormFieldType, FormData } from '../../types/form';
import { Save, Eye, Download, Menu, X } from 'lucide-react';

const FormBuilder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: uuidv4(),
    title: 'Untitled Form',
    description: '',
    fields: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [activeView, setActiveView] = useState<'builder' | 'preview' | 'logic' | 'pdf'>('builder');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'field',
    drop: (item: { type: FormFieldType['type'] }) => {
      handleAddField(item.type);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleAddField = useCallback((type: FormFieldType['type']) => {
    const newField: FormFieldType = {
      id: uuidv4(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      conditionalLogic: [],
    };

    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
      updatedAt: new Date(),
    }));
  }, []);

  const handleUpdateField = useCallback((fieldId: string, updates: Partial<FormFieldType>) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      ),
      updatedAt: new Date(),
    }));
  }, []);

  const handleDeleteField = useCallback((fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
      updatedAt: new Date(),
    }));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  }, [selectedField]);

  const handleReorderFields = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormData(prev => {
      const draggedField = prev.fields[dragIndex];
      const newFields = [...prev.fields];
      newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);
      
      return {
        ...prev,
        fields: newFields,
        updatedAt: new Date(),
      };
    });
  }, []);

  const handleSaveForm = useCallback(() => {
    // Save to localStorage for now - could be replaced with API call
    localStorage.setItem(`form_${formData.id}`, JSON.stringify(formData));
    alert('Form saved successfully!');
  }, [formData]);

  const setDropRef = (node: HTMLDivElement | null) => {
    drop(node);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Field Palette */}
      <div className={`w-64 bg-white shadow-sm border-r transform transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static fixed inset-y-0 left-0`}>
        <div className="flex items-center justify-between p-4 border-b lg:block">
          <h3 className="text-lg font-medium text-gray-900">Form Elements</h3>
          <button
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <FieldPalette />
        
        {/* Collaboration Status */}
        <div className="p-4 border-t">
          <CollaborationStatus formId={formData.id} userId="current-user" />
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="text-lg lg:text-xl font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded min-w-0 flex-1 lg:flex-none"
                placeholder="Form Title"
              />
            </div>
            
            <div className="flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setActiveView('builder')}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium ${
                  activeView === 'builder'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="hidden sm:inline">Builder</span>
                <span className="sm:hidden">Build</span>
              </button>
              <button
                onClick={() => setActiveView('preview')}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium ${
                  activeView === 'preview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Eye className="w-4 h-4 lg:inline lg:mr-1" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={() => setActiveView('logic')}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium ${
                  activeView === 'logic'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="hidden sm:inline">Logic</span>
                <span className="sm:hidden">Logic</span>
              </button>
              <button
                onClick={() => setActiveView('pdf')}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium ${
                  activeView === 'pdf'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Download className="w-4 h-4 lg:inline lg:mr-1" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={handleSaveForm}
                className="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs lg:text-sm font-medium"
              >
                <Save className="w-4 h-4 lg:inline lg:mr-1" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 overflow-auto">
          {activeView === 'builder' && (
            <div
              ref={setDropRef}
              className={`min-h-full p-6 ${
                isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
              }`}
            >
              <div className="max-w-2xl mx-auto">
                {formData.description && (
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Form description..."
                    rows={2}
                  />
                )}
                
                {formData.fields.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">
                      Drag and drop form elements here
                    </div>
                    <div className="text-gray-300 text-sm">
                      Start building your form by dragging elements from the left panel
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        field={field}
                        index={index}
                        isSelected={selectedField === field.id}
                        onSelect={() => setSelectedField(field.id)}
                        onUpdate={(updates) => handleUpdateField(field.id, updates)}
                        onDelete={() => handleDeleteField(field.id)}
                        onReorder={handleReorderFields}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'preview' && (
            <FormPreview formData={formData} />
          )}

          {activeView === 'logic' && (
            <ConditionalLogicEditor 
              formData={formData}
              onUpdateField={handleUpdateField}
            />
          )}

          {activeView === 'pdf' && (
            <PDFGenerator formData={formData} />
          )}
        </div>
      </div>

      {/* Right Sidebar - Field Properties */}
      {selectedField && (
        <div className="w-80 bg-white shadow-sm border-l">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Field Properties</h3>
          </div>
          <div className="p-4">
            {/* Field properties will be rendered here */}
            <p className="text-gray-600">Field properties panel</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;