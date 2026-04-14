import React from 'react';
import { getRuntimePlatform, resolveRuntimeAssetPath, type RuntimePlatform } from '../lib/runtimePlatform';
import { appClient } from '../config/appClient';

interface BrandMarkProps {
  className?: string;
  iconOnly?: boolean;
  title?: string;
  subtitle?: string;
  platform?: RuntimePlatform;
}

const BRAND_MARK_SRC = '/brand/new-castle-mark.svg';

const PLATFORM_PRESETS: Record<
  RuntimePlatform,
  {
    markSrc: string;
    title: string;
    subtitle: string;
    wrapperClassName: string;
    titleClassName: string;
    subtitleClassName: string;
    imageClassName: string;
  }
> = {
  web: {
    markSrc: BRAND_MARK_SRC,
    title: appClient.companyNameAr,
    subtitle: appClient.tagline,
    wrapperClassName: 'h-16 w-16 rounded-[1.35rem] bg-slate-950/60',
    titleClassName: 'text-[1.35rem]',
    subtitleClassName: 'text-[11px] tracking-[0.22em]',
    imageClassName: 'object-contain p-1.5',
  },
  desktop: {
    markSrc: BRAND_MARK_SRC,
    title: appClient.systemName,
    subtitle: appClient.desktopSubtitle,
    wrapperClassName: 'h-14 w-14 rounded-[1.25rem] bg-slate-950/60',
    titleClassName: 'text-xl',
    subtitleClassName: 'text-[10px] tracking-[0.26em]',
    imageClassName: 'object-contain p-1.5',
  },
  mobile: {
    markSrc: BRAND_MARK_SRC,
    title: appClient.companyNameAr,
    subtitle: appClient.mobileSubtitle,
    wrapperClassName: 'h-12 w-12 rounded-[1rem] bg-slate-950/60',
    titleClassName: 'text-lg',
    subtitleClassName: 'text-[9px] tracking-[0.18em]',
    imageClassName: 'object-contain p-1.5',
  },
};

const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  iconOnly = false,
  title,
  subtitle,
  platform,
}) => {
  const runtimePlatform = platform || getRuntimePlatform();
  const preset = PLATFORM_PRESETS[runtimePlatform];
  const resolvedTitle = title || preset.title;
  const resolvedSubtitle = subtitle || preset.subtitle;
  const resolvedMarkSrc = resolveRuntimeAssetPath(preset.markSrc);

  return (
    <div className={`motion-fade-up flex items-center gap-3 ${className}`} dir="rtl">
      <div
        className={`motion-soft-lift motion-glow motion-shimmer relative shrink-0 overflow-hidden shadow-[0_22px_50px_-28px_rgba(245,158,11,0.7)] ring-1 ring-white/10 ${preset.wrapperClassName}`}
      >
        <img
          src={resolvedMarkSrc}
          alt={`${appClient.companyNameEn} mark`}
          className={`h-full w-full ${preset.imageClassName}`}
          loading="eager"
        />
      </div>

      {!iconOnly && (
        <div className="min-w-0">
          <h1 className={`truncate font-black tracking-tight text-white ${preset.titleClassName}`}>{resolvedTitle}</h1>
          <p className={`truncate font-black text-amber-300/85 ${preset.subtitleClassName}`}>{resolvedSubtitle}</p>
        </div>
      )}
    </div>
  );
};

export default BrandMark;