export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] noise-bg mix-blend-overlay"></div>
  );
}

export function GridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#E9ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E9ECEF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
  );
}

export function AnimatedBackgroundGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[100px]"></div>
    </div>
  );
}
