"use client";

import React, { useEffect, useState } from "react";

export function FloatingAssistant() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Evita volver a añadir el script si ya existe
    if (document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      // En un escenario real, podríamos mostrar un estado de error al usuario
      console.error("No fue posible conectar con el asistente. Intenta más tarde.");
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        // No lo removemos para que no desaparezca al cambiar de página
      }
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        // No lo removemos para que persista
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {isLoaded && <elevenlabs-convai agent-id="agent_4201k7hxveqgf0zbet4c8zd1sn8a"></elevenlabs-convai>}
    </div>
  );
}
