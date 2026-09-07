#!/usr/bin/env bash
#
# Re-encode the scroll-scrubbed hero clip for instant seeking.
#
# The hero doesn't play the video, it scrubs it: every frame is reached via a
# `currentTime` seek driven by scroll position. With a normal GOP the decoder
# has to jump back to the nearest keyframe and decode forward to reach the
# requested frame, which is what makes scrubbing feel laggy and stuttery —
# and it's worse scrolling up, where every seek decodes forward from a
# keyframe that's behind the target.
#
# So: a keyframe on EVERY frame (-g 1 -keyint_min 1), no B-frames (-bf 0, no
# reordering), and no audio track (-an). Every seek then decodes exactly one
# frame, in either direction. The trade is file size — all-intra H.264 is
# several times larger than a normally-encoded clip of the same content.
#
# Content is unchanged; this only re-encodes. Output replaces the file at the
# same public path, so nothing that references it needs to change.
#
# Usage:  bash scripts/encode-hero.sh

set -euo pipefail

cd "$(dirname "$0")/.."

OUT="public/scroll-solar-flare-clean.mp4"
TMP="public/scroll-solar-flare-clean.tmp.mp4"
SOURCE_4K="public/solar-flare-source.mp4"
OUT_4K="public/scroll-solar-flare-clean-4k.mp4"
TMP_4K="public/scroll-solar-flare-clean-4k.tmp.mp4"

# Prefer a high-res master if one has been added to the repo; otherwise
# re-encode the currently shipped file in place.
if [ -f "$SOURCE_4K" ]; then
  INPUT="$SOURCE_4K"
else
  INPUT="$OUT"
fi

echo "==> Encoding seek-optimised hero video from $INPUT"

ffmpeg -y -i "$INPUT" -an -vf "fps=24" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -bf 0 -crf 20 -preset slow -movflags +faststart \
  "$TMP"
mv -f "$TMP" "$OUT"

echo "==> Wrote $OUT ($(du -h "$OUT" | cut -f1))"

# Only produced when a 4K master is available. ScrollVideoHero selects it at
# viewport widths above 1440px; with no master present the site stays on the
# single file and the component needs no change.
if [ -f "$SOURCE_4K" ]; then
  echo "==> Encoding 4K variant from $SOURCE_4K"

  ffmpeg -y -i "$SOURCE_4K" -an -vf "scale=3840:2160:flags=lanczos,fps=24" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -g 1 -keyint_min 1 -bf 0 -crf 20 -preset slow -movflags +faststart \
    "$TMP_4K"
  mv -f "$TMP_4K" "$OUT_4K"

  echo "==> Wrote $OUT_4K ($(du -h "$OUT_4K" | cut -f1))"
else
  echo "==> No $SOURCE_4K in the repo — skipping the 4K variant."
fi

echo "==> Done."
