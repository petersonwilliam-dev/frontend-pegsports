import styles from './Table.module.css'

function TableInformations({informations}) {
    return (
        <table className={styles.table}>
            <tbody>
                {informations.map((information, index) => (
                    <tr key={index}>
                        <th>{information.title}</th>
                        <td>{information.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableInformations