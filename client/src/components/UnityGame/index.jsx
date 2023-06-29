import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGame(){
    const { unityProvider } = useUnityContext({
        loaderUrl: "/unity/2.loader.js",
        dataUrl: "/unity/2.data",
        frameworkUrl: "/unity/2.framework.js",
        codeUrl: "/unity/2.wasm",
    })

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