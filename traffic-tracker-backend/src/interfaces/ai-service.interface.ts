export interface AIService {
    getResponse(prompt: string): Promise<string | undefined>;
}
