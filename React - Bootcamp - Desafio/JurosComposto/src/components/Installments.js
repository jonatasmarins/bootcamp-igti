import React, { useState, useEffect } from 'react'
import Installment from './Installment';

export default function Installments({ properties }) {
    const title = "Rendimento Mensal";
    const { MountInicial, PercentageRate, PeridMonth } = properties;
    const [installments, setInstallments] = useState([]);

    useEffect(() => {
        SendInfoInstallments()
    }, [MountInicial, PercentageRate, PeridMonth])

    const SendInfoInstallments = () => {
        if (MountInicial && PercentageRate && PeridMonth) {

            let arrayInstallments = [];
            for (let index = 0; index < PeridMonth; index++) {
                const month = index + 1;
                const monthValues = calculate(month);

                arrayInstallments.push(
                    <li key={index} style={{ margin: "10px" }}>
                        <Installment
                            month={month}
                            monthValueTotal={monthValues.monthValueTotal}
                            monthValueRate={monthValues.monthValueTotalRate}
                            monthPercentageRate={monthValues.monthRate}
                        />
                    </li>
                );
            }

            setInstallments(Object.assign(arrayInstallments), installments);
        } else {
            setInstallments(Object.assign([]), installments);
        }
    }

    const calculate = (month) => {
        const monthRate = PercentageRate / 100;
        const monthTotal = parseFloat(MountInicial * Math.pow((1 + monthRate), month)).toFixed(2);
        const monthTotalRate = parseFloat(monthTotal - MountInicial).toFixed(2);

        const monthRateFormat = (parseFloat((Math.pow((1 + (PercentageRate / 100)), month)) - 1) * 100).toFixed(2);
        return {
            monthRate: monthRateFormat,
            monthValueTotal: monthTotal,
            monthValueTotalRate: monthTotalRate
        };
    }

    return (
        <>
            <h6 className="text-center">{installments.length > 0 ? title : '' }</h6>
            <ul style={styles.principal}>
                {installments}
            </ul>
        </>
    )
}

const styles = {
    principal: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      overflowY: "auto",
      height: "300px",
      justifyContent: "center",
      listStyle: "none"
    },
  };
