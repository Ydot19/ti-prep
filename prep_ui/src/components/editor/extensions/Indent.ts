import { Extension } from '@tiptap/core';

export interface IndentOptions {
  types: string[];
  min: number;
  max: number;
}

// eslint-disable-next-line no-nested-ternary,vue/max-len
const clamp = (val: number, lower: number, upper: number) => (val < lower ? lower : val > upper ? upper : val);

function update({
  step = 1, min = 0, max = 30, unit = '',
}): (
  v: string | number,
  delta?: number,
) => string {
  return (last, delta = step) => {
    let n;
    console.log('Point A');
    console.log(`step: ${step}`);
    console.log(`delta: ${delta}`);
    if (last === undefined || last === null) {
      n = 0;
    } else if (typeof last === 'number') {
      n = last;
    } else {
      n = parseFloat(last);
      if (Number.isNaN(n)) {
        n = 0;
      }
    }

    if (typeof last === 'string') {
      n = parseFloat(last);
    }
    if (Number.isNaN(n)) {
      n = 0;
    }

    n += delta;
    n = clamp(n, min, max);
    let frac = 0;
    const abs = Math.abs(delta);
    if (abs >= 1) { /* empty */ } else if (abs >= 0.1) {
      frac = 1;
    } else if (abs >= 0.01) {
      frac = 2;
    } else if (abs >= 0.001) {
      frac = 3;
    } else {
      frac = 4;
    }
    const fixedVal = `${n.toFixed(frac)}${unit}`;
    console.log(fixedVal);
    return fixedVal;
  };
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      decreaseIndent: (bc?: boolean) => ReturnType
      increaseIndent: () => ReturnType
      unsentIndent: () => ReturnType
    }
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      types: ['listItem', 'heading', 'paragraph', 'blockquote'],
      min: 0,
      max: 30,
    };
  },
  addCommands() {
    return {
      decreaseIndent: (backspace = false) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line implicit-arrow-linebreak
        ({ chain, state }) => {
          const { selection } = state;
          // eslint-disable-next-line vue/max-len
          if (backspace && (selection.$anchor.parentOffset > 0 || selection.from !== selection.to)) return false;
          return chain()
            .setMarginLeft(update({
              step: -1, unit: 'rem', min: this.options.min, max: this.options.max,
            }))
            .run();
        },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line implicit-arrow-linebreak
      increaseIndent: () => ({ chain }) => {
        chain()
          .setMarginLeft(update({ unit: 'rem', min: this.options.min, max: this.options.max }))
          .run();
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      unsetIndent: () => ({ commands }) => commands.unsetMarginLeft(),
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.increaseIndent(),
      'Shift-Tab': () => this.editor.commands.decreaseIndent(),
      Backspace: () => this.editor.commands.decreaseIndent(true),
    };
  },
});
