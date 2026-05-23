<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>We’ll be back soon — Maintenance mode</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="theme-color" content="#0ea5e9" />
  <style>
    :root{
      --bg1:#0ea5e92a; --bg2:#22c55e22; --card:#ffffff; --text:#0f172a; --muted:#64748b;
      --accent:#0ea5e9; --ok:#22c55e; --ring:#e2e8f0;
    }
    @media (prefers-color-scheme: dark){
      :root{ --card:#0b1220; --text:#e5e7eb; --muted:#94a3b8; --ring:#1f2937;}
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0; font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji";
      color:var(--text);
      background:
        radial-gradient(60vw 60vw at -10% -20%, var(--bg1), transparent 60%),
        radial-gradient(50vw 50vw at 110% -10%, var(--bg2), transparent 55%),
        linear-gradient(180deg, #ffffff05, #ffffff05);
      display:grid; place-items:center; padding:24px;
    }

    .wrap{
      width:100%; max-width:780px;
      background:var(--card); border:1px solid var(--ring);
      border-radius:20px; padding:28px;
      box-shadow:0 20px 60px rgba(2,6,23,.12), inset 0 1px 0 rgba(255,255,255,.06);
    }

    .brand{
      display:flex; align-items:center; gap:12px; margin-bottom:8px;
    }
    .brand-logo{
      width:44px; height:44px; border-radius:12px; display:grid; place-items:center;
      background:conic-gradient(from 180deg, var(--accent), var(--ok)); color:white; font-weight:800;
      box-shadow:0 6px 18px rgba(14,165,233,.25);
    }
    h1{
      font-size:clamp(22px, 2.6vw, 30px); margin:8px 0 6px; line-height:1.2;
    }
    p.sub{
      margin:0 0 18px; color:var(--muted); font-size:15px;
    }
    .panel{
      display:grid; gap:14px; margin-top:10px;
    }
    .status{
      display:flex; align-items:center; gap:10px; padding:12px 14px; border:1px dashed var(--ring);
      border-radius:12px; background:rgba(2,6,23,.02);
    }
    .dot{
      width:12px; height:12px; border-radius:50%;
      background:radial-gradient(circle at 30% 30%, #fff8, #fff0), var(--ok);
      box-shadow:0 0 0 0 rgba(34,197,94,.5);
      animation:pulse 1.8s infinite;
    }
    @keyframes pulse{
      0%{ box-shadow:0 0 0 0 rgba(34,197,94,.5) }
      70%{ box-shadow:0 0 0 12px rgba(34,197,94,0) }
      100%{ box-shadow:0 0 0 0 rgba(34,197,94,0) }
    }

    .progress{
      display:flex; align-items:center; gap:10px;
    }
    .spinner{
      width:18px; height:18px;
      border:2.5px solid transparent; border-top-color:var(--accent); border-right-color:var(--accent);
      border-radius:50%; animation:spin .9s linear infinite;
    }
    @keyframes spin{ to{ transform:rotate(360deg) } }

    .timer{
      display:flex; gap:10px; flex-wrap:wrap; margin-top:4px;
    }
    .pill{
      border:1px solid var(--ring); border-radius:10px; padding:8px 10px; min-width:66px; text-align:center;
    }
    .pill b{ display:block; font-size:18px; line-height:1.1 }
    .pill small{ color:var(--muted); font-size:11px }

    .actions{ display:flex; gap:10px; flex-wrap:wrap; margin-top:14px }
    .btn{
      appearance:none; border:none; border-radius:10px; padding:10px 14px; font-weight:600; cursor:pointer;
      background:var(--accent); color:#fff; box-shadow:0 8px 20px rgba(14,165,233,.25);
    }
    .btn.secondary{
      background:transparent; color:var(--text); border:1px solid var(--ring);
      box-shadow:none;
    }
    .meta{
      margin-top:14px; font-size:13px; color:var(--muted);
    }
    .hr{ height:1px; background:var(--ring); margin:18px 0 12px; border-radius:1px }

    .i{
      width:16px; height:16px; display:inline-block; vertical-align:-3px; margin-right:6px; opacity:.9;
      background:
        radial-gradient(circle at 30% 30%, #fff8, #fff0),
        linear-gradient(180deg, var(--accent), #0284c7);
      -webkit-mask: var(--mask) center/contain no-repeat;
              mask: var(--mask) center/contain no-repeat;
    }
    .i-mail{ --mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="%23fff" d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm.7 2.2 4.9 3.3a1 1 0 0 0 1.1 0l4.9-3.3V12H2.7V5.2zm10.5-1.2H2.8l5.2 3.5L13.2 4z"/></svg>'); }
    .i-phone{ --mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="%23fff" d="M11.6 10.8c-.5.5-1.1.9-1.8 1.2-.6.3-1.3.5-2 .6-1.2-.7-2.3-1.6-3.2-2.6-.9-.9-1.8-2-2.5-3.1.1-.7.3-1.4.6-2 .3-.7.7-1.3 1.2-1.8l.7-.7c.3-.3.8-.3 1.1 0l1.4 1.4c.3.3.3.8 0 1.1L6.2 5c-.2.2-.2.5-.1.7.5.9 1.2 1.8 2 2.6.8.8 1.7 1.5 2.6 2 .3.1.5.1.7-.1l.7-.7c.3-.3.8-.3 1.1 0l1.4 1.4c.3.3.3.8 0 1.1l-.7.7z"/></svg>'); }
    .i-clock{ --mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="%23fff" d="M8 1.333A6.667 6.667 0 1 0 8 14.667 6.667 6.667 0 0 0 8 1.333zm0 1.334A5.333 5.333 0 1 1 8 12.667 5.333 5.333 0 0 1 8 2.667zm.667 2A.667.667 0 0 0 8 5.333V8a.667.667 0 0 0 .196.471l2 2a.667.667 0 1 0 .943-.943L8.667 7.724V5.333z"/></svg>'); }

    /* Small screens */
    @media (max-width:480px){
      .wrap{ padding:20px; border-radius:16px }
      .status{ padding:10px 12px }
      .pill{ min-width:54px; padding:7px 8px }
    }
  </style>
</head>
<body>
  <main class="wrap" role="main" aria-labelledby="title">
    <div class="brand">
      <div class="brand-logo" aria-hidden="true">PB</div>
      <div>
        <div style="font-weight:700; letter-spacing:.2px">Parisbeautybd.com</div>
        <div style="font-size:12px; color:var(--muted)">Bangladesh</div>
      </div>
    </div>

    <h1 id="title">We’re working on it</h1>
    <p class="sub">
      Our website is temporarily down for maintenance. We’ll be back shortly. Thanks for your patience!<br/>
      <span lang="bn">ওয়েবসাইটে সাময়িক কাজ চলছে। অল্প সময়েই ফিরে আসছি—ধন্যবাদ!</span>
    </p>

    <section class="panel" aria-live="polite">
      <div class="status">
        <span class="dot" aria-hidden="true"></span>
        <div>
          <strong>Status:</strong> Maintenance in progress
          <div class="progress"><span class="spinner" aria-hidden="true"></span> Applying updates…</div>
        </div>
      </div>

      <!-- Optional countdown: set data-end to your target UTC or local ISO time -->
      <div class="timer" id="countdown" data-end="">
        <!-- If you want a timer, set e.g. data-end="2025-10-01T18:00:00+06:00" -->
      </div>

      <div class="hr"></div>

      <div class="meta">
        <div><span class="i i-clock"></span> Typical window: 15–30 minutes. If it takes longer, we’ll post an update.</div>
        <div>Need urgent access (admin/merchant)? Reach out and we’ll help right away.</div>
      </div>
    </section>
  </main>

  <script>
    // Lightweight countdown (optional). Put an ISO string in #countdown[data-end]
    (function(){
      const el = document.getElementById('countdown');
      if(!el) return;
      const endAttr = el.getAttribute('data-end');
      if(!endAttr) return;

      const end = new Date(endAttr).getTime();
      if(isNaN(end)) return;

      function pad(n){ return n.toString().padStart(2,'0'); }
      function tick(){
        const now = Date.now();
        let diff = Math.max(0, end - now);
        const d = Math.floor(diff / 86400000); diff %= 86400000;
        const h = Math.floor(diff / 3600000);  diff %= 3600000;
        const m = Math.floor(diff / 60000);    diff %= 60000;
        const s = Math.floor(diff / 1000);

        el.innerHTML = `
          <div class="pill"><b>${pad(d)}</b><small>Days</small></div>
          <div class="pill"><b>${pad(h)}</b><small>Hours</small></div>
          <div class="pill"><b>${pad(m)}</b><small>Minutes</small></div>
          <div class="pill"><b>${pad(s)}</b><small>Seconds</small></div>
        `;
        if(end - now <= 0){ clearInterval(t); el.innerHTML = '<div class="pill"><b>00:00</b><small>Back soon</small></div>'; }
      }
      tick();
      const t = setInterval(tick, 1000);
    })();
  </script>
</body>
</html>