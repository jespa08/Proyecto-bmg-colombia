"use client";

import React, { useEffect, useState } from "react";

export function FloatingAssistant() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    /*
      =========================================================================================
      NOTA IMPORTANTE: El agente de ElevenLabs ha sido deshabilitado temporalmente.
      =========================================================================================
      
      El widget está mostrando un error persistente: 
      "[ConversationalAI] Disconnected due to an error: 'The AI agent you are trying to reach appears to be misconfigured'".

      Este error indica un problema de CONFIGURACIÓN en la plataforma de ElevenLabs, no en el código de esta aplicación.
      
      Para solucionarlo, debes:
      1. Iniciar sesión en tu cuenta de ElevenLabs.
      2. Navegar a la configuración de tu agente de voz conversacional (ID: agent_4201k7hxveqgf0zbet4c8zd1sn8a).
      3. Asegurarte de que el agente esté completamente configurado, publicado y activado.

      Una vez que hayas verificado y corregido la configuración en ElevenLabs, puedes descomentar
      el siguiente bloque de código para reactivar el asistente en la página.
      
      =========================================================================================
    */

    /*
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
      console.error("No fue posible conectar con el asistente. El script de ElevenLabs no se pudo cargar.");
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript && existingScript.parentElement) {
        // Opcional: Limpiar el script al desmontar, aunque para un widget flotante puede que no sea necesario.
        // existingScript.parentElement.removeChild(existingScript);
      }
      const widget = document.querySelector('elevenlabs-convai');
      if (widget && widget.parentElement) {
        // widget.parentElement.removeChild(widget);
      }
    };
    */
  }, []);

  // No se renderiza nada hasta que se solucione la configuración externa y se reactive el código.
  if (!isLoaded) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {/*
        <elevenlabs-convai agent-id="agent_4201k7hxveqgf0zbet4c8zd1sn8a"></elevenlabs-convai>
        */}
    </div>
  );
}
