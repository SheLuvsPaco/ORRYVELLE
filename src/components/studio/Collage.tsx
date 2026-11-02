import type { CSSProperties } from "react";
import type { CollageLayer, Project } from "@/lib/studio/projects";
import { Phone, Piece, Screen, ShotPiece, domain } from "./Mockups";
import "./styles/collage.css";

/*
 * Project imagery composed like a designer's presentation board: several views of the
 * same product (screen regions, a long page, the phone app, single UI pieces) layered on
 * a field of the project's brand colour and cropped by the frame.
 *
 * Every layer is positioned in units of the collage's width (x, y, w in %), so a
 * composition keeps its proportions at any size; a shorter frame simply crops the bottom.
 * Compositions live in `project.collage` (src/lib/studio/projects.ts).
 */

export type CollageVariant = "square" | "wide" | "pairA" | "pairB" | "mini";

/** Width of a full-size product screen that photo sizes are authored against. */
const SCREEN_PX = 1100;

function layersFor(project: Project, variant: CollageVariant): CollageLayer[] {
  const set = project.collage;
  if (variant === "pairA") return set.pair[0];
  if (variant === "pairB") return set.pair[1];
  if (variant === "mini")
    return set.mini ?? [
      { t: "page", x: 12, y: 12, w: 104, z: 1 },
      { t: "phone", x: 58, y: 26, w: 30, r: 4, z: 2 },
    ];
  return set[variant];
}

function Layer({
  project,
  layer,
  width,
  mobileVw,
  priority,
}: {
  project: Project;
  layer: CollageLayer;
  width: number;
  mobileVw: number;
  priority: boolean;
}) {
  const style = {
    "--x": layer.x,
    "--y": layer.y,
    "--w": layer.w,
    "--r": `${layer.r ?? 0}deg`,
    "--z": layer.z ?? 1,
    "--lift": layer.lift ?? 0,
  } as CSSProperties;

  const shot = layer.shot ? project.shots?.more[layer.shot] : undefined;

  if (layer.t === "phone") {
    const k = (width * layer.w) / 100 / 300;
    return (
      <div className="cl-layer cl-phone" style={style}>
        <Phone project={project} k={Math.min(1, k * 1.1)} vw={(mobileVw * layer.w) / 100} shot={shot} />
      </div>
    );
  }

  if (layer.t === "shot") {
    if (!shot) return null;
    return (
      <div className="cl-layer cl-shot" style={style}>
        <ShotPiece shot={shot} px={(width * layer.w) / 100} vw={(mobileVw * layer.w) / 100} />
      </div>
    );
  }

  if (layer.t === "piece" && layer.piece) {
    return (
      <div className={`cl-layer cl-piece is-${layer.piece}`} style={style}>
        <Piece project={project} kind={layer.piece} />
      </div>
    );
  }

  // A region of the desktop product: `ar` sets the visible height, `at` scrolls the page.
  const k = (width * layer.w) / 100 / SCREEN_PX;
  const km = (mobileVw * layer.w) / 100 / 95;
  const pageStyle = {
    ...style,
    "--ar": layer.ar ?? 0.625,
    "--at": layer.at ?? 0,
  } as CSSProperties;
  return (
    <div
      className={`cl-layer cl-page ${layer.long ? "is-long" : ""} ${layer.main ? "is-main" : ""} ${layer.bar ? "has-bar" : ""}`}
      style={pageStyle}
    >
      {layer.bar ? (
        <span className="cl-bar">
          <i />
          <i />
          <i />
          <em>{domain(project)}</em>
        </span>
      ) : null}
      <div className="cl-view">
        <Screen
          project={project}
          k={Math.min(1, k * 1.15)}
          km={Math.min(1, km)}
          shot={shot}
          at={layer.at}
          ar={layer.ar}
          main={layer.main}
          priority={priority}
        />
      </div>
    </div>
  );
}

export function Collage({
  project,
  variant = "square",
  width = 520,
  mobileVw = 92,
  className = "",
  priority = false,
}: {
  project: Project;
  variant?: CollageVariant;
  /** Approximate rendered width in CSS px on large screens (drives image sizes). */
  width?: number;
  /** Approximate rendered width in vw on small screens. */
  mobileVw?: number;
  className?: string;
  /** Above-the-fold collage: preload its main page view. */
  priority?: boolean;
}) {
  const set = project.collage;
  const layers = layersFor(project, variant);
  const lead = layers.findIndex((layer) => layer.t === "page");
  const [fieldA, fieldB] =
    variant === "pairA"
      ? [project.mock.panels[0], set.pairFields?.[0] ?? project.mock.panels[0]]
      : variant === "pairB"
        ? [project.mock.panels[1], set.pairFields?.[1] ?? project.mock.panels[1]]
        : set.field;
  const tilt = variant === "square" ? set.tilt : undefined;
  const style = {
    "--field-a": fieldA,
    "--field-b": fieldB,
    ...(tilt
      ? {
          "--tx": `${tilt[0]}deg`,
          "--ty": `${tilt[1]}deg`,
          "--tz": `${tilt[2]}deg`,
        }
      : {}),
  } as CSSProperties;
  return (
    <div
      className={`collage collage-${variant} ${tilt ? "is-tilted" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="cl-plane">
        {layers.map((layer, index) => (
          <Layer
            key={`${layer.t}-${index}`}
            project={project}
            layer={layer}
            width={width}
            mobileVw={mobileVw}
            priority={priority && index === lead}
          />
        ))}
      </div>
    </div>
  );
}
