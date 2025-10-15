"use client";

import React, { useEffect } from "react";

export function FloatingAssistant() {
  useEffect(() => {
    // Evita volver a añadir el script si ya existe
    if (document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      const container = document.getElementById('agata-widget-container');
      const message = document.getElementById('agata-message');

      if (!container || !message) return;
      
      // Crear y añadir el widget
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_4201k7hxveqgf0zbet4c8zd1sn8a');
      container.appendChild(widget);

      // Si en 5 segundos no se muestra el widget, dejamos el mensaje visible
      setTimeout(() => {
        const isVisible = widget.shadowRoot && widget.shadowRoot.innerHTML.length > 0;
        if (isVisible) {
          if(message) message.style.display = "none";
        } else {
          if(message) message.style.display = "flex";
          widget.remove(); // Limpiar el widget si no cargó
        }
      }, 5000);
    };

    script.onerror = () => {
      const message = document.getElementById('agata-message');
      if (message) {
        message.style.display = "flex";
      }
    };

    document.body.appendChild(script);

  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <div id="agata-widget-container"></div>
      <div id="agata-message" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px',
          fontFamily: "'Segoe UI', sans-serif",
          color: '#444',
          background: '#eef3f9',
          padding: '20px',
          borderRadius: '12px',
          maxWidth: '300px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
        <strong>🌐 Ágata está en actualización</strong>
        <span style={{textAlign: 'center'}}>Pronto volverá para ofrecerte un mejor servicio 💬</span>
      </div>
    </div>
  );
}
