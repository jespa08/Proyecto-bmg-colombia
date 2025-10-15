"use client";

import React, { useEffect, useRef } from "react";

export function FloatingAssistant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    if (!containerRef.current || !messageRef.current) return;

    const container = containerRef.current;
    const message = messageRef.current;

    const script = document.createElement("script");
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
      };

      container.addEventListener('click', handleInteraction);
      container.addEventListener('keypress', handleInteraction);

      const intervalId = setInterval(() => {
        const widgetElement = container.querySelector('elevenlabs-convai');
        const isBroken =
          !widgetElement ||
          (widgetElement.shadowRoot && widgetElement.shadowRoot.innerHTML.includes('error'));

        if (hasInteracted && isBroken) {
          message.style.display = 'flex';
          widgetElement?.remove();
        }
      }, 5000);

      // Clean up on component unmount
      return () => {
        container.removeEventListener('click', handleInteraction);
        container.removeEventListener('keypress', handleInteraction);
        clearInterval(intervalId);
        script.remove();
        widget.remove();
      };
    };

    script.onerror = () => {
      if (message) {
        message.style.display = "flex";
      }
    };

    document.body.appendChild(script);
    
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
          }}>
          💫 Ágata está recargando energía para atenderte mejor.<br/>
          Próximamente estará disponible.
        </div>
    </div>
  );
}
