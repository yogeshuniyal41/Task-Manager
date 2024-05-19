import React from 'react'

const Dots = () => {
    const dots = Array.from({ length: 42 }).map((_, index) => (
      <div key={index} className="w-[13.69px] h-[13.69px] bg-blue-500 bg-opacity-50 rounded-[6.85px]"></div>
    ));
  
    return <>
      <div className="w-[178px] h-[150.62px] mt-[140px] ml-[1600px] absolute grid grid-cols-7">
        {dots}
      </div>
  
      <div className="w-[178px] h-[150.62px] mt-[550px] ml-[180px] absolute grid grid-cols-7">
        {dots}
      </div>
      <div className="w-[92px] h-[18px] mt-[300px] ml-[640px] text-3xl font-bold  leading-tight tracking-tighter text-blue-400 absolute">Logo</div>
    </>
  };

export const Auth = (props) => {
  return (
    <div className='z-5' >
        <div className="w-[300px] h-[300px]  bg-blue-300 absolute rounded-br-[150px] rounded-bl-[150px] rounded-tr-[150px] " style={{marginLeft:'-44px',marginTop:'-45px' }}  ></div>
        <div className="w-[300px] h-[300px]  bg-blue-300 absolute rounded-tl-[150px] rounded-tr-[150px] rounded-bl-[150px] " style={{ marginTop: '800.94px', marginLeft: '2025px',}}></div>
        <div 
        style={{width: '1950px',
        height: '800px',
        marginTop: '120px',
        marginLeft: '164px',
        borderRadius: '20px',
        opacity: 0.26,
        background: "rgba(206, 243, 255, 1)",
        position: "absolute",
        boxShadow: '0px 4px 22px 0px rgba(178, 223, 255, 1)'}} >
          
        
        <Dots/> 

        {props.children}

        </div>
        
        
        

    </div>
  )
}
