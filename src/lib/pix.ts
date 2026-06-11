// Gerador de payload Pix no padrão BR Code (EMVco) para "Copia e Cola" e QR Code.
// Os limites de tamanho seguem a especificação do BACEN (nome: 25, cidade: 15).

const PIX_NAME_MAX = 25;
const PIX_CITY_MAX = 15;

// Remove acentos e caracteres não suportados para garantir compatibilidade entre bancos.
const sanitize = (value: string) =>
	value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\x20-\x7E]/g, '')
		.trim();

// Monta um campo EMV (TLV): id + tamanho(2 dígitos) + valor.
const emv = (id: string, value: string) =>
	`${id}${value.length.toString().padStart(2, '0')}${value}`;

// CRC16/CCITT-FALSE, conforme exigido pelo BACEN (polinômio 0x1021).
const crc16 = (payload: string): string => {
	let crc = 0xffff;
	for (let i = 0; i < payload.length; i++) {
		crc ^= payload.charCodeAt(i) << 8;
		for (let j = 0; j < 8; j++) {
			crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
			crc &= 0xffff;
		}
	}
	return crc.toString(16).toUpperCase().padStart(4, '0');
};

export interface PixPayloadParams {
	chave: string;
	nome: string;
	cidade: string;
	valor: number;
	txid?: string;
}

export const gerarPayloadPix = ({
	chave,
	nome,
	cidade,
	valor,
	txid = '***',
}: PixPayloadParams): string => {
	const chaveLimpa = sanitize(chave);
	const nomeLimpo = sanitize(nome).slice(0, PIX_NAME_MAX);
	const cidadeLimpa = sanitize(cidade).slice(0, PIX_CITY_MAX) || 'BRASIL';
	const valorFormatado = valor.toFixed(2);

	const merchantAccount =
		emv('00', 'BR.GOV.BCB.PIX') + emv('01', chaveLimpa);
	const additionalData = emv('05', txid);

	const payload =
		emv('00', '01') + // Payload Format Indicator
		emv('26', merchantAccount) + // Merchant Account Information
		emv('52', '0000') + // Merchant Category Code
		emv('53', '986') + // Moeda (BRL)
		emv('54', valorFormatado) + // Valor da transação
		emv('58', 'BR') + // País
		emv('59', nomeLimpo) + // Nome do recebedor
		emv('60', cidadeLimpa) + // Cidade
		emv('62', additionalData) + // Dados adicionais (txid)
		'6304'; // Tag do CRC (antes do cálculo)

	return payload + crc16(payload);
};
