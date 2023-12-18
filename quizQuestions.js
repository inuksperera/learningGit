// "quizArray" is an array that contains a question, an answer, and the correct answer's index for each questions.

const quizArray =
    [
        //array containing the answer numbers (ex: answer "a" , answer "b") at index 0 of the questions array
        ["a", "b", "c", "d"],

        {
            //object literals used to store a question, an  answers array to store 4 answers, and the correct answer's index for each question. the object literal's property is used in the quizScript file to access the value
            question: "In which year did the Sri Lankan cricket team win the World Cup?",
            answers: [2011, 
                1996,
                1987, 
                2015],
            correct: 2
        },

        {
            question: "What happened between England and New Zealand in the 1979 World Cup?",
            answers: ["It was a tie",
            "The match was cancelled",
            "New Zealand won",
            "England won"],
            correct: 4
        },
        
        {
            question: "Who won in the 1975 World cup final?",
            answers: ["Australia",
            "England",
            "West Indies",
            "South Africa"],
            correct: 3
        },

        {
            question: "Which world cup final was labelled as the \"greatest ever One Day match\"?",
            answers: ["2019 England vs New Zealand",
            "2015 New Zealand vs South Africa",
            "1996 Australia vs West Indies",
            "1992 Pakistan vs England"],
            correct: 1
        },

        {
            question: "How many balls are there in an over?",
            answers: ["10",
            "6",
            "4",
            "8"],
            correct: 2
        },
        
        {
            question: "What was the outcome of the 2011 World Cup?",
            answers: ["England won",
            "Ireland won",
            "Sri Lanka won",
            "India won"],
            correct: 4
        },
        

        {
            question: "Which teams were up against each other for the 1992 World Cup final?",
            answers: ["Sri Lanka vs Australia",
            "Australia vs West Indies",
            "Pakistan vs England",
            "Australia vs England"],
            correct: 3
        },
        
        {
            question: "What does it mean if the umpire raises his index finger?",
            answers: ["The bowler took a wicket",
            "A 6 was scored by the batsman",
            "A 4 was scored by the batsman",
            "The bowler threw a \"no-ball\""],
            correct: 1
        },
        
        {
            question: "Which team won the 1987 World Cup?",
            answers: ["India",
            "Australia",
            "England",
            "Ireland"],
            correct: 2
        },

        {
            question: "A six is scored if the ball ....",
            answers: [" bounces once and touches the boundary line",
            "does not reach the boundary line",
            "bounces more than once and touches boundary line",
            "goes over the boundary line"],
            correct: 4
        },

    ];