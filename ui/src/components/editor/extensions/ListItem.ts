// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ListItem from '@tiptap/extension-list-item';

// Prevent navigation to other elements when pressing Tab.
export const ListItemNoTabNav = ListItem.extend({
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Tab: () => {
        this.editor.commands.sinkListItem(this.name);
        return true;
      },
      'Shift-Tab': () => {
        this.editor.commands.liftListItem(this.name);
        return true;
      },
    };
  },
});
