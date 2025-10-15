"use client";

import React, { useEffect, useRef } from "react";

export function FloatingAssistant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current || !messageRef.current) return;
    initialized.current = true;

    const container = containerRef.current;
    const message = messageRef.current;
    let interactionCheckInterval: NodeJS.Timeout;

    const showTemporaryMessage = () => {
      message.style.display = 'flex';
      setTimeout(() => {
        message.style.display = 'none';
        loadAgata(); // Reintenta cargar Ágata automáticamente
      }, 8000);
    };

    const loadAgata = () => {
      // Limpiar intervalo anterior si existe
      if (interactionCheckInterval) {
        clearInterval(interactionCheckInterval);
      }

      // Eliminar widget anterior si existía
      const oldWidget = container.querySelector('elevenlabs-convai');
      if (oldWidget) {
        oldWidget.remove();
      }

      // Cargar el script del widget de ElevenLabs
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'agent_4201k7hxveqgf0zbet4c8zd1sn8a');
        container.appendChild(widget);

        let hasInteracted = false;

        const handleInteraction = () => {
            hasInteracted = true;
            // Una vez que hay interacción, ya no necesitamos escuchar
            container.removeEventListener('click', handleInteraction);
            container.removeEventListener('keypress', handleInteraction);
        };
        
        container.addEventListener('click', handleInteraction);
        container.addEventListener('keypress', handleInteraction);
        
        interactionCheckInterval = setInterval(() => {
            const widgetElement = container.querySelector('elevenlabs-convai');
            const isBroken =
              !widgetElement ||
              (widgetElement.shadowRoot && widgetElement.shadowRoot.innerHTML.includes('error'));

            if (hasInteracted && isBroken) {
              // Limpiamos el intervalo actual para evitar múltiples llamadas
              clearInterval(interactionCheckInterval);
              showTemporaryMessage();
            }
        }, 5000);
      };
      
      script.onerror = () => {
        showTemporaryMessage();
      };

      document.body.appendChild(script);

      // Limpieza al desmontar el componente
      return () => {
        if (interactionCheckInterval) clearInterval(interactionCheckInterval);
        document.body.removeChild(script);
      };
    };

    loadAgata();

  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, textAlign: 'center' }}>
      <div ref={messageRef} style={{
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        fontFamily: "'Segoe UI', sans-serif",
        color: '#444',
        background: '#eef3f9',
        padding: '20px',
        borderRadius: '12px',
        width: '320px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'all 0.5s ease',
      }}>
        💫 Ágata está recargando energía para atenderte mejor.<br/>
        Próximamente estará disponible.
      </div>
    </div>
  );
}
