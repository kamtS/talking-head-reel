# Your reels

Each reel is a folder here, and everything in this folder except this file
is gitignored: recordings, transcripts and timelines are yours, not the
skill's.

```
src/reels/<name>/Reel.tsx             export default <component>, export const DURATION
src/reels/<name>/reel-segments.json   the cut (cut.py rewrites it)
src/reels/<name>/reel-words.json      the captions (cut.py writes it)
public/talk/<name>/ig1080.mp4         the transcoded recording (prep.sh public/talk/<name>)
```

`src/Root.tsx` registers every `src/reels/<name>/Reel.tsx` as a composition
called `<name>` (letters, digits and hyphens only), so

```bash
../scripts/stills.sh <name> src/reels/<name>/reel-segments.json 12.7 14.8
npx remotion render src/index.ts <name> out/<name>.mp4
../scripts/check-cuts.py out/<name>.mp4 src/reels/<name>/reel-segments.json src/reels/<name>/reel-words.json
```

A minimal Reel.tsx with the shared plumbing from `src/talk/reel-kit.tsx`:

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import segSpec from "./reel-segments.json";
import wordsRaw from "./reel-words.json";
import { Big, FONT, Word } from "../../talk/overlays";
import { CARD_X, CARD_Y, ReelCaptions } from "../../talk/reel-overlays";
import { Push, TextEndCard, makeReel } from "../../talk/reel-kit";

const { life, At, Speaker, Outro, DURATION: D } = makeReel(segSpec);
export const DURATION = D;

const SNAPS: [number, number][] = [[10.0, 1.0], [13.4, 1.1]]; // original seconds
const PUSHES: Push[] = [{ at: 21.8, z: 1.1, up: 10, until: 23.2 }];

const Reel: React.FC = () => (
  <AbsoluteFill style={{ background: "#000", fontFamily: FONT }}>
    <Speaker src="talk/<name>/ig1080.mp4" snaps={SNAPS} pushes={PUSHES} origin="50% 29%" />
    <At from={14.7} to={16.0}>
      <Big life={life(14.7, 16.0)} x={CARD_X} y={CARD_Y} text="3 weeks" sub="to ship" size={96} />
    </At>
    <Outro>
      <TextEndCard name="Your Name" line="One line to leave them with." url="yoursite.com" />
    </Outro>
    <ReelCaptions words={wordsRaw as Word[]} />
  </AbsoluteFill>
);
export default Reel;
```
