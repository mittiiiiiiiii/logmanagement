// eslint-disable-next-line import/named, no-unused-vars
import start from './timer.js';

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
  こんにちは: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  start: async () => {
    await start();
    return {
      type: 'text',
      text: '計測をスタートしました！',
    };
  },
};
