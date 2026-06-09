"""
Extracts the figures and the logo from the master illustrations and saves them
as cut-out PNGs (transparent background) under graphics/figures/.

Requirements:  pip install Pillow "rembg[cpu]" onnxruntime

Per element:
  1. take a fixed crop (crop box in pixels of the source file)
  2. remove the background via rembg -> alpha
  3. crop to the visible bounding box (trim transparent margins)
  4. save to graphics/figures/<name>.png

Crop boxes are (left, top, right, bottom) in pixels of the source file
(resolution of the "Resolution" images: ~3309 x 4278).
"""
import os
from PIL import Image
from rembg import remove, new_session

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, "graphics", "Fanni Fuchs und das Fussballfest", "Resolution")
OUT = os.path.join(ROOT, "graphics", "figures")
os.makedirs(OUT, exist_ok=True)

# rembg sessions are created on demand and cached.
_sessions = {}
def get_session(model):
    if model not in _sessions:
        _sessions[model] = new_session(model)
    return _sessions[model]

# name: (source file, crop box left/top/right/bottom, model)
# Note: Alf Affe is extracted from the cover — on the parent-info page the
# segmentation swallows the dark legs/shoes against the grass. The birefnet
# model separates fine/dark regions much more cleanly.
ELEMENTS = {
    "fanni-fuchs":              ("1charakter.png", (150, 1500, 1750, 3450), "isnet-general-use"),
    "freddy-frosch":           ("3elterninfo.png", (40, 1850, 610, 3010), "isnet-general-use"),
    "sofia-schaf":             ("2elterninfo.png", (1809, 2520, 2438, 4281), "isnet-general-use"),
    "alf-affe":                ("0cover.png", (2625, 2400, 3140, 3400), "birefnet-general"),
    "logo-lautstarke-freunde": ("28vorschau.png", (560, 140, 2740, 1190), "isnet-general-use"),
}


def extract(source_file, box, out_name, model="isnet-general-use", pad=20):
    src = Image.open(os.path.join(SRC, source_file)).convert("RGBA").crop(box)
    cut = remove(src, session=get_session(model))
    bbox = cut.getbbox()
    if bbox:
        l, t, r, b = bbox
        cut = cut.crop((max(0, l - pad), max(0, t - pad),
                        min(cut.width, r + pad), min(cut.height, b + pad)))
    cut.save(os.path.join(OUT, out_name + ".png"))
    print(f"{out_name}.png: {cut.size}  (from {source_file})")


if __name__ == "__main__":
    import sys
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for name, (src, box, model) in ELEMENTS.items():
        if only and only != name:
            continue
        extract(src, box, name, model)
