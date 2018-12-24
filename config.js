var express = require('express');


module.exports = {
    bot: ({
        channelId: process.env.channelId,
        channelSecret: process.env.channelSecret,
        channelAccessToken: process.env.channelAccessToken
    }),


    // location是中心點經緯度
    // radius是搜尋範圍
    // type是地點類型
    // keyword是關鍵字
    // key是金鑰
    googleApi: ({
        key: process.env.GOOGLEAPIKEY,
        baseUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    })
}