const date =Date.now();

const calcTime= (creationTime)=>{

  let time= Math.floor((date-creationTime)/(60000));

  if(time<=60)return time+' minutes';
  else{
    time=Math.floor(time/60);
    if(time<=24)return time+' hours';
    else{
      time=Math.floor(time/24);
      if(time<=7)return time+' days';
      else{
        time=Math.floor(time/7);
        if(time<=30)return time+' weeks';
        else{
          time=Math.floor(time/30);
          if(time<=12) return time+' months';
          else{
            time=(time/12).toFixed(2);
            return  time + ' years';
          }
        }
      }
    }
  }
}


export default calcTime;