import React, { useEffect, useRef } from 'react';

const DualCameraFeed = () => {
  const frontCameraRef = useRef(null);
  const backCameraRef = useRef(null);

  useEffect(() => {
    const startDualCamera = async () => {
      try {
        const backCameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: 'environment' } }
          });
          if (backCameraRef.current) {
            backCameraRef.current.srcObject = backCameraStream;
          }
        // Access front camera
        const frontCameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        if (frontCameraRef.current) {
          frontCameraRef.current.srcObject = frontCameraStream;
        }

        // Access back camera
        

      } catch (error) {
        console.error('Error accessing cameras: ', error);
      }
    };

    // Start fetching the camera feeds
    startDualCamera();

    // Cleanup on component unmount
    return () => {
      if (frontCameraRef.current && frontCameraRef.current.srcObject) {
        const tracks = frontCameraRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      if (backCameraRef.current && backCameraRef.current.srcObject) {
        const tracks = backCameraRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Dual Camera Feed (Front & Back)</h1>
      <video ref={frontCameraRef} autoPlay playsInline style={{ width: '45%', margin: '10px' }} />
      <video ref={backCameraRef} autoPlay playsInline style={{ width: '45%', margin: '10px' }} />
    </div>
  );
};

export default DualCameraFeed;
