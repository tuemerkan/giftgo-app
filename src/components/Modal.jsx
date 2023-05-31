import { useNavigate } from 'react-router-dom';

function Modal({ children }) {
    const navigate = useNavigate();

    function closeHandler() {
        navigate('..');
    }

    return (
        <>
            <div onClick={closeHandler} className="fixed inset-0 bg-black bg-opacity-50" />
            <dialog open className="fixed inset-0 flex items-center justify-center">
                {children}
            </dialog>
        </>
    );
}

export default Modal;
