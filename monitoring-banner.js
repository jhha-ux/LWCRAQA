// ============================================================
//  과대광고 모니터링 + 클레임 접수 배너 - jhha-ux.github.io/LWCRAQA
// ============================================================

(function () {
  const WEBAPP_URL   = 'https://script.google.com/macros/s/AKfycbxlX0sJMeRvGv75HP_mQqrWPnzLt7i0vJbRaCQBs2jycal7L1weZHT6Prc-9tEUcmGl/exec';
  const CLAIMS_URL   = WEBAPP_URL + '?form=claims';

  const css = `
    #mon-fab {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    }
    #mon-btn {
      width: auto;
      background: #1a2e50;
      border: 1px solid #2d5080;
      border-radius: 10px;
      padding: 10px 16px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      color: #5ba3f5;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: .02em;
      box-shadow: 0 4px 20px rgba(0,0,0,.5);
      transition: all .2s;
      font-family: 'Segoe UI', Arial, sans-serif;
      white-space: nowrap;
    }
    #mon-btn:hover {
      background: #223a66;
      border-color: #3a7bd5;
      box-shadow: 0 6px 24px rgba(58,123,213,.3);
      transform: scale(1.05);
    }
    #claim-btn {
      width: auto;
      background: #2e1a00;
      border: 1px solid #7a4a00;
      border-radius: 10px;
      padding: 10px 16px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      color: #f5a623;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: .02em;
      box-shadow: 0 4px 20px rgba(0,0,0,.5);
      transition: all .2s;
      font-family: 'Segoe UI', Arial, sans-serif;
      white-space: nowrap;
    }
    #claim-btn:hover {
      background: #3a2200;
      border-color: #d4821a;
      box-shadow: 0 6px 24px rgba(212,130,26,.3);
      transform: scale(1.05);
    }
    #mon-btn .icon, #claim-btn .icon { font-size: 16px; }
    #mon-overlay, #claim-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.65);
      z-index: 9100;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(3px);
    }
    #mon-overlay.open, #claim-overlay.open { display: flex; }
    #mon-modal, #claim-modal {
      background: #0f1623;
      border: 1px solid #2a3550;
      border-radius: 14px;
      width: min(760px, 94vw);
      height: min(90vh, 860px);
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 60px rgba(0,0,0,.7);
      overflow: hidden;
      animation: mon-slide-in .22s ease;
    }
    #claim-modal { border-color: #503a10; }
    @keyframes mon-slide-in {
      from { opacity: 0; transform: translateY(24px) scale(.97); }
      to   { opacity: 1; transform: none; }
    }
    #mon-modal-head, #claim-modal-head {
      display: flex;
      align-items: center;
      padding: 14px 18px;
      background: #161d2e;
      border-bottom: 1px solid #2a3550;
      gap: 10px;
      flex-shrink: 0;
    }
    #claim-modal-head {
      background: #1e1a0f;
      border-bottom-color: #503a10;
    }
    #mon-modal-head .title { font-size: 15px; font-weight: 700; color: #e0e8f5; font-family: 'Segoe UI', Arial, sans-serif; }
    #claim-modal-head .title { font-size: 15px; font-weight: 700; color: #f5e8d0; font-family: 'Segoe UI', Arial, sans-serif; }
    #mon-modal-head .sub {
      font-size: 11px; color: #5ba3f5;
      background: #1a2e50; border: 1px solid #2d5080;
      padding: 2px 8px; border-radius: 10px;
    }
    #claim-modal-head .sub {
      font-size: 11px; color: #f5a623;
      background: #2e1a00; border: 1px solid #7a4a00;
      padding: 2px 8px; border-radius: 10px;
    }
    #mon-close, #claim-close {
      margin-left: auto; background: none; border: none;
      color: #607090; font-size: 20px; cursor: pointer;
      padding: 2px 6px; border-radius: 5px; line-height: 1; transition: color .15s;
    }
    #mon-close:hover, #claim-close:hover { color: #d0d8e8; }
    #mon-iframe, #claim-iframe { flex: 1; border: none; width: 100%; }
    #mon-toast, #claim-toast {
      position: fixed; bottom: 30px; right: 80px;
      background: #0e2e1e; color: #4ade80;
      border: 1px solid #166534; border-radius: 8px;
      padding: 10px 18px; font-size: 13px;
      font-family: 'Segoe UI', Arial, sans-serif;
      z-index: 9999; display: none;
      box-shadow: 0 4px 16px rgba(0,0,0,.4);
    }
    #claim-toast { background: #2e1e00; color: #f5a623; border-color: #7a4a00; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── 플로팅 버튼 컨테이너 ──
  const fab = document.createElement('div');
  fab.id = 'mon-fab';
  fab.innerHTML = `
    <button id="mon-btn" title="과대광고 모니터링 입력">
      <span class="icon">📋</span>과대광고모니터링
    </button>
    <button id="claim-btn" title="클레임 접수 입력">
      <span class="icon">🚨</span>클레임접수
    </button>
  `;

  // ── 과대광고 모달 ──
  const monOverlay = document.createElement('div');
  monOverlay.id = 'mon-overlay';
  monOverlay.innerHTML = `
    <div id="mon-modal">
      <div id="mon-modal-head">
        <span>📋</span>
        <span class="title">과대광고 모니터링 입력</span>
        <span class="sub">식약처 민원 내역</span>
        <button id="mon-close" title="닫기">✕</button>
      </div>
      <iframe id="mon-iframe" src="" allow="clipboard-write"></iframe>
    </div>
  `;

  // ── 클레임 모달 ──
  const claimOverlay = document.createElement('div');
  claimOverlay.id = 'claim-overlay';
  claimOverlay.innerHTML = `
    <div id="claim-modal">
      <div id="claim-modal-head">
        <span>🚨</span>
        <span class="title">클레임 접수 입력</span>
        <span class="sub">QC 클레임 관리</span>
        <button id="claim-close" title="닫기">✕</button>
      </div>
      <iframe id="claim-iframe" src="" allow="clipboard-write"></iframe>
    </div>
  `;

  // ── 토스트 ──
  const monToast   = document.createElement('div'); monToast.id   = 'mon-toast';
  const claimToast = document.createElement('div'); claimToast.id = 'claim-toast';

  document.body.appendChild(monToast);
  document.body.appendChild(claimToast);
  document.body.appendChild(fab);
  document.body.appendChild(monOverlay);
  document.body.appendChild(claimOverlay);

  // ── 이벤트: 과대광고 ──
  document.getElementById('mon-btn').addEventListener('click', () => {
    const iframe = document.getElementById('mon-iframe');
    if (!iframe.src || iframe.src === window.location.href) iframe.src = WEBAPP_URL;
    monOverlay.classList.add('open');
  });
  document.getElementById('mon-close').addEventListener('click', () => monOverlay.classList.remove('open'));
  monOverlay.addEventListener('click', e => { if (e.target === monOverlay) monOverlay.classList.remove('open'); });

  // ── 이벤트: 클레임 ──
  document.getElementById('claim-btn').addEventListener('click', () => {
    const iframe = document.getElementById('claim-iframe');
    if (!iframe.src || iframe.src === window.location.href) iframe.src = CLAIMS_URL;
    claimOverlay.classList.add('open');
  });
  document.getElementById('claim-close').addEventListener('click', () => claimOverlay.classList.remove('open'));
  claimOverlay.addEventListener('click', e => { if (e.target === claimOverlay) claimOverlay.classList.remove('open'); });

  // ── postMessage 수신 ──
  window.addEventListener('message', e => {
    if (!e.data) return;
    if (e.data.type === 'monitoring-saved') {
      monOverlay.classList.remove('open');
      monToast.textContent = `✅ ${e.data.row}행에 저장되었습니다!`;
      monToast.style.display = 'block';
      setTimeout(() => { monToast.style.display = 'none'; }, 3000);
    }
    if (e.data.type === 'claims-saved') {
      claimOverlay.classList.remove('open');
      claimToast.textContent = `✅ 클레임 ${e.data.row}행에 저장되었습니다!`;
      claimToast.style.display = 'block';
      setTimeout(() => { claimToast.style.display = 'none'; }, 3000);
    }
  });

  // ── ESC 닫기 ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      monOverlay.classList.remove('open');
      claimOverlay.classList.remove('open');
    }
  });
})();
