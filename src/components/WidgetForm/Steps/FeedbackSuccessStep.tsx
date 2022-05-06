import { CloseButton } from "../../CloseButton";
import successImg from '../../../img/success.png';

interface FeedbackSuccessStepProps {
    onBackRequest: () => void;
}

export function FeedbackSuccessStep({onBackRequest}: FeedbackSuccessStepProps){
    return(
        <>
            <header>
                <CloseButton/>
            </header>

            <div className="flex flex-col items-center py-10 w-[304px]"> 
                <img
                    src={successImg}
                    alt='Imagem de sucesso.'
                    className="w-10 h-10"
                />

                <span className="text-xl mt-2">Agradecemos o seu feedback!</span>

                <button
                    type="button"
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700"
                    onClick={onBackRequest}
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    )
}