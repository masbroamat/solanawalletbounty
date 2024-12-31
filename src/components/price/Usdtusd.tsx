import { useEffect, useState } from "react";
import { MiniChart } from "react-ts-tradingview-widgets";
import "../../../public/css/price.css";

export default function Usdtusd() {
  const [chartWidth, setChartWidth] = useState("330%");
  const [chartHeight, setChartHeight] = useState("60%");
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 320) {
          setChartWidth("90%");
          setChartHeight("30%");
        } if (window.innerWidth < 768) {
          setChartWidth("200%");
          setChartHeight("30%");
        } if (window.innerWidth <  1482) {
          setChartWidth("330%");
          setChartHeight("30%");
        }  else {
          setChartWidth("330%");
          setChartHeight("60%");
        } 
       
      
      };
  
      // Initial check
      handleResize();
  
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    return (
      <main>
          <div className="chart">
            <h1 className="  mb-5">USDT/USD</h1> 
            <MiniChart colorTheme="dark" width={chartWidth} height={chartHeight} symbol="COINBASE:USDTUSD"></MiniChart>
          </div>
        </main>
    )
  }
  