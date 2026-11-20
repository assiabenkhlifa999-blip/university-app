
import { useState } from "react";

function StudentForm({
  onAjouterEtudiant,
  etudiantAModifier,
  onModifierEtudiant,
}) {
  const [formData, setFormData] = useState({
    nom: etudiantAModifier?.nom || "",
    prenom: etudiantAModifier?.prenom || "",
    email: etudiantAModifier?.email || "",
    telephone: etudiantAModifier?.telephone || "",
    filiere: etudiantAModifier?.filiere || "",
    anneeEtude: etudiantAModifier?.anneeEtude || "",
    groupe: etudiantAModifier?.groupe || "",
    ville: etudiantAModifier?.ville || "",
    image: etudiantAModifier?.image || "",
  });

  const [erreurs, setErreurs] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleImage(e) {
    const fichier = e.target.files[0];

    if (fichier) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(fichier),
      });
    }
  }

  function validerFormulaire() {
    const nouvellesErreurs = {};

    if (!formData.nom.trim()) {
      nouvellesErreurs.nom = "Nom est obligatoire";
    }

    if (!formData.prenom.trim()) {
      nouvellesErreurs.prenom = "Prénom est obligatoire";
    }

    if (!formData.email.trim()) {
      nouvellesErreurs.email = "Email est obligatoire";
    }

    if (!formData.telephone.trim()) {
      nouvellesErreurs.telephone = "Téléphone est obligatoire";
    }

    setErreurs(nouvellesErreurs);

    return Object.keys(nouvellesErreurs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nouvelEtudiant = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      filiere: formData.filiere,
      anneeEtude: formData.anneeEtude,
      groupe: formData.groupe,
      ville: formData.ville,
      image: formData.image,
    };

    if (!validerFormulaire()) {
      return;
    }

    if (etudiantAModifier) {
      onModifierEtudiant({
        ...etudiantAModifier,
        ...nouvelEtudiant,
      });
    } else {
      onAjouterEtudiant(nouvelEtudiant);

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        filiere: "",
        anneeEtude: "",
        groupe: "",
        ville: "",
        image: "",
      });

      setErreurs({});
      e.target.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {etudiantAModifier
          ? "Modifier l'étudiant"
          : "Ajouter un étudiant"}
      </h2>

      <div className="form-group">
        <label htmlFor="nom">Nom :</label>
        <input
          id="nom"
          name="nom"
          type="text"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        {erreurs.nom && (
          <p className="error-msg">{erreurs.nom}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="prenom">Prénom :</label>
        <input
          id="prenom"
          name="prenom"
          type="text"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        {erreurs.prenom && (
          <p className="error-msg">{erreurs.prenom}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {erreurs.email && (
          <p className="error-msg">{erreurs.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Téléphone :</label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        {erreurs.telephone && (
          <p className="error-msg">{erreurs.telephone}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="filiere">Filière :</label>
        <select
          id="filiere"
          name="filiere"
          value={formData.filiere}
          onChange={handleChange}
        >
          <option value="">Choisir une filière</option>
          <option value="GLSI">GLSI</option>
          <option value="Informatique">Informatique</option>
          <option value="Réseaux">Réseaux</option>
          <option value="Cyber sécurité">Cyber sécurité</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="anneeEtude">Année d'étude :</label>
        <select
          id="anneeEtude"
          name="anneeEtude"
          value={formData.anneeEtude}
          onChange={handleChange}
        >
          <option value="">Choisir une année</option>
          <option value="1ère année">1ère année</option>
          <option value="2ème année">2ème année</option>
          <option value="3ème année">3ème année</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="groupe">Groupe :</label>
        <input
          id="groupe"
          name="groupe"
          type="text"
          value={formData.groupe}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ville">Ville :</label>
        <input
          id="ville"
          name="ville"
          type="text"
          value={formData.ville}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Photo :</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImage}
        />
      </div>

      {formData.image && (
        <img
          src={formData.image}
          alt="Photo étudiant"
          width="100"
        />
      )}

      <button type="submit" className="btn-submit">
        {etudiantAModifier ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}

export default StudentForm;
