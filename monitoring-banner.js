// ============================================================
//  과대광고 모니터링 배너 - jhha-ux.github.io/LWCRAQA
//
//  ① 아래 WEBAPP_URL 을 Apps Script 웹앱 배포 URL로 교체하세요
//  ② 이 파일을 GitHub 저장소 루트에 추가하세요
//  ③ index.html </body> 직전에 추가하세요:
//     <script src="monitoring-banner.js"></script>
// ============================================================

(function () {
  // ▼▼▼ 여기에 Apps Script 웹앱 배포 URL 붙여넣기 ▼▼▼
  const WEBAPP_URL = 'YOUR_APPS_SCRIPT_WEBAPP_URL_HERE';
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  const css = `
    #mon-fab {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
    #mon-btn {
      width: 44px;
      background: #1a2e50;
      border: 1px solid #2d5080;
      border-radius: 10px;
      padding: 10px 0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
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
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
    }
    #mon-btn:hover {
      background: #223a66;
      border-color: #3a7bd5;
      box-shadow: 0 6px 24px rgba(58,123,213,.3);
      transform: scale(1.05);
    }
    #mon-btn .icon { font-size: 18px; writing-mode: horizontal-tb; }
    #mon-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.65);
      z-index: 9100;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(3px);
    }
    #mon-overlay.open { display: flex; }
    #mon-modal {
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
    #mon-modal-head {
      display: flex;
      align-items: center;
      padding: 14px 18px;
      background: #161d2e;
      border-bottom: 1px solid #2a3550;
      gap: 10px;
      flex-shrink: 0;
    }
    #mon-modal-head .title {
      font-size: 15px;
      font-weight: 700;
      color: #e0e8f5;
      font-family: 'Segoe UI', Arial, sans-serif;
    }
    #mon-modal-head .sub {
      font-size: 11px;
      color: #5ba3f5;
      background: #1a2e50;
      border: 1px solid #2d5080;
      padding: 2px 8px;
      border-radius: 10px;
    }
    #mon-close {
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
    #mon-close:hover { color: #d0d8e8; }
    #mon-iframe {
      flex: 1;
      border: none;
      width: 100%;
    }
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

  // 플로팅 버튼
  const fab = document.createElement('div');
  fab.id = 'mon-fab';
  fab.innerHTML = `
    <button id="mon-btn" title="과대광고 모니터링 입력">
      <span class="icon">📋</span>
      모니터링입력
    </button>
  `;

  // 모달
  const overlay = document.createElement('div');
  overlay.id = 'mon-overlay';
  overlay.innerHTML = `
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

  // 토스트
  const toast = document.createElement('div');
  toast.id = 'mon-toast';
  document.body.appendChild(toast);

  document.body.appendChild(fab);
  document.body.appendChild(overlay);

  // 이벤트
  document.getElementById('mon-btn').addEventListener('click', () => {
    const iframe = document.getElementById('mon-iframe');
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = WEBAPP_URL;
    }
    overlay.classList.add('open');
  });

  document.getElementById('mon-close').addEventListener('click', () => {
    overlay.classList.remove('open');
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Apps Script 폼 저장 완료 시 토스트 표시
  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'monitoring-saved') {
      overlay.classList.remove('open');
      toast.textContent = `✅ ${e.data.row}행에 저장되었습니다!`;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
})();
