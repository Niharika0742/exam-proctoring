import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // Import Confetti
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import 'daisyui/dist/full.css'; // Ensure DaisyUI is imported

const questions = [
    { id: 1, question: "What is your name?", correctAnswer: "Niha" },
    { id: 2, question: "What is your age?", correctAnswer: "25" },
    { id: 3, question: "What is your favorite color?", correctAnswer: "Blue" },
    { id: 4, question: "What is your hometown?", correctAnswer: "New York" },
    { id: 5, question: "What is your favorite food?", correctAnswer: "Pizza" },
    { id: 6, question: "What is your hobby?", correctAnswer: "Reading" },
    { id: 7, question: "What is your favorite book?", correctAnswer: "1984" },
    { id: 8, question: "What is your favorite movie?", correctAnswer: "Inception" },
    { id: 9, question: "What is your favorite sport?", correctAnswer: "Soccer" },
    { id: 10, question: "What is your favorite music genre?", correctAnswer: "Rock" }
];

const getRandomQuestions = (questionsArray) => {
    let shuffled = questionsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
};

const Assignment = () => {
    const [ans, SetAns] = useState({});
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [allAnswersCorrect, setAllAnswersCorrect] = useState(false);
    const navigate = useNavigate();
    const [isTabSwitched, setIsTabSwitched] = useState(false);

    useEffect(() => {
        setSelectedQuestions(getRandomQuestions(questions));
    }, []);

    useEffect(() => {
        const handlePaste = (e) => {
            e.preventDefault();
            toast.error("Copying detected");
        };

        const handleCopy = (e) => {
            e.preventDefault();
            toast.error("Copying question is prevented");
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState !== 'visible') {
                setIsTabSwitched(true);
                toast.error('Your exam is under review');
                setTimeout(() => {
                    navigate('/');
                }, 5000); // 5 second delay before navigating away
            }
        };

        window.addEventListener('paste', handlePaste);
        window.addEventListener('copy', handleCopy);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('paste', handlePaste);
            window.removeEventListener('copy', handleCopy);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [navigate]);

    useEffect(() => {
        if (isTabSwitched) {
            const preventNavigation = (e) => {
                e.preventDefault();
                e.returnValue = '';
            };
            window.addEventListener('beforeunload', preventNavigation);

            setTimeout(() => {
                window.removeEventListener('beforeunload', preventNavigation);
                setIsTabSwitched(false);
            }, 5000);
        }
    }, [isTabSwitched]);

    const handleSubmit = () => {
        const answersArray = selectedQuestions.map(q => ans[q.id] || "");
        const resultsArray = selectedQuestions.map(q => ans[q.id] === q.correctAnswer);

        if (resultsArray.every(result => result)) {
            setAllAnswersCorrect(true);
            toast.success("All answers are correct!");
        } else {
            setAllAnswersCorrect(false);
            toast.error("Try again!");
        }

        setTimeout(() => {
            navigate('/');
        }, 7000);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen relative">
            {allAnswersCorrect && (
                <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}
            <div className="card shadow-lg p-6 bg-white w-full max-w-lg">
                {selectedQuestions.map((q) => (
                    <div className="form-control my-2" key={q.id}>
                        <label className="label">
                            <span className="label-text">{q.question}</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={ans[q.id] || ""}
                            onChange={(e) => SetAns({ ...ans, [q.id]: e.target.value })}
                            placeholder="Your answer here"
                        />
                    </div>
                ))}
                <button className="btn btn-success mt-4" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Assignment;
