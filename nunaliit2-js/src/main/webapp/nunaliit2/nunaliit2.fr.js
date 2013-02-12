/*
  Nunaliit2 French Language Pack
*/
;(function($n2){

if( !$n2.l10n ) $n2.l10n = {};
if( !$n2.l10n.strings ) $n2.l10n.strings = {};	
if( !$n2.l10n.strings['fr'] ) $n2.l10n.strings['fr'] = {};

function loadStrings(strings) {
	var dic = $n2.l10n.strings['fr'];
	for(var key in strings) {
		dic[key] = strings[key];
	};
};

loadStrings({
	" definition (":" définition ("
	," definition (index: ":" définition (indice: "
	," definition null and skipped.":" définition nulle et ignorée"
	," definition: ":" définition"
	,"<Unknown error>":"<Erreur inconnue>"
	,"A valid schema must be provided":"Un schème valide doit être donné"
	,"Add":"Ajouter"
	,"Add Contribution":"Ajouter un contribution"
	,"Add File":"Ajouter un fichier"
	,"Add Layer":"Ajouter Couche"
	,"Add Related":"Relier"
	,"Add Relation":"Relier"
	,"Add or Edit a Map Feature":"Modifier la Carte"
	,"Attach":"Joindre"
	,"Attachment":"Pièce jointe"
	,"Attachment: ":"Pièce jointe: "
	,"Author":"Auteur"
	,"Back":"Retour"
	,"Brief":"Brève Affichage"
	,"CSS":"CSS"
	,"Can not perform file uploads unless jquery.form.js is included":"jquery.form.js est nécessaire pour le téléchargement de fichier"
	,"Cancel":"Annuler"
	,"Cancel Feature Editing":"Annuler les modifications"
	,"Cancelling Operation...":"Annuler l'opération..."
	,"Confirm":"Confirmer"
	,"Contribution":"Contribution"
	,"Create User":"Création d'usager"
	,"Create a new user":"Créer un nouvel usager"
	,"Created by":"Créer par"
	,"Date":"Date"
	,"Delete":"Supprimer"
	,"Deletion Progress":"Progrès de suppression"
	,"Description":"Description"
	,"Display":"Affichage"
	,"Do you really want to delete this feature?":"Voulez-vous vraiment supprimer cette géométrie?"
	,"Do you wish to delete this element?":"Désirez-vous supprimer cet élément?"
	,"Done":"Complété"
	,"E-mail":"Couriel"
	,"Edit":"Modifier"
	,"Editor View":"Perspective d'Éditeur"
	,"Error creating ":"Erreur de création"
	,"Error occurred with progress service":"Erreur avec service de progrès"
	,"Error while uploading: ":"Erreur de téléchargement"
	,"Error: query error while verifying ":"Erreur: la vérification a échoué"
	,"Extent (Max X)":"Étendue (max x)"
	,"Extent (Max Y)":"Étendue (max y)"
	,"Extent (Min X)":"Étendue (min x)"
	,"Extent (Min Y)":"Étendue (min y)"
	,"Fetching All Document Ids":"Obtention de tous les identificateurs de document"
	,"File":"Fichier"
	,"File Uploaded":"Fichier téléchargé"
	,"File is not currently available":"Le ficher n'est pas disponible"
	,"Fill Out Related Document":"Entrer l'information"
	,"Find on Map":"Trouver sur la Carte"
	,"First Name":"Prénom"
	,"Focus":"Suivre"
	,"Form":"Formulaire"
	,"Form View":"Perspective Formulaire"
	,"Generic Media":"Média Générique" // no longer used
	,"Generic Object":"Document Générique"
	,"Geometry":"Géometrie"
	,"Guest Login":"Session pour visiteur"
	,"Hover Sound":"Son descriptif"
	,"Hover Sound?":"Son descriptif?"
	,"ID":"ID"
	,"In reply to":"En réplique à"
	,"Introduction":"Introduction"
	,"Invalid e-mail and/or password":"Problème avec votre nom d'usager ou votre mot de passe"
	,"Key already in use: ":"Clé déjà utilisée: "
	,"Label":"Intitulé"
	,"Language":"Langue"
	,"Last Name":"Dernier Nom"
	,"Last updated by":"Mis-à jour par"
	,"Layer":"Couche"
	,"Layer Definition":"Définition de Couche"
	,"List Creation Progress":"Progrès de la création de liste"
	,"List Refinement Progress":"Progrès du refinement de liste"
	,"Login":"Ouvrir session"
	,"Logout":"Fermer session"
	,"Media":"Média"
	,"Module":"Module"
	,"Name":"Nom"
	,"OK":"Accepter"
	,"Order":"Ordre"
	,"Original String":"Chaîne de caractères originale"
	,"Password":"Mot de Passe"
	,"Password should have at least 6 characters":"Le mot de passe devrait contenir au moins 6 caractères"
	,"Please login":"Ouverture de session"
	,"Progress":"Progrès"
	,"Reference":"Référence"
	,"Reference:":"Référence:"
	,"Relation: ":"Relation"
	,"Remove":"Supprimer"
	,"Replace Text":"Texte de remplacement"
	,"Required fields missing for ":"Champs nécessaires manquants pour "
	,"Reset":"Redémarrer"
	,"Revision":"Version"
	,"Root Schema":"Schème de Base"
	,"STOPPING: Failed verifying view ":"ARRET. Impossible de vérifier la perspective. "
	,"Save":"Sauvegarder"
	,"Schema":"Schème"
	,"Search":"Rechercher"
	,"Search error:":"Erreur durant la recherche"
	,"Search results empty":"Recherche sans résultats"
	,"Search:":"Rechercher:"
	,"Select Document":"Choisir Document"
	,"Select Document Schema":"Choisir un schème de document"
	,"Select Document Transform":"Choisir une transformation de document"
	,"Select Layers":"Choisir couches"
	,"Select Search Filter":"Choisir un filtre de recherche"
	,"Select a media":"Choisir un média"
	,"Select a schema":"Choisir un schème"
	,"Select a schema:":"Choisir un schème:"
	,"Select schema":"Choisir un schème"
	,"The two passwords should match":"Les deux mots de passe devrait être pareils"
	,"This object is being modified. Do you wish to continue and revert current changes?":"L'objet en cours d'être modifié. Désirez-vous continuer?"
	,"Title":"Titre"
	,"Transform Progress":"Progrès de la transformation"
	,"Translation":"Traduction"
	,"Tree View":"Perspective en Arbre"
	,"Unable to create user: ":"La création d'usager a échoué"
	,"Unable to display brief description":"Impossible d'afficher la brève description"
	,"Unable to display document":"Impossible d'afficher le document"
	,"Unable to fetch schema":"Impossible d'obtenir le schème"
	,"Unable to parse JSON string: ":"Incapable de lire l'expression JSON: "
	,"Unable to parse key: ":"Incapable de comprendre la clé: "
	,"Unable to retrieve document":"Impossible de trouver le document"
	,"Upload":"Télécharger"
	,"Upload service can not be reached. Unable to submit a related document.":"Le service de téléchargement n'est pas disponible."
	,"User Creation":"Creation d'un Usager"
	,"User name should have at least 3 characters":"Le nom d'usager devrait avoir au moins 3 caractères"
	,"View Media":"Visualiser le Média"
	,"Welcome":"Bienvenue"
	,"You are about to delete this document. Do you want to proceed?":"Voulez-vous vraiment supprimer ce document?"
	,"You are about to leave this page. Do you wish to continue?":"Vous quittez cette page. Voulez-vous continuer?"
	,"Your file was uploaded and will become available when it has been approved.":"Votre fichier est téléchargé. Il sera disponible lorsqu'un adminitrateur l'aura approuvé"
	,"a Checkbox":"une Boîte"
	,"a Number":"un Chiffre"
	,"a String":"une Chaîne de Caractères"
	,"an Array":"une Chaîne"
	,"an Object":"un Objet"
	,"an image":"une image"
	,"confirm password":"vérifier le mot de passe"
	,"display name":"nom d'affichage"
	,"empty":"vide"
	,"id":"id"
	,"is":"est"
	,"password":"mot de passe"
	,"search the atlas":"recherche de l'atlas"
	,"top":"en haut"
	,"user":"usager" // no longer used
	,"user name":"Nom d'usager"
});
	
})(nunaliit2);