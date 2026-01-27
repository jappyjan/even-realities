# Even Realities UI

Foundation UI package for building apps on the Even Realities Hub, aligned to Even Realities design guidelines.

## Package

Single package with clear entrypoints:

- `@jappyjan/even-realities-ui` (recommended default)
- `@jappyjan/even-realities-ui/components`
- `@jappyjan/even-realities-ui/icons`
- `@jappyjan/even-realities-ui/tokens`

## Usage

```ts
import { Button } from '@jappyjan/even-realities-ui';
import { IconBase } from '@jappyjan/even-realities-ui/icons';
```

## Design guidelines

- Components should consume shared tokens (colors, spacing, typography) rather than hardcoding values.
- Icons should come from the curated set in this package.