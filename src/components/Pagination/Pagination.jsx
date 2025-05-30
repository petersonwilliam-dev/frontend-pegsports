import styles from './Pagination.module.css'

function Pagination({page, prev, next, hasNextPage}) {
    return (
        <div className={styles.pagination}>
            <button className={styles.prev} onClick={() => prev(Number(page) - 1)} disabled={page > 1 ? false : true}><ion-icon name="chevron-back-outline"></ion-icon></button>
            <p>{page}</p>
            <button className={styles.next} onClick={() => next(Number(page) + 1)} disabled={!hasNextPage}><ion-icon name="chevron-forward-outline"></ion-icon></button>
        </div>
    )
}

export default Pagination