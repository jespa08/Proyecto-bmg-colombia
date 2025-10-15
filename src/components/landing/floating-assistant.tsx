"use client";

import React, { useEffect } from "react";

export function FloatingAssistant() {
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
      // Also remove the widget itself
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <elevenlabs-convai agent-id="agent_4201k7hxveqgf0zbet4c8zd1sn8a"></elevenlabs-convai>
    </div>
  );
}
