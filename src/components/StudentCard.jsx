
import { useState } from "react";

function StudentCard({ etudiant, onModifier, onSupprimer }) {
  const [coordonneesVisibles, setCoordonneesVisibles] =
    useState(false);

  function basculerInformations() {
    setCoordonneesVisibles(!coordonneesVisibles);
  }

  return (
    <div className="card">
      {etudiant.image && (
        <img
          src={etudiant.image}
          alt="Photo étudiant"
          width="100"
        />
      )}

      <h2>{etudiant.prenom} {etudiant.nom}</h2>

      <p>
        <strong>Filière :</strong> {etudiant.filiere}
      </p>

      <p>
        <strong>Année :</strong> {etudiant.anneeEtude}
      </p>

      <p>
        <strong>Groupe :</strong> {etudiant.groupe}
      </p>

      <p>
        <strong>Ville :</strong> {etudiant.ville}
      </p>

      <button onClick={basculerInformations}>
        {coordonneesVisibles
          ? "Masquer les informations"
          : "Afficher les informations"}
      </button>

      {coordonneesVisibles && (
        <div>
          <p>
            <strong>Email :</strong> {etudiant.email}
          </p>

          <p>
            <strong>Téléphone :</strong> {etudiant.telephone}
          </p>
        </div>
      )}

      <button onClick={() => onModifier(etudiant)}>
        Modifier
      </button>

      <button onClick={() => onSupprimer(etudiant.id)}>
        Supprimer
      </button>
    </div>
  );
}

export default StudentCard;
