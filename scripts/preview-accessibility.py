"""Local-only QA variants. Does not modify or publish production assets."""
from pathlib import Path
from tempfile import TemporaryDirectory
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import re
import shutil

source = Path(__file__).resolve().parents[1] / 'dist'
with TemporaryDirectory(prefix='fairshare-a11y-') as temp:
    root = Path(temp)
    for mode in ['large-text', 'no-script']:
        folder = root / mode
        shutil.copytree(source, folder)
        page = folder / 'index.html'
        html = page.read_text()
        if mode == 'large-text':
            html = html.replace('</head>', '<style>html{font-size:200%}</style></head>')
        else:
            html = re.sub(r'<script\b[^>]*>.*?</script>', '', html, flags=re.S)
            html = html.replace('<noscript>', '<div>').replace('</noscript>', '</div>')
        page.write_text(html)
    print('QA variants: http://127.0.0.1:4175/large-text/ and /no-script/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4175), partial(SimpleHTTPRequestHandler, directory=temp)).serve_forever()
