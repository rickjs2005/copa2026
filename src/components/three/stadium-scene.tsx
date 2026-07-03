"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Stars } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { StadiumModel } from "./stadium-model";
import type { IconicStadium } from "@/data/iconic-stadiums";

/** Respiração sutil de câmera no modo cinema (só transform — suave p/ gravação). */
function CinemaRig({ enabled }: { enabled: boolean }) {
  const t = useRef(0);
  useFrame((state, delta) => {
    if (!enabled) return;
    t.current += delta;
    const breathe = Math.sin(t.current * 0.25) * 0.6;
    state.camera.position.y = 5.2 + breathe;
    state.camera.lookAt(0, 0.8, 0);
  });
  return null;
}

export function StadiumScene({
  stadium,
  cinema,
  active = true,
}: {
  stadium: IconicStadium;
  cinema: boolean;
  /** Pausa o render fora da viewport / aba oculta ("never" congela o frameloop). */
  active?: boolean;
}) {
  const controls = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas
      // "always" quando ativo por causa do autoRotate + damping contínuos
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [10.5, 5.2, 11.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      aria-label={`Modelo 3D estilizado do ${stadium.name}`}
      role="img"
    >
      <color attach="background" args={["#0b0d10"]} />
      <fog attach="fog" args={["#0b0d10", 18, 42]} />

      <hemisphereLight args={["#3a4a5c", "#0c0e11", 0.9]} />
      <directionalLight position={[8, 12, 6]} intensity={1.4} color="#dce8ff" />
      <directionalLight position={[-10, 6, -8]} intensity={0.35} color={stadium.params.accentColor} />

      <Suspense fallback={null}>
        <StadiumModel key={stadium.slug} stadium={stadium} />
        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={30} blur={2.4} far={4} resolution={512} frames={1} />
      </Suspense>

      <Stars radius={60} depth={40} count={1600} factor={3} saturation={0} fade speed={0.4} />

      {/* piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[26, 64]} />
        <meshStandardMaterial color="#0e1114" roughness={1} />
      </mesh>

      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        autoRotate
        autoRotateSpeed={cinema ? 0.55 : 1.1}
        minDistance={7}
        maxDistance={22}
        minPolarAngle={0.35}
        maxPolarAngle={1.42}
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.06}
      />
      <CinemaRig enabled={cinema} />
    </Canvas>
  );
}
