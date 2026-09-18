import { unsafe_useEffectOnce } from '@documenso/lib/client-only/hooks/use-effect-once';
import { SIGNATURE_CANVAS_DPI } from '@documenso/lib/constants/signatures';

import { Trans } from '@lingui/react/macro';
import { Trash2 } from 'lucide-react';
import type { StrokeOptions } from 'perfect-freehand';
import { getStroke } from 'perfect-freehand';
import type { MouseEvent, PointerEvent, TouchEvent } from 'react';
import { useMemo, useRef, useState } from 'react';

import { cn } from '../../lib/utils';
import { checkSignatureValidity, getSvgPathFromStroke } from './helper';
import { Point } from './point';

export type SignaturePadDrawProps = {
  className?: string;
  value: string;
  onChange: (_signatureDataUrl: string) => void;
};

export const SignaturePadDraw = ({ className, value, onChange, ...props }: SignaturePadDrawProps) => {
  const $el = useRef<HTMLCanvasElement>(null);

  const $imageData = useRef<ImageData | null>(null);
  const $fileInput = useRef<HTMLInputElement>(null);

  const [isPressed, setIsPressed] = useState(false);
  const [lines, setLines] = useState<Point[][]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [isSignatureValid, setIsSignatureValid] = useState<boolean | null>(null);

  const perfectFreehandOptions = useMemo(() => {
    const size = $el.current ? Math.min($el.current.height, $el.current.width) * 0.03 : 10;

    return {
      size,
      thinning: 0.25,
      streamline: 0.5,
      smoothing: 0.5,
      end: {
        taper: size * 2,
      },
    } satisfies StrokeOptions;
  }, []);

  const onMouseDown = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    setIsPressed(true);

    const point = Point.fromEvent(event, SIGNATURE_CANVAS_DPI, $el.current);

    setCurrentLine([point]);
  };

  const onMouseMove = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    if (!isPressed) {
      return;
    }

    const point = Point.fromEvent(event, SIGNATURE_CANVAS_DPI, $el.current);
    const lastPoint = currentLine[currentLine.length - 1];

    if (lastPoint && point.distanceTo(lastPoint) > 5) {
      setCurrentLine([...currentLine, point]);

      // Update the canvas here to draw the lines
      if ($el.current) {
        const ctx = $el.current.getContext('2d');

        if (ctx) {
          ctx.restore();
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.fillStyle = 'black';

          lines.forEach((line) => {
            const pathData = new Path2D(getSvgPathFromStroke(getStroke(line, perfectFreehandOptions)));

            ctx.fill(pathData);
          });

          const pathData = new Path2D(getSvgPathFromStroke(getStroke([...currentLine, point], perfectFreehandOptions)));
          ctx.fill(pathData);
        }
      }
    }
  };

  const onMouseUp = (event: MouseEvent | PointerEvent | TouchEvent, addLine = true) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    setIsPressed(false);

    const point = Point.fromEvent(event, SIGNATURE_CANVAS_DPI, $el.current);

    const newLines = [...lines];

    if (addLine && currentLine.length > 0) {
      newLines.push([...currentLine, point]);
      setCurrentLine([]);
    }

    setLines(newLines);

    if ($el.current && newLines.length > 0) {
      const ctx = $el.current.getContext('2d');

      if (ctx) {
        ctx.restore();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = 'black';

        newLines.forEach((line) => {
          const pathData = new Path2D(getSvgPathFromStroke(getStroke(line, perfectFreehandOptions)));
          ctx.fill(pathData);
        });

        const isValidSignature = checkSignatureValidity($el);

        setIsSignatureValid(isValidSignature);

        if (isValidSignature) {
          onChange?.($el.current.toDataURL());
        }
        ctx.save();
      }
    }
  };

  const onMouseEnter = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    if ('buttons' in event && event.buttons === 1) {
      onMouseDown(event);
    }
  };

  const onMouseLeave = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    if (isPressed) {
      onMouseUp(event, true);
    } else {
      onMouseUp(event, false);
    }
  };

  const onClearClick = () => {
    if ($el.current) {
      const ctx = $el.current.getContext('2d');

      ctx?.clearRect(0, 0, $el.current.width, $el.current.height);
      $imageData.current = null;
    }

    if ($fileInput.current) {
      $fileInput.current.value = '';
    }

    onChange('');

    setLines([]);
    setCurrentLine([]);
    setIsPressed(false);
  };

  unsafe_useEffectOnce(() => {
    if ($el.current) {
      $el.current.width = $el.current.clientWidth * SIGNATURE_CANVAS_DPI;
      $el.current.height = $el.current.clientHeight * SIGNATURE_CANVAS_DPI;
    }

    if ($el.current && value) {
      const ctx = $el.current.getContext('2d');

      const { width, height } = $el.current;

      const img = new Image();

      img.onload = () => {
        ctx?.drawImage(img, 0, 0, Math.min(width, img.width), Math.min(height, img.height));

        const defaultImageData = ctx?.getImageData(0, 0, width, height) || null;

        $imageData.current = defaultImageData;
      };

      img.src = value;
    }
  });

  return (
    <div className={cn('h-full w-full', className)}>
      {lines.length === 0 && !value && !isPressed && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto h-2/3 w-2/3 text-muted-foreground/60"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 220 100"
        >
          <path
            className="signature-pad-guide-path"
            d="M18 76C33 49 31 22 47 20C61 18 55 51 43 66C31 81 25 73 39 57C57 37 61 73 74 71C86 69 85 46 94 45C101 44 99 70 111 70C122 70 127 57 133 56C141 56 137 72 150 72C164 72 167 60 174 60C181 60 180 72 201 70"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </svg>
      )}

      <canvas
        data-testid="signature-pad-draw"
        ref={$el}
        className="h-full w-full dark:hue-rotate-180 dark:invert"
        style={{ touchAction: 'none' }}
        onPointerMove={(event) => onMouseMove(event)}
        onPointerDown={(event) => onMouseDown(event)}
        onPointerUp={(event) => onMouseUp(event)}
        onPointerLeave={(event) => onMouseLeave(event)}
        onPointerEnter={(event) => onMouseEnter(event)}
        {...props}
      />

      {(lines.length > 0 || value) && (
        <div
          className={cn('absolute right-3 bottom-3 transition-opacity duration-100', {
            'pointer-events-none opacity-0': isPressed,
          })}
        >
          <button
            type="button"
            aria-label="Clear signature"
            className="flex min-h-6 items-center gap-1 rounded-md bg-destructive px-2 py-1 font-semibold text-destructive-foreground text-xs shadow-md ring-offset-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onClearClick()}
          >
            <Trash2 aria-hidden="true" className="h-3 w-3" />
            <Trans>Clear Signature</Trans>
          </button>
        </div>
      )}

      {isSignatureValid === false && (
        <div
          className={cn('absolute bottom-4 left-4 flex gap-2 transition-opacity duration-100', {
            'pointer-events-none opacity-0': isPressed,
          })}
        >
          <span className="text-destructive text-xs">
            <Trans>Signature is too small</Trans>
          </span>
        </div>
      )}
    </div>
  );
};
