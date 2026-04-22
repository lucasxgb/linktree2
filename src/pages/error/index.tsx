import {Link} from 'react-router-dom';

export function ErrorPage(){
    return (
        <div className='flex flex-col w-full justify-center items-center min-h-screen'>
            <h1 className='font-bold text-6xl mb-4 text-red-900 '> 404!</h1>

            <h1 className='font-bold text-4xl mb-2 '> Página não encontrada! </h1>
            <p className='italic text-1xl mb-6'> Você caiu em uma página que não existe.</p>

            <Link className='bg-red-900 text-neutral-100 py-1 px-4 rounded' to="/"> Voltar para home</Link>
        </div>
    )
}
