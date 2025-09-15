import { create } from 'zustand';
import { Formulario, Seccion, Pregunta, TipoPregunta, Opcion } from '../types';

interface FormBuilderState {
  currentForm: Formulario | null;
  loading: boolean;
  error: string | null;
}

interface FormBuilderActions {
  createNewForm: () => void;
  updateFormTitle: (title: string) => void;
  addQuestion: (type: TipoPregunta) => void;
  updateQuestion: (questionId: string, updates: Partial<Pregunta>) => void;
  removeQuestion: (questionId: string) => void;
  saveForm: () => Promise<void>;
  loadForm: (id: string) => Promise<void>;
}

type FormBuilderStore = FormBuilderState & FormBuilderActions;

const generateId = () => Math.random().toString(36).substring(2, 15);

const createDefaultOptions = (questionId: string, type: TipoPregunta): Opcion[] => {
  if (type === TipoPregunta.SELECCION_UNICA || type === TipoPregunta.SELECCION_MULTIPLE) {
    return [
      {
        id: generateId(),
        preguntaId: questionId,
        texto: 'Opción 1',
        valor: 'opcion1',
        orden: 0,
      },
      {
        id: generateId(),
        preguntaId: questionId,
        texto: 'Opción 2',
        valor: 'opcion2',
        orden: 1,
      },
    ];
  }
  return [];
};

export const useFormBuilderStore = create<FormBuilderStore>((set, get) => ({
  currentForm: null,
  loading: false,
  error: null,

  createNewForm: () => {
    const newForm: Formulario = {
      id: generateId(),
      titulo: 'Nuevo Formulario',
      descripcion: '',
      activo: true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      secciones: [
        {
          id: generateId(),
          formularioId: '',
          titulo: 'Sección Principal',
          descripcion: '',
          orden: 0,
          preguntas: [],
        },
      ],
    };
    newForm.secciones[0].formularioId = newForm.id;
    set({ currentForm: newForm });
  },

  updateFormTitle: (title: string) => {
    const { currentForm } = get();
    if (currentForm) {
      set({
        currentForm: {
          ...currentForm,
          titulo: title,
          fechaActualizacion: new Date(),
        },
      });
    }
  },

  addQuestion: (type: TipoPregunta) => {
    const { currentForm } = get();
    if (!currentForm || currentForm.secciones.length === 0) {
      get().createNewForm();
      const updatedState = get();
      if (!updatedState.currentForm) return;
    }

    const state = get();
    const form = state.currentForm!;
    const mainSection = form.secciones[0];
    
    const questionId = generateId();
    const newQuestion: Pregunta = {
      id: questionId,
      seccionId: mainSection.id,
      tipo: type,
      texto: `Nueva pregunta ${type}`,
      descripcion: '',
      obligatoria: false,
      orden: mainSection.preguntas.length,
      opciones: createDefaultOptions(questionId, type),
    };

    const updatedSection: Seccion = {
      ...mainSection,
      preguntas: [...mainSection.preguntas, newQuestion],
    };

    set({
      currentForm: {
        ...form,
        secciones: [updatedSection],
        fechaActualizacion: new Date(),
      },
    });
  },

  updateQuestion: (questionId: string, updates: Partial<Pregunta>) => {
    const { currentForm } = get();
    if (!currentForm) return;

    const updatedSections = currentForm.secciones.map((section) => ({
      ...section,
      preguntas: section.preguntas.map((question) =>
        question.id === questionId ? { ...question, ...updates } : question
      ),
    }));

    set({
      currentForm: {
        ...currentForm,
        secciones: updatedSections,
        fechaActualizacion: new Date(),
      },
    });
  },

  removeQuestion: (questionId: string) => {
    const { currentForm } = get();
    if (!currentForm) return;

    const updatedSections = currentForm.secciones.map((section) => ({
      ...section,
      preguntas: section.preguntas.filter((question) => question.id !== questionId),
    }));

    set({
      currentForm: {
        ...currentForm,
        secciones: updatedSections,
        fechaActualizacion: new Date(),
      },
    });
  },

  saveForm: async () => {
    const { currentForm } = get();
    if (!currentForm) return;

    set({ loading: true, error: null });
    
    try {
      // TODO: Implement API call to save form
      console.log('Saving form:', currentForm);
      // await formService.saveForm(currentForm);
    } catch (error) {
      set({ error: 'Error al guardar el formulario' });
    } finally {
      set({ loading: false });
    }
  },

  loadForm: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      // TODO: Implement API call to load form
      console.log('Loading form:', id);
      // const form = await formService.getForm(id);
      // set({ currentForm: form });
    } catch (error) {
      set({ error: 'Error al cargar el formulario' });
    } finally {
      set({ loading: false });
    }
  },
}));