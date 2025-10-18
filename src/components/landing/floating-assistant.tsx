"use client";

import React, { useEffect, useRef, useCallback } from "react";

export function FloatingAssistant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showTemporaryMessageRef = useRef<() => void>();
  const loadAgataRef = useRef<() => void>();

  const showTemporaryMessage = useCallback(() => {
    const message = messageRef.current;
    if (message) {
      message.style.display = 'flex';
      setTimeout(() => {
        message.style.display = 'none';
        loadAgataRef.current?.();
      }, 8000);
    }
  }, []);

  const loadAgata = useCallback(() => {
    if (!containerRef.current) return;

    const oldWidget = containerRef.current.querySelector('elevenlabs-convai');
    if (oldWidget) {
      oldWidget.remove();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
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

      let hasInteracted = false;

      const handleInteraction = () => {
        hasInteracted = true;
        containerRef.current?.removeEventListener('click', handleInteraction);
        containerRef.current?.removeEventListener('keypress', handleInteraction);
      };

      containerRef.current.addEventListener('click', handleInteraction);
      containerRef.current.addEventListener('keypress', handleInteraction);

      intervalRef.current = setInterval(() => {
        const widgetElement = containerRef.current?.querySelector('elevenlabs-convai');
        const isBroken =
          !widgetElement ||
          (widgetElement.shadowRoot && widgetElement.shadowRoot.innerHTML.includes('error'));

        if (hasInteracted && isBroken) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            showTemporaryMessageRef.current?.();
        }
      }, 5000);
    };

    script.onerror = () => {
      showTemporaryMessageRef.current?.();
    };

    document.body.appendChild(script);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    showTemporaryMessageRef.current = showTemporaryMessage;
    loadAgataRef.current = loadAgata;
  }, [showTemporaryMessage, loadAgata]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    loadAgata();
  }, [loadAgata]);

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
