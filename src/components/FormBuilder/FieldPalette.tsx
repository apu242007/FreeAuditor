import React from 'react';
import { useDrag } from 'react-dnd';
import {
  Type,
  Mail,
  Hash,
  AlignLeft,
  List,
  CheckSquare,
  Circle,
  Upload,
  PenTool,
  Camera,
} from 'lucide-react';
import type { FormField } from '../../types/form';

interface FieldTypeConfig {
  type: FormField['type'];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const fieldTypes: FieldTypeConfig[] = [
  {
    type: 'text',
    label: 'Text Input',
    icon: Type,
    description: 'Single line text input',
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Email address input',
  },
  {
    type: 'number',
    label: 'Number',
    icon: Hash,
    description: 'Numeric input field',
  },
  {
    type: 'textarea',
    label: 'Textarea',
    icon: AlignLeft,
    description: 'Multi-line text input',
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: List,
    description: 'Select from options',
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquare,
    description: 'Multiple choice selection',
  },
  {
    type: 'radio',
    label: 'Radio Button',
    icon: Circle,
    description: 'Single choice selection',
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: Upload,
    description: 'File upload field',
  },
  {
    type: 'signature',
    label: 'Signature',
    icon: PenTool,
    description: 'Digital signature pad',
  },
  {
    type: 'photo',
    label: 'Photo',
    icon: Camera,
    description: 'Photo capture/upload',
  },
];

interface DraggableFieldProps {
  fieldType: FieldTypeConfig;
}

const DraggableField: React.FC<DraggableFieldProps> = ({ fieldType }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'field',
    item: { type: fieldType.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const Icon = fieldType.icon;

  const setNodeRef = (node: HTMLDivElement | null) => {
    drag(node);
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-3 border border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">
            {fieldType.label}
          </div>
          <div className="text-xs text-gray-500">
            {fieldType.description}
          </div>
        </div>
      </div>
    </div>
  );
};

const FieldPalette: React.FC = () => {
  return (
    <div className="p-4 space-y-3">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Basic Fields</h4>
        <div className="space-y-2">
          {fieldTypes.slice(0, 4).map((fieldType) => (
            <DraggableField key={fieldType.type} fieldType={fieldType} />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Selection Fields</h4>
        <div className="space-y-2">
          {fieldTypes.slice(4, 7).map((fieldType) => (
            <DraggableField key={fieldType.type} fieldType={fieldType} />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Media Fields</h4>
        <div className="space-y-2">
          {fieldTypes.slice(7).map((fieldType) => (
            <DraggableField key={fieldType.type} fieldType={fieldType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldPalette;