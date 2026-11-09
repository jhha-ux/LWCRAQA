// ============================================================
//  금지표현 DB 배너 (과대광고모니터링·클레임접수·DoC발행은 portal.html로 이전)
// ============================================================

(function () {
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
      gap: 10px;
    }

    #db-btn {
      background: #3a0a0a;
      border: 1px solid #802020;
      border-radius: 10px;
      padding: 8px 14px;
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
      color: #f55b5b;
      font-size: 11px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: .02em;
      box-shadow: 0 4px 20px rgba(0,0,0,.5);
      transition: all .2s;
      font-family: 'Segoe UI', Arial, sans-serif;
      white-space: nowrap;
    }
    #db-btn:hover {
      background: #4a1010;
      border-color: #d53a3a;
      box-shadow: 0 6px 24px rgba(213,58,58,.3);
      transform: scale(1.05);
    }
    #db-btn .icon { font-size: 16px; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const fab = document.createElement('div');
  fab.id = 'mon-fab';
  fab.innerHTML = `
    <button id="db-btn" title="화장품 과대광고 금지표현 검색 DB">
      <span class="icon">🚫</span>금지표현 DB
    </button>
  `;
  document.body.appendChild(fab);

  document.getElementById('db-btn').addEventListener('click', () => {
    window.open('./kca-search.html?v=2', '_blank');
  });
})();
