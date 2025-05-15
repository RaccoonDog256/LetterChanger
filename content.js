// DOM変更を監視する関数
function observeAndReplace() {
  // MutationObserverでDOM変更を監視
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // 新たに追加されたノードを確認
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 「提供元:」を持つ要素を探す
          const target = node.querySelector('[aria-label^="提供元:"]');
          if (target) {
            console.log("✅ 動的に「提供元:」が追加されました:", target);
            replaceName(target);
          }
        }
      });
    });
  });

  // body以下を監視（子要素の追加も対象）
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log("✅ 監視を開始しました");
}

// 名前を置換する関数
function replaceName(target) {
  target.querySelectorAll("*").forEach((child) => {
    if (child.textContent.includes("吉野")) {
      console.log("✅ 置換前:", child.textContent);
      child.textContent = child.textContent.replace("吉野 由希", "🐼パンダさん🐼");
      console.log("✅ 置換後:", child.textContent);
    }
  });
}

// 初回にすでにある要素もチェック
document.querySelectorAll('[aria-label^="提供元:"]').forEach(replaceName);

// 監視を開始
observeAndReplace();
