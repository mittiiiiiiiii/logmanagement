// eslint-disable-next-line import/no-unresolved
import start, { stop } from './message/timer.js';
import { generateGptResponse } from './generateGptResponse.js';

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
  } else if (postbackData === 'finish') { // もしポストバックデータが'こんにちは'である場合
    const returnmessage = await stop();
    const gptResponse = await generateGptResponse(`ランを${returnmessage}やりました。レビューしてください`);
    message = {
      type: 'text',
      text: `時間 ${returnmessage}\n${gptResponse}`,
    // eslint-disable-next-line no-sequences
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
