import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
  Apple Tahoe liquid-glass button (21st.dev reference, integrated).

  DISPLACEMENT MAP
  ----------------
  The reference ships a ~30KB base64 WebP normal map. We instead generate the
  same kind of normal map procedurally as a tiny inline SVG: the red channel is
  a horizontal gradient (x displacement) and green is vertical (y), both neutral
  (128) across a flat centre and ramped near the edges, so only the rim refracts,
  exactly like a glass lens. Same physics, ~600 bytes, no binary to corrupt.

  Want byte-exact parity with the 21st.dev source? Replace DISPLACEMENT_MAP
  below with the original `data:image/webp;base64,...` string. Everything else
  (the filter wiring, the box-shadow stack, the lens layer) is unchanged.
*/
const DISPLACEMENT_MAP =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>" +
      "<defs>" +
        "<linearGradient id='x' x1='0' y1='0' x2='1' y2='0'>" +
          "<stop offset='0' stop-color='rgb(0,128,0)'/>" +
          "<stop offset='0.22' stop-color='rgb(128,128,0)'/>" +
          "<stop offset='0.78' stop-color='rgb(128,128,0)'/>" +
          "<stop offset='1' stop-color='rgb(255,128,0)'/>" +
        "</linearGradient>" +
        "<linearGradient id='y' x1='0' y1='0' x2='0' y2='1'>" +
          "<stop offset='0' stop-color='rgb(0,0,0)'/>" +
          "<stop offset='0.22' stop-color='rgb(0,128,0)'/>" +
          "<stop offset='0.78' stop-color='rgb(0,128,0)'/>" +
          "<stop offset='1' stop-color='rgb(0,255,0)'/>" +
        "</linearGradient>" +
      "</defs>" +
      "<rect width='100' height='100' fill='url(#x)'/>" +
      "<rect width='100' height='100' fill='url(#y)' style='mix-blend-mode:screen'/>" +
    "</svg>"
  );

const glassButtonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 rounded-full cursor-pointer transition-transform duration-300 ease-out tracking-tight disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
  {
    variants: {
      size: {
        default: "px-6 py-3.5 text-base font-medium",
        sm: "px-4 py-2 text-sm font-medium",
        lg: "px-8 py-4 text-lg font-medium",
        icon: "h-10 w-10 p-0 gap-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
  glassColor?: string; // e.g. "oklch(from var(--foreground) l c h / 10%)"
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, glassColor, ...props }, ref) => {
    // Unique id so multiple buttons don't share SVG filters.
    const filterId = React.useId().replace(/:/g, "");

    return (
      <>
        {/* INVISIBLE SVG FILTER DEFINITION */}
        {/* primitiveUnits="objectBoundingBox" lets the 1x1 map scale to any size. */}
        <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <filter id={`liquid-glass-${filterId}`} primitiveUnits="objectBoundingBox">
            <feImage
              result="map"
              width="100%"
              height="100%"
              x="0"
              y="0"
              href={DISPLACEMENT_MAP}
              preserveAspectRatio="none"
            />
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur" />
            <feDisplacementMap
              id="disp"
              in="blur"
              in2="map"
              scale="0.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <style>{`
          .btn-liquid {
            appearance: none;
            border: none;
            background: transparent;
            color: oklch(from var(--foreground) l c h / 95%);
            --glass-reflex-light: 1;
            --glass-reflex-dark: 1;
          }

          /* THE LENS LAYER (-z-10): kept empty so backdrop-filter only grabs the
             background behind the button (zero text-ghosting). */
          .btn-liquid-lens {
            background-color: ${glassColor || "oklch(from var(--foreground) l c h / 5%)"};
            backdrop-filter: blur(8px) url(#liquid-glass-${filterId}) saturate(150%);
            -webkit-backdrop-filter: blur(8px) saturate(150%);
            box-shadow:
              inset 0 0 0 1px color-mix(in srgb, white calc(var(--glass-reflex-light) * 10%), transparent),
              inset 1.8px 3px 0px -2px color-mix(in srgb, white calc(var(--glass-reflex-light) * 90%), transparent),
              inset -2px -2px 0px -2px color-mix(in srgb, white calc(var(--glass-reflex-light) * 80%), transparent),
              inset -3px -8px 1px -6px color-mix(in srgb, white calc(var(--glass-reflex-light) * 60%), transparent),
              inset -0.3px -1px 4px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 12%), transparent),
              inset -1.5px 2.5px 0px -2px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 20%), transparent),
              inset 0px 3px 4px -2px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 20%), transparent),
              inset 2px -6.5px 1px -4px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 10%), transparent),
              0px 1px 5px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 10%), transparent),
              0px 6px 16px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 8%), transparent);
            transition: background-color 400ms cubic-bezier(1, 0.0, 0.4, 1), box-shadow 400ms cubic-bezier(1, 0.0, 0.4, 1);
          }

          .btn-liquid-text {
            text-shadow: 0 1px 2px oklch(from var(--background) l c h / 30%);
            transition: color 400ms cubic-bezier(1, 0.0, 0.4, 1);
          }

          @media (hover: hover) {
            .btn-liquid:not(:disabled):hover { transform: scale(1.03); }
          }
          .btn-liquid:not(:disabled):active { transform: scale(0.96); }

          @media (prefers-reduced-motion: reduce) {
            .btn-liquid { transition: none; }
            .btn-liquid:not(:disabled):hover,
            .btn-liquid:not(:disabled):active { transform: none; }
          }
        `}</style>

        <button
          className={cn(glassButtonVariants({ size }), "btn-liquid", className)}
          ref={ref}
          {...props}
        >
          {/* ISOLATED BACKGROUND LENS */}
          <span className="btn-liquid-lens absolute inset-0 -z-10 rounded-[inherit] pointer-events-none" />

          {/* TEXT CONTENT (composited safely above the backdrop filter) */}
          <span className={cn("btn-liquid-text relative z-10 w-full flex items-center justify-center gap-[inherit] select-none", contentClassName)}>
            {children}
          </span>
        </button>
      </>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
