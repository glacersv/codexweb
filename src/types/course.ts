/* ==========================================================================
   COURSE.TS — CONTRATOS E INTERFACES TYPESCRIPT DEL AULA VIRTUAL
   ========================================================================== */

export type ModuleId = 'clase' | 'rayosx' | 'grid' | 'mockup' | 'teoria' | 'ruta' | 'galeria' | 'bloques' | 'bloquescss';

export type SessionStatus = 'done' | 'current' | 'upcoming';

export interface SessionPlan {
  id: number;
  week: string;
  day: string;
  title: string;
  status: SessionStatus;
  detail: string;
  newIdea: string;
  lab: 'rayosx' | 'grid' | 'mockup' | 'teoria' | 'galeria' | null;
  file: string;
  blocks: {
    teoria: string;
    practica: string;
    entregable: string;
  };
}

export type GridPresetId = 'holygrail' | 'bento' | 'dashboard' | 'landing';

export interface XrayCaseSpec {
  id: string;
  shortTag: string;
  targetCols: number;
  targetRows: number;
  presetToLoad: GridPresetId;
  explanation: string;
  renderMarkup: (showTags: boolean) => string;
}

export type SemanticBrushKey =
  | 'header'
  | 'nav'
  | 'main'
  | 'aside'
  | 'article'
  | 'footer'
  | 'eraser';

export interface SemanticBrushMeta {
  key: SemanticBrushKey;
  tag: string | null;
  name: string;
  color: string;
  soft: string;
}

export interface MergedGridBlock {
  type: Exclude<SemanticBrushKey, 'eraser'>;
  rStart: number;
  rEnd: number;
  cStart: number;
  cEnd: number;
  colSpan: number;
  rowSpan: number;
}

export interface MockupComponentSpec {
  id: string;
  title: string;
  tag: string;
  wireframeHtml: string;
  semanticCode: string;
}

export interface RubricCriterion {
  id: string;
  label: string;
  pts: number;
  done: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface CommandPaletteAction {
  id: string;
  label: string;
  shortcut: string;
  category: string;
  run: () => void;
}
