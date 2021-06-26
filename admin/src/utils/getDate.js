export default function getCurrentTime() {
      var date = new Date();//当前时间
      var month = zeroFill(date.getMonth() + 1);//月
      var day = zeroFill(date.getDate());//日
      var hour = zeroFill(date.getHours());//时
      var minute = zeroFill(date.getMinutes());//分
      var second = zeroFill(date.getSeconds());//秒
      
      //当前时间
      var curTime = date.getFullYear() + "-" + month + "-" + day
              + " " + hour + ":" + minute + ":" + second;
      
      return curTime;
  }