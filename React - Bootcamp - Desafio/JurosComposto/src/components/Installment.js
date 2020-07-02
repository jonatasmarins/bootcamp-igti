import React from 'react'

export default function Installment({ month, monthValueTotal, monthValueRate, monthPercentageRate }) {

    return (
        <div className="card" style={monthValueRate >= 0 ? styles.cardSizePositive : styles.cardSizeNegative}>
            <div className="card-body" style={styles.cardBody} >
                <div className="card-text" style={styles.cardInfo}>
                    <div style={monthValueRate >= 0 ? styles.cardMonthPositive : styles.cardMonthNegative}>
                        {month}
                    </div>
                    <div style={styles.cardInfoDetails}>
                        <span style={monthValueRate >= 0 ? styles.cardInfoSpanPositive : styles.cardInfoSpanNegative}>
                            R$ {monthValueTotal}
                        </span>
                        <span style={monthValueRate >= 0 ? styles.cardInfoSpanPositive : styles.cardInfoSpanNegative}>
                            {monthValueRate > 0 ? '+' : '-'} R$ {monthValueRate}
                        </span>
                        <span style={monthValueRate >= 0 ? styles.cardInfoSpanRatePositive : styles.cardInfoSpanRateNegative}>
                            {monthPercentageRate} %
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {

    cardSizePositive: {
        width: "200px",
        height: "130px",
        borderRadius: "10px",
        border: "1px solid darkseagreen",
        color: "green",
        fontWeight: "bold"
    },

    cardSizeNegative: {
        width: "200px",
        height: "130px",
        borderRadius: "10px",
        border: "1px solid #ff000054",
        color: "red",
        fontWeight: "bold"
    },

    cardInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "10px",
        fontSize: "13px"
    },

    cardBody: {
        display: "flex"
    },

    cardMonthPositive: {
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "10px",
        fontSize: "10px",
        border: "1px solid darkseagreen"
    },

    cardMonthNegative: {
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "10px",
        fontSize: "10px",
        border: "1px solid #ff000054"
    },

    cardInfoDetails: {
        display: "flex",
        flexDirection: "column",
        fontSize: "12px"
    },

    cardInfoSpanPositive: {
        color: "green",
        fontWeight: "bold"
    },

    cardInfoSpanNegative: {
        color: "red",
        fontWeight: "bold"
    },

    cardInfoSpanRatePositive: {
        color: "deepskyblue",
        fontSize: 11
    },
    
    cardInfoSpanRateNegative: {
        color: "red",
        fontSize: 11
    }
}
