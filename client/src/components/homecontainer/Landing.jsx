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
    <div>
    <div className="flex flex-col items-center mt-16 justify-center bg-[#0A3622] min-h-screen">
      {/* Content Container */}
      <div className="flex flex-col items-center justify-center w-full gap-12 text-center">
        {/* Left Content */}
        <div
          className={`flex flex-col items-center relative mb-[460px] justify-center w-full ${isMobile ? 'space-y-4' : 'lg:w-1/2 space-y-6'
            }`}
        >
          <h1
            className={`text-4xl lg:text-[80px] font-bold text-green-200/40 leading-tight ${isMobile ? 'text-5xl' : 'text-6xl'
              }`}
          >
            Explore Your Space
          </h1>
          <div className="z-20">
            <div
              className={`text-[24px] align-middle font-bold text-gray-200/50 z-20 pointer-events-none select-none ${isMobile ? 'text-[20px]' : 'text-[30px]'
                }`}
            >
              Visualize Homedecor with
            </div>
            <div
              className={`text-[24px] align-middle font-bold text-gray-200/50 z-20 pointer-events-none select-none ${isMobile ? 'text-[20px]' : 'text-[30px]'
                }`}
            >
              AR on RoomCraft
            </div>
          </div>
        </div>

        {/* Right Content: Model Viewer */}
        <div
          className={`flex absolute mt-24 justify-center items-center ${isMobile ? 'w-full' : ''
            }`}
        >
          <model-viewer
            ref={modelViewerRef}
            src="/models/moby_2_seater_sofa.glb"
            alt="A 3D model of an emerald armchair"
            disable-camera-controls
            disable-rotate
            disable-zoom
            environment-image="neutral"
            shadow-intensity="1"
            exposure="1"
            style={{
              width: isMobile ? '100%' : '700px',
              height: isMobile ? '400px' : '700px',
            }} // Adjust size for mobile
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
          />

        </div>
      </div>

      {/* Overlay Text: REALITY CRAFT */}
      <div
        className={`absolute ${isMobile
            ? 'bottom-4 left-1/2 transform -translate-x-1/2 text-[90px]'
            : 'top-[350px] right-0 text-[180px] mr-[105px]'
          } font-bold text-gray-200/50 pointer-events-none select-none`}
      >
        REALITY CRAFT
      </div>
    
    </div>
    {/* <section>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e71b7e47c041381fdaa0a641f937a10d2dbe23db52c2bcdd69075ded8885ea3?apiKey=980db322e33a4a39a5052caa449e1da6&"
            alt="Decorative image"
            className="w-full border-4 mt-12 border-white border-solid aspect-[2.86] fill-[url(<path-to-image>)_lightgray_-2.592px_-164.395px_/_100.556%_130.843%_no-repeat] stroke-[4px] stroke-white"
          />
        </section> */}
    </div>
  );
};

export default Landing;
