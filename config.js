var express = require('express');


module.exports = {

    googleApi: ({
        key: process.env.GOOGLEAPIKEY,
        // location是中心點經緯度
        // radius是搜尋範圍
        // type是地點類型
        // keyword是關鍵字
        // key是金鑰
        baseUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
        //maxwidth
        //photoreference
        //key
        photoUrl:'https://maps.googleapis.com/maps/api/place/photo?',
        placeUrl:'https://maps.googleapis.com/maps/api/place/details/json?'
    })
}