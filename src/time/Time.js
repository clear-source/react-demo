
class Time{
    /**
     * 获取年月日格式 0000-00-00
     */
    YMDD(){
        let now = new Date();
        let year = now.getFullYear(); //得到年份
        let month = now.getMonth();//得到月份
        let date = now.getDate();//得到日期
	    month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        return `${year}-${month}-${date}`;
    }
    /**
     * 获取时分秒格式00:00:00
     */
    HMS(){
        let now = new Date();
        let hour = now.getHours();//得到小时
        let minu = now.getMinutes();//得到分钟
        let sec = now.getSeconds();//得到秒
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        return `${hour}:${minu}:${sec}`;
    }
}

const time=new Time();

export default time;