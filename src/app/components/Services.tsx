import { useEffect, useRef, useState } from "react";
import {
  Code2,
  LineChart,
  ShieldCheck,
  HeadphonesIcon,
  Lightbulb,
  Plus,
  Workflow,
  Cable,
  BrainCircuit,
  Cloud,
  GitBranch,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software House",
    subtitle: "Produto digital sob medida",
    description: "Criamos sistemas que eliminam planilhas, centralizam processos e dão escala para sua operação.",
    tags: ["React", "Node.js", "Python", "Flutter"],
    color: "#7C3AED",
  },
  {
    icon: Lightbulb,
    title: "Consultoria",
    subtitle: "Clareza antes do investimento",
    description: "Mapeamos gargalos, priorizamos oportunidades e transformamos ideias soltas em plano executável.",
    tags: ["Roadmap", "Arquitetura", "Agile"],
    color: "#9B5CF6",
  },
  {
    icon: LineChart,
    title: "Business Intelligence",
    subtitle: "Decisão sem achismo",
    description: "Transformamos dados espalhados em indicadores claros para você enxergar margem, operação e crescimento.",
    tags: ["Power BI", "ETL", "SQL"],
    color: "#6D28D9",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte",
    subtitle: "Menos parada, mais confiança",
    description: "Monitoramos, corrigimos e evoluímos sistemas críticos para sua empresa não ficar refém de falhas.",
    tags: ["SLA", "ITIL", "N1/N2/N3"],
    color: "#7C3AED",
  },
  {
    icon: ShieldCheck,
    title: "Segurança da Informação",
    subtitle: "Risco tratado antes do problema",
    description: "Fortalecemos aplicações, acessos e processos para reduzir exposição, vazamentos e riscos de LGPD.",
    tags: ["Pentest", "LGPD", "ISO 27001"],
    color: "#5B21B6",
  },
  {
    icon: Workflow,
    title: "Automação de Processos",
    subtitle: "Tempo de volta para o time",
    description: "Automatizamos rotinas repetitivas para reduzir erro humano, atrasos e custo operacional invisível.",
    tags: ["RPA", "Workflows", "APIs"],
    color: "#8B5CF6",
  },
  {
    icon: Cable,
    title: "Integração de Sistemas",
    subtitle: "Sistemas conversando entre si",
    description: "Integramos ferramentas para evitar retrabalho, duplicidade de dados e decisões com informação atrasada.",
    tags: ["ERP", "CRM", "REST"],
    color: "#7C3AED",
  },
  {
    icon: BrainCircuit,
    title: "IA e Machine Learning",
    subtitle: "IA aplicada ao que dá retorno",
    description: "Criamos assistentes, copilotos e análises inteligentes para acelerar atendimento, operação e gestão.",
    tags: ["LLMs", "Chatbots", "MLOps"],
    color: "#A855F7",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    subtitle: "Ambiente pronto para crescer",
    description: "Estruturamos nuvem segura, escalável e otimizada para sua empresa crescer sem estourar custos.",
    tags: ["Azure", "AWS", "GCP"],
    color: "#6D28D9",
  },
  {
    icon: GitBranch,
    title: "DevOps e CI/CD",
    subtitle: "Deploy sem drama",
    description: "Automatizamos entrega, infraestrutura e monitoramento para seu produto evoluir com mais velocidade e controle.",
    tags: ["Docker", "CI/CD", "IaC"],
    color: "#9B5CF6",
  },
  {
    icon: Wrench,
    title: "Manutenção e Evolução",
    subtitle: "Evolução sem recomeçar do zero",
    description: "Modernizamos sistemas existentes, corrigimos falhas e entregamos melhorias que protegem seu investimento.",
    tags: ["Sustentação", "Refactor", "Performance"],
    color: "#5B21B6",
  },
  {
    icon: Plus,
    title: "Solução Personalizada",
    subtitle: "Quando o problema não cabe numa caixa",
    description: "Entendemos seu cenário e montamos uma solução combinando software, dados, automação, cloud e suporte.",
    tags: ["Sob medida"],
    color: "#9B5CF6",
  },
];

const CARD_W = 360;
const CARD_H = 280;
const EDGE_PADDING = 34;
const COLLISION_GAP = 18;
const ROW_GAP = 54;

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phaseX: number;
  phaseY: number;
  drift: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const edgePaddingFor = (width: number) => (width < 420 ? 16 : EDGE_PADDING);

const layoutForWidth = (width: number) => {
  const columns = width < 700 ? 1 : width < 1080 ? 2 : 3;
  const rows = Math.ceil(services.length / columns);
  const rowGap = width < 700 ? 34 : ROW_GAP;
  const height = rows * CARD_H + Math.max(0, rows - 1) * rowGap + EDGE_PADDING * 2;

  return { columns, rows, height };
};

export function Services() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);
  const [stageHeight, setStageHeight] = useState(820);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bodies: Body[] = services.map((_, i) => ({
      x: 0,
      y: 0,
      vx: Math.cos(i * 1.7) * 0.34,
      vy: Math.sin(i * 1.3) * 0.30,
      phaseX: i * 1.19 + 0.4,
      phaseY: i * 1.51 + 1.1,
      drift: 0.34 + (i % 3) * 0.08,
    }));

    let width = 0;
    let height = 0;
    let cardW = CARD_W;
    let cardH = CARD_H;
    let lastStageHeight = stageHeight;
    let lastTime = performance.now();

    const syncLayout = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      const layout = layoutForWidth(width);
      const edge = edgePaddingFor(width);

      if (Math.abs(layout.height - lastStageHeight) > 1) {
        lastStageHeight = layout.height;
        setStageHeight(layout.height);
      }

      const maxCardForColumns = (width - edge * 2 - COLLISION_GAP * (layout.columns - 1)) / layout.columns;
      cardW = Math.min(CARD_W, Math.max(180, maxCardForColumns));
      cardH = CARD_H;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
      });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const maxX = Math.max(edge, width - cardW - edge);
      const maxY = Math.max(edge, height - cardH - edge);

      bodies.forEach((body, i) => {
        const col = i % layout.columns;
        const row = Math.floor(i / layout.columns);
        const x = layout.columns === 1
          ? (width - cardW) / 2
          : edge + (col / (layout.columns - 1)) * Math.max(1, width - cardW - edge * 2);
        const y = layout.rows === 1
          ? (height - cardH) / 2
          : edge + (row / (layout.rows - 1)) * Math.max(1, height - cardH - edge * 2);

        body.x = clamp(body.x || x, edge, maxX);
        body.y = clamp(body.y || y, edge, maxY);
      });
    };

    const resolveCollisions = () => {
      for (let iteration = 0; iteration < 3; iteration++) {
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];
            const ax = a.x + cardW / 2;
            const ay = a.y + cardH / 2;
            const bx = b.x + cardW / 2;
            const by = b.y + cardH / 2;
            const overlapX = cardW + COLLISION_GAP - Math.abs(ax - bx);
            const overlapY = cardH + COLLISION_GAP - Math.abs(ay - by);

            if (overlapX <= 0 || overlapY <= 0) continue;

            const separateOnX = overlapX < overlapY;
            const dir = separateOnX
              ? (ax < bx ? -1 : 1)
              : (ay < by ? -1 : 1);
            const push = (separateOnX ? overlapX : overlapY) / 2 + 0.6;

            if (separateOnX) {
              a.x += dir * push;
              b.x -= dir * push;
              a.vx = dir * (Math.abs(a.vx) * 0.72 + 0.14);
              b.vx = -dir * (Math.abs(b.vx) * 0.72 + 0.14);
              a.vy += (Math.random() - 0.5) * 0.035;
              b.vy += (Math.random() - 0.5) * 0.035;
            } else {
              a.y += dir * push;
              b.y -= dir * push;
              a.vy = dir * (Math.abs(a.vy) * 0.72 + 0.13);
              b.vy = -dir * (Math.abs(b.vy) * 0.72 + 0.13);
              a.vx += (Math.random() - 0.5) * 0.035;
              b.vx += (Math.random() - 0.5) * 0.035;
            }
          }
        }
      }
    };

    const constrainBodies = () => {
      const edge = edgePaddingFor(width);
      const maxX = Math.max(edge, width - cardW - edge);
      const maxY = Math.max(edge, height - cardH - edge);

      bodies.forEach((body) => {
        if (body.x < edge) {
          body.x = edge;
          body.vx = Math.abs(body.vx) * 0.58;
        } else if (body.x > maxX) {
          body.x = maxX;
          body.vx = -Math.abs(body.vx) * 0.58;
        }

        if (body.y < edge) {
          body.y = edge;
          body.vy = Math.abs(body.vy) * 0.58;
        } else if (body.y > maxY) {
          body.y = maxY;
          body.vy = -Math.abs(body.vy) * 0.58;
        }
      });
    };

    const drawCardSignalLine = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const points = bodies.map((body) => ({
        x: body.x + cardW / 2,
        y: body.y + cardH / 2,
      }));

      if (points.length < 2) return;

      const drawCardPath = () => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      };

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(124,58,237,0.78)");
      gradient.addColorStop(0.5, "rgba(205,183,255,0.95)");
      gradient.addColorStop(1, "rgba(91,33,182,0.78)");

      drawCardPath();
      ctx.strokeStyle = "rgba(124,58,237,0.16)";
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      drawCardPath();
      ctx.strokeStyle = "rgba(155,92,246,0.30)";
      ctx.lineWidth = 8;
      ctx.stroke();

      drawCardPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      points.forEach((point, i) => {
        const pulse = (Math.sin(time * 2 + i * 0.85) + 1) / 2;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 13 + pulse * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${0.06 + pulse * 0.07})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, 3.4 + pulse * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,222,255,${0.45 + pulse * 0.3})`;
        ctx.fill();
      });

      for (let i = 0; i < points.length - 1; i++) {
        const from = points[i];
        const to = points[i + 1];
        const distance = Math.hypot(to.x - from.x, to.y - from.y);
        const signalCount = Math.max(1, Math.floor(distance / 240));

        for (let s = 0; s < signalCount; s++) {
          const progress = (time * 0.08 + i * 0.17 + s / signalCount) % 1;
          const x = from.x + (to.x - from.x) * progress;
          const y = from.y + (to.y - from.y) * progress;

          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(232,222,255,0.82)";
          ctx.fill();
        }
      }

      ctx.restore();
    };

    const loop = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 16.67;
      lastTime = now;
      const time = now / 1000;

      bodies.forEach((body, i) => {
        const breezeX = Math.sin(time * body.drift + body.phaseX) * 0.006;
        const breezeY = Math.cos(time * (body.drift + 0.27) + body.phaseY) * 0.005;
        const slowWave = Math.sin(time * 0.22 + i * 1.9) * 0.003;

        body.vx += (breezeX + slowWave) * dt;
        body.vy += (breezeY - slowWave) * dt;
        body.vx *= Math.pow(0.996, dt);
        body.vy *= Math.pow(0.996, dt);

        const speed = Math.hypot(body.vx, body.vy);
        if (speed < 0.20) {
          const angle = time * 0.28 + body.phaseX + i;
          body.vx += Math.cos(angle) * 0.028;
          body.vy += Math.sin(angle) * 0.028;
        } else if (speed > 0.58) {
          const scale = 0.58 / speed;
          body.vx *= scale;
          body.vy *= scale;
        }

        body.x += body.vx * dt;
        body.y += body.vy * dt;
      });

      resolveCollisions();
      constrainBodies();

      bodies.forEach((body, i) => {
        const speed = Math.hypot(body.vx, body.vy);
        if (speed > 0.62) {
          const scale = 0.62 / speed;
          body.vx *= scale;
          body.vy *= scale;
        } else if (speed < 0.16) {
          const angle = time * 0.34 + body.phaseY + i * 0.7;
          body.vx += Math.cos(angle) * 0.03;
          body.vy += Math.sin(angle) * 0.03;
        }
      });

      drawCardSignalLine(time);

      bodies.forEach((body, i) => {
        const card = cardRefs.current[i];
        if (!card) return;

        card.style.transform = `translate3d(${body.x}px, ${body.y}px, 0)`;
        const tilt = clamp(body.vx * 0.22, -3, 3);
        const inner = card.firstElementChild as HTMLDivElement | null;
        if (inner) {
          inner.style.transform = `rotate(${tilt}deg)`;
        }
      });

      animRef.current = requestAnimationFrame(loop);
    };

    syncLayout();
    const observer = new ResizeObserver(syncLayout);
    observer.observe(wrap);
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="servicos" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080F] via-[#0C0C18] to-[#08080F]" />

      {/* Header */}
      <div className="relative text-center pt-24 pb-4 px-6" style={{ zIndex: 3 }}>
        <p
          className="text-[#9B5CF6] text-xs uppercase tracking-[0.2em] mb-3"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          // O que fazemos
        </p>
        <h2
          className="text-[#EEEEF5] mb-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "Inter, sans-serif" }}
        >
          Soluções para tirar sua operação do improviso
        </h2>
        <p className="text-[#8888A8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          Escolha o ponto de partida: produto, dados, automação, cloud, segurança ou evolução de sistemas.
        </p>
      </div>

      {/* Network area */}
      <div ref={wrapRef} className="relative w-full" style={{ height: stageHeight }}>
        {/* Card-following signal line */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ zIndex: 1, pointerEvents: "none" }}
        />

        {/* Floating collision blocks */}
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute top-0 left-0 group"
              style={{
                width: `min(${CARD_W}px, calc(100vw - 48px))`,
                height: CARD_H,
                zIndex: 4,
                willChange: "transform",
              }}
            >
              <div
                className="w-full h-full rounded-lg border p-5 flex flex-col justify-between backdrop-blur-md transition-[background,border-color,box-shadow,transform] duration-300"
                style={{
                  background: "linear-gradient(145deg, rgba(18,18,32,0.94), rgba(10,10,18,0.86))",
                  borderColor: "rgba(155,92,246,0.30)",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "linear-gradient(145deg, rgba(25,22,43,0.98), rgba(13,12,24,0.94))";
                  el.style.borderColor = svc.color;
                  el.style.boxShadow = `0 0 28px ${svc.color}55, 0 18px 45px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.08)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "linear-gradient(145deg, rgba(18,18,32,0.94), rgba(10,10,18,0.86))";
                  el.style.borderColor = "rgba(155,92,246,0.30)";
                  el.style.boxShadow = "0 18px 45px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)";
                }}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: `${svc.color}25` }}
                    >
                      <Icon size={16} style={{ color: svc.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] leading-none mb-0.5" style={{ color: svc.color, fontFamily: "JetBrains Mono, monospace" }}>
                        {svc.subtitle}
                      </p>
                      <h3 className="text-[#EEEEF5] leading-tight" style={{ fontSize: "0.88rem", fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                        {svc.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[#8888A8] leading-snug" style={{ fontSize: "0.73rem", fontFamily: "Inter, sans-serif" }}>
                    {svc.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[9px] tracking-wide"
                      style={{ background: `${svc.color}18`, color: svc.color, fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
