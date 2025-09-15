export interface Formulario {
  id: string;
  titulo: string;
  descripcion?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  secciones: Seccion[];
}

export interface Seccion {
  id: string;
  formularioId: string;
  titulo: string;
  descripcion?: string;
  orden: number;
  preguntas: Pregunta[];
}

export interface Pregunta {
  id: string;
  seccionId: string;
  tipo: TipoPregunta;
  texto: string;
  descripcion?: string;
  obligatoria: boolean;
  orden: number;
  opciones?: Opcion[];
  validaciones?: ValidacionPregunta;
}

export interface Opcion {
  id: string;
  preguntaId: string;
  texto: string;
  valor: string;
  orden: number;
}

export interface RespuestaFormulario {
  id: string;
  formularioId: string;
  fechaEnvio: Date;
  respuestas: RespuestaPregunta[];
}

export interface RespuestaPregunta {
  id: string;
  respuestaFormularioId: string;
  preguntaId: string;
  valor: string | string[];
}

export interface ValidacionPregunta {
  longitud?: {
    minimo?: number;
    maximo?: number;
  };
  formato?: RegExp;
  rango?: {
    minimo?: number;
    maximo?: number;
  };
}

export enum TipoPregunta {
  TEXTO_CORTO = 'texto_corto',
  TEXTO_LARGO = 'texto_largo',
  SELECCION_UNICA = 'seleccion_unica',
  SELECCION_MULTIPLE = 'seleccion_multiple',
  SI_NO = 'si_no',
  ESCALA = 'escala',
  FECHA = 'fecha',
  HORA = 'hora',
  EMAIL = 'email',
  NUMERO = 'numero'
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  fechaCreacion: Date;
}