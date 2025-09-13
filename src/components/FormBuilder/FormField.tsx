import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Trash2, GripVertical, Settings } from 'lucide-react';
import type { FormField as FormFieldType } from '../../types/form';

interface FormFieldProps {
  field: FormFieldType;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<FormFieldType>) => void;
  onDelete: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  index,
  isSelected,
  onSelect,
  onUpdate: _onUpdate,
  onDelete,
  onReorder,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
    accept: 'form-field',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'form-field',
    item: (): DragItem => {
      return { id: field.id, index, type: 'form-field' };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  
  // Connect drag and drop refs
  const dragDropRef = (node: HTMLDivElement | null) => {
    drag(drop(node));
    ref.current = node;
  };

  const renderFieldPreview = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            disabled
          />
        );
      case 'select':
        return (
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          >
            <option>Select an option</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  disabled
                />
                <span>{option}</span>
              </label>
            )) || (
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" disabled />
                <span>Checkbox option</span>
              </label>
            )}
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  className="mr-2"
                  disabled
                />
                <span>{option}</span>
              </label>
            )) || (
              <label className="flex items-center">
                <input type="radio" name={field.id} className="mr-2" disabled />
                <span>Radio option</span>
              </label>
            )}
          </div>
        );
      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <span className="text-gray-500">Click to upload or drag and drop</span>
          </div>
        );
      case 'signature':
        return (
          <div className="border border-gray-300 rounded-md p-4 h-32 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-500">Signature Pad</span>
          </div>
        );
      case 'photo':
        return (
          <div className="border border-gray-300 rounded-md p-4 h-32 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-500">Photo Capture</span>
          </div>
        );
      default:
        return (
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
            {field.type} field
          </div>
        );
    }
  };

  return (
    <div
      ref={dragDropRef}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`relative group p-4 border-2 rounded-lg transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      {/* Drag Handle */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-gray-500 text-white p-1 rounded cursor-move">
          <GripVertical className="w-3 h-3" />
        </div>
      </div>

      {/* Field Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Open field settings
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Field Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 text-gray-400 hover:text-red-600"
              title="Delete Field"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {renderFieldPreview()}
      </div>
    </div>
  );
};

export default FormField;