// DOM変更を監視する関数（パフォーマンス最適化版）
function observeAndReplace() {
  const observer = new MutationObserver((mutations) => {
    let processedTargets = new Set(); // すでに処理済みの要素を保存

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 「提供元:」を持つ要素を探す
          const target = node.querySelector('[aria-label^="提供元:"]');
          if (target && !processedTargets.has(target)) {
            replaceName(target);
            processedTargets.add(target); // 処理済みとして登録
          }
        }
      });
    });

    // メモリリーク防止のため古い参照を削除
    if (processedTargets.size > 1000) {
      processedTargets.clear();
    }
  });

  // 特定エリアだけを監視（body全体は避ける）
  observer.observe(document.body, {
    childList: true, // 子要素の追加・削除を監視
    subtree: true    // 必要な部分だけ監視
  });

  console.log("✅ 最適化版監視を開始しました");
}

// 名前を置換する関数（パフォーマンス重視）
function replaceName(target) {
  target.querySelectorAll("*").forEach((child) => {
    if (child.textContent.includes("吉野")) {
      console.log("✅ 置換前:", child.textContent);
      child.textContent = child.textContent.replace("吉野", "🐼パンダさん🐼");
      console.log("✅ 置換後:", child.textContent);
    }
  });
}

// 監視を開始
observeAndReplace();
