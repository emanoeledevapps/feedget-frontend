import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps{
    feedbackType: FeedbackType;
    onBackRequest: () => void;
    feedbackSend: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onBackRequest,
    feedbackSend
    } : FeedbackContentStepProps){

    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    async function postFeedback(event: FormEvent){
        event.preventDefault();
        setLoadingSubmit(true);
        
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        feedbackSend();
        setLoadingSubmit(false);
    }

    return(
        <>
        <header>
            <button 
                type="button" 
                className="left-5 top-5 absolute text-zinc-400 hover:text-zinc-100"
                onClick={onBackRequest}
            >
                <ArrowLeft weight="bold" className="w-4 h-4"/>
            </button>

            <span className="text-xl leading-6 flex items-center gap-2">
                <img 
                    src={feedbackTypeInfo.image.source} 
                    alt={feedbackTypeInfo.image.alt} 
                    className='w-6 h-6'
                />
                {feedbackTypeInfo.title}
            </span>

            <CloseButton/>
        </header>
        <form className="my-4 w-full" onSubmit={postFeedback}>
            <textarea
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md border-2 focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none"
                placeholder="Conte com detalhes o que está acontecendo."
                onChange={event => setComment(event.target.value)}
                value={comment}
            />
            <footer className="flex gap-2">
                <ScreenShotButton
                    screenshotStatus={screenshot}
                    onCaptureScreen={(data) => setScreenshot(data)}
                />
                <button 
                    type="submit"
                    disabled={comment.length === 0 || loadingSubmit}
                    className="p-2 m-1 bg-brand-500 rounded-md broder-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 disabled:opacity-50 disabled:hover:bg-brand-500"
                >
                    {loadingSubmit ? <Loading/> : 'Enviar feedback'}
                </button>
            </footer>
        </form>
        </>
    )
}