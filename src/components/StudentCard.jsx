
function StudentCard(props) {
  return (
    <div className="card">
      <h2>{props.prenom} {props.nom}</h2>

      <p><strong>Email :</strong> {props.email}</p>

      <p><strong>Téléphone :</strong> {props.telephone}</p>

      <p><strong>Filière :</strong> {props.filiere}</p>

      <p><strong>Année :</strong> {props.anneeEtude}</p>

      <p><strong>Groupe :</strong> {props.groupe}</p>

      <p><strong>Ville :</strong> {props.ville}</p>
    </div>
  );
}

export default StudentCard;
