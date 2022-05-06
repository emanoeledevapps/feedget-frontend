import {useState} from 'react';
import { CloseButton } from "../CloseButton";
import bugImg from '../../img/bug.png';
import ideaImg from '../../img/idea.png';
import otherImg from '../../img/thought.png';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImg,
            alt: 'Icone de bug'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImg,
            alt: 'Icone de idéia'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: otherImg,
            alt: 'Icone de outros'
        }
    },
}
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feeddbackSend, setFeedbackSend] = useState(false);

    function onBackFeedbackType(){
        setFeedbackSend(false);
        setFeedbackType(null)
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feeddbackSend ? (
                <FeedbackSuccessStep
                    onBackRequest={onBackFeedbackType}
                />
            ) : (
                <>

                {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
                ) : (
                    <FeedbackContentStep 
                        feedbackType={feedbackType}
                        onBackRequest={onBackFeedbackType}
                        feedbackSend={() => setFeedbackSend(true)}
                    />
                )}

                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito por <a className="underline underline-offset-2" target='_blank' href="https://emanoeledevapps.github.io/">Emanoel Augusto</a>
            </footer>
        </div>
    )
}