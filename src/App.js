// import { useRef } from "react";
// import usePictureInPicture from "react-use-pip";

// function App() {
//   const videoRef = useRef(null);
//   const {
//     isPictureInPictureActive,
//     isPictureInPictureAvailable,
//     togglePictureInPicture,
//   } = usePictureInPicture(videoRef);

//   return (
//     <div className="App">
//       <video ref={videoRef} id="pip-object" height={"400"}>
//         <source src="vid-1.mp4" />
//       </video>
//       {isPictureInPictureAvailable && (
//         <button
//           onClick={() => togglePictureInPicture(!isPictureInPictureActive)

//           }
//         >
//           {!isPictureInPictureActive ? "Open PIP" : "Close PIP"}
//         </button>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  const videoRef = useRef(null);

  const WindowContents = () => {
    return (
      <div className="App">
        <h2>Document-picture-in-picture</h2>
        <video
          ref={videoRef}
          controls
          id="pip-object"
          width={"500"}
          height={"400"}
        >
          <source src="vid-2.mp4" />{" "}
        </video>
        <button onClick={() => window.documentPictureInPicture.window.close()}>
          Close
        </button>
      </div>
    );
  };
  const openWindow = async () => {
    try {
      const dpip = await window.documentPictureInPicture.requestWindow({
        width: "500",
        height: "500",
      });
      const pipDiv = dpip.document.createElement("div");
      pipDiv.setAttribute("id", "pip-root");
      dpip.document.body.append(pipDiv);
      const pipRoot = ReactDOM.createRoot(
        dpip.document.getElementById("pip-root")
      );
      pipRoot.render(<WindowContents />);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="App">
      <button onClick={openWindow}>Open DocumentPIP</button>
    </div>
  );
}

export default App;
