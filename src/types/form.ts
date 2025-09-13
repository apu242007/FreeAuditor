export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'signature' | 'photo';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, radio
  conditionalLogic?: ConditionalRule[];
  validation?: ValidationRule;
}

export interface ConditionalRule {
  fieldId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string | number;
  action: 'show' | 'hide' | 'require' | 'disable';
}

export interface ValidationRule {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface FormData {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
  userAgent?: string;
  ipAddress?: string;
}

export interface CollaborationEvent {
  type: 'field_added' | 'field_removed' | 'field_updated' | 'form_saved';
  userId: string;
  timestamp: Date;
  data: any;
}

export interface AnalyticsData {
  totalSubmissions: number;
  uniqueUsers: number;
  averageCompletionTime: number;
  abandonmentRate: number;
  fieldAnalytics: Record<string, FieldAnalytics>;
}

export interface FieldAnalytics {
  fieldId: string;
  interactions: number;
  abandonments: number;
  averageTime: number;
  validationErrors: number;
}