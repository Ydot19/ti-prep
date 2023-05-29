import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';
import type { CommandProps } from '@tiptap/core';

export type SubTextStylesOptions = {
  types: string[];
  defaultUnit: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (v: string) => ReturnType;
      toggleLineHeight: (v: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
    fontSize: {
      setFontSize: (v: string) => ReturnType;
      toggleFontSize: (v: string) => ReturnType;

      unsetFontSize: () => ReturnType;
    };
    marginLeft: {
      // eslint-disable-next-line no-shadow
      setMarginLeft: (v: string | ((v: string) => string)) => ReturnType;
      toggleMarginLeft: (v: string) => ReturnType;
      unsetMarginLeft: () => ReturnType;
    };
    marginTop: {
      setMarginTop: (v: string) => ReturnType;
      toggleMarginTop: (v: string) => ReturnType;
      unsetMarginTop: () => ReturnType;
    };
    marginRight: {
      setMarginRight: (v: string) => ReturnType;
      toggleMarginRight: (v: string) => ReturnType;
      unsetMarginRight: () => ReturnType;
    };
    marginBottom: {
      setMarginBottom: (v: string) => ReturnType;
      toggleMarginBottom: (v: string) => ReturnType;
      unsetMarginBottom: () => ReturnType;
    };
    textIndent: {
      setTextIndent: (v: string) => ReturnType;
      toggleTextIndent: (v: string) => ReturnType;
      unsetTextIndent: () => ReturnType;
    };
    letterSpacing: {
      setLetterSpacing: (v: string) => ReturnType;
      toggleLetterSpacing: (v: string) => ReturnType;
      unsetLetterSpacing: () => ReturnType;
    };
  }
}

interface CreateStyleOptions {
  name: string;
  styleName?: keyof CSSStyleDeclaration;
  cssName: string;
  renderValue?: (v: any) => string;
}

function createSubTextStyle(o: CreateStyleOptions) {
  const { name, styleName = name, cssName, renderValue = (v) => v } = o;
  const fn = name.charAt(0).toUpperCase() + name.slice(1);
  return Extension.create<SubTextStylesOptions>({
    name,

    addOptions() {
      return {
        types: ['textStyle'],
        defaultUnit: '',
      };
    },

    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            [name]: {
              default: null,
              parseHTML: (element) => element.style[styleName as any]?.replace(/['"]+/g, ''),
              renderHTML: (attributes) => {
                const attr = attributes[name];
                if (!attr) {
                  return {};
                }

                return {
                  style: `${cssName}: ${renderValue(attr)}`,
                };
              },
            },
          },
        },
      ];
    },

    addCommands() {
      return {
        [`set${fn}`]:
          (value: any) =>
            ({ chain }: any) => chain()
              .setMark('textStyle', { [name]: value })
              .run(),
        [`toggle${fn}`]:
          (value: any) =>
            ({ chain, editor }: any) => {
              if (editor.isActive('textStyle', { [name]: value })) {
                return chain()
                  .setMark('textStyle', { [name]: value })
                  .run();
              }
              return chain()
                .setMark('textStyle', { [name]: null })
                .removeEmptyTextStyle()
                .run();
            },
        [`unset${fn}`]:
          () =>
            ({ chain }: any) => chain()
              .setMark('textStyle', { [name]: null })
              .removeEmptyTextStyle()
              .run(),
      } as any;
    },
  });
}

function createStyle(o: CreateStyleOptions) {
  const {
    name, styleName = name, cssName, renderValue = (v: any) => v,
  } = o;
  const fn = name.charAt(0).toUpperCase() + name.slice(1);
  return Extension.create<SubTextStylesOptions>({
    name,
    addOptions() {
      return {
        types: [],
        defaultUnit: '',
      };
    },
    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            types: this.options.types,
            attributes: {
              [name]: {
                default: null,
                parseHTML: (element: {
                  style: { [x: string]: any; };
                }) => element.style[styleName as any] || null,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                renderHTML: (attributes) => {
                  const attr = attributes[name];
                  if (!attr) {
                    return {};
                  }

                  try {
                    if (parseFloat(attributes) === 0) {
                      return {};
                    }
                  } catch (e) {
                    //
                  }
                  return `${cssName}: ${renderValue(attr)}`;
                },
              },
            },
          },
        },
      ];
    },
    addCommands() {
      return {
        [`set${fn}`]:
          (value: any) => ({ commands, editor }: CommandProps) => {
            // only for first active
            console.log('Pre A1');
            console.log(this.options.types);
            return this.options.types
              .filter((v) => editor.isActive(v))
              .some((type) => {
                let next = value;
                const last = editor.getAttributes(type)?.[name];
                console.log(`last: ${last}`);
                if (typeof value === 'function') {
                  next = value(last);
                }
                if (last === next) {
                  // may overflow or underflow
                  return false;
                }
                console.log('Pre A2');
                return commands.updateAttributes(type, { [name]: next });
              });
          },
        [`toggle${fn}`]:
          (value: any) => ({ commands, editor }: CommandProps) => {
            if (!editor.isActive({ [name]: value })) {
              // eslint-disable-next-line vue/max-len
              return this.options.types.some((type) => commands.updateAttributes(type, { [name]: value }));
            }
            return this.options.types.some((type) => commands.resetAttributes(type, name));
          },
        [`unset${fn}`]:
        // eslint-disable-next-line vue/max-len
          () => ({ commands }: CommandProps) => this.options.types.some((type) => commands.resetAttributes(type, name)),
      };
    },
  });
}

export const LineHeight = createSubTextStyle({
  name: 'lineHeight',
  cssName: 'line-height',
});

const renderNumberToPx = (v: string) => (/^\d+$/.test(String(v)) ? `${v}px` : v);

export const FontSize = createSubTextStyle({
  name: 'fontSize',
  cssName: 'font-size',
  renderValue: renderNumberToPx,
});
export const MarginLeft = createStyle({
  name: 'marginLeft',
  cssName: 'margin-left',
  renderValue: renderNumberToPx,
});
export const MarginTop = createStyle({
  name: 'marginTop',
  cssName: 'margin-top',
  renderValue: renderNumberToPx,
});
export const MarginRight = createStyle({
  name: 'marginRight',
  cssName: 'margin-right',
  renderValue: renderNumberToPx,
});
export const MarginBottom = createStyle({
  name: 'marginBottom',
  cssName: 'margin-bottom',
  renderValue: renderNumberToPx,
});

export const TextIndent = createSubTextStyle({
  name: 'textIndent',
  cssName: 'text-indent',
  renderValue: renderNumberToPx,
});
export const LetterSpacing = createSubTextStyle({
  name: 'letterSpacing',
  cssName: 'letter-spacing',
  renderValue: renderNumberToPx,
});

export const BlockStyles = [MarginLeft, MarginRight, MarginTop, MarginBottom];
export const TextFormats = [LetterSpacing, LineHeight, FontSize];
