
import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer";

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
    ville: "Mahdia"
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
    ville: "Sousse"
  },
  {
    id: "mariem@gmail.com",
    prenom: "Mariem",
    nom: "Khalfallah",
    email: "mariem@gmail.com",
    telephone: "+216 27 567 890",
    filiere: "Génie Logiciel et Systèmes d'Information",
    anneeEtude: "2ème année",
    groupe: "GLSI 2",
    ville: "Monastir"
  }
];

function App() {
  const [etudiants, setEtudiants] = useState(etudiantsInitial);
  const [recherche, setRecherche] = useState("");

  // Ajouter un étudiant
  function ajouterEtudiant() {
    const prenom = prompt("Donner le prénom :");
    if (prenom === null || !prenom.trim()) return;

    const nom = prompt("Donner le nom :");
    if (nom === null || !nom.trim()) return;

    const email = prompt("Donner l'email :");
    if (email === null || !email.trim()) return;

    const telephone = prompt("Donner le téléphone :");
    if (telephone === null || !telephone.trim()) return;

    const filiere = prompt("Donner la filière :");
    if (filiere === null || !filiere.trim()) return;

    const anneeEtude = prompt("Donner l'année d'étude :");
    if (anneeEtude === null || !anneeEtude.trim()) return;

    const groupe = prompt("Donner le groupe :");
    if (groupe === null || !groupe.trim()) return;

    const ville = prompt("Donner la ville :");
    if (ville === null || !ville.trim()) return;

    const nouvelEtudiant = {
      id: email.trim(),
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      filiere: filiere.trim(),
      anneeEtude: anneeEtude.trim(),
      groupe: groupe.trim(),
      ville: ville.trim()
    };

    if (etudiants.some(e => e.id === nouvelEtudiant.id)) {
      alert("Cet email existe déjà !");
      return;
    }

    setEtudiants(anciensEtudiants => [
      ...anciensEtudiants,
      nouvelEtudiant
    ]);
  }

  // Supprimer un étudiant
  function supprimerEtudiant(id) {
    setEtudiants(anciensEtudiants =>
      anciensEtudiants.filter(etudiant => etudiant.id !== id)
    );
  }

  // Modifier le prénom d'un étudiant
  function modifierEtudiant(id) {
    const nouveauPrenom = prompt("Donner le nouveau prénom :");

    if (nouveauPrenom === null || !nouveauPrenom.trim()) {
      return;
    }

    setEtudiants(anciensEtudiants =>
      anciensEtudiants.map(etudiant =>
        etudiant.id === id
          ? { ...etudiant, prenom: nouveauPrenom.trim() }
          : etudiant
      )
    );
  }

  // Filtrer les étudiants selon leur filière
  const etudiantsFiltres = etudiants.filter(etudiant =>
    etudiant.filiere.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div id="accueil">
      <Header />

      <Navbar />

      <main className="container" id="etudiants">
        <h1>Liste des étudiants</h1>

        <button onClick={ajouterEtudiant}>
          Ajouter un étudiant
        </button>

        <br />
        <br />

        <input
          type="text"
          placeholder="Rechercher par filière..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
        />

        <div className="students">
          {etudiantsFiltres.map(etudiant => (
            <StudentCard
              key={etudiant.id}
              {...etudiant}
              onSupprimer={supprimerEtudiant}
              onModifier={modifierEtudiant}
            />
          ))}
        </div>

        {etudiantsFiltres.length === 0 && (
          <p>Aucun étudiant trouvé.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
