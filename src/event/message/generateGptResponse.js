import axios from 'axios';

// GPT-3 APIを使用してレスポンスを生成する関数

export const generateGptResponse = async (prompt) => {
  // APIリクエストの設定
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };

  // APIリクエストのデータ
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  };

  // APIのURL
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    // APIにリクエストを送信し、レスポンスを受け取る
    const response = await axios.post(url, data, config);
    // レスポンスから生成されたテキストを抽出して返す
    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    // エラーが発生した場合は、そのエラーをコンソールに出力する
    console.error(error);
    return 'エラーが発生しました';
  }
};
