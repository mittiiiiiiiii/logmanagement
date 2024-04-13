import start, { connectsql } from '../../../hackthon-server/timer.js';

// データベースに接続
connectsql();

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
  start: async () => {
    await start();
    return {
      type: 'text',
      text: '測定を開始しました',
    };
  },
};
