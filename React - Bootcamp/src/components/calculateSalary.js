import React, { Component } from 'react'
import css from '../css/calculateSalary.module.css'
import Bar from '../components/bar'
import { calculateSalaryFrom } from '../domain/salary'

export default class calculateSalary extends Component {

    constructor() {
        super();
        this.state = {
            baseINSS: 0,
            discountINSS: 0,
            baseIRPF: 0,
            discountIRPF: 0,
            netSalary: 0,
            percentageInss: 0,
            percentageIrpf: 0,
            percentageNetSalary: 0
        }
    }

    onChangeSalary = (event) => {
        const salary = event.target.value;
        const result = calculateSalaryFrom(salary);
        this.setState(result);

        console.log(salary);
        console.log(result);
    }

    getValue = (value) => {
        return parseInt(value) === 0 ? '' : value;
    }

    render() {
        const { percentageNetSalary, percentageInss, percentageIrpf } = this.state;
        return (
            <div className={css.principal}>
                <div className={css.cardSize}>
                    <div className="card">
                        <div className="card-body">
                            <div class="form-group">
                                <label>Salário Bruto</label>
                                <input type="number" class="form-control" id="salary" onChange={this.onChangeSalary} />
                                <small id="salaryHelp" class="form-text text-muted">Salário bruto registrado na carteira de trabalho</small>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Base INSS</label>
                                    <input type="text" class="form-control" id="inputBaseInss" readOnly value={this.getValue(this.state.baseINSS)} />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Desconto INSS</label>
                                    <input type="text" class="form-control" id="inputDescontoInss" readOnly value={this.getValue(this.state.discountINSS)} />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Base IRPF</label>
                                    <input type="text" class="form-control" id="inputBaseIrpf" readOnly value={this.getValue(this.state.baseIRPF)} />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Desconto IRPF</label>
                                    <input type="text" class="form-control" id="inputDescontoIrpf" readOnly value={this.getValue(this.state.discountIRPF)} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Salário Líquido</label>
                                <input type="text" class="form-control" id="salary" readOnly value={this.getValue(this.state.netSalary)} />
                                <small id="salaryHelp" class="form-text text-muted">Valor do salário líquido após todos os descontos</small>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Bar value={percentageInss} color="orange" />
                                <Bar value={percentageIrpf} color="red" />
                                <Bar value={percentageNetSalary} color="green" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
