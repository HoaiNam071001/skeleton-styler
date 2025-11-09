export abstract class StyleBuilder {
  static fmt = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);
  static s_uniqId = () => `sk-id-${Math.random().toString(36).substring(2, 9)}`;

  private s: Record<string, string> = {};
  s_display = (v: string) => ((this.s.display = v), this);
  s_flex = () => this.s_display('flex');
  s_block = () => this.s_display('block');
  s_inline = () => this.s_display('inline');
  s_inlineBlock = () => this.s_display('inline-block');
  s_inlineFlex = () => this.s_display('inline-flex');
  s_grid = () => this.s_display('grid');
  s_inlineGrid = () => this.s_display('inline-grid');
  s_none = () => this.s_display('none');
  s_flex1 = () => ((this.s.flex = '1 1 auto'), this);
  s_flexFill = (v: number) => ((this.s.flex = `${v}`), this);
  s_flexAuto = () => ((this.s.flex = '0 1 auto'), this);
  s_flexDirection = (d: 'row' | 'column' = 'row') => (
    (this.s.display = 'flex'), (this.s['flex-direction'] = d), this
  );
  s_flexRow = () => this.s_flexDirection('row');
  s_flexColumn = () => this.s_flexDirection('column');
  s_items = (v: string) => ((this.s['align-items'] = v), this);
  s_itemsCenter = () => this.s_items('center');
  s_itemsStart = () => this.s_items('flex-start');
  s_itemsEnd = () => this.s_items('flex-end');
  s_itemsStretch = () => this.s_items('stretch');
  s_justify = (v: string) => ((this.s['justify-content'] = v), this);
  s_justifyStart = () => this.s_justify('flex-start');
  s_justifyEnd = () => this.s_justify('flex-end');
  s_justifyCenter = () => this.s_justify('center');
  s_justifyBetween = () => this.s_justify('space-between');
  s_justifyAround = () => this.s_justify('space-around');
  s_justifyEvenly = () => this.s_justify('space-evenly');
  s_alignSelf = (v: string) => ((this.s['align-self'] = v), this);
  s_alignSelfStart = () => this.s_alignSelf('flex-start');
  s_alignSelfEnd = () => this.s_alignSelf('flex-end');
  s_alignSelfCenter = () => this.s_alignSelf('center');
  s_alignSelfStretch = () => this.s_alignSelf('stretch');
  s_gap = (v: string | number) => ((this.s.gap = StyleBuilder.fmt(v)), this);
  s_m = (v: string | number) => ((this.s.margin = StyleBuilder.fmt(v)), this);
  s_mt = (v: string | number) => ((this.s['margin-top'] = StyleBuilder.fmt(v)), this);
  s_mtAuto = () => ((this.s['margin-top'] = 'auto'), this);
  s_mb = (v: string | number) => ((this.s['margin-bottom'] = StyleBuilder.fmt(v)), this);
  s_mbAuto = () => ((this.s['margin-bottom'] = 'auto'), this);
  s_ml = (v: string | number) => ((this.s['margin-left'] = StyleBuilder.fmt(v)), this);
  s_mlAuto = () => ((this.s['margin-left'] = 'auto'), this);
  s_mr = (v: string | number) => ((this.s['margin-right'] = StyleBuilder.fmt(v)), this);
  s_mrAuto = () => ((this.s['margin-right'] = 'auto'), this);
  s_mx = (v: string | number) => (
    (this.s['margin-left'] = this.s['margin-right'] = StyleBuilder.fmt(v)), this
  );
  s_mxAuto = () => this.s_mx('auto');
  s_my = (v: string | number) => (
    (this.s['margin-top'] = this.s['margin-bottom'] = StyleBuilder.fmt(v)), this
  );
  s_myAuto = () => this.s_my('auto');
  s_p = (v: string | number) => ((this.s.padding = StyleBuilder.fmt(v)), this);
  s_pt = (v: string | number) => ((this.s['padding-top'] = StyleBuilder.fmt(v)), this);
  s_ptAuto = () => this.s_pt('auto');
  s_pb = (v: string | number) => ((this.s['padding-bottom'] = StyleBuilder.fmt(v)), this);
  s_pbAuto = () => this.s_pb('auto');
  s_pr = (v: string | number) => ((this.s['padding-right'] = StyleBuilder.fmt(v)), this);
  s_prAuto = () => this.s_pr('auto');
  s_pl = (v: string | number) => ((this.s['padding-left'] = StyleBuilder.fmt(v)), this);
  s_plAuto = () => this.s_pl('auto');
  s_px = (v: string | number) => (
    (this.s['padding-left'] = this.s['padding-right'] = StyleBuilder.fmt(v)), this
  );
  s_pxAuto = () => this.s_px('auto');
  s_py = (v: string | number) => (
    (this.s['padding-top'] = this.s['padding-bottom'] = StyleBuilder.fmt(v)), this
  );
  s_pyAuto = () => this.s_py('auto');
  s_w = (v: string | number) => ((this.s.width = StyleBuilder.fmt(v)), this);
  s_wFull = () => ((this.s.width = '100%'), this);
  s_wAuto = () => ((this.s.width = 'auto'), this);
  s_h = (v: string | number) => ((this.s.height = StyleBuilder.fmt(v)), this);
  s_hFull = () => ((this.s.height = '100%'), this);
  s_hAuto = () => ((this.s.height = 'auto'), this);
  s_minH = (v: string | number) => ((this.s['min-height'] = StyleBuilder.fmt(v)), this);
  s_minW = (v: string | number) => ((this.s['min-width'] = StyleBuilder.fmt(v)), this);
  s_maxH = (v: string | number) => ((this.s['max-height'] = StyleBuilder.fmt(v)), this);
  s_maxW = (v: string | number) => ((this.s['max-width'] = StyleBuilder.fmt(v)), this);
  s_textSize = (s: string | number) => ((this.s['font-size'] = StyleBuilder.fmt(s)), this);
  s_textColor = (c: string) => ((this.s.color = c), this);
  s_fontWeight = (w: string | number) => (
    (this.s['font-weight'] = `${w}`), this
  );
  s_textAlign = (a: 'left' | 'center' | 'right' | 'justify') => (
    (this.s['text-align'] = a), this
  );
  s_bg = (c: string) => ((this.s['background-color'] = c), this);
  s_bgImage = (u: string) => ((this.s['background-image'] = `url(${u})`), this);
  s_bgWhite = () => this.s_bg('white');
  s_border = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => ((this.s.border = `${StyleBuilder.fmt(w)} ${s} ${c}`), this);
  s_borderTop = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => ((this.s['border-top'] = `${StyleBuilder.fmt(w)} ${s} ${c}`), this);
  s_borderBottom = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => ((this.s['border-bottom'] = `${StyleBuilder.fmt(w)} ${s} ${c}`), this);
  s_borderLeft = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => ((this.s['border-left'] = `${StyleBuilder.fmt(w)} ${s} ${c}`), this);
  s_borderRight = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => ((this.s['border-right'] = `${StyleBuilder.fmt(w)} ${s} ${c}`), this);
  s_borderX = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => (
    (this.s['border-left'] = this.s['border-right'] = `${StyleBuilder.fmt(w)} ${s} ${c}`),
    this
  );
  s_borderY = (
    w: string | number = '1px',
    s: string = 'solid',
    c: string = 'var(--x-border)'
  ) => (
    (this.s['border-top'] = this.s['border-bottom'] = `${StyleBuilder.fmt(w)} ${s} ${c}`),
    this
  );
  s_rounded = (r: string | number = '4px') => (
    (this.s['borderRadius'] = StyleBuilder.fmt(r)), this
  );
  s_roundedFull = () => this.s_rounded('9999px');
  s_shadow = (v: string = '0 1px 3px rgba(0,0,0,0.1)') => (
    (this.s['box-shadow'] = v), this
  );
  s_position = (v: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky') => (
    (this.s.position = v), this
  );
  s_static = () => this.s_position('static');
  s_relative = () => this.s_position('relative');
  s_absolute = () => this.s_position('absolute');
  s_fixed = () => this.s_position('fixed');
  s_sticky = () => this.s_position('sticky');
  s_top = (v: string | number) => ((this.s.top = StyleBuilder.fmt(v)), this);
  s_left = (v: string | number) => ((this.s.left = StyleBuilder.fmt(v)), this);
  s_right = (v: string | number) => ((this.s.right = StyleBuilder.fmt(v)), this);
  s_bottom = (v: string | number) => ((this.s.bottom = StyleBuilder.fmt(v)), this);
  s_overflow = (v: 'visible' | 'hidden' | 'scroll' | 'auto') => (
    (this.s.overflow = v), this
  );
  s_overflowAuto = () => this.s_overflow('auto');
  s_overflowHidden = () => this.s_overflow('hidden');
  s_overflowX = (v: string) => ((this.s['overflow-x'] = v), this);
  s_overflowXAuto = () => this.s_overflowX('auto');
  s_overflowXHidden = () => this.s_overflowX('hidden');
  s_overflowY = (v: string) => ((this.s['overflow-y'] = v), this);
  s_overflowYAuto = () => this.s_overflowY('auto');
  s_overflowYHidden = () => this.s_overflowY('hidden');
  s_zIndex = (v: string | number) => ((this.s['z-index'] = `${v}`), this);
  s_opacity = (v: string | number) => ((this.s.opacity = `${v}`), this);
  s_aspectRatio = (v: string | number) => (
    (this.s['aspect-ratio'] = typeof v === 'number' ? `${v} / 1` : v), this
  );
  s_square = () => this.s_aspectRatio('1 / 1');
  s_style = (k: string, v: string) => ((this.s[k] = v), this);
  s_styles = (s: Record<string, string>) => (Object.assign(this.s, s), this);
  getStyle = () => this.s;
}
