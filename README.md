# Expense-tracker
一個簡單的網路記帳工具，使用者可以新增、修改、查看與刪除「支出紀錄」。

# 功能描述
- 本地註冊登入/登出

- facebook登入/登出

- 在首頁一次瀏覽所有支出的清單

- 在首頁看到所有支出清單的總金額

- 新增一筆支出 (資料屬性參見下方規格說明)

- 編輯支出的屬性 (一次只能編輯一筆)

- 刪除任何一筆支出 (一次只能刪除一筆)

- 根據「類別」篩選支出

## 安裝與執行
以下將說明你該如何啟動此專案

1. 打開你的終端機，clone 此專案至本機電腦
```
git clone https://github.com/LinTzuAn/expense-tracker.git
```

2. 進入專案資料夾
```
cd expense-tracker
```

3. 安裝套件
```
npm install
```

4. 新增.env檔案，並根據.env.example檔案內資訊設置環境變數

5. 安裝seed
```
npm run seed
```

6. 執行
```
npm run dev
```

終端機顯示 `Express is running on localhost:3000` 即啟動完成，至[http://localhost:3000](http://localhost:3000)即可開始使用。