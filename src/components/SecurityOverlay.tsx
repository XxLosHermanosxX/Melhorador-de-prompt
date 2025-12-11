"use client";

import React, { useEffect } from 'react';

const SecurityOverlay = () => {
  useEffect(() => {
    // Desabilita o botão direito (menu de contexto)
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    // Tenta desabilitar a inspeção de elementos (F12, Ctrl+Shift+I, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'F12') || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
        (e.ctrlKey && e.key === 'U') // Ctrl+U (view source)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Este componente não renderiza nada visível
};

export default SecurityOverlay;