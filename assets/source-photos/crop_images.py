"""Crop the magazine photos to the painting edges and export web-sized JPEGs.

Source photos: yathraemagazine.com, "Renowned Artist K. Balasubramanian".
Run from anywhere: python assets/source-photos/crop_images.py
Writes public/paintings/balu-painting-NN.jpg and balu-portrait.jpg, plus a
contact_sheet.jpg next to this script for checking the crops.
"""

import json
import os

from PIL import Image, ImageChops, ImageOps, ImageStat

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..", "..", "public", "paintings")
SRC = HERE
SCRATCH = HERE

PAINTINGS = [
    "20231208_133430",
    "20231208_133146",
    "20231208_133357",
    "20231208_133334",
    "20231208_133230",
    "20231208_133309",
    "20231208_134120",
    "20231208_134036",
]
PORTRAIT = "20231208_133518"
MAX_EDGE = 1600


def content_box(img, search=0.35):
    """Painting bounds, found as the sharpest step in colour near each side.

    The mat around each photographed painting has a soft shadow gradient, so
    a fixed threshold drifts. Instead, average the colour difference from the
    mat along every row and column, smooth it, and take the steepest rise
    (entering the paper) in the outer `search` fraction of each side.
    If no clear step exists on a side (the photo is already tight to the
    painting), that side is left uncropped.
    """
    rgb = img.convert("RGB")
    w, h = rgb.size
    corners = [rgb.getpixel((2, 2)), rgb.getpixel((w - 3, 2)), rgb.getpixel((2, h - 3)), rgb.getpixel((w - 3, h - 3))]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))
    diff = ImageChops.difference(rgb, Image.new("RGB", rgb.size, bg)).convert("L")

    rows = [ImageStat.Stat(diff.crop((0, y, w, y + 1))).mean[0] for y in range(h)]
    cols = [ImageStat.Stat(diff.crop((x, 0, x + 1, h))).mean[0] for x in range(w)]

    def smooth(v, k=3):
        return [sum(v[max(0, i - k) : i + k + 1]) / len(v[max(0, i - k) : i + k + 1]) for i in range(len(v))]

    def edges(v, min_step=2.5):
        v = smooth(v)
        n = len(v)
        span = int(n * search)
        gap = 6
        rise = [(v[i + gap] - v[i], i + gap) for i in range(0, span)]
        fall = [(v[i - gap] - v[i], i - gap) for i in range(n - 1, n - 1 - span, -1)]
        best_rise = max(rise)
        best_fall = max(fall)
        start = best_rise[1] if best_rise[0] >= min_step else 0
        end = best_fall[1] + 1 if best_fall[0] >= min_step else n
        return start, end

    left, right = edges(cols)
    top, bottom = edges(rows)
    return left, top, right, bottom, bg


def fit(img):
    img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    return img


# Paper edges measured by eye on each photo (left, top, right, bottom). Auto
# detection kept locking onto the drawings' own borders, since the cream paper
# is so close in tone to the mat. Photos 7 and 8 have no mat, only a thin rim.
MANUAL_BOXES = {
    "20231208_133430": (93, 107, 876, 1273),
    "20231208_133146": (68, 87, 612, 838),
    "20231208_133357": (100, 70, 848, 1314),
    "20231208_133334": (84, 103, 887, 1230),
    "20231208_133230": (56, 110, 892, 1230),
    "20231208_133309": (103, 96, 762, 1248),
}

report = []
for i, name in enumerate(PAINTINGS, start=1):
    img = ImageOps.exif_transpose(Image.open(os.path.join(SRC, name + ".jpg")))
    if name in MANUAL_BOXES:
        l, t, r, b = MANUAL_BOXES[name]
    else:
        l, t, r, b, _ = content_box(img)
    inset = 5  # trim a hair inside the edge so no sliver of mat remains
    box = (l + inset, t + inset, r - inset, b - inset)
    cropped = fit(img.crop(box))
    out = f"balu-painting-{i:02d}.jpg"
    cropped.save(os.path.join(ROOT, out), "JPEG", quality=86, optimize=True, progressive=True)
    report.append({"file": out, "original": img.size, "crop": box, "final": cropped.size, "aspect": round(cropped.size[0] / cropped.size[1], 4)})

# Portrait: 4:5 crop, face left of centre with the wall of framed works behind.
p = ImageOps.exif_transpose(Image.open(os.path.join(SRC, PORTRAIT + ".jpg")))
pw, ph = p.size
crop_w = round(ph * 4 / 5)
x0 = 60
portrait = fit(p.crop((x0, 0, x0 + crop_w, ph)))
portrait.save(os.path.join(ROOT, "balu-portrait.jpg"), "JPEG", quality=86, optimize=True, progressive=True)
report.append({"file": "balu-portrait.jpg", "original": p.size, "crop": (x0, 0, x0 + crop_w, ph), "final": portrait.size, "aspect": round(portrait.size[0] / portrait.size[1], 4)})

# Contact sheet, with a grey backdrop so crop edges are easy to judge.
sheet = Image.new("RGB", (5 * 340, 2 * 420), (120, 120, 120))
for idx, rec in enumerate(report):
    t = Image.open(os.path.join(ROOT, rec["file"]))
    t.thumbnail((320, 400))
    sheet.paste(t, (10 + (idx % 5) * 340, 10 + (idx // 5) * 420))
sheet.save(os.path.join(SCRATCH, "contact_sheet.jpg"), quality=85)

print(json.dumps(report, indent=1))
