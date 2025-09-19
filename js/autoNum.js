(() => {
  "use strict";

  const ITEM_ID_FIELD = "itemId"; // フィールドコード
  const PREFIX = "ID_";
  const PAD_LENGTH = 4; // 連番の桁数

  // レコード追加画面で自動採番
  kintone.events.on("app.record.create.show", async (event) => {
    try {
      // 既存レコードのうち、最大のアイテムIDを取得
      const resp = await kintone.api(kintone.api.url("/k/v1/records"), "GET", {
        app: kintone.app.getId(),
        fields: [ITEM_ID_FIELD],
        query: `order by ${ITEM_ID_FIELD} desc limit 1`,
      });

      let maxIdNum = 0;

      if (resp.records.length > 0) {
        const latestItemId = resp.records[0][ITEM_ID_FIELD].value;
        // 最大のアイテムIDから数字部分のみ抽出
        const numPart = parseInt(latestItemId.replace(PREFIX, ""), 10);
        if (!isNaN(numPart)) {
          maxIdNum = numPart;
        }

        const newIdNum = maxIdNum + 1;
        // 新しいアイテムIDを（ID_××××）の形式で作成
        const newItemId = PREFIX + String(newIdNum).padStart(PAD_LENGTH, "0");
        // 新しいアイテムIDをアイテムIDフィールドにセット
        event.record[ITEM_ID_FIELD].value = newItemId;
        event.record[ITEM_ID_FIELD].disabled = true;
      }
    } catch (error) {
      console.error("自動採番でエラーが発生しました", error);
      alert("アイテムIDの自動採番に失敗しました。");
    }
    return event;
  });

  // 編集画面とインライン編集で編集不可
  kintone.events.on(
    ["app.record.edit.show", "app.record.index.edit.show"],
    (event) => {
      if (event.record[ITEM_ID_FIELD].value) {
        event.record[ITEM_ID_FIELD].disabled = true;
      }
      return event;
    }
  );
})();
