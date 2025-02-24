import { RefObject, useEffect } from 'react';

interface UniversalKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  ref: RefObject<HTMLElement> | null;
}

interface KeyboardShortcut {
  key: string;
  action: () => void;
}

const useUniversalKeyboardShortcuts = ({
  shortcuts,
  ref,
}: UniversalKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey, ctrlKey, altKey } = event;

      const shortcut = shortcuts.find(
        ({ key: shortcutKey }) =>
          shortcutKey === key &&
          shiftKey === false &&
          ctrlKey === false &&
          altKey === false,
      );

      if (shortcut) {
        event.preventDefault();
        event.stopPropagation();
        shortcut.action();
      }
    };

    const node = ref?.current;
    if (!node) return;

    node.addEventListener('keydown', handleKeyDown);

    return () => {
      node.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, ref]);
};

export default useUniversalKeyboardShortcuts;
