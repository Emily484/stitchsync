import React, { useState } from 'react';
import {collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';;

const ProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [patternDetails, setPatternDetails] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetCompletionDate, setTargetCompletionDate] = useState('');
  const [progress, setProgress] = useState(0);

const addProject = async (project: any) => {
    try {
        const docRef = await addDoc(collection(db, 'projects'), {
            ...project,
            userId: auth?.currentUser?.uid, // add the user ID to the project
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const project = {
        name,
        description,
        patternDetails,
        startDate,
        targetCompletionDate,
        progress,
    };
    addProject(project);
};

return (
    <form onSubmit={handleSubmission}>
        {/* form fields here */}
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
        />
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
        />
        <input
            type="text"
            value={patternDetails}
            onChange={(e) => setPatternDetails(e.target.value)}
            placeholder="Pattern Details"
        />
        <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
        />
        <input
            type="text"
            value={targetCompletionDate}
            onChange={(e) => setTargetCompletionDate(e.target.value)}
            placeholder="Target Completion Date"
        />
        <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            placeholder="Progress"
        />
        <button type="submit">
            Add Project
        </button>
    </form>
);
};

export default ProjectForm;