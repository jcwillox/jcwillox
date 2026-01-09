import { useQuery } from "@tanstack/react-query";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "@/config/particlesConfig.ts";

export const ParticlesBackground = () => {
  const { isLoading } = useQuery({
    queryKey: ["ts-particles-options"],
    queryFn: async () => {
      await initParticlesEngine(loadSlim);
      return true;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return isLoading ? null : (
    <div className="absolute inset-0 -z-1">
      <Particles id="tsparticles" options={particlesOptions} />
    </div>
  );
};
