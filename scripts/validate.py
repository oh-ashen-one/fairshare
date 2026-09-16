"""Dependency-free integrity checks for the public static artifact."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re
import hashlib
from urllib.parse import parse_qs

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.refs = []
        self.prompt = []
        self.in_prompt = False
        self.forms = 0
        self.assets = []
        self.heading_count = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f"Duplicate id: {a['id']}"
            self.ids.add(a['id'])
        if tag == 'pre' and a.get('id') == 'prompt-text':
            self.in_prompt = True
        if tag == 'form': self.forms += 1
        if tag == 'h1': self.heading_count += 1
        for key in ('src', 'href', 'poster', 'data-src'):
            if key in a: self.refs.append(a[key])
        if tag == 'script': self.assets.append(a.get('src', ''))
        if tag == 'link' and a.get('rel') == 'stylesheet': self.assets.append(a.get('href', ''))
    def handle_endtag(self, tag):
        if tag == 'pre': self.in_prompt = False
    def handle_data(self, data):
        if self.in_prompt: self.prompt.append(data)

page = Page()
page.feed((DIST / 'index.html').read_text())
assert page.heading_count == 1, 'Expected one main heading'
assert not page.forms, 'Personal-data forms do not belong on this site'
assert ''.join(page.prompt).strip() == (DIST / 'prompt.txt').read_text().strip(), 'Visible/download prompt mismatch'
for ref in page.refs:
    if ref.startswith('#'):
        assert ref == '#' or ref[1:] in page.ids, f'Broken fragment: {ref}'
    elif not urlsplit(ref).scheme:
        assert (DIST / urlsplit(ref).path).is_file(), f'Missing asset: {ref}'
for asset in page.assets:
    assert asset and not urlsplit(asset).scheme, f'Unexpected external/inline asset: {asset}'
    parts = urlsplit(asset)
    expected = hashlib.sha256((DIST / parts.path).read_bytes()).hexdigest()[:12]
    assert parse_qs(parts.query).get('v') == [expected], f'Stale asset version: {asset}'
js = (DIST / 'app.js').read_text()
for forbidden in ('fetch(', 'XMLHttpRequest', 'sendBeacon', 'localStorage', 'sessionStorage', 'document.cookie', 'clipboard.read'):
    assert forbidden not in js, f'Privacy-sensitive API needs review: {forbidden}'
css = (DIST / 'styles.css').read_text()
assert '@import' not in css and 'url(http' not in css, 'External CSS/font request'
for md in ROOT.rglob('*.md'):
    if '.git' in md.parts or 'node_modules' in md.parts: continue
    for link in re.findall(r'\]\(([^)]+)\)', md.read_text()):
        if urlsplit(link).scheme or link.startswith('#'): continue
        target = (md.parent / link.split('#')[0]).resolve()
        assert target.exists(), f'Broken documentation link in {md.name}: {link}'
required = ['README.md', 'AGENT_GUIDE.md', 'AGENTS.md', 'CLAUDE.md', 'LICENSE', 'docs/SOURCES.md', 'docs/PRIVACY.md', '.cursor/rules/fairshare.mdc']
assert all((ROOT / f).is_file() for f in required)
assert 'https://x.com/ashen_one' in (DIST / 'index.html').read_text()
print('PASS: prompt parity, local assets, anchors, document links, agent entry points, and static privacy checks')
