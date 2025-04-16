
# 🤝 貢獻指南（Contributing Guide）

感謝你對本專案的關注與貢獻 💜  
請在進行開發或提交 Pull Request 前，閱讀以下協作規則，讓我們一起打造高品質的 YouBike 專案 🚲

---

## 📌 專案分支策略

| 分支名稱 | 用途說明 |
|----------|-----------|
| `main`   | ✅ **正式發佈用分支**，已部署至線上環境，不可直接推送 |
| `dev-*`  | 🔧 各自功能或 Bug 修復開發分支，請依照功能命名（如 `dev-login`, `dev-stationAPI`） |

---

## 🔒 分支保護規則

- ✅ **不得直接 push 到 `main`**
- ✅ 所有改動需透過 **Pull Request（PR）**
- ✅ 每個 PR 須至少一人審核（Approvals）後方可合併
- ✅ 若 PR 被退回，需修正並再次發起審查
- ✅ Push secret、token、service-account 檔案會自動被 GitHub 阻擋

---

## 🧰 開發環境設定

1. 請確認 Node.js / npm 已安裝
2. clone 本專案：  
   ```bash
   git clone https://github.com/JoyChienfe/YouBike.git
   ```
3. 安裝相依套件：  
   ```bash
   npm install
   ```

---

## 🛠️ 建議流程

```bash
# 從 main 拉出分支
git checkout -b dev-feature-name

# 編寫功能與 commit
git add .
git commit -m "feat: 新增站點查詢功能"

# 推送上 GitHub
git push origin dev-feature-name

# 到 GitHub 開 Pull Request
```

---

## 🧼 Commit 命名建議（可參考）

| 類型 | 說明 |
|------|------|
| `feat:` | 新功能 |
| `fix:`  | 修復 Bug |
| `chore:` | 小修改（格式優化、註解等） |
| `docs:` | 文件更新 |
| `test:` | 測試相關 |
| `refactor:` | 重構、不影響功能行為 |

---

## 🙌 協作小提醒

- 請務必 **勿將 `.env` 或 `*.json` 機密檔案推上 Git**
- 建議 `.env` 透過私訊方式提供給團隊使用者
- 若有任何問題請先開 issue 討論唷 💬

---

讓我們一起保持乾淨、穩定又可愛的程式庫吧！🌈  
歡迎你的貢獻 🎉

— Joy 與 YouBike 前端團隊 🚲

🧪 測試 Pull Request 流程中！
