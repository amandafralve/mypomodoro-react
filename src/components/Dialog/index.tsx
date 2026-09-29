import { Button } from '../Button';
import type { ToastContentProps } from 'react-toastify';
import styles from './styles.module.css';


export function Dialog({ closeToast, data }: ToastContentProps<string>) {
        return (
            <>
            <div className={styles.container}>
                <p>{data}</p>

                <div className={styles.buttonsContainer}>
                    <Button
                        onClick={() => closeToast(true)}
                        aria-label='Confirmar ação e fechar'
                        title='Confirmar ação e fechar'
                    >Sim</Button>
                    <Button
                        onClick={() => closeToast(false)}
                        color='red'
                        aria-label='Cancelar ação e fechar'
                        title='Cancelar ação e fechar'
                    >Não</Button>
                </div>
            </div>
        </>
    );
}