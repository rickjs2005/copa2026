"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { BowlPoint, IconicStadium, Landmark, StadiumParams } from "@/data/iconic-stadiums";

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

/**
 * Casca/fachada externa do estádio.
 * - Perfis `smooth` (Lusail): a concha inteira é a fachada — lathe completa.
 * - Demais: só o trecho do ápice em diante (topo + parede externa), porque a
 *   superfície interna lisa foi substituída pelas arquibancadas em degraus.
 */
function useShellGeometry(params: StadiumParams) {
  return useMemo(() => {
    let pts: THREE.Vector2[];
    if (params.smooth) {
      pts = profileToPoints(params.profile, true);
    } else {
      const topY = Math.max(...params.profile.map(([, y]) => y));
      const apex = params.profile.findIndex(([, y]) => y === topY);
      pts = params.profile.slice(apex).map(([r, y]) => new THREE.Vector2(r, y));
    }
    const geo = new THREE.LatheGeometry(pts, 80);
    geo.computeVertexNormals();
    return geo;
  }, [params]);
}

/* ============================================================
 * Arquibancadas em degraus + torcida
 * ============================================================ */

const STAND_SEGMENTS = 72;
const CROWD_CAP = 2000;

/** PRNG determinístico (mulberry32) — nada de Math.random p/ não quebrar hidratação. */
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash FNV-1a do slug → seed estável por estádio. */
function hashSlug(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Amostra o envelope (polilinha [r,y]) em `rows`+1 estações por comprimento de arco. */
function sampleEnvelope(envelope: BowlPoint[], rows: number): BowlPoint[] {
  const cum = [0];
  for (let i = 1; i < envelope.length; i++) {
    const [ra, ya] = envelope[i - 1];
    const [rb, yb] = envelope[i];
    cum.push(cum[i - 1] + Math.hypot(rb - ra, yb - ya));
  }
  const total = cum[cum.length - 1];
  const out: BowlPoint[] = [];
  for (let s = 0; s <= rows; s++) {
    const d = (s / rows) * total;
    let i = 1;
    while (i < cum.length - 1 && cum[i] < d) i++;
    const t = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
    out.push([
      THREE.MathUtils.lerp(envelope[i - 1][0], envelope[i][0], t),
      THREE.MathUtils.lerp(envelope[i - 1][1], envelope[i][1], t),
    ]);
  }
  return out;
}

type StandSegment = { a: BowlPoint; b: BowlPoint; color: THREE.Color };

/**
 * Perfil contínuo da arquibancada: mureta frontal → degraus (espelho+piso) →
 * [mureta + passeio entre anéis → parede frontal do anel superior → degraus] →
 * parede de fundo (só nos estádios cuja casca é separada: Lusail/cabaça).
 */
function standProfileSegments(params: StadiumParams): StandSegment[] {
  const { stands } = params;
  const seat = new THREE.Color(stands.seatColor);
  const seatDark = seat.clone().multiplyScalar(0.92);
  const wall = seat.clone().multiplyScalar(0.76);
  const interior = params.smooth || params.landmark.kind === "calabash-rings";
  const segs: StandSegment[] = [];
  let row = 0;

  stands.tiers.forEach((tier, t) => {
    const st = sampleEnvelope(tier.envelope, tier.rows);
    const [r0, y0] = st[0];
    if (t === 0) {
      // mureta frontal junto ao campo
      segs.push({ a: [r0, 0.04], b: [r0, y0], color: wall });
    } else {
      // mureta baixa + passeio horizontal entre anel inferior e superior
      const prevEnv = stands.tiers[t - 1].envelope;
      const [r1, y1] = prevEnv[prevEnv.length - 1];
      segs.push({ a: [r1, y1], b: [r1, y1 + 0.13], color: wall });
      segs.push({ a: [r1, y1 + 0.13], b: [r1 + 0.07, y1 + 0.13], color: wall });
      segs.push({ a: [r1 + 0.07, y1 + 0.13], b: [r1 + 0.07, y1], color: wall });
      segs.push({ a: [r1 + 0.07, y1], b: [r0, y1], color: wall });
      segs.push({ a: [r0, y1], b: [r0, y0], color: wall });
    }
    for (let i = 0; i < tier.rows; i++) {
      const [rA, yA] = st[i];
      const [rB, yB] = st[i + 1];
      const c = row % 2 === 0 ? seat : seatDark;
      // espelho (riser) um pouco mais escuro que o piso — realça o degrau
      segs.push({ a: [rA, yA], b: [rA, yB], color: c.clone().multiplyScalar(0.88) });
      segs.push({ a: [rA, yB], b: [rB, yB], color: c });
      row++;
    }
    if (interior && t === stands.tiers.length - 1) {
      const [rN, yN] = st[st.length - 1];
      segs.push({ a: [rN, yN], b: [rN, Math.max(0.04, yN - 0.5)], color: wall });
    }
  });
  return segs;
}

/** Revoluciona os segmentos do perfil em uma única BufferGeometry com vertex colors. */
function buildStandsGeometry(params: StadiumParams): THREE.BufferGeometry {
  const segs = standProfileSegments(params);
  const S = STAND_SEGMENTS;
  const { sectors } = params.stands;

  // colunas de corredor (divisões de setor): levemente mais escuras
  const colFactor = new Float32Array(S);
  for (let j = 0; j < S; j++) {
    const isAisle = Math.floor((j * sectors) / S) !== Math.floor(((j + 1) * sectors) / S);
    colFactor[j] = isAisle ? 0.72 : 1;
  }
  const cos: number[] = [];
  const sin: number[] = [];
  for (let j = 0; j <= S; j++) {
    const a = (j / S) * Math.PI * 2;
    cos.push(Math.cos(a));
    sin.push(Math.sin(a));
  }

  const quads = segs.length * S;
  const pos = new Float32Array(quads * 12);
  const nor = new Float32Array(quads * 12);
  const col = new Float32Array(quads * 12);
  const idx = new Uint32Array(quads * 6);
  const c = new THREE.Color();
  let v = 0;
  let f = 0;

  for (const seg of segs) {
    const [rA, yA] = seg.a;
    const [rB, yB] = seg.b;
    const dr = rB - rA;
    const dy = yB - yA;
    const len = Math.hypot(dr, dy) || 1;
    const nr = -dy / len; // normal 2D: pisos p/ cima, espelhos p/ o campo
    const ny = dr / len;
    for (let j = 0; j < S; j++) {
      const base = v / 3;
      c.copy(seg.color).multiplyScalar(colFactor[j]);
      // v0=A@j, v1=A@j+1, v2=B@j+1, v3=B@j
      const corners: [number, number, number][] = [
        [rA, yA, j],
        [rA, yA, j + 1],
        [rB, yB, j + 1],
        [rB, yB, j],
      ];
      for (const [r, y, jj] of corners) {
        pos[v] = r * cos[jj];
        nor[v] = nr * cos[jj];
        col[v] = c.r;
        v++;
        pos[v] = y;
        nor[v] = ny;
        col[v] = c.g;
        v++;
        pos[v] = r * sin[jj];
        nor[v] = nr * sin[jj];
        col[v] = c.b;
        v++;
      }
      idx[f++] = base;
      idx[f++] = base + 2;
      idx[f++] = base + 3;
      idx[f++] = base;
      idx[f++] = base + 1;
      idx[f++] = base + 2;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  return geo;
}

/** Arquibancadas em degraus: fileiras alternadas + corredores de setor (vertex colors). */
function TerracedStands({ params }: { params: StadiumParams }) {
  const geo = useMemo(() => buildStandsGeometry(params), [params]);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.85,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    []
  );
  return (
    <mesh geometry={geo} material={mat} scale={[params.sx, 1, params.sz]} castShadow receiveShadow />
  );
}

/** Torcida: InstancedMesh de esferinhas sobre os pisos, seed determinístico por slug. */
function Crowd({ params, slug }: { params: StadiumParams; slug: string }) {
  const mesh = useMemo(() => {
    const { stands, sx, sz } = params;
    const rng = mulberry32(hashSlug(slug) || 1);

    // slots regulares ao longo de cada piso de fileira
    type Slot = { r: number; y: number; a: number; depth: number };
    const slots: Slot[] = [];
    for (const tier of stands.tiers) {
      const st = sampleEnvelope(tier.envelope, tier.rows);
      for (let i = 0; i < tier.rows; i++) {
        const rMid = (st[i][0] + st[i + 1][0]) / 2;
        const depth = st[i + 1][0] - st[i][0];
        const y = st[i + 1][1] + 0.05;
        const n = Math.max(8, Math.floor((Math.PI * 2 * rMid * ((sx + sz) / 2)) / 0.22));
        for (let k = 0; k < n; k++) {
          slots.push({ r: rMid, y, a: ((k + 0.5) / n) * Math.PI * 2, depth });
        }
      }
    }

    // ocupação parcial (~60-70%) com buracos naturais
    const target = Math.min(stands.crowd, CROWD_CAP);
    const p = Math.min(0.72, target / slots.length);
    const chosen: Slot[] = [];
    for (const s of slots) {
      const keep = rng() < p;
      if (keep && chosen.length < target) chosen.push(s);
    }

    const palette = [
      params.accentColor,
      "#f2ede2",
      "#252b34",
      "#c9484f",
      "#3e6ed0",
      "#e7b84a",
    ].map((hex) => new THREE.Color(hex));

    const geo = new THREE.SphereGeometry(0.048, 6, 5);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 });
    const im = new THREE.InstancedMesh(geo, mat, chosen.length);
    const m = new THREE.Matrix4();
    chosen.forEach((s, i) => {
      const a = s.a + (rng() - 0.5) * 0.02;
      const r = s.r + (rng() - 0.5) * s.depth * 0.4;
      m.makeTranslation(Math.cos(a) * r * sx, s.y, Math.sin(a) * r * sz);
      im.setMatrixAt(i, m);
      im.setColorAt(i, palette[Math.floor(rng() * palette.length)]);
    });
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
    im.frustumCulled = false;
    return im;
  }, [params, slug]);

  return <primitive object={mesh} />;
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
  const shell = useShellGeometry(params);

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

      {/* casca/fachada externa — na cabaça, vira anéis coloridos (mosaico) */}
      {landmark.kind === "calabash-rings" ? (
        <CalabashRings params={params} landmark={landmark} sx={sx} sz={sz} />
      ) : (
        <mesh geometry={shell} material={bowlMat} scale={[sx, 1, sz]} castShadow receiveShadow />
      )}

      {/* arquibancadas reais em degraus (fileiras alternadas + setores) */}
      <TerracedStands params={params} />

      {/* torcida instanciada sobre os pisos */}
      <Crowd params={params} slug={stadium.slug} />

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
