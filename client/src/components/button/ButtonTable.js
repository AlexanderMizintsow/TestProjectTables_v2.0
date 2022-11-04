import {useState} from 'react';
import styles from './Button.module.scss'

const ButtonTable = ({table, name}) => {
    const [showResults, setShowResults] = useState(false)
    return (
        <div>
            <button
                onClick={() => !showResults ? setShowResults(true) : setShowResults(false)}
                className={styles.button}>{name}</button>
            {showResults ? table : null}
        </div>
    )
}
export default ButtonTable;