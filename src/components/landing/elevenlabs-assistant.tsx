"use client";

import React, { useEffect } from "react";

export function ElevenLabsAssistant() {
  useEffect(() => {
    // Inserts the ElevenLabs widget script when the component mounts
    if (document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Optional: Cleanup the script when the component unmounts
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6">
       <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Asistente Virtual
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Habla con nuestro asistente virtual para conocer más sobre el proyecto.
        </p>

        {/* ElevenLabs Assistant Widget */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <elevenlabs-convai agent-id="agent_4201k7hxveqgf0zbet4c8zd1sn8a"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
}
