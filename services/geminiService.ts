import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
// Initialize client safely. If key is missing, the app should handle errors gracefully.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProductDescription = async (productName: string, category: string, keywords: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Check process.env.API_KEY");
  }

  try {
    const prompt = `
      Você é um especialista em marketing para uma gráfica chamada OLPrint.
      Escreva uma descrição de produto curta, persuasiva e profissional para venda no site.
      
      Produto: ${productName}
      Categoria: ${category}
      Características/Keywords: ${keywords}
      
      Formato: Apenas o texto da descrição, sem títulos ou formatação markdown complexa. Máximo de 3 parágrafos curtos.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar a descrição.";
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};

export const generateBusinessInsight = async (dataSummary: string): Promise<string> => {
  if (!ai) return "Gemini API Key não configurada.";

  try {
    const prompt = `
      Analise este resumo de dados de vendas da OLPrint e dê uma dica estratégica curta (max 1 frase) para o dono da gráfica melhorar as vendas hoje.
      Dados: ${dataSummary}
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Sem insights disponíveis no momento.";
  } catch (error) {
    return "Não foi possível gerar insights.";
  }
};