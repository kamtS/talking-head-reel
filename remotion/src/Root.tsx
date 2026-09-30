import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { REEL_DURATION, TalkReel } from "./talk/Reel";

// Your own reels live in src/reels/<name>/Reel.tsx (gitignored, see
// src/reels/README.md). Each one is registered as a composition named after
// its folder, so several reels share one project and one `npm install`.
type ReelModule = { default: React.FC; DURATION: number };
declare const require: { context: (dir: string, deep: boolean, re: RegExp) => { keys(): string[]; (k: string): ReelModule } };
const ctx = require.context("./reels", true, /^\.\/[^/]+\/Reel\.tsx$/);
const reels = ctx.keys().map((k) => ({ id: k.split("/")[1], mod: ctx(k) }));

export const Root: React.FC = () => (
  <>
    <Composition id="TalkReel" component={TalkReel} durationInFrames={REEL_DURATION} fps={30} width={1080} height={1920} />
    {reels.map(({ id, mod }) => (
      <Composition key={id} id={id} component={mod.default} durationInFrames={mod.DURATION} fps={30} width={1080} height={1920} />
    ))}
  </>
);
