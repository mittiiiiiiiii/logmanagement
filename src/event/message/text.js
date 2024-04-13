import { hasKey } from '../../haskey.js';
import { messageMap } from './text-map.js';
import { generateGptResponse } from './generateGptResponse.js';

export const otherMessage = async (event) => {
  const gptResponse = await generateGptResponse(event.message.text);
  console.log(event.message.text);
  return {
    type: 'text',
    text: `${gptResponse}`,
  };
};

// テキストメッセージの処理をする関数
export const textEvent = async (event, appContext) => {
  // ユーザーから送られてきたメッセージ
  const receivedMessage = event.message.text;

  // 送られてきたメッセージに応じて返信するメッセージを取得してreturn
  if (hasKey(messageMap, receivedMessage)) {
    return messageMap[receivedMessage](event, appContext);
  }

  // 返信するメッセージが存在しない場合
  return otherMessage(event, appContext);
};
