import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import firebase from 'firebase/app';

// const db = getFirestore(firebase);

const ProjectsList: React.FC = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
//       setProjects(snapshot.docs.map(doc => doc.data()));
//     });

//     return () => unsubscribe();
//   }, []);

  return (
    <div>
      {/* display projects here */}
    </div>
  );
};

export default ProjectsList;