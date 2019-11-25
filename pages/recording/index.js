let RM = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onStart: function() {
    console.log("==开始==");

    let option = {
      format: 'mp3',         //录音的格式，有aac和mp3两种   
    }
    RM.start(option);
    RM.onStart(() => {
      console.log('录音开始事件')
    });
  },
  onPause:function(){
    console.log("==暂停==")
    RM.pause();
    RM.onPause(() => {
      console.log('录音暂停事件')
    })
  },
  onResume:function(){
    console.log("==继续==")
    RM.resume();
    RM.onResume(() => {
      console.log('录音继续事件')
    })
  },

  onEnd: function() {
    console.log("==结束==")
    RM.stop();
    RM.onStop((res) => {
      console.log(res)
      // res.tempFilePath;//是临时的文件地址
      // res.duration;//录音的时长
      // res.fileSize;//文件的大小
      this.data.url = res.tempFilePath;
    })

  },
  onPlay:function(){

    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.url,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    console.log();
  },
  
})