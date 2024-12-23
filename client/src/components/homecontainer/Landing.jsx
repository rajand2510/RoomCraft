import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Landing = () => {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  const handleHover = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.setAttribute('camera-orbit', '40deg auto auto');
    }
  };

  const handleHoverOut = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.setAttribute('camera-orbit', '0deg auto auto');
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Mobile devices (max-width: 767px)

  return (
    <div className="flex flex-col items-center mt-16 justify-center bg-[#0A3622] min-h-screen">
      
     
      {/* Content Container */}
      <div className="flex flex-col items-center  justify-center w-full gap-12 text-center">
        {/* Left Content */}
        <div className="flex  flex-col items-center relative mb-[460px] justify-center w-full lg:w-1/2 space-y-6">
          <h1 className="text-6xl lg:text-[80px] font-bold text-green-200/40 leading-tight">
            Explore Your Space
          </h1>
          <div className='z-20'>    
                  <div className="text-[30px] align-middle  font-bold text-gray-200/50 z-20 pointer-events-none select-none">
             Visualize Homedecor with
          </div>
          <div className="text-[30px] align-middle  font-bold text-gray-200/50 z-20 pointer-events-none select-none">
              AR on RoomCraft
          </div>
          </div>

        </div>

        {/* Right Content: Model Viewer */}
        <div className="flex absolute mt-24 justify-center items-center">
          <model-viewer
            ref={modelViewerRef}
            src="/models/moby_2_seater_sofa.glb"
            alt="A 3D model of an emerald armchair"
            camera-controls
            environment-image="neutral"
            shadow-intensity="1"
            exposure="1"
            style={{ width: "700px", height: "700px" }}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
          />
        </div>
        
      </div>

      {/* Overlay Text */}
      <div className="absolute top-[350px] right-0 text-[180px] align-middle mr-[105px] font-bold text-gray-200/50 pointer-events-none select-none">
        REALITY CRAFT
      </div>
 

    </div>
    
  );
};

export default Landing;
