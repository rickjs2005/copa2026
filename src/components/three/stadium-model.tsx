"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { IconicStadium } from "@/data/iconic-stadiums";

/** Textura do gramado desenhada em canvas — nenhum asset externo. */
function usePitchTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 340;
    const ctx = c.getContext("2d")!;
    // faixas de grama
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? "#136c33" : "#0f5c2b";
      ctx.fillRect((c.width / 8) * i, 0, c.width / 8, c.height);
    }
    // linhas
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 4;
    ctx.strokeRect(14, 14, c.width - 28, c.height - 28);
    ctx.beginPath();
    ctx.moveTo(c.width / 2, 14);
    ctx.lineTo(c.width / 2, c.height - 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(c.width / 2, c.height / 2, 46, 0, Math.PI * 2);
    ctx.stroke();
    // áreas
    ctx.strokeRect(14, c.height / 2 - 80, 70, 160);
    ctx.strokeRect(c.width - 84, c.height / 2 - 80, 70, 160);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/** Perfil da arquibancada (lathe) a partir dos params. */
function useBowlGeometry(height: number, flare: number) {
  return useMemo(() => {
    const r0 = 4.6; // borda interna
    const w = 2.6; // profundidade da arquibancada
    const top = r0 + w * (1 + flare * 0.6);
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(r0, 0.02),
      new THREE.Vector2(r0, 0.42),
      new THREE.Vector2(r0 + w * 0.45, height * 0.55),
      new THREE.Vector2(top, height),
      new THREE.Vector2(top + 0.32, height),
      new THREE.Vector2(r0 + w + 0.5, 0.02),
    ];
    const geo = new THREE.LatheGeometry(pts, 96);
    geo.computeVertexNormals();
    return geo;
  }, [height, flare]);
}

export function StadiumModel({ stadium }: { stadium: IconicStadium }) {
  const { params } = stadium;
  const pitch = usePitchTexture();
  const bowl = useBowlGeometry(params.height, params.flare);

  const sx = params.rx / 7;
  const sz = params.rz / 7;
  const topY = params.height;
  const outerR = 4.6 + 2.6 * (1 + params.flare * 0.6);

  const bowlMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: params.bowlColor,
        roughness: params.metal ? 0.35 : 0.85,
        metalness: params.metal ? 0.7 : 0.05,
        side: THREE.DoubleSide,
      }),
    [params.bowlColor, params.metal]
  );

  return (
    <group>
      {/* gramado */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[7.4 * sx, 5 * sz]} />
        <meshStandardMaterial map={pitch} roughness={1} />
      </mesh>

      {/* anel de arquibancadas */}
      <mesh geometry={bowl} material={bowlMat} scale={[sx, 1, sz]} castShadow receiveShadow />

      {/* brilho do evento: banda emissiva interna */}
      <mesh position={[0, topY * 0.55, 0]} scale={[sx, 1, sz]}>
        <cylinderGeometry args={[4.62, 4.62, 0.18, 96, 1, true]} />
        <meshStandardMaterial
          color={params.accentColor}
          emissive={params.accentColor}
          emissiveIntensity={params.glow * 2}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* cobertura */}
      {params.roof === "ring" && (
        <mesh position={[0, topY + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[sx, sz, 1]}>
          <ringGeometry args={[4.2, outerR + 0.35, 96]} />
          <meshStandardMaterial color={params.roofColor} roughness={0.6} metalness={params.metal ? 0.5 : 0.1} side={THREE.DoubleSide} />
        </mesh>
      )}

      {params.roof === "shell" && (
        <mesh position={[0, topY + 0.05, 0]} scale={[sx, 1, sz]}>
          <cylinderGeometry args={[outerR + 0.4, 4.3, 0.5, 96, 1, true]} />
          <meshStandardMaterial color={params.roofColor} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {params.roof === "crown" && (
        <mesh position={[0, topY + 0.22, 0]} scale={[sx, 1, sz]}>
          <torusGeometry args={[outerR - 0.4, 0.22, 12, 96]} />
          <meshStandardMaterial
            color={params.roofColor}
            roughness={0.25}
            metalness={0.85}
            emissive={params.roofColor}
            emissiveIntensity={0.25}
          />
        </mesh>
      )}

      {params.roof === "arch" && (
        <group rotation={[0, 0, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[outerR * sx * 1.06, 0.16, 12, 64, Math.PI]} />
            <meshStandardMaterial
              color={params.roofColor}
              roughness={0.35}
              metalness={0.6}
              emissive={params.accentColor}
              emissiveIntensity={0.15}
            />
          </mesh>
          <mesh position={[0, topY + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[sx, sz, 1]}>
            <ringGeometry args={[4.2, outerR + 0.3, 96]} />
            <meshStandardMaterial color={params.roofColor} roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* torres de iluminação nos estádios abertos */}
      {(params.roof === "open" || params.roof === "shell") &&
        [45, 135, 225, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = Math.cos(rad) * (outerR + 1.1) * sx;
          const z = Math.sin(rad) * (outerR + 1.1) * sz;
          const h = topY + 2.4;
          return (
            <group key={deg} position={[x, 0, z]}>
              <mesh position={[0, h / 2, 0]}>
                <cylinderGeometry args={[0.06, 0.09, h, 8]} />
                <meshStandardMaterial color="#5b6068" roughness={0.6} metalness={0.4} />
              </mesh>
              <mesh position={[0, h + 0.25, 0]} rotation={[0, -rad + Math.PI / 2, 0]}>
                <boxGeometry args={[0.9, 0.5, 0.12]} />
                <meshStandardMaterial
                  color="#e8f4ff"
                  emissive="#dbefff"
                  emissiveIntensity={2.2}
                  toneMapped={false}
                />
              </mesh>
            </group>
          );
        })}
    </group>
  );
}
