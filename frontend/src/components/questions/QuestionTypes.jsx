import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./QuestionTypes.css";

const QuestionTypes = ({ onPublish }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [marks, setMarks] = useState("");
  const [timeLimit, setTimeLimit] = useState(10);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [bulkQuestions, setBulkQuestions] = useState("");
  const [isBulkAdding, setIsBulkAdding] = useState(false);

  const questionTypes = [
    { id: "mcq-single", label: "Buttons", description: "One correct answer", icon: "🔘" },
    { id: "mcq-multiple", label: "Checkboxes", description: "Multiple correct answers", icon: "☑️" },
    { id: "ordering", label: "Reorder", description: "Place answers in the correct order", icon: "📚" },
    { id: "fill-blank", label: "Type answer", description: "Type the correct answer", icon: "🔤" },
    { id: "true-false", label: "True/False", description: "Choose between True or False", icon: "✅❌" },
    { id: "Add Manually", label: "Add Manually", description: "Add Multiple Questions", icon: "➕" },
  ];

  const handleSaveQuestion = () => {
    if (!question || marks <= 0 || (selectedType !== "fill-blank" && correctAnswers.length === 0)) {
      alert("Please complete all fields before saving.");
      return;
    }
  
    const newQuestion = {
      id: Date.now(),
      type: selectedType,
      question,
      options,
      correctAnswers,
      explanation,
      marks,
      timeLimit,
    };
  
    const updatedQuestions = [...savedQuestions, newQuestion];
  
    setSavedQuestions(updatedQuestions);
    resetForm();
  
    // Check if the number of saved questions matches the total number specified in Step 1
    if (updatedQuestions.length == totalQuestions) {
      setIsPreviewing(true); // This should trigger the preview section
    } else {
      setIsAddingQuestion(false);
    }
  };
  
  const resetForm = () => {
    setSelectedType(null);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswers([]);
    setExplanation("");
    setMarks("");
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setIsAddingQuestion(true);

    if (type === "Add Manually") {
        setQuestion("");
        setExplanation("");
        setMarks("");
      }
  };

  const handleCheckboxChange = (index) => {
    setCorrectAnswers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleReorder = (result) => {
    if (!result.destination) return;
    const reorderedOptions = [...options];
    const [movedItem] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, movedItem);
    setOptions(reorderedOptions);
  };

  const handleEditQuestion = (questionId) => {
    const questionToEdit = savedQuestions.find((q) => q.id === questionId);
    setQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswers(questionToEdit.correctAnswers);
    setExplanation(questionToEdit.explanation);
    setMarks(questionToEdit.marks);
    setTimeLimit(questionToEdit.timeLimit);
    setSelectedType(questionToEdit.type);
    setEditingQuestionId(questionId);
    setIsAddingQuestion(true);
    setIsPreviewing(false);
  };

  const handleDeleteQuestion = (questionId) => {
    setSavedQuestions(savedQuestions.filter((q) => q.id !== questionId));
  };

  const handlePublish = () => {
    if (savedQuestions.length === 0) {
      alert("Please add at least one question before publishing.");
      return;
    }
    
    onPublish(savedQuestions);  // Send questions to parent component
  };

  const handleBulkQuestionSave = () => {
    // Regular expression to match question numbers (e.g., 1., 2., etc.)
    const questionPattern = /\d+\./;  
    const questionBlocks = bulkQuestions.split(questionPattern).filter(block => block.trim() !== "");
  
    const questions = questionBlocks.map((block, index) => {
      const lines = block.trim().split("\n");
  
      // The first line is the question
      const questionText = lines[0].trim();
      
      // The last line contains the correct answer (we'll extract this)
      const correctAnswerLine = lines.find(line => line.trim().startsWith("Answer:"));
      const correctAnswer = correctAnswerLine ? correctAnswerLine.trim().split(":")[1].trim() : null;
      
      // All lines in between the first and last line are options
      const options = lines.slice(1, -1).map(opt => opt.trim());
  
      // Find the index of the correct answer
      const correctAnswerIndex = options.findIndex(opt => opt.startsWith(correctAnswer));
  
      return {
        id: Date.now() + index,
        type: "mcq-single",  // Assuming MCQ for now
        question: questionText,
        options: options,
        correctAnswers: correctAnswerIndex !== -1 ? [correctAnswerIndex] : [],
        explanation: "",
        marks: 1,  // Default marks
      };
    });
  
    setSavedQuestions([...savedQuestions, ...questions]);
    setIsBulkAdding(false);
    setBulkQuestions("");
  };
  
  return (
    <div className="question-type-container">
      <h2><center>Add a Question</center></h2>
      
      {/* Preview Mode */}
      {isPreviewing ? (
  <div className="preview-container">
    <h3>Preview Questions</h3>
    {savedQuestions.length === 0 ? (
      <p>No questions added yet.</p>
    ) : (
      <ul className="preview-list">
        {savedQuestions.map((q, index) => (
          <li key={q.id} className="preview-question">
            <strong>Q{index + 1}:</strong> {q.question}

            {/* Display answer options */}
            {q.type === "true-false" ? (
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span className="correct">{q.correctAnswers[0]}</span>
              </p>
            ) : q.type === "fill-blank" ? (
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span className="correct">{q.correctAnswers[0]}</span>
              </p>
            ) : q.type === "ordering" ? (
              <>
                <p><strong>Arrange in order:</strong></p>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i} className="ordered-option">{opt}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p><strong>Options:</strong></p>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i} className={q.correctAnswers.includes(i) ? "correct" : ""}>
                      {q.correctAnswers.includes(i) ? "✅ " : "❌ "} {opt}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Explanation & Marks */}
            <p><strong>Explanation:</strong> {q.explanation}</p>
            <p><strong>Marks:</strong> {q.marks}</p>

            {/* Edit & Delete Buttons */}
            <div className="preview-buttons">
              <button onClick={() => handleEditQuestion(q.id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteQuestion(q.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    )}
    <button onClick={() => setIsPreviewing(false)} className="back-btn">Back</button>
    <button onClick={handlePublish} className="publish-btn">Publish</button>
  </div>
) : ( 

        <>
          {/* Question Type Selection */}
          {!selectedType && (
            <div className="question-grid">
              {questionTypes.map((type) => (
                <div key={type.id} className="question-card" onClick={() => handleSelectType(type.id)}>
                  <span className="question-icon">{type.icon}</span>
                  <strong className="question-label">{type.label}</strong> - 
                  <span className="question-description"> {type.description}</span>
                </div>
              ))}
            </div>
          )}

          {/* Question Form */}
          {selectedType && (
            <div className="mcq-form">    
              <h3>Create {questionTypes.find(q => q.id === selectedType)?.label} Question</h3>
              <label>Question:</label>
              <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your question"  disabled={selectedType === "Add Manually"} />

              {selectedType === "true-false" ? (
                <>
                  <label>Choose the correct answer:</label>
                  <div className="true-false-options">
                    <button className={`tf-option ${correctAnswers.includes("true") ? "selected" : ""}`} onClick={() => setCorrectAnswers(["true"])}>True</button>
                    <button className={`tf-option ${correctAnswers.includes("false") ? "selected" : ""}`} onClick={() => setCorrectAnswers(["false"])}>False</button>
                  </div>
                </>
              ) : selectedType === "ordering" ? (
                <>
                  <label>Arrange the options in the correct order:</label>
                  <DragDropContext onDragEnd={handleReorder}>
                    <Droppable droppableId="options">
                      {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps} className="ordering-list">
                          {options.map((opt, index) => (
                            <Draggable key={index} draggableId={String(index)} index={index}>
                              {(provided) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="draggable-option">
                                  <input type="text" value={opt} onChange={(e) => {
                                    const newOptions = [...options];
                                    newOptions[index] = e.target.value;
                                    setOptions(newOptions);
                                  }} placeholder={`Option ${index + 1}`} />
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                </>
              ) : selectedType === "fill-blank" ? (
                <>
                  <label>Answer:</label>
                  <input type="text" value={correctAnswers[0] || ""} onChange={(e) => setCorrectAnswers([e.target.value])} placeholder="Enter the correct answer" />
                </>

              ): selectedType === "Add Manually" ? (
                <>
                  <label>Paste your questions manually:</label>
                  <textarea
                    value={bulkQuestions}
                    onChange={(e) => setBulkQuestions(e.target.value)}
                    placeholder="Enter questions here"
                  />
                  {/* Move Save button below textarea */}
                  <button onClick={handleBulkQuestionSave}>Save Questions</button>
                </>

              ) : (
                <>
                  <label>Options:</label>
                  {options.map((opt, index) => (
                    <div key={index} className="option-input">
                      <input type="text" value={opt} onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }} placeholder={`Option ${index + 1}`} />
                      <input type={selectedType === "mcq-single" ? "radio" : "checkbox"} name="correctAnswer"
                        checked={correctAnswers.includes(index)}
                        onChange={() => handleCheckboxChange(index)} />
                    </div>
                  ))}
                </>
              )}

              {/* Explanation Field (Above Marks) */}
              <label>Explanation:</label>
              <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Provide a detailed explanation"  disabled={selectedType === "Add Manually"} ></textarea>

              {/* Marks Allocation */}
              <label>Marks Allocation:</label>
              <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="Enter marks" disabled={selectedType === "Add Manually"}/>

              <div className="button-group">
                <button onClick={handleSaveQuestion} className="save-btn">Save Question</button>
                <button onClick={resetForm} className="cancel-btn">Cancel</button>
              </div>
            </div>
          )}
          {savedQuestions.length > 0 && (
            <div className="preview-button-container">
              <button onClick={() => setIsPreviewing(true)} className="preview-btn">Preview</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionTypes;
