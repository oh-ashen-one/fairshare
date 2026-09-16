"""Update content-hashed URLs after editing static assets."""
from pathlib import Path
import hashlib
import re
root = Path(__file__).resolve().parents[1] / 'dist'
page = root / 'index.html'
def version(match):
    attribute, path = match.group(1), match.group(2)
    digest = hashlib.sha256((root / path).read_bytes()).hexdigest()[:12]
    return f'{attribute}="{path}?v={digest}"'
s = re.sub(r'(src|href|poster|data-src)="((?:assets/)?[a-z-]+\.(?:js|css|jpg|mp4|svg))(?:\?v=[a-f0-9]+)?"', version, page.read_text())
page.write_text(s)
