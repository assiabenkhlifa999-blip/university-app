

import { useState } from "react";

function StudentCard(props) {
  const [coordonneesVisibles, setCoordonneesVisibles] = useState(false);

  function basculerInformations() {
    setCoordonneesVisibles(!coordonneesVisibles);
  }

  return (
    <div className="card">
      <h2>{props.prenom} {props.nom}</h2>

      <p><strong>Filière :</strong> {props.filiere}</p>

      <p><strong>Année :</strong> {props.anneeEtude}</p>

      <p><strong>Groupe :</strong> {props.groupe}</p>

      <p><strong>Ville :</strong> {props.ville}</p>

      <button onClick={basculerInformations}>
        {coordonneesVisibles
          ? "Masquer les informations"
          : "Afficher les informations"}
      </button>

      {coordonneesVisibles && (
        <div>
          <p><strong>Email :</strong> {props.email}</p>
          <p><strong>Téléphone :</strong> {props.telephone}</p>
        </div>
      )}

      <button onClick={() => props.onModifier(props.id)}>
        Modifier
      </button>

      <button onClick={() => props.onSupprimer(props.id)}>
        Supprimer
      </button>
    </div>
  );
}

export default StudentCard;
