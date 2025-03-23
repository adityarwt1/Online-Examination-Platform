"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ... (keep the imports and questions array as original)

const questionTranslations = {
    // ... (keep all the Hindi translations as original, ensure option order matches English)
};

// Modify the renderQuestion function's option rendering logic
const renderQuestion = (question) => {
    // ... (previous code)

    {
        Array.isArray(question.subQuestions) && question.subQuestions.map((sq, index) => {
            const translatedSubQuestion = currentTranslation?.subQuestions?.[index];

            // Get original options and translated options
            const originalOptions = sq.options;
            const translatedOptions = translatedSubQuestion?.options;

            // Create options array with display text and English values
            const optionsToDisplay = questionLanguage === 'hindi' && translatedOptions
                ? translatedOptions.map((text, optIndex) => ({
                    displayText: text,
                    value: originalOptions[optIndex]
                }))
                : originalOptions.map(text => ({ displayText: text, value: text }));

            return (
                <motion.div key={`${sq.id}-${questionLanguage}`} /* ... */>
                    {/* ... */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {optionsToDisplay.map((option, optIndex) => (
                            <label key={optIndex} /* ... */>
                                <input
                                    type="radio"
                                    name={`${question.id}-${sq.id}`}
                                    value={option.value}
                                    checked={answers[`${question.id}-${sq.id}`] === option.value}
                                    onChange={() => handleInputChange(question.id, sq.id, option.value)}
                                    disabled={submitted}
                                    className="mr-2 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm sm:text-base">{option.displayText}</span>
                            </label>
                        ))}
                    </div>
                </motion.div>
            );
        })
    }
};

// ... (rest of the code remains the same)