// eslint-disable-next-line import/no-unresolved
import start from './message/timer.js';

// ポストバックイベントが飛んできた時
export const postbackHandler = async (event) => {
  let message;
  // ポストバックデータをpostbackDataに格納
  const postbackData = event.postback.data;
  // もしevent.postback.paramsが存在する場合
  if (event.postback.params) {
    // 返信するメッセージを作成
    message = {
      type: 'text',
      text: `日時データを受け取りました！\ndata: ${postbackData}\ndatetime: ${event.postback.params.datetime}`,
    };
  } else if (postbackData === 'start') { // もしポストバックデータが'こんにちは'である場合
    const returnmessage = await start();
    message = {
      type: 'text',
      text: `${returnmessage}`,
    };
  } else { // 存在しない場合
    // 返信するメッセージを作成
    message = {
      type: 'text',
      text: `ポストバックデータを受け取りました！\ndata: ${postbackData}`,
    };
  }
  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
