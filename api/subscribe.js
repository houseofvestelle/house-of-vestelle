// House of Vestelle — early-access form catcher.
//
// Receives an email from the coming-soon form and creates the contact in
// GoHighLevel, tagged "HOV" and with Do-Not-Disturb switched ON across every
// channel — so these early-access sign-ups can never receive any email, text,
// or call from the account. Nothing here is visible to the visitor; the form
// still shows its elegant confirmation regardless.
//
// Secrets come from Vercel environment variables (never committed to the repo):
//   GHL_TOKEN     — GoHighLevel Private Integration token
//   GHL_LOCATION  — GoHighLevel location (sub-account) ID

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION;
  if (!token || !locationId) {
    // Misconfigured — but don't leak details to the browser.
    console.error('Missing GHL_TOKEN or GHL_LOCATION env var');
    res.status(500).json({ ok: false, error: 'Not configured' });
    return;
  }

  // Body is auto-parsed by Vercel when Content-Type is application/json.
  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const email = (body.email || '').trim();
  const firstName = (body.firstName || '').trim();
  // Photographer sign-ups (from /for-photographers/) get their own tag + source so
  // the founding-studio list is separable from client early-access in GHL.
  const isPhotographer = body.source === 'for-photographers';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ ok: false, error: 'Invalid email' });
    return;
  }

  // Honeypot: the forms include a hidden "company" field humans never fill.
  // Bots do. Answer 200 (don't tip them off) but create nothing in GHL.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    res.status(200).json({ ok: true });
    return;
  }

  try {
    // Upsert (not create) so a repeat sign-up updates instead of erroring.
    const ghl = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        email,
        firstName: firstName || undefined,
        tags: isPhotographer ? ['HOV', 'HOV-photographer'] : ['HOV'],
        dnd: true, // block all outbound across every channel
        dndSettings: {
          Call:     { status: 'active', message: 'HOV early-access — silent list' },
          Email:    { status: 'active', message: 'HOV early-access — silent list' },
          SMS:      { status: 'active', message: 'HOV early-access — silent list' },
          WhatsApp: { status: 'active', message: 'HOV early-access — silent list' },
          GMB:      { status: 'active', message: 'HOV early-access — silent list' },
          FB:       { status: 'active', message: 'HOV early-access — silent list' },
        },
        source: isPhotographer ? 'Website — For Photographers' : 'Website — Early Access',
      }),
    });

    if (!ghl.ok) {
      const detail = await ghl.text();
      console.error('GHL upsert failed', ghl.status, detail);
      res.status(502).json({ ok: false, error: 'Upstream error' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe error', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
