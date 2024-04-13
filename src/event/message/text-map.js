import { generateGptResponse } from './generateGptResponse.js';
import { get } from '../../request.js';

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
  こんにちは: () => ({
    type: 'text',
    text: 'こんにちは！これからあなたの生活をサポートします！',
  }),
  計測: ()=>({
    type:'text',
    text:'tap to start',
    quickReply:{
      items:[
        {
          type:'action',
          action:{
            type:'message',
            text:'start',
            label:'start',
          }
        },
        {
          type:'action',
          action:{
            type:'message',
            text:'finish',
            label:'finish',
          }
        },
        {
          type:'action',
          action:{
            type:'message',
            text:'result',
            label:'result',
          }
        },
        
      ]
    }
  }),
  
start:()=>({
    type:'postback',
    data:'start',
  }),
  finish:()=>({
    type:'postback',
    data:'finish',
  }),
  result:()=>({
    type:'postback',
    data:'result',
  }),
  
  複数メッセージ: () => ([
    {
      type: 'text',
      text: 'Hello, user',
    },
    {
      type: 'text',
      text: 'May I help you?',
    },
  ]),
  テスト: async () => {
    const gptResponse = await generateGptResponse('テスト');
    return {
      type: 'text',
      text: `${gptResponse}`,
    };
  },
  天気予報: async () => {
    // axiosを使ってAPIにGETリクエストを送り、レスポンスのdataを変数resに格納
    const weatherApiRes = (await get('https://www.jma.go.jp/bosai/forecast/data/forecast/070000.json')).data;
    // 返信するメッセージを作成
    return {
      type: 'text',
      text: `【天気予報】
      ${weatherApiRes[0].timeSeries[0].timeDefines[0]}: ${weatherApiRes[0].timeSeries[0].areas[2].weathers[0]} 
      ${weatherApiRes[0].timeSeries[0].timeDefines[1]}: ${weatherApiRes[0].timeSeries[0].areas[2].weathers[1]}
      ${weatherApiRes[0].timeSeries[0].timeDefines[2]}: ${weatherApiRes[0].timeSeries[0].areas[2].weathers[2]}`,
    };
  },
};


