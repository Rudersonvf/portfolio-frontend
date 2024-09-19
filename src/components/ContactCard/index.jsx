import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const ContactCard = ({ logo, title, type, content }) => {
    function typeOfContent(type) {
        let contentType = '';

        switch (type) {
            case "mail":
                contentType = <a href={`mailto: ${content}`}>{content}</a>
                break;

            case "tel":
                contentType = <a href={`tel:+${content}`}>{content}</a>
                break;

            case "link":
                contentType = <a href={content} target="_blank" rel="noopener noreferrer">{content}</a>

            default:
                break;
        }

        return contentType;
    }

    return (
        <div className={styles['component-contact-card']}>
            <div className={styles['logo-container']}>
                {logo}
            </div>
            <div className={styles['content-container']}>
                <span>{title}</span>
                {typeOfContent(type)}
            </div>
        </div>
    )
}

ContactCard.propTypes = {
    logo: PropTypes.any,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf["mail", 'tel', 'link'].isRequired,
    content: PropTypes.string.isRequired,
}

export default ContactCard