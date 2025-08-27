(() => {
  "use strict";

  //一覧画面を表示した時
  kintone.events.on("app.record.index.show", (event) => {
    // 一覧のhtmlが全て描画されるのを待つためsetTimeoutを使う
    setTimeout(() => {
      const rows = document.querySelectorAll("table.recordlist-gaia tbody tr");
      // 各レコードを確認し、ステータスが「完了」であれば背景色をグレーにする
      event.records.forEach((record, index) => {
        if (record["status"].value === "完了") {
          const row = rows[index];
          if (row) {
            row.style.backgroundColor = "#bdbdbd";
          }
        }
      });
    }, 100);
    return event;
  });
})();
