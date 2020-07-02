import React, { useState } from 'react'
import css from './css/FormInstallment.module.css'
import Installments from './Installments';

export default function FormInstallment() {
    const ValidMountInicial = 0;
    const ValidMaxValuePercentageRate = 12;
    const ValidMinValuePercentageRate = -12;
    const ValidMonths = 0;

    const PROP_INICIAL = {
        MountInicial: 0,
        PercentageRate: 0,
        PeridMonth: 0
    }

    const [properties, setProperties] = useState(PROP_INICIAL);

    const OnChangeValue = (event) => {
        const value = event.target.value;
        const props = Object.assign([], properties);
        props[event.target.name] = value ? value : 0;
        setProperties(props);
    }

    return (
        <div className="container" style={{ marginTop: "30px" }}>
            <div className="card">
                <div className="card-body">
                    <h1 className={`card-title ${css.title}`}>Juros Composto</h1>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <label htmlFor="formInstallment" className="col-form-label col-form-label-sm">Montante Inicial</label>
                                <input type="number" id="inputMountInicial" onChange={OnChangeValue} name="MountInicial" className="form-control input" min={ValidMountInicial} />
                            </div>
                            <div className="col">
                                <label htmlFor="formInstallment" className="col-form-label col-form-label-sm">Taxa de Juros</label>
                                <input type="number" name="PercentageRate" onChange={OnChangeValue} className="form-control input" min={ValidMinValuePercentageRate} max={ValidMaxValuePercentageRate} />
                            </div>
                            <div className="col">
                                <label htmlFor="formInstallment" className="col-form-label col-form-label-sm">Período (meses)</label>
                                <input type="number" name="PeridMonth" onChange={OnChangeValue} className="form-control input" min={ValidMonths} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card-body">
                    <Installments properties={properties} />
                </div>
            </div>
        </div>
    )
}
