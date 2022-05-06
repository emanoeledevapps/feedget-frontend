import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps{
    screenshotStatus: string | null;
    onCaptureScreen: (screnshoot: string | null) => void;
}

export function ScreenShotButton({screenshotStatus ,onCaptureScreen} : ScreenShotButtonProps){
    const [isCapturing, setIsCapturing] = useState(false);
    async function captureScreen(){
        setIsCapturing(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onCaptureScreen(base64image);
        setIsCapturing(false);
    }

    if(screenshotStatus){
        return(
            <button
                type="button"
                className=" w-10 h-9 m-1 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100"
                style={{
                    backgroundImage: `url(${screenshotStatus})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
                onClick={() => onCaptureScreen(null)}
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return(
        <button
            type="button"
            className="pd-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors m-1"
            onClick={captureScreen}
        >
            {isCapturing ? <Loading/> : <Camera className="w-10 h-6"/>}
        </button>
    )
}