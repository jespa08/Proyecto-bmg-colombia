"use client";

import React, { useEffect, useRef } from "react";

export function FloatingAssistant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const container = containerRef.current;
    const message = messageRef.current;

    if (!container || !message) return;

    const loadAgata = () => {
      const oldWidget = document.querySelector('elevenlabs-convai');
      if (oldWidget) {
        oldWidget.remove();
      }

      const script = document.createElement('script');
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
        if (!containerRef.current) return;

        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'agent_4201k7hxveqgf0zbet4c8zd1sn8a');
        containerRef.current.appendChild(widget);

        setTimeout(() => {
            try {
              const isOk = widget.shadowRoot && widget.shadowRoot.innerHTML.length > 0;
              if (isOk) {
                if(messageRef.current) messageRef.current.style.display = 'none';
              } else {
                if(messageRef.current) messageRef.current.style.display = 'flex';
              }
            } catch (err) {
              if(messageRef.current) messageRef.current.style.display = 'flex';
            }
        }, 5000);
      };
      
      script.onerror = () => {
        if(messageRef.current) messageRef.current.style.display = 'flex';
      };

      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    loadAgata();

  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000, textAlign: 'center' }}>
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
