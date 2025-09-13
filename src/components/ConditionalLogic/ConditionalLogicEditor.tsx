import React, { useState } from 'react';
import type { FormData, FormField, ConditionalRule } from '../../types/form';
import { Plus, Trash2 } from 'lucide-react';

interface ConditionalLogicEditorProps {
  formData: FormData;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
}

const ConditionalLogicEditor: React.FC<ConditionalLogicEditorProps> = ({
  formData,
  onUpdateField,
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const selectedFieldData = formData.fields.find(f => f.id === selectedField);

  const addRule = () => {
    if (!selectedField) return;

    const newRule: ConditionalRule = {
      fieldId: '',
      operator: 'equals',
      value: '',
      action: 'show',
    };

    const field = formData.fields.find(f => f.id === selectedField);
    if (field) {
      const updatedRules = [...(field.conditionalLogic || []), newRule];
      onUpdateField(selectedField, { conditionalLogic: updatedRules });
    }
  };

  const updateRule = (ruleIndex: number, updates: Partial<ConditionalRule>) => {
    if (!selectedField || !selectedFieldData) return;

    const updatedRules = [...(selectedFieldData.conditionalLogic || [])];
    updatedRules[ruleIndex] = { ...updatedRules[ruleIndex], ...updates };
    onUpdateField(selectedField, { conditionalLogic: updatedRules });
  };

  const deleteRule = (ruleIndex: number) => {
    if (!selectedField || !selectedFieldData) return;

    const updatedRules = [...(selectedFieldData.conditionalLogic || [])];
    updatedRules.splice(ruleIndex, 1);
    onUpdateField(selectedField, { conditionalLogic: updatedRules });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Conditional Logic
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Set up rules to show, hide, or require fields based on other field values
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Field Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Select Field to Add Logic
              </h3>
              <div className="space-y-2">
                {formData.fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`w-full text-left p-3 border rounded-lg hover:bg-gray-50 ${
                      selectedField === field.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{field.label}</div>
                    <div className="text-sm text-gray-500">
                      Type: {field.type}
                      {field.conditionalLogic && field.conditionalLogic.length > 0 && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {field.conditionalLogic.length} rule(s)
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rules Editor */}
            <div>
              {selectedFieldData ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Rules for "{selectedFieldData.label}"
                    </h3>
                    <button
                      onClick={addRule}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Rule
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedFieldData.conditionalLogic?.map((rule, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="grid grid-cols-1 gap-3">
                          {/* Condition Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              When field
                            </label>
                            <select
                              value={rule.fieldId}
                              onChange={(e) => updateRule(index, { fieldId: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select field...</option>
                              {formData.fields
                                .filter(f => f.id !== selectedField)
                                .map((field) => (
                                  <option key={field.id} value={field.id}>
                                    {field.label}
                                  </option>
                                ))}
                            </select>
                          </div>

                          {/* Operator */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Operator
                            </label>
                            <select
                              value={rule.operator}
                              onChange={(e) => updateRule(index, { operator: e.target.value as ConditionalRule['operator'] })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="equals">equals</option>
                              <option value="not_equals">does not equal</option>
                              <option value="contains">contains</option>
                              <option value="greater_than">greater than</option>
                              <option value="less_than">less than</option>
                            </select>
                          </div>

                          {/* Value */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Value
                            </label>
                            <input
                              type="text"
                              value={rule.value}
                              onChange={(e) => updateRule(index, { value: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter value..."
                            />
                          </div>

                          {/* Action */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Then
                            </label>
                            <select
                              value={rule.action}
                              onChange={(e) => updateRule(index, { action: e.target.value as ConditionalRule['action'] })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="show">show this field</option>
                              <option value="hide">hide this field</option>
                              <option value="require">require this field</option>
                              <option value="disable">disable this field</option>
                            </select>
                          </div>

                          {/* Delete Rule */}
                          <div className="flex justify-end">
                            <button
                              onClick={() => deleteRule(index)}
                              className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(!selectedFieldData.conditionalLogic || selectedFieldData.conditionalLogic.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        No conditional rules defined. Click "Add Rule" to get started.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Select a field from the left to add conditional logic
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionalLogicEditor;