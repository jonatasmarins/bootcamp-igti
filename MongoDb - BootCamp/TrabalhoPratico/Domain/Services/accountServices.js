import { accountModel } from '../Models/accountModel.js';
import STATUS_CODE from '../Enums/statusCode.js';

export default class accountService {

    RATE_WITH_DRAW = 1;
    RATE_TRANSFER = 8;
    CODE_AGENCY_PRIVATE = 99;

    async GetAll() {
        return await accountModel.find();
    }

    async GetAccount(agency, account) {
        const accountFilter = await accountModel.findOne({ agencia: agency, conta: account });
        const result = { message: "", statusCode: STATUS_CODE.SUCCESS, content: accountFilter };

        if (!accountFilter) {
            result.message = "Conta corrente não encontrada";
            result.statusCode = STATUS_CODE.NOT_FOUND;
        }

        return result;
    }

    async desposit({ agencia, conta, value }) {
        let accountFilter = null;
        const messages = [];
        const result = { message: messages, statusCode: STATUS_CODE.SUCCESS, content: null };

        this.validateAgencyAndCount(agencia, conta, messages);
        this.validateValue(value, messages);

        if (messages.length === 0) {
            accountFilter = await accountModel.findOneAndUpdate({ agencia: agencia, conta: conta }, { $inc: { balance: value } }, { new: true });

            if (!accountFilter) {
                result.message = "Conta corrente não encontrada";
                result.statusCode = STATUS_CODE.NOT_FOUND;
            }
        }

        result.content = accountFilter;

        return result;
    }

    async withDraw({ agencia, conta, value, isTransf = false }) {
        let accountFilter = null;
        const messages = [];
        const result = { message: messages, statusCode: STATUS_CODE.SUCCESS, content: null, success: true };

        this.validateAgencyAndCount(agencia, conta, messages);
        this.validateValue(value, messages);

        const withDraw = value + (isTransf ? 0 : this.RATE_WITH_DRAW);

        if (messages.length === 0) {
            accountFilter = await accountModel.findOne({ agencia: agencia, conta: conta });
            if (!accountFilter) {
                result.message = "Conta corrente não encontrada";
                result.statusCode = STATUS_CODE.NOT_FOUND;
                result.success = false;
            } else if (accountFilter.balance < withDraw) {
                result.message = "Não existe saldo disponível para essa operação";
                result.statusCode = 400;
                result.success = false;
            } else {
                accountFilter.balance = accountFilter.balance - withDraw;
                accountFilter.save();
            }
        }

        result.content = accountFilter;

        return result;
    }

    async delete({ agencia, conta }) {
        let accountFilter = null;
        const messages = [];
        const result = { message: messages, statusCode: STATUS_CODE.SUCCESS, content: null };

        this.validateAgencyAndCount(agencia, conta, messages);

        if (messages.length === 0) {
            accountFilter = await accountModel.findOne({ agencia: agencia, conta: conta });
            if (!accountFilter) {
                result.message = "Conta corrente não encontrada";
                result.statusCode = STATUS_CODE.NOT_FOUND;
            } else {
                await accountModel.deleteOne({ agencia: agencia, conta: conta });
                const agencies = await accountModel.find({ agencia: agencia }).sort({ conta: 1 });
                result.content = { quantity: agencies.length, agencies: agencies };
            }
        }

        return result;
    }

    async transfer({ contaOrigem, contaDestino, valor }) {
        let contaOrigemSaque = null;
        let contaDestinoDeposito = null;
        let valorComTaxa = 0;
        const messages = [];
        const result = { message: messages, statusCode: STATUS_CODE.SUCCESS, content: null };

        this.validateValue(valor, messages);

        const contaOrigemVerify = await this.validateAccount(contaOrigem, messages);
        const contaDestinoVerify = await this.validateAccount(contaDestino, messages);

        if (contaOrigemVerify && contaDestinoVerify) {
            if (contaOrigemVerify.agencia !== contaDestinoVerify.agencia) {
                valorComTaxa = valor + this.RATE_TRANSFER;
            } else {
                valorComTaxa = valor;
            }

            contaOrigemSaque = await this.withDraw({ agencia: contaOrigemVerify.agencia, conta: contaOrigemVerify.conta, value: valorComTaxa, isTransf: true });
            if (contaOrigemSaque.success) {
                contaDestinoDeposito = await this.desposit({ agencia: contaDestinoVerify.agencia, conta: contaDestinoVerify.conta, value: valor });
                result.content = { contaOrigem: contaOrigemSaque, contaDestino: contaDestinoDeposito };
            } else {
                messages.push({ message: contaOrigemSaque.message });
                result.statusCode = 400;
            }
        }

        return result;
    }

    async agencyBalanceAVG(agency) {
        try {
            const result = { message: "", statusCode: STATUS_CODE.SUCCESS, content: null };

            const agencyInt = Number.parseInt(agency);

            if (isNaN(agencyInt)) {
                result.message = "Valor da agência é inválida";
                result.statusCode = 400;
            } else {
                const media = await accountModel.aggregate([
                    {
                        $match:
                        {
                            agencia: agencyInt
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$balance" },
                            media: { $avg: "$balance" },
                            quantidade: { $sum: 1 }
                        }
                    }
                ]);

                result.content = media;
            }

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async accountsLessBalance(quantidade) {
        const result = { message: "", statusCode: STATUS_CODE.SUCCESS, content: null };

        const quantidadeInt = Number.parseInt(quantidade);

        if (isNaN(quantidadeInt)) {
            result.message = "Valor de entrada inválida";
            result.statusCode = 400;
        } else {
            const accounts = await accountModel.find().sort({ balance: 1 }).limit(quantidadeInt);
            result.content = accounts;
        }

        return result;

    }

    async accountsMoreBalance(quantidade) {
        const result = { message: "", statusCode: STATUS_CODE.SUCCESS, content: null };

        const quantidadeInt = Number.parseInt(quantidade);

        if (isNaN(quantidadeInt)) {
            result.message = "Valor de entrada inválida";
            result.statusCode = 400;
        } else {
            const accounts = await accountModel.find().sort({ balance: -1, name: 1 }).limit(quantidadeInt);
            result.content = accounts;
        }

        return result;

    }

    async transferAccountForAgencyPrivate() {
        try {
            const result = { message: "", statusCode: STATUS_CODE.SUCCESS, content: null };
            const accountsPrivate = [];
            const accountsOrigin = [];
            const idAgencias = await accountModel.aggregate([
                {
                    $group: {
                        _id: "$agencia",
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ]);

            if (idAgencias) {
                for (let index = 0; index < idAgencias.length; index++) {
                    
                    const element = idAgencias[index];
                    if (element._id == this.CODE_AGENCY_PRIVATE) {
                        continue;
                    }

                    const moreBalance = await accountModel.findOne({ agencia: element._id }).sort({ balance: -1 }).limit(1);
                    accountsOrigin.push(moreBalance);

                    const moreBalancePrivate = await accountModel.findOne({ agencia: element._id }).sort({ balance: -1 }).limit(1);
                    moreBalancePrivate.agencia = this.CODE_AGENCY_PRIVATE;
                    moreBalancePrivate.save();
                    
                    accountsPrivate.push(moreBalancePrivate);
                }

                console.log("accounts");
                console.log(accountsPrivate);
                result.content = {privates: accountsPrivate, origins: accountsOrigin};
            } else {
                result.message = "Não foi encontado nenhuma conta cadastrada";
                result.statusCode = 404;
            }

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async existAccount(accountNumber) {
        const accountFilter = await accountModel.findOne({ conta: accountNumber });
        return { account: accountFilter, exist: accountFilter ? true : false };
    }

    async validateAccount(accountNumber, messages) {
        const account = await this.existAccount(accountNumber);

        if (account.exist) {
            return account.account;
        } else {
            messages.push({ message: `Conta ${accountNumber} não encontrada` });
            return null;
        }
    }

    validateAgencyAndCount(agencia, conta, messages) {
        if (!agencia) {
            messages.push({ message: "Preencha a Agência" });
        }

        if (!conta) {
            messages.push({ message: "Preencha a Conta" });
        }

        return messages;
    }

    validateValue(value, messages) {
        if (!value) {
            messages.push({ message: "Preencha o valor" });
        } else if (value <= 0) {
            messages.push({ message: "Valor inválido" });
        }

        return messages;
    }

}