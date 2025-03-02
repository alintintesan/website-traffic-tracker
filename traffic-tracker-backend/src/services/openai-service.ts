import { OpenAI } from 'openai';
import { AIService } from '../interfaces/ai-service.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OPENAI_SYSTEM_CONTENT } from '../utils/constants';

@Injectable()
export class OpenAIService implements AIService {
    private openai: OpenAI;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.openai = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY')
        });
    }

    public async getResponse(prompt: string): Promise<string | undefined> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                store: true,
                messages: [
                    { role: 'system', content: OPENAI_SYSTEM_CONTENT },
                    { role: 'user', content: prompt },
                ],
            });

            return response?.choices?.[0]?.message?.content?.trim();
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            throw new Error('Unable to analyze traffic data.');
        }
    }
}