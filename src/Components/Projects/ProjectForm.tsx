import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const ProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [patternDetails, setPatternDetails] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetCompletionDate, setTargetCompletionDate] = useState('');
  const [progress, setProgress] = useState(0);

  const firebaseConfig = {
    apiKey: "AIzaSyDBvRQSTkxTv3RkWUyFSr5pUcvVStjhKEo",
    authDomain: "stitchsync-551ec.firebaseapp.com",
    projectId: "stitchsync-551ec",
    storageBucket: "stitchsync-551ec.appspot.com",
    messagingSenderId: "509364225849",
    appId: "1:509364225849:web:ddfb6d532586f724600ae8",
    measurementId: "G-M3C7LCMB8F"
};

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

const addProject = async (project: any) => {
    try {
        const docRef = await addDoc(collection(db, 'projects'), project);
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