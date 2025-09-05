(() => {
  "use strict";

  // ステータスに応じて完了日フィールドを制御する
  const controlCompletionDate = (record) => {
    if (record["status"].value === "完了") {
      record["completionDate"].disabled = false; //活性化
    } else {
      record["completionDate"].disabled = true; //非活性化
      record["completionDate"].value = null; //値をクリア
    }
  };

  // 追加画面、編集画面を開いた時と、ステータスを変更した時に動く
  kintone.events.on(
    [
      "app.record.create.show",
      "app.record.edit.show",
      "app.record.create.change.status",
      "app.record.edit.change.status",
    ],
    (event) => {
      controlCompletionDate(event.record);
      return event;
    }
  );

  // ステータスが完了、かつ、完了日が入っていない時に動く
  const validateCompletionDate = (record) => {
    if (record["status"].value === "完了" && !record["completionDate"].value) {
      return "ステータスが完了の場合は、完了日を入力してください。";
    }
    return "";
  };

  // 追加画面、編集画面で保存するときに動く
  kintone.events.on(
    ["app.record.create.submit", "app.record.edit.submit"],
    (event) => {
      const msg = validateCompletionDate(event.record);
      if (msg) {
        // 画面上部にエラーメッセージを表示
        event.error = msg;
      }
      return event;
    }
  );
})();
