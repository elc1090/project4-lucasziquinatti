import { useCallback, useContext, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function UnityGame(){
    const { user, update } = useContext(AuthContext);

    const navigate = useNavigate();

    const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "/unity/gameV4.loader.js",
        dataUrl: "/unity/gameV4.data",
        frameworkUrl: "/unity/gameV4.framework.js",
        codeUrl: "/unity/gameV4.wasm",
    });

    const handleGameOver = useCallback((time) => {
        console.log(`Tempo sobrevivido: ${time}`);
        if(time > user.bestTime){
            const newUser = {...user, bestTime: time};
            update(newUser);
        }
        else {
            navigate(`/profile`);
        }
    });

    useEffect(() => {
        sendMessage("Jogador", "DefinirSkin", user.idSkin);
    });

    useEffect(() => {
        addEventListener("SetTime", handleGameOver);
        return () => {
            removeEventListener("SetTime", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    return(
        <div>
            <Unity 
                unityProvider={unityProvider}
                width={960}
                height={540}
                style={{ width: '1024px', height: '768px', background: '#1F1F20' }}
            />
        </div>
    );
}