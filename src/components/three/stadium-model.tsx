"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { IconicStadium, Landmark, StadiumParams } from "@/data/iconic-stadiums";

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

/** Converte o perfil [raio, y][] em pontos de lathe — com Catmull-Rom opcional. */
function profileToPoints(profile: StadiumParams["profile"], smooth?: boolean): THREE.Vector2[] {
  if (!smooth) return profile.map(([r, y]) => new THREE.Vector2(r, y));
  const curve = new THREE.CatmullRomCurve3(profile.map(([r, y]) => new THREE.Vector3(r, y, 0)));
  return curve.getPoints(28).map((p) => new THREE.Vector2(p.x, p.y));
}

/** Bowl principal: lathe do perfil próprio do estádio. */
function useBowlGeometry(params: StadiumParams) {
  return useMemo(() => {
    const geo = new THREE.LatheGeometry(profileToPoints(params.profile, params.smooth), 80);
    geo.computeVertexNormals();
    return geo;
  }, [params]);
}

/* ============================================================
 * Marcos únicos por estádio
 * ============================================================ */

/** Centenário — torre Art Déco: caixas empilhadas afinando + topo emissivo. */
function DecoTower({
  landmark,
  x,
}: {
  landmark: Extract<Landmark, { kind: "deco-tower" }>;
  x: number;
}) {
  // proporções relativas somam 2.5; escala para a altura pedida
  const s = landmark.height / 2.5;
  const levels = [
    { w: 1.15, h: 0.85 },
    { w: 0.88, h: 0.65 },
    { w: 0.64, h: 0.55 },
    { w: 0.44, h: 0.45 },
  ];
  let y = 0;
  const stack = levels.map((lv) => {
    const cy = y + (lv.h * s) / 2;
    y += lv.h * s;
    return { ...lv, cy };
  });
  return (
    <group position={[x, 0, 0]}>
      {stack.map((lv, i) => (
        <mesh key={i} position={[0, lv.cy, 0]} castShadow>
          <boxGeometry args={[lv.w * s, lv.h * s, lv.w * s * 0.82]} />
          <meshStandardMaterial color={landmark.color} roughness={0.9} />
        </mesh>
      ))}
      {/* asas laterais na base — detalhe déco */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.72 * s, 0.28 * s, 0]}>
          <boxGeometry args={[0.3 * s, 0.56 * s, 0.5 * s]} />
          <meshStandardMaterial color={landmark.color} roughness={0.9} />
        </mesh>
      ))}
      {/* coroamento emissivo */}
      <mesh position={[0, landmark.height + 0.1 * s, 0]}>
        <boxGeometry args={[0.26 * s, 0.2 * s, 0.24 * s]} />
        <meshStandardMaterial
          color={landmark.tipColor}
          emissive={landmark.tipColor}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** Maracanã — anel de cobertura branco plano sobressaindo p/ dentro + assentos azuis. */
function FlatRing({
  landmark,
  sx,
  sz,
}: {
  landmark: Extract<Landmark, { kind: "flat-ring" }>;
  sx: number;
  sz: number;
}) {
  const { seatBand } = landmark;
  return (
    <group>
      <mesh position={[0, landmark.y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[sx, sz, 1]}>
        <ringGeometry args={[landmark.inner, landmark.outer, 80]} />
        <meshStandardMaterial color={landmark.color} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
      {/* borda fina do anel — dá espessura na silhueta */}
      <mesh position={[0, landmark.y - 0.05, 0]} scale={[sx, 1, sz]}>
        <cylinderGeometry args={[landmark.outer, landmark.outer, 0.1, 80, 1, true]} />
        <meshStandardMaterial color={landmark.color} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
      {/* banda de assentos azul acompanhando a inclinação */}
      <mesh position={[0, seatBand.y, 0]} scale={[sx, 1, sz]}>
        <cylinderGeometry args={[seatBand.top, seatBand.bottom, seatBand.height, 80, 1, true]} />
        <meshStandardMaterial color={seatBand.color} roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Wembley — arco gigante inclinado atravessando por cima + anel de cobertura discreto. */
function GiantArch({
  landmark,
  topY,
  innerR,
  outerR,
  sx,
  sz,
}: {
  landmark: Extract<Landmark, { kind: "arch" }>;
  topY: number;
  innerR: number;
  outerR: number;
  sx: number;
  sz: number;
}) {
  const half = landmark.arc / 2;
  // centro do torus abaixo do chão p/ as pontas do arco tocarem y=0
  const yOffset = -landmark.radius * Math.cos(half);
  return (
    <group>
      <group rotation={[THREE.MathUtils.degToRad(landmark.tiltDeg), 0, 0]}>
        <mesh position={[0, yOffset, 0]} rotation={[0, 0, Math.PI / 2 - half]}>
          <torusGeometry args={[landmark.radius, landmark.tube, 10, 60, landmark.arc]} />
          <meshStandardMaterial
            color={landmark.color}
            roughness={0.35}
            metalness={0.6}
            emissive={landmark.emissive}
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
      <mesh position={[0, topY + 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[sx, sz, 1]}>
        <ringGeometry args={[innerR - 0.4, outerR + 0.25, 80]} />
        <meshStandardMaterial color={landmark.ringColor} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Azteca — canopy inclinada pendurada sobre as arquibancadas. */
function HangingCanopy({
  landmark,
  sx,
  sz,
}: {
  landmark: Extract<Landmark, { kind: "hanging-canopy" }>;
  sx: number;
  sz: number;
}) {
  return (
    <mesh position={[0, landmark.y, 0]} scale={[sx, 1, sz]}>
      <cylinderGeometry
        args={[landmark.topRadius, landmark.bottomRadius, landmark.height, 80, 1, true]}
      />
      <meshStandardMaterial color={landmark.color} roughness={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Rose Bowl — torres de luz finas ao redor do anfiteatro aberto. */
function LightTowers({
  landmark,
  sx,
  sz,
}: {
  landmark: Extract<Landmark, { kind: "light-towers" }>;
  sx: number;
  sz: number;
}) {
  return (
    <group>
      {Array.from({ length: landmark.count }, (_, i) => {
        const rad = ((i / landmark.count) * 360 + 30) * (Math.PI / 180);
        const x = Math.cos(rad) * landmark.radius * sx;
        const z = Math.sin(rad) * landmark.radius * sz;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, landmark.height / 2, 0]}>
              <cylinderGeometry args={[0.035, 0.06, landmark.height, 8]} />
              <meshStandardMaterial color="#5b6068" roughness={0.6} metalness={0.4} />
            </mesh>
            <mesh position={[0, landmark.height + 0.16, 0]} rotation={[0, -rad + Math.PI / 2, 0]}>
              <boxGeometry args={[0.62, 0.3, 0.1]} />
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

/** Soccer City — casca da cabaça em anéis horizontais de cores alternadas (mosaico). */
function CalabashRings({
  params,
  landmark,
  sx,
  sz,
}: {
  params: StadiumParams;
  landmark: Extract<Landmark, { kind: "calabash-rings" }>;
  sx: number;
  sz: number;
}) {
  const bands = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      params.profile.map(([r, y]) => new THREE.Vector3(r, y, 0))
    );
    const samples = curve.getPoints(landmark.bands);
    return samples.slice(0, -1).map((p, i) => {
      const q = samples[i + 1];
      const geo = new THREE.LatheGeometry(
        [new THREE.Vector2(p.x, p.y), new THREE.Vector2(q.x, q.y)],
        64
      );
      geo.computeVertexNormals();
      return { geo, color: landmark.colors[i % landmark.colors.length] };
    });
  }, [params, landmark]);

  return (
    <group scale={[sx, 1, sz]}>
      {bands.map((b, i) => (
        <mesh key={i} geometry={b.geo} castShadow receiveShadow>
          <meshStandardMaterial color={b.color} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/** Lusail — coroa luminosa dourada no topo. */
function Crown({
  landmark,
  sx,
  sz,
}: {
  landmark: Extract<Landmark, { kind: "crown" }>;
  sx: number;
  sz: number;
}) {
  return (
    <group>
      <mesh position={[0, landmark.y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[sx, sz, 1]}>
        <torusGeometry args={[landmark.radius, 0.14, 10, 80]} />
        <meshStandardMaterial
          color={landmark.color}
          roughness={0.2}
          metalness={0.9}
          emissive={landmark.color}
          emissiveIntensity={landmark.intensity}
          toneMapped={false}
        />
      </mesh>
      {/* filete secundário — reforça a leitura de joia */}
      <mesh position={[0, landmark.y - 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[sx, sz, 1]}>
        <torusGeometry args={[landmark.radius - 0.35, 0.05, 8, 80]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.color}
          emissiveIntensity={landmark.intensity * 0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** MetLife — anel de lâminas verticais de aço com frestas (InstancedMesh) + topo plano. */
function SteelBlades({
  landmark,
  sx,
  sz,
}: {
  landmark: Extract<Landmark, { kind: "steel-blades" }>;
  sx: number;
  sz: number;
}) {
  const blades = useMemo(() => {
    const geo = new THREE.BoxGeometry(landmark.width, landmark.height, 0.07);
    const mat = new THREE.MeshStandardMaterial({
      color: landmark.color,
      roughness: 0.3,
      metalness: 0.85,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, landmark.count);
    const m = new THREE.Matrix4();
    for (let i = 0; i < landmark.count; i++) {
      const a = (i / landmark.count) * Math.PI * 2;
      // lado fino da lâmina apontando p/ o centro (aprox. radial na elipse)
      m.makeRotationY(Math.PI / 2 - a);
      m.setPosition(
        Math.cos(a) * landmark.radius * sx,
        landmark.height / 2,
        Math.sin(a) * landmark.radius * sz
      );
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    return mesh;
  }, [landmark, sx, sz]);

  return (
    <group>
      <primitive object={blades} />
      {/* topo plano tecnológico */}
      <mesh
        position={[0, landmark.height, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[sx, sz, 1]}
      >
        <ringGeometry args={[landmark.radius - 0.5, landmark.radius + 0.35, 80]} />
        <meshStandardMaterial
          color={landmark.topRingColor}
          roughness={0.4}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
 * Modelo principal
 * ============================================================ */

export function StadiumModel({ stadium }: { stadium: IconicStadium }) {
  const { params } = stadium;
  const pitch = usePitchTexture();
  const bowl = useBowlGeometry(params);

  const { sx, sz, landmark } = params;
  const innerR = params.profile[0][0];
  const outerR = Math.max(...params.profile.map(([r]) => r));
  const topY = Math.max(...params.profile.map(([, y]) => y));

  const bowlMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: params.bowlColor,
        roughness: params.roughness,
        metalness: params.metalness,
        side: THREE.DoubleSide,
      }),
    [params.bowlColor, params.roughness, params.metalness]
  );

  return (
    <group>
      {/* gramado */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[7.4 * sx, 5 * sz]} />
        <meshStandardMaterial map={pitch} roughness={1} />
      </mesh>

      {/* bowl — na cabaça, a casca vira anéis coloridos (mosaico) */}
      {landmark.kind === "calabash-rings" ? (
        <CalabashRings params={params} landmark={landmark} sx={sx} sz={sz} />
      ) : (
        <mesh geometry={bowl} material={bowlMat} scale={[sx, 1, sz]} castShadow receiveShadow />
      )}

      {/* brilho do evento: banda emissiva interna */}
      <mesh position={[0, params.glowY, 0]} scale={[sx, 1, sz]}>
        <cylinderGeometry args={[params.glowR, params.glowR, 0.18, 80, 1, true]} />
        <meshStandardMaterial
          color={params.accentColor}
          emissive={params.accentColor}
          emissiveIntensity={params.glow * 2}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* marco único do estádio */}
      {landmark.kind === "deco-tower" && (
        <DecoTower landmark={landmark} x={-(outerR + 0.9) * sx} />
      )}
      {landmark.kind === "flat-ring" && <FlatRing landmark={landmark} sx={sx} sz={sz} />}
      {landmark.kind === "arch" && (
        <GiantArch landmark={landmark} topY={topY} innerR={innerR} outerR={outerR} sx={sx} sz={sz} />
      )}
      {landmark.kind === "hanging-canopy" && <HangingCanopy landmark={landmark} sx={sx} sz={sz} />}
      {landmark.kind === "light-towers" && <LightTowers landmark={landmark} sx={sx} sz={sz} />}
      {landmark.kind === "crown" && <Crown landmark={landmark} sx={sx} sz={sz} />}
      {landmark.kind === "steel-blades" && <SteelBlades landmark={landmark} sx={sx} sz={sz} />}
    </group>
  );
}
