export default class Service {
    #url

    constructor({ url }) {
        this.#url = url;
    }

    async uploadFile({ filename, fileBuffer }) {
        const formData = new FormData();
        formData.append(filename, fileBuffer);

        try {
            console.log('Enviando arquivo:', filename);
            const response = await fetch(this.#url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Erro na resposta da solicitação:', response.status, response.statusText);
                const responseText = await response.text();
                console.error('Resposta do servidor:', responseText);
                throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error('Erro durante a solicitação:', error);
            throw error;
        }
    }
}
