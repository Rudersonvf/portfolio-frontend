import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import styles from "./styles.module.scss";
import Button from '../Button';

const ContactForm = props => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className={styles['component-contact-form']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        {...register('name', {
                            required: 'O nome é obrigatório.',
                            minLength: { value: 3, message: 'O nome deve ter pelo menos 3 caracteres.' },
                            maxLength: { value: 80, message: 'O nome deve ter no máximo 80 caracteres.' }
                        })}
                        placeholder="Nome"
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'O e-mail é obrigatório.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Digite um e-mail válido.'
                            }
                        })}
                        placeholder="Email"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input
                        id="subject"
                        {...register('subject', {
                            required: 'O assunto é obrigatório.',
                            minLength: { value: 3, message: 'O assunto deve ter pelo menos 3 caracteres.' },
                            maxLength: { value: 80, message: 'O assunto deve ter no máximo 80 caracteres.' }
                        })}
                        placeholder="Assunto"
                    />
                    {errors.subject && <p>{errors.subject.message}</p>}
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        {...register('message', {
                            required: 'A mensagem é obrigatória.',
                            minLength: { value: 15, message: 'A mensagem deve ter pelo menos 15 caracteres.' },
                            maxLength: { value: 500, message: 'A mensagem deve ter no máximo 500 caracteres.' }
                        })}
                        placeholder="Mensagem"
                    />
                    {errors.message && <p>{errors.message.message}</p>}
                </div>
                <Button
                    value={"enviar"}
                    type='submit'
                />
            </form>
        </div>
    )
}

ContactForm.propTypes = {}

export default ContactForm