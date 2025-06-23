import axios from "axios";
import easySoapRequest from 'easy-soap-request'

export default function useFreight() {

    async function getFreight(cepOrigin, cepDestination, product) {

        const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cor="http://www.correios.com.br/">
            <soapenv:Header/>
            <soapenv:Body>
                <cor:calcPrecoPrazo>
                    <cor:nCdServico>40010</cor:nCdServico>
                    <cor:sCepOrigem>${cepOrigin}</cor:sCepOrigem>
                    <cor:sCepDestino>${cepDestination}</cor:sCepDestino>
                    <cor:nVlPeso>1</cor:nVlPeso>
                    <cor:nCdFormato>1</cor:nCdFormato>
                    <cor:nVlComprimento>20</cor:nVlComprimento>
                    <cor:nVlAltura>10</cor:nVlAltura>
                    <cor:nVlLargura>10</cor:nVlLargura>
                    <cor:nVlDiametro>0</cor:nVlDiametro>
                    <cor:sCdMaoPropria>N</cor:sCdMaoPropria
                    <cor:nVlValorDeclarado>${product.price}</cor:nVlValorDeclarado>
                    <cor:sCdAvisoRecebimento>N</cor:sCdAvisoRecebimento>
                </cor:calcPrecoPrazo>
            </soapenv:Body>
        </soapenv:Envelope>`

        try {
            
            const data = await axios.post("http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx", xmlData, {
                headers: {
                    "Content-Type" : "text/xml; charset=utf-8"
                }
            })

            const parser = new DOMParser()

            const xmlDoc = parser.parseFromString(data.data, "text/xml")

            const calcPreco = xmlDoc.getElementsByTagName('calcPrecoPrazoResposta')[0]

            console.log("REsposta da API: ", calcPreco)

        } catch (err) {
            console.log(err)
        }
    }

    return {getFreight}
}