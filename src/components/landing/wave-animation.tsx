export function WaveAnimation() {
    return (
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
            <div
            className="absolute top-0 left-0 w-[200%] h-full flex"
            style={{
                animation: "wave-scroll 20s linear infinite",
            }}
            >
            <div
                className="w-1/2 h-full bg-contain bg-no-repeat bg-left-top"
                style={{
                backgroundImage:
                    "radial-gradient(ellipse 50% 80% at 30% 50%, hsl(var(--primary) / 0.2), transparent)",
                }}
            ></div>
            <div
                className="w-1/2 h-full bg-contain bg-no-repeat bg-right-bottom"
                style={{
                backgroundImage:
                    "radial-gradient(ellipse 50% 80% at 70% 50%, hsl(var(--primary) / 0.2), transparent)",
                }}
            ></div>
            </div>
            <div
            className="absolute top-0 left-0 w-[200%] h-full flex"
            style={{
                animation: "wave-scroll 25s linear infinite reverse",
            }}
            >
            <div
                className="w-1/2 h-full bg-contain bg-no-repeat bg-center-top"
                style={{
                backgroundImage:
                    "radial-gradient(ellipse 60% 70% at 20% 60%, hsl(var(--accent) / 0.15), transparent)",
                }}
            ></div>
            <div
                className="w-1/2 h-full bg-contain bg-no-repeat bg-center-bottom"
                style={{
                backgroundImage:
                    "radial-gradient(ellipse 60% 70% at 80% 40%, hsl(var(--accent) / 0.15), transparent)",
                }}
            ></div>
            </div>
        </div>
    )
}
