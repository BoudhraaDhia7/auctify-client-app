import React, { useState, useEffect } from "react";
import { toUtcDate } from "../../utils/helpers";



type Props = {
    openDate: string;
};

export const LiveCounter = ({ openDate }: Props) => {

    const [ timeDiff, setTimeDiff ] = useState<number>(0);
    const [ timeDiffText, setTimeDiffText ] = useState<string>('');

    const counter = () => {
        const diff = toUtcDate()?.getTime() - toUtcDate(openDate)?.getTime();
        const diffText = (new Date(diff).getUTCHours() >= 10 ? new Date(diff).getUTCHours() : '0'+ new Date(diff).getUTCHours()  )
                         + '' + (new Date(diff).getUTCMinutes() >= 10 ? new Date(diff).getUTCMinutes() : '0'+ new Date(diff).getUTCMinutes()  )
                         + '' + (new Date(diff).getUTCSeconds() >= 10 ? new Date(diff).getUTCSeconds() : '0'+ new Date(diff).getUTCSeconds()  );
        setTimeDiff(diff);
        setTimeDiffText(diffText);
    }

    useEffect(() => {
        counter();
        const interval = setInterval(() => {
            counter();
        }, 1000);
        
          return () => clearInterval(interval);

    }, [])
  
  return (
    <div className="live-counter">
      <div style={{ width : "25%" }}>{timeDiffText.slice(0,2)}</div>
      <div style={{ width : "5%" }}>:</div>
      <div style={{ width : "25%", textAlign: 'center'  }}>{timeDiffText.slice(2,4)}</div>
      <div style={{ width : "5%" }}>:</div>
      <div style={{ width : "25%", textAlign: 'right' }}>{timeDiffText.slice(4,6)}</div>
    </div>
  );
};

export default LiveCounter;
