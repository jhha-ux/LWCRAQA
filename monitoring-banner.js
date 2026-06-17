// ============================================================
//  과대광고 모니터링 + 클레임접수 + EU PPWR DoC 배너
// ============================================================

(function () {
  const WEBAPP_URL  = 'https://script.google.com/macros/s/AKfycbxlX0sJMeRvGv75HP_mQqrWPnzLt7i0vJbRaCQBs2jycal7L1weZHT6Prc-9tEUcmGl/exec';
    const CLAIMS_URL  = 'https://script.google.com/macros/s/AKfycbxImy7Di8kAB5zLbzaZGMjTKfdTzitrQxQWgkHHhCLnbzt5OACSnuk8w7dYFMfZBtaFjg/exec';
  const DOC_URL     = 'https://script.google.com/macros/s/AKfycbxKQYCQIneUT_7UwCMkFfq0AyKg-GjQI53DB6RIsW2eB6pne7MLM6FguPAfvEoEAqSx/exec';

  const css = `
    /* ── 플로팅 컨테이너 ── */
    #mon-fab {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    /* ── 과대광고 버튼 (파란색) ── */
    #mon-btn {
      background: #1a2e50;
      border: 1px solid #2d5080;
      border-radius: 10px;
      padding: 8px 14px;
            width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
      color: #5ba3f5;
      font-size: 11px;
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
    #mon-btn .icon { font-size: 16px; }

    /* ── 클레임 버튼 (주황색) ── */
    #claim-btn {
      background: #3a1a00;
      border: 1px solid #804020;
      border-radius: 10px;
      padding: 8px 14px;
            width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
      color: #f5a85b;
      font-size: 11px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: .02em;
      box-shadow: 0 4px 20px rgba(0,0,0,.5);
      transition: all .2s;
      font-family: 'Segoe UI', Arial, sans-serif;
      white-space: nowrap;
    }
    #claim-btn:hover {
      background: #4a2500;
      border-color: #d57a3a;
      box-shadow: 0 6px 24px rgba(213,120,58,.3);
      transform: scale(1.05);
    }
    #claim-btn .icon { font-size: 16px; }

    /* ── DoC 버튼 (초록색) ── */
    #doc-btn {
      background: #0a2818;
      border: 1px solid #1a5c3a;
      border-radius: 10px;
      padding: 8px 14px;
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
      color: #3ecf8e;
      font-size: 11px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: .02em;
      box-shadow: 0 4px 20px rgba(0,0,0,.5);
      transition: all .2s;
      font-family: 'Segoe UI', Arial, sans-serif;
      white-space: nowrap;
    }
    #doc-btn:hover {
      background: #0f3820;
      border-color: #2a8a5a;
      box-shadow: 0 6px 24px rgba(62,207,142,.3);
      transform: scale(1.05);
    }
    #doc-btn .icon { font-size: 16px; }

    /* ── 모달 공통 ── */
    .mon-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.65);
      z-index: 9100;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(3px);
    }
    .mon-overlay.open { display: flex; }
    .mon-modal {
      background: #0f1623;
      border: 1px solid #2a3550;
      border-radius: 14px;
      width: min(720px, 94vw);
      height: min(88vh, 820px);
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 60px rgba(0,0,0,.7);
      overflow: hidden;
      animation: mon-slide-in .22s ease;
    }
    @keyframes mon-slide-in {
      from { opacity: 0; transform: translateY(24px) scale(.97); }
      to   { opacity: 1; transform: none; }
    }
    .mon-modal-head {
      display: flex;
      align-items: center;
      padding: 14px 18px;
      background: #161d2e;
      border-bottom: 1px solid #2a3550;
      gap: 10px;
      flex-shrink: 0;
    }
    .mon-modal-head .title {
      font-size: 15px;
      font-weight: 700;
      color: #e0e8f5;
      font-family: 'Segoe UI', Arial, sans-serif;
    }
    .mon-modal-head .sub {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .sub-blue  { color: #5ba3f5; background: #1a2e50; border: 1px solid #2d5080; }
    .sub-orange{ color: #f5a85b; background: #3a1a00; border: 1px solid #804020; }
    .sub-green  { color: #3ecf8e; background: #0a2818; border: 1px solid #1a5c3a; }
    .mon-close {
      margin-left: auto;
      background: none;
      border: none;
      color: #607090;
      font-size: 20px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 5px;
      line-height: 1;
      transition: color .15s;
    }
    .mon-close:hover { color: #d0d8e8; }
    .mon-iframe {
      flex: 1;
      border: none;
      width: 100%;
    }

    /* ── 토스트 ── */
    #mon-toast {
      position: fixed;
      bottom: 30px;
      right: 80px;
      background: #0e2e1e;
      color: #4ade80;
      border: 1px solid #166534;
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 13px;
      font-family: 'Segoe UI', Arial, sans-serif;
      z-index: 9999;
      display: none;
      box-shadow: 0 4px 16px rgba(0,0,0,.4);
    }
  `;

  // 스타일 주입
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── 플로팅 버튼 컨테이너 ──
  const fab = document.createElement('div');
  fab.id = 'mon-fab';
  fab.innerHTML = `
    <button id="mon-btn" title="과대광고 모니터링 입력">
      <span class="icon">🚨</span>과대광고모니터링
    </button>
    <button id="claim-btn" title="클레임 접수 입력">
      <span class="icon">📋</span>클레임접수
    </button>
    <button id="doc-btn" title="EU PPWR PPWR DoC 발행">
      <span class="icon">🇪🇺</span>DoC 발행
    </button>
  `;
  document.body.appendChild(fab);

  // ── 과대광고 모달 ──
  const monOverlay = document.createElement('div');
  monOverlay.id = 'mon-overlay';
  monOverlay.className = 'mon-overlay';
  monOverlay.innerHTML = `
    <div class="mon-modal">
      <div class="mon-modal-head">
        <span>📋</span>
        <span class="title">과대광고 모니터링 입력</span>
        <span class="sub sub-blue">식약처 민원 내역</span>
        <button class="mon-close" title="닫기">✕</button>
      </div>
      <iframe id="mon-iframe" class="mon-iframe" src="" allow="clipboard-write"></iframe>
    </div>
  `;
  document.body.appendChild(monOverlay);

  // ── 클레임 모달 ──
  const claimOverlay = document.createElement('div');
  claimOverlay.id = 'claim-overlay';
  claimOverlay.className = 'mon-overlay';
  claimOverlay.innerHTML = `
    <div class="mon-modal">
      <div class="mon-modal-head">
        <span>🚨</span>
        <span class="title">클레임 접수 입력</span>
        <span class="sub sub-orange">클레임 처리 내역</span>
        <button class="mon-close" title="닫기">✕</button>
      </div>
      <iframe id="claim-iframe" class="mon-iframe" src="" allow="clipboard-write"></iframe>
    </div>
  `;
  document.body.appendChild(claimOverlay);

  // ── DoC 모달 ──
  const docOverlay = document.createElement('div');
  docOverlay.id = 'doc-overlay';
  docOverlay.className = 'mon-overlay';
  docOverlay.innerHTML = `
    <div class="mon-modal">
      <div class="mon-modal-head">
        <span>🇪🇺</span>
        <span class="title">EU PPWR DoC 발행</span>
        <span class="sub sub-green">Regulation (EU) 2025/40</span>
        <button class="mon-close" title="닫기">✕</button>
      </div>
      <iframe id="doc-iframe" class="mon-iframe" src="" allow="clipboard-write"></iframe>
    </div>
  `;
  document.body.appendChild(docOverlay);

  // ── 토스트 ──
  const toast = document.createElement('div');
  toast.id = 'mon-toast';
  document.body.appendChild(toast);

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }

  // ── 이벤트: 과대광고 버튼 ──
  document.getElementById('mon-btn').addEventListener('click', () => {
    const iframe = document.getElementById('mon-iframe');
    if (!iframe.src || iframe.src === window.location.href) iframe.src = WEBAPP_URL;
    monOverlay.classList.add('open');
  });

  // ── 이벤트: 클레임 버튼 ──
  document.getElementById('claim-btn').addEventListener('click', () => {
    const iframe = document.getElementById('claim-iframe');
    if (!iframe.src || iframe.src === window.location.href) iframe.src = CLAIMS_URL;
    claimOverlay.classList.add('open');
  });

  // ── 이벤트: DoC 버튼 ──
  document.getElementById('doc-btn').addEventListener('click', () => {
    const iframe = document.getElementById('doc-iframe');
    if (!iframe.src || iframe.src === window.location.href) iframe.src = DOC_URL;
    docOverlay.classList.add('open');
  });

  // ── 닫기 버튼 ──
  monOverlay.querySelector('.mon-close').addEventListener('click', () => monOverlay.classList.remove('open'));
  claimOverlay.querySelector('.mon-close').addEventListener('click', () => claimOverlay.classList.remove('open'));
  docOverlay.querySelector('.mon-close').addEventListener('click', () => docOverlay.classList.remove('open'));

  // ── 배경 클릭으로 닫기 ──
  monOverlay.addEventListener('click', e => { if (e.target === monOverlay) monOverlay.classList.remove('open'); });
  claimOverlay.addEventListener('click', e => { if (e.target === claimOverlay) claimOverlay.classList.remove('open'); });
  docOverlay.addEventListener('click', e => { if (e.target === docOverlay) docOverlay.classList.remove('open'); });

  // ── ESC 키 ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      monOverlay.classList.remove('open');
      claimOverlay.classList.remove('open');
      docOverlay.classList.remove('open');
    }
  });

  // ── postMessage: 저장 완료 알림 ──
  window.addEventListener('message', e => {
    if (!e.data) return;
    if (e.data.type === 'monitoring-saved') {
      monOverlay.classList.remove('open');
      showToast(`✅ 모니터링 ${e.data.row}행에 저장되었습니다!`);
    }
    if (e.data.type === 'claims-saved') {
      claimOverlay.classList.remove('open');
      showToast(`✅ 클레임 ${e.data.row}행에 저장되었습니다!`);
    }
  });
})();
