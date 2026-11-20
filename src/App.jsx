
import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const etudiantsInitial = [
  {
    id: "slim@gmail.com",
    prenom: "Slim",
    nom: "Boubaker",
    email: "slim@gmail.com",
    telephone: "+216 99 999 999",
    filiere: "Génie Logiciel et Systèmes d'Information",
    anneeEtude: "2ème année",
    groupe: "GLSI 2",
    ville: "Mahdia",
    image: "",
  },
  {
    id: "sarra@gmail.com",
    prenom: "Sarra",
    nom: "Trabelsi",
    email: "sarra@gmail.com",
    telephone: "+216 22 345 678",
    filiere: "Génie Logiciel et Systèmes d'Information",
    anneeEtude: "2ème année",
    groupe: "GLSI 2",
    ville: "Sousse",
    image: "",
  },
  {
    id: "morneguirania@gmail.com",
    prenom: "rania",
    nom: "mornagui",
    email: "morneguirania@gmail.com",
    telephone: "+216 21 442 341",
    filiere: "Génie Logiciel et Systèmes d'Information",
    anneeEtude: "2ème année",
    groupe: "IRS2",
    ville: "nabeul",
    image: "",
  },
];

function App() {
  const [etudiants, setEtudiants] = useState(etudiantsInitial);
  const [recherche, setRecherche] = useState("");
  const [etudiantAModifier, setEtudiantAModifier] = useState(null);

  function ajouterEtudiant(nouvelEtudiant) {
    setEtudiants((anciens) => [
      ...anciens,
      { ...nouvelEtudiant, id: Date.now() },
    ]);
  }

  function modifierEtudiant(etudiant) {
    setEtudiantAModifier(etudiant);
  }

  function enregistrerModification(etudiantModifie) {
    setEtudiants((anciens) =>
      anciens.map((etudiant) =>
        etudiant.id === etudiantAModifier.id
          ? { ...etudiantModifie, id: etudiant.id }
          : etudiant
      )
    );
    setEtudiantAModifier(null);
  }

  function supprimerEtudiant(id) {
    setEtudiants((anciens) =>
      anciens.filter((etudiant) => etudiant.id !== id)
    );
    if (etudiantAModifier?.id === id) {
      setEtudiantAModifier(null);
    }
  }

  const etudiantsFiltres = etudiants.filter((etudiant) =>
    `${etudiant.nom} ${etudiant.prenom}`
      .toLowerCase()
      .includes(recherche.toLowerCase())
  );

  return (
    <div id="accueil">
      <Header />
      <Navbar />

      <main className="container" id="etudiants">
        <h1>Gestion des étudiants</h1>

        <StudentForm
          key={etudiantAModifier ? etudiantAModifier.id : "nouveau"}
          onAjouterEtudiant={ajouterEtudiant}
          etudiantAModifier={etudiantAModifier}
          onModifierEtudiant={enregistrerModification}
        />

        <h2>Liste des étudiants</h2>

        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <div className="students">
          {etudiantsFiltres.map((etudiant) => (
            <StudentCard
              key={etudiant.id}
              {...etudiant}
              etudiant={etudiant}
              onModifier={modifierEtudiant}
              onSupprimer={supprimerEtudiant}
            />
          ))}

          {etudiantsFiltres.length === 0 && (
            <p>Aucun étudiant trouvé.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
