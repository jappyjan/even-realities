import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(new URL('.', import.meta.url).pathname, '..');
const assetsDir = path.join(rootDir, 'src', 'assets');
const iconsDir = path.join(rootDir, 'src', 'lib', 'components', 'icons');

const config = [
  {
    file: 'Menu Bar Icons.svg',
    group: 'MenuBar',
    names: [
      'ic_home_page_off',
      'ic_home_page_on',
      'ic_health_off',
      'ic_health_on',
      'ic_platform_off',
      'ic_platform_on',
      'ic_panel_off',
      'ic_panel_on',
    ],
  },
  {
    file: 'Feature & Function Icons.svg',
    group: 'Feature',
    names: [
      'Translate',
      'Teleprompt',
      'Navigate',
      'Even AI',
      'Interface Settings',
      'QuickNote',
      'Transcribe',
      'Notification',
      'Calendar',
      'Time Counting',
      'Theme',
      'Weather',
      'Wiki',
      'Email',
      'Wear Detect',
      '3D Facial Scan',
      'Languages',
      'Voice Print',
      'HeadUp Angle',
    ],
  },
  {
    file: 'Feature & Function Icons-1.svg',
    group: 'Guide',
    names: [
      'Chevron - Drill-up',
      'Chevron_small - Drill-up',
      'Chevron - Drill-down',
      'Chevron_small - Drill-down',
      'Chevron - Back',
      'Chevron_small - Back',
      'Chevron - Drill-in',
      'Chevron_small - Drill-in',
      'Back',
      'Go',
      'Maximize',
      'Minimize',
      'Swipe',
    ],
  },
  {
    file: 'Edit & Settings Icons.svg',
    group: 'Edit',
    names: [
      'Edit',
      'Settings',
      'Import',
      'Share',
      'Upload to Cloud',
      'New',
      'Cut',
      'Copy',
      'Paste',
      'Trash',
      'Sweep',
      'Add',
      'Cross',
      'Cross_small',
      'Undo',
      'Redo',
      'Pin',
    ],
  },
  {
    file: 'Status Icons.svg',
    group: 'Status',
    names: [
      'Glasses',
      'Glasses Battery',
      'Glasses Charging',
      'Case',
      'Case Battery',
      'Case Charging',
      'Brightness',
      'Brightness_Auto',
      'Disconnected',
      'Unbind',
      'Bluetooth',
      'Bluetooth Disconnected',
      'Undisturb',
      'Battery_Full',
      'Battery_75%',
      'Battery_50%',
      'Battery_Low',
      'Battery_Dying',
      '1st Floor',
    ],
  },
  {
    file: 'Health Feature Icon.svg',
    group: 'Health',
    names: [
      'Steps',
      'Stand',
      'Temperature',
    ],
  },
];

const existingNames = new Set();

const toPascalCase = (value) =>
  value
    .replace(/&/g, ' and ')
    .replace(/%/g, ' percent')
    .replace(/[_./-]/g, ' ')
    .replace(/[^a-zA-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const normalizeName = (raw) => {
  const trimmed = raw.trim();
  if (trimmed.startsWith('ic_')) {
    return toPascalCase(trimmed.replace(/^ic_/, ''));
  }
  return toPascalCase(trimmed);
};

const ensureUniqueName = (baseName, group) => {
  let candidate = baseName;
  if (/^[0-9]/.test(candidate)) {
    candidate = `Icon${candidate}`;
  }
  if (!existingNames.has(candidate)) {
    existingNames.add(candidate);
    return candidate;
  }
  candidate = `${group}${candidate}`;
  if (!existingNames.has(candidate)) {
    existingNames.add(candidate);
    return candidate;
  }
  let index = 2;
  while (existingNames.has(`${candidate}${index}`)) {
    index += 1;
  }
  const finalName = `${candidate}${index}`;
  existingNames.add(finalName);
  return finalName;
};

const parseClipPaths = (svg) => {
  const map = new Map();
  const clipRegex = /<clipPath id="([^"]+)">([\s\S]*?)<\/clipPath>/g;
  for (const match of svg.matchAll(clipRegex)) {
    const id = match[1];
    const content = match[2];
    const rectMatch = content.match(/<rect[^>]*>/);
    if (!rectMatch) {
      continue;
    }
    const rect = rectMatch[0];
    const width = parseFloat((rect.match(/width="([^"]+)"/) || [])[1]);
    const height = parseFloat((rect.match(/height="([^"]+)"/) || [])[1]);
    const transformMatch = rect.match(/transform="translate\(([^)]+)\)"/);
    const matrixMatch = rect.match(/transform="matrix\(([^)]+)\)"/);
    let x = 0;
    let y = 0;
    if (transformMatch) {
      const [tx, ty] = transformMatch[1]
        .split(/[ ,]+/)
        .filter(Boolean)
        .map((value) => parseFloat(value));
      x = tx || 0;
      y = ty || 0;
    } else if (matrixMatch) {
      const [a, b, c, d, e, f] = matrixMatch[1]
        .split(/[ ,]+/)
        .filter(Boolean)
        .map((value) => parseFloat(value));
      if (![a, b, c, d, e, f].some((value) => Number.isNaN(value))) {
        if (a === -1 && d === 1 && b === 0 && c === 0) {
          x = (e || 0) - (width || 0);
          y = f || 0;
        } else if (a === 1 && d === 1 && b === 0 && c === 0) {
          x = e || 0;
          y = f || 0;
        }
      }
    }
    map.set(id, { x, y, width, height });
  }
  return map;
};

const stripDefs = (svg) => svg.replace(/<defs>[\s\S]*?<\/defs>/g, '');

const getSvgBounds = (svg) => {
  const tagMatch = svg.match(/<svg[^>]*>/);
  if (!tagMatch) {
    return null;
  }
  const svgTag = tagMatch[0];
  const viewBox = getAttr(svgTag, 'viewBox');
  if (viewBox) {
    const [x, y, width, height] = viewBox
      .split(/[ ,]+/)
      .filter(Boolean)
      .map((value) => parseFloat(value));
    if (![x, y, width, height].some((value) => Number.isNaN(value))) {
      return { x, y, width, height };
    }
  }
  const width = parseFloat(getAttr(svgTag, 'width') || '0');
  const height = parseFloat(getAttr(svgTag, 'height') || '0');
  if (!Number.isNaN(width) && !Number.isNaN(height) && width && height) {
    return { x: 0, y: 0, width, height };
  }
  return null;
};

const findClipGroups = (svg) => {
  const groups = [];
  const openTagRegex = /<g\b[^>]*clip-path="url\(#([^"]+)\)"[^>]*>/g;
  let match;

  while ((match = openTagRegex.exec(svg))) {
    const clipId = match[1];
    const openEnd = match.index + match[0].length;
    const tagRegex = /<\/?g\b[^>]*>/g;
    tagRegex.lastIndex = openEnd;
    let depth = 1;
    let end = null;
    let tagMatch;

    while ((tagMatch = tagRegex.exec(svg))) {
      const tag = tagMatch[0];
      if (tag.startsWith('</g')) {
        depth -= 1;
      } else {
        depth += 1;
      }
      if (depth === 0) {
        end = tagMatch.index;
        break;
      }
    }

    if (end !== null) {
      groups.push({ clipId, start: openEnd, end });
      openTagRegex.lastIndex = openEnd;
    }
  }

  return groups;
};

const normalizeElementTag = (tag) => {
  let normalized = tag;
  normalized = normalized.replace(/fill-rule=/g, 'fillRule=');
  normalized = normalized.replace(/clip-rule=/g, 'clipRule=');
  normalized = normalized.replace(/stroke-width=/g, 'strokeWidth=');
  normalized = normalized.replace(/stroke-linecap=/g, 'strokeLinecap=');
  normalized = normalized.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  normalized = normalized.replace(/clip-path=/g, 'clipPath=');
  normalized = normalized.replace(/\s+fill="[^"]*"/g, (match) =>
    match.includes('fill="none"') ? match : '',
  );
  normalized = normalized.replace(/\s+stroke="[^"]*"/g, ' stroke="currentColor"');
  normalized = normalized.replace(/\s+/g, ' ').trim();
  if (!normalized.endsWith('/>')) {
    normalized = normalized.replace(/>$/, ' />');
  }
  return normalized;
};

const parseElementTags = (svg) => {
  const elements = [];
  const elementRegex =
    /<(path|rect|circle|ellipse|line|polyline|polygon)\b[^>]*>/g;
  let match;
  while ((match = elementRegex.exec(svg))) {
    elements.push({ tag: match[0], index: match.index });
  }
  return elements;
};

const getElementPoint = (tag) => {
  if (tag.startsWith('<rect')) {
    const xMatch = tag.match(/\sx="([^"]+)"/);
    const yMatch = tag.match(/\sy="([^"]+)"/);
    let x = xMatch ? parseFloat(xMatch[1]) : 0;
    let y = yMatch ? parseFloat(yMatch[1]) : 0;
    const transformMatch = tag.match(/transform="translate\(([^)]+)\)"/);
    if (transformMatch) {
      const [tx, ty] = transformMatch[1]
        .split(/[ ,]+/)
        .filter(Boolean)
        .map((value) => parseFloat(value));
      x += tx || 0;
      y += ty || 0;
    }
    if (!Number.isNaN(x) && !Number.isNaN(y)) {
      return { x, y };
    }
  }

  if (tag.startsWith('<path')) {
    const dMatch = tag.match(/\sd="([^"]+)"/);
    if (!dMatch) {
      return null;
    }
    const d = dMatch[1];
    const moveMatch = d.match(/[Mm]\s*([-\d.]+)[ ,]+([-\d.]+)/);
    if (moveMatch) {
      const x = parseFloat(moveMatch[1]);
      const y = parseFloat(moveMatch[2]);
      if (!Number.isNaN(x) && !Number.isNaN(y)) {
        return { x, y };
      }
    }
  }

  return null;
};

const collectElementsByClip = (svg, clipEntries) => {
  const clipIds = new Set(clipEntries.map((entry) => entry.clipId));
  const elementsByClip = new Map(
    clipEntries.map((entry) => [entry.clipId, []]),
  );
  const svgWithoutDefs = stripDefs(svg);
  const groupRanges = findClipGroups(svgWithoutDefs).filter((group) =>
    clipIds.has(group.clipId),
  );
  const elements = parseElementTags(svgWithoutDefs);
  const assigned = new Set();

  elements.forEach((element, index) => {
    const containing = groupRanges.filter(
      (group) => element.index >= group.start && element.index <= group.end,
    );
    if (containing.length === 0) {
      return;
    }
    containing.sort((a, b) => a.end - a.start - (b.end - b.start));
    const target = containing[0];
    if (elementsByClip.has(target.clipId)) {
      elementsByClip.get(target.clipId).push(normalizeElementTag(element.tag));
      assigned.add(index);
    }
  });

  elements.forEach((element, index) => {
    if (assigned.has(index)) {
      return;
    }
    const point = getElementPoint(element.tag);
    if (!point) {
      return;
    }
    const target = clipEntries.find(
      ({ clip }) =>
        point.x >= clip.x &&
        point.x <= clip.x + clip.width &&
        point.y >= clip.y &&
        point.y <= clip.y + clip.height,
    );
    if (target) {
      elementsByClip.get(target.clipId).push(normalizeElementTag(element.tag));
      assigned.add(index);
    }
  });

  return elementsByClip;
};

const getAttr = (source, name) => {
  const match = source.match(new RegExp(`${name}="([^"]+)"`));
  return match ? match[1] : null;
};

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

const parseTextNodes = (svg) => {
  const nodes = [];
  const textRegex = /<text([^>]*)>([\s\S]*?)<\/text>/g;

  for (const match of svg.matchAll(textRegex)) {
    const attrs = match[1];
    const body = match[2];
    const fontSizeRaw = getAttr(attrs, 'font-size');
    const fontSize = fontSizeRaw ? parseFloat(fontSizeRaw) : null;
    const tspans = [...body.matchAll(/<tspan([^>]*)>([\s\S]*?)<\/tspan>/g)];

    if (tspans.length === 0) {
      const textContent = decodeEntities(body.replace(/<[^>]+>/g, ''))
        .replace(/\s+/g, ' ')
        .trim();
      if (!textContent) {
        continue;
      }
      const x = parseFloat(getAttr(attrs, 'x') || '0');
      const y = parseFloat(getAttr(attrs, 'y') || '0');
      nodes.push({ text: textContent, x, y, fontSize });
      continue;
    }

    const tspanText = tspans
      .map((tspan) => decodeEntities(tspan[2].replace(/<[^>]+>/g, '')))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!tspanText) {
      continue;
    }
    const tspanAttrs = tspans[0][1];
    const x = parseFloat(getAttr(tspanAttrs, 'x') || getAttr(attrs, 'x') || '0');
    const y = parseFloat(getAttr(tspanAttrs, 'y') || getAttr(attrs, 'y') || '0');
    nodes.push({ text: tspanText, x, y, fontSize });
  }

  return nodes;
};

const getGroupCenter = (clip) => ({
  x: clip.x + clip.width / 2,
  y: clip.y + clip.height / 2,
  bottom: clip.y + clip.height,
});

const mapLabelsToGroups = (groups, labels) => {
  const used = new Set();
  const mapped = [];

  groups.forEach((groupEntry) => {
    const clip = groupEntry.clip;
    if (!clip) {
      throw new Error(`Missing clip for ${groupEntry.clipId}`);
    }
    const center = getGroupCenter(clip);

    const candidates = labels.map((label, index) => {
      const dy = label.y - center.bottom;
      const dx = Math.abs(label.x - center.x);
      const distance = Math.hypot(dx, dy);
      return { index, label, dy, dx, distance };
    });

    const below = candidates
      .filter((candidate) => candidate.dy >= -1)
      .sort((a, b) => {
        if (a.dy !== b.dy) {
          return a.dy - b.dy;
        }
        return a.dx - b.dx;
      });

    const pickCandidate = (list) =>
      list.find((candidate) => !used.has(candidate.index));

    let selected = pickCandidate(below);
    if (!selected) {
      const nearest = candidates
        .sort((a, b) => a.distance - b.distance)
        .find((candidate) => !used.has(candidate.index));
      selected = nearest || null;
    }

    if (!selected) {
      throw new Error(`No available label for clip ${groupEntry.clipId}`);
    }

    used.add(selected.index);
    mapped.push(selected.label);
  });

  return mapped;
};

const getMedian = (values) => {
  const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (sorted.length === 0) {
    return null;
  }
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

const roundValue = (value) => Math.round(value * 1000) / 1000;

const formatNumber = (value) => {
  const rounded = roundValue(value);
  return `${rounded}`;
};

const buildLabelKey = (text) => normalizeName(text).toLowerCase();

const pickNearest = (value, options) =>
  options.reduce((closest, option) => {
    if (closest === null) {
      return option;
    }
    return Math.abs(option - value) < Math.abs(closest - value) ? option : closest;
  }, null);

const iconEntries = [];

for (const { file, group, names } of config) {
  const svgPath = path.join(assetsDir, file);
  const svg = fs.readFileSync(svgPath, 'utf8');
  const clipMap = parseClipPaths(svg);
  const svgBounds = getSvgBounds(svg);
  let orderedGroups = [...clipMap.entries()]
    .map(([clipId, clip]) => ({ clipId, clip }))
    .filter(({ clip }) => clip)
    .filter(({ clip }) => clip.width <= 64 && clip.height <= 64)
    .filter(({ clip }) => {
      if (!svgBounds) {
        return true;
      }
      const withinX = Math.abs(clip.x - svgBounds.x) <= 0.5;
      const withinY = Math.abs(clip.y - svgBounds.y) <= 0.5;
      const withinWidth = clip.width >= svgBounds.width - 1;
      const withinHeight = clip.height >= svgBounds.height - 1;
      return !(withinX && withinY && withinWidth && withinHeight);
    })
    .sort((a, b) => {
      if (!a.clip || !b.clip) {
        return 0;
      }
      if (a.clip.y !== b.clip.y) {
        return a.clip.y - b.clip.y;
      }
      return a.clip.x - b.clip.x;
    });

  if (names && orderedGroups.length > names.length) {
    orderedGroups = orderedGroups.slice(0, names.length);
  }

  const labels = parseTextNodes(svg).filter((label) => {
    if (label.fontSize === null) {
      return true;
    }
    return label.fontSize <= 12;
  });

  const labelLookup = new Map(
    labels.map((label) => [buildLabelKey(label.text), label]),
  );

  let resolvedLabels = null;
  if (names && names.length > 0) {
    resolvedLabels = names.map((name) => {
      const key = buildLabelKey(name);
      const label = labelLookup.get(key);
      return label ? { ...label, text: name } : { text: name, x: null, y: null };
    });
  } else if (labels.length > 0) {
    resolvedLabels = mapLabelsToGroups(orderedGroups, labels);
  }

  if (!resolvedLabels || resolvedLabels.length === 0) {
    throw new Error(`${file} has no labels or configured names`);
  }

  let labelToGroup = new Map();
  if (labels.length > 0 && orderedGroups.length > 0) {
    try {
      labelToGroup = new Map(
        mapLabelsToGroups(orderedGroups, labels).map((label, index) => [
          buildLabelKey(label.text),
          orderedGroups[index],
        ]),
      );
    } catch (error) {
      if (!names) {
        throw error;
      }
    }
  }

  const elementsByClipOrdered = collectElementsByClip(svg, orderedGroups);
  const elementPoints = parseElementTags(stripDefs(svg))
    .map((element) => getElementPoint(element.tag))
    .filter((point) => point);

  const clipXs = [...new Set(orderedGroups.map(({ clip }) => clip.x))].sort(
    (a, b) => a - b,
  );
  const clipYs = [...new Set(orderedGroups.map(({ clip }) => clip.y))].sort(
    (a, b) => a - b,
  );
  const clipWidths = orderedGroups.map(({ clip }) => clip.width);
  const clipHeights = orderedGroups.map(({ clip }) => clip.height);
  const clipLabelMatches = resolvedLabels
    .map((label) => {
      const key = buildLabelKey(label.text);
      const groupEntry = labelToGroup.get(key);
      if (!groupEntry || label.x === null || label.y === null) {
        return null;
      }
      const elements = elementsByClipOrdered.get(groupEntry.clipId) || [];
      const dx = Math.abs(label.x - groupEntry.clip.x);
      if (elements.length === 0 || dx > groupEntry.clip.width) {
        return null;
      }
      return {
        xOffset: label.x - groupEntry.clip.x,
        yOffset: label.y - groupEntry.clip.y,
      };
    })
    .filter((value) => value !== null);
  const defaultXOffset = getMedian(
    clipLabelMatches.map((match) => match.xOffset),
  );
  const defaultYOffset = getMedian(
    clipLabelMatches.map((match) => match.yOffset),
  );
  const defaultWidth = getMedian(clipWidths) ?? 32;
  const defaultHeight = getMedian(clipHeights) ?? 32;
  const resolvedWithPositions = resolvedLabels.filter(
    (label) => label.x !== null && label.y !== null,
  );
  const useOrderedFallback =
    resolvedWithPositions.length === 0 &&
    orderedGroups.length === resolvedLabels.length;

  const syntheticGroups = [];
  const syntheticByIndex = new Map();
  const groupsForLabels = resolvedLabels.map((label, index) => {
    if (useOrderedFallback && orderedGroups[index]) {
      return orderedGroups[index];
    }
    const key = buildLabelKey(label.text);
    const existing = labelToGroup.get(key);
    if (label.x === null || label.y === null) {
      return existing || null;
    }
    const rawX =
      defaultXOffset === null ? label.x : label.x - defaultXOffset;
    const rawY =
      defaultYOffset === null ? label.y : label.y - defaultYOffset;
    const nearestPoint = elementPoints
      .map((point) => {
        const dy = label.y - point.y;
        const dx = Math.abs(label.x - point.x);
        return { point, dy, dx };
      })
      .filter((entry) => entry.dy >= -1)
      .filter((entry) => entry.dx <= defaultWidth * 2)
      .sort((a, b) => {
        if (a.dy !== b.dy) {
          return a.dy - b.dy;
        }
        return a.dx - b.dx;
      })[0];
    const adjustedRawX =
      nearestPoint && Math.abs(label.x - nearestPoint.point.x) > defaultWidth
        ? nearestPoint.point.x - defaultWidth / 2
        : rawX;
    const nearestX = clipXs.length > 0 ? pickNearest(adjustedRawX, clipXs) : null;
    const nearestY = clipYs.length > 0 ? pickNearest(rawY, clipYs) : null;
    const x =
      nearestX !== null && Math.abs(nearestX - adjustedRawX) <= defaultWidth * 1.5
        ? nearestX
        : adjustedRawX;
    const y =
      nearestY !== null && Math.abs(nearestY - rawY) <= defaultHeight * 1.5
        ? nearestY
        : rawY;
    const clipId = `synthetic_${group}_${index}`;
    const clip = {
      x: roundValue(x),
      y: roundValue(y),
      width: defaultWidth,
      height: defaultHeight,
    };
    const groupEntry = { clipId, clip };
    syntheticGroups.push(groupEntry);
    syntheticByIndex.set(index, groupEntry);
    return existing || groupEntry;
  });

  const elementsByClip = collectElementsByClip(svg, [
    ...orderedGroups,
    ...syntheticGroups,
  ]);

  const selectedGroups = groupsForLabels.map((groupEntry, index) => {
    if (useOrderedFallback && orderedGroups[index]) {
      return orderedGroups[index];
    }
    if (!groupEntry) {
      return null;
    }
    const label = resolvedLabels[index];
    if (label.x === null || label.y === null) {
      return groupEntry;
    }
    const synthetic = syntheticByIndex.get(index);
    const existingElements = groupEntry
      ? elementsByClip.get(groupEntry.clipId) || []
      : [];
    const syntheticElements = synthetic
      ? elementsByClip.get(synthetic.clipId) || []
      : [];
    const alignedExisting =
      groupEntry &&
      label.x !== null &&
      Math.abs(label.x - groupEntry.clip.x) <= groupEntry.clip.width;
    if (syntheticElements.length === 0 && existingElements.length > 0) {
      return groupEntry;
    }
    if (existingElements.length === 0) {
      return synthetic;
    }
    if (!alignedExisting && syntheticElements.length > 0) {
      return synthetic;
    }
    return syntheticElements.length > existingElements.length
      ? synthetic
      : groupEntry;
  });

  if (selectedGroups.some((entry) => !entry || !entry.clip)) {
    throw new Error(`${file} missing clip positions for labels`);
  }

  selectedGroups.forEach((groupEntry, index) => {
    const clip = groupEntry.clip;
    const label = resolvedLabels[index];
    const baseName = `${normalizeName(label.text)}Icon`;
    const componentName = ensureUniqueName(baseName, group);
    const elements = elementsByClip.get(groupEntry.clipId) || [];
    iconEntries.push({
      componentName,
      viewBox: `${formatNumber(clip.x)} ${formatNumber(clip.y)} ${formatNumber(clip.width)} ${formatNumber(clip.height)}`,
      elements,
    });
  });
}

fs.mkdirSync(iconsDir, { recursive: true });

const iconBasePath = path.join(iconsDir, 'icon-base.tsx');
fs.writeFileSync(
  iconBasePath,
  `import * as React from 'react';

export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
  viewBox: string;
}

export const IconBase = React.forwardRef<SVGSVGElement, IconBaseProps>(
  ({ size = 32, title, viewBox, children, ...props }, ref) => {
    const ariaProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true };
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...ariaProps}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    );
  },
);

IconBase.displayName = 'IconBase';
`,
);

for (const { componentName, viewBox, elements } of iconEntries) {
  const fileName = componentName
    .replace(/Icon$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
  const filePath = path.join(iconsDir, `${fileName}.tsx`);
  const elementLines = elements.length
    ? elements.map((tag) => `      ${tag}`).join('\n')
    : '';

  fs.writeFileSync(
    filePath,
    `import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface ${componentName}Props extends Omit<IconBaseProps, 'viewBox'> {}

export const ${componentName} = React.forwardRef<SVGSVGElement, ${componentName}Props>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="${viewBox}" title={title} {...props}>
${elementLines}
    </IconBase>
  ),
);

${componentName}.displayName = '${componentName}';
`,
  );
}

const iconFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith('.tsx'))
  .filter((file) => file !== 'icon-base.tsx' && file !== 'index.ts')
  .sort((a, b) => a.localeCompare(b));

const exports = iconFiles.map(
  (file) => `export * from './${file.replace(/\.tsx$/, '')}';`,
);

fs.writeFileSync(path.join(iconsDir, 'index.ts'), exports.join('\n') + '\n');

console.log(`Generated ${iconEntries.length} icon components.`);
