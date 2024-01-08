// IBM Cloud ML
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
      apikey: process.env.IBM_APIKEY,
    }),
    serviceUrl: process.env.IBM_URL,
});

module.exports = {
    getEmotion: async (input_text) => {
        const analyzeParams = {
            'text': input_text,
            'features': {
                'emotion': {
                    'document': true
                }
            }
        };

        try {
            const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);
            const emotionResult = analysisResults.emotion.document.emotion;
            let emotion = '';
            let emotionScore = 0;

            for (const emo in emotionResult) {
                if (emotionResult[emo] > emotionScore) {
                    emotion = emo;
                    emotionScore = emotionResult[emo];
                }
            }

            return emotion;
        } catch (err) {
            console.log('error:', err);
            return '';
        }
    }
};