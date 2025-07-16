export const ConverterEmBigDecimal = (value: number | string) => {
    if (!value) {
        return 0;
    }

    const stringValue = value.toString().replace(".", "").replace(",", ".");
    return parseFloat(stringValue);
}

export const formatReal = (valor: string | number): string => {
    if (valor === undefined || valor === null) return '0,00';

    const valorStr = valor.toString().replace(/\D/g, '');
    const valorNum = (parseInt(valorStr, 10) / 100).toFixed(2).split('.');

    const parteInteira = valorNum[0];
    const parteDecimal = valorNum[1];

    const gruposMilhar = parteInteira.split('').reverse().join('').match(/.{1,3}/g);

    if (!gruposMilhar) return '0,00';

    const parteFormatada = gruposMilhar
        .map(grupo => grupo.split('').reverse().join(''))
        .reverse()
        .join('.');

    return `${parteFormatada},${parteDecimal}`;
};