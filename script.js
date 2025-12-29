// Gestion des données
let characters = [];
let editingId = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadCharacters();
    setupEventListeners();
    renderCharacters();
});

// Charger les personnages depuis le localStorage ou le fichier JSON
function loadCharacters() {
    // Essayer de charger depuis localStorage
    const stored = localStorage.getItem('jojoCharacters');
    if (stored) {
        characters = JSON.parse(stored);
        return;
    }

    // Sinon, essayer de charger depuis un fichier JSON (pour GitHub)
    fetch('data.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return [];
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                characters = data;
                saveCharacters();
            }
        })
        .catch(() => {
            // Fichier n'existe pas encore, pas de problème
            characters = [];
        });
}

// Sauvegarder les personnages
function saveCharacters() {
    localStorage.setItem('jojoCharacters', JSON.stringify(characters));
    
    // Pour GitHub, on peut aussi proposer le téléchargement du JSON
    // L'utilisateur pourra le mettre dans le repo
}

// Configuration des event listeners
function setupEventListeners() {
    const form = document.getElementById('character-form');
    const searchInput = document.getElementById('search-input');
    const filterPart = document.getElementById('filter-part');
    const filterAlignment = document.getElementById('filter-alignment');
    const filterStatus = document.getElementById('filter-status');
    const cancelBtn = document.getElementById('cancel-btn');
    const exportBtn = document.getElementById('export-btn');
    const importInput = document.getElementById('import-input');
    const clearBtn = document.getElementById('clear-btn');

    form.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
    searchInput.addEventListener('input', renderCharacters);
    filterPart.addEventListener('change', renderCharacters);
    filterAlignment.addEventListener('change', renderCharacters);
    filterStatus.addEventListener('change', renderCharacters);
    exportBtn.addEventListener('click', exportData);
    importInput.addEventListener('change', handleImport);
    clearBtn.addEventListener('click', clearAllData);
}

// Gérer la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();

    const character = {
        id: editingId || Date.now().toString(),
        name: document.getElementById('name').value.trim(),
        photo: document.getElementById('photo').value.trim(),
        part: document.getElementById('part').value,
        stand: document.getElementById('stand').value.trim(),
        alignment: document.getElementById('alignment').value,
        status: document.getElementById('status').value,
        relationships: document.getElementById('relationships').value.trim(),
        notes: document.getElementById('notes').value.trim(),
        createdAt: editingId ? 
            characters.find(c => c.id === editingId)?.createdAt || new Date().toISOString() :
            new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (!character.name) {
        alert('Le nom du personnage est requis !');
        return;
    }

    if (editingId) {
        // Modification
        const index = characters.findIndex(c => c.id === editingId);
        if (index !== -1) {
            characters[index] = character;
        }
    } else {
        // Ajout
        characters.push(character);
    }

    saveCharacters();
    renderCharacters();
    resetForm();
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('character-form').reset();
    document.getElementById('character-id').value = '';
    editingId = null;
    document.getElementById('form-title').textContent = '➕ Ajouter un personnage';
    document.getElementById('submit-btn').textContent = 'Ajouter';
    document.getElementById('cancel-btn').style.display = 'none';
}

// Annuler l'édition
function cancelEdit() {
    resetForm();
}

// Éditer un personnage
function editCharacter(id) {
    const character = characters.find(c => c.id === id);
    if (!character) return;

    editingId = id;
    document.getElementById('character-id').value = id;
    document.getElementById('name').value = character.name || '';
    document.getElementById('photo').value = character.photo || '';
    document.getElementById('part').value = character.part || '';
    document.getElementById('stand').value = character.stand || '';
    document.getElementById('alignment').value = character.alignment || '';
    document.getElementById('status').value = character.status || '';
    document.getElementById('relationships').value = character.relationships || '';
    document.getElementById('notes').value = character.notes || '';

    document.getElementById('form-title').textContent = '✏️ Modifier le personnage';
    document.getElementById('submit-btn').textContent = 'Modifier';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    // Scroll vers le formulaire
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

// Supprimer un personnage
function deleteCharacter(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
        characters = characters.filter(c => c.id !== id);
        saveCharacters();
        renderCharacters();
    }
}

// Rendre les personnages
function renderCharacters() {
    const grid = document.getElementById('characters-grid');
    const emptyMessage = document.getElementById('empty-message');

    // Filtrer les personnages
    const filtered = getFilteredCharacters();

    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyMessage.style.display = characters.length === 0 ? 'block' : 'none';
        return;
    }

    emptyMessage.style.display = 'none';

    grid.innerHTML = filtered.map(character => `
        <div class="character-card">
            <div class="character-header">
                <img 
                    src="${character.photo || 'https://via.placeholder.com/100?text=No+Photo'}" 
                    alt="${character.name}"
                    class="character-photo"
                    onerror="this.src='https://via.placeholder.com/100?text=No+Photo'"
                >
                <div class="character-info">
                    <div class="character-name">${escapeHtml(character.name)}</div>
                    ${character.part ? `<div class="character-part">${escapeHtml(character.part)}</div>` : ''}
                    <div class="character-badges">
                        ${character.alignment ? `
                            <span class="badge badge-alignment ${character.alignment.toLowerCase()}">
                                ${escapeHtml(character.alignment)}
                            </span>
                        ` : ''}
                        ${character.status ? `
                            <span class="badge badge-status ${character.status.toLowerCase()}">
                                ${escapeHtml(character.status)}
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            ${character.stand ? `
                <div class="character-details">
                    <h4>Stand:</h4>
                    <p>${escapeHtml(character.stand)}</p>
                </div>
            ` : ''}
            
            ${character.relationships ? `
                <div class="character-details">
                    <h4>Relations et parenté:</h4>
                    <p>${escapeHtml(character.relationships)}</p>
                </div>
            ` : ''}
            
            ${character.notes ? `
                <div class="character-details">
                    <h4>Notes:</h4>
                    <p>${escapeHtml(character.notes)}</p>
                </div>
            ` : ''}
            
            <div class="character-actions">
                <button class="btn btn-edit" onclick="editCharacter('${character.id}')">
                    ✏️ Modifier
                </button>
                <button class="btn btn-delete" onclick="deleteCharacter('${character.id}')">
                    🗑️ Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

// Obtenir les personnages filtrés
function getFilteredCharacters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const filterPart = document.getElementById('filter-part').value;
    const filterAlignment = document.getElementById('filter-alignment').value;
    const filterStatus = document.getElementById('filter-status').value;

    return characters.filter(character => {
        const matchesSearch = !search || 
            character.name.toLowerCase().includes(search) ||
            (character.stand && character.stand.toLowerCase().includes(search)) ||
            (character.part && character.part.toLowerCase().includes(search)) ||
            (character.notes && character.notes.toLowerCase().includes(search));

        const matchesPart = !filterPart || character.part === filterPart;
        const matchesAlignment = !filterAlignment || character.alignment === filterAlignment;
        const matchesStatus = !filterStatus || character.status === filterStatus;

        return matchesSearch && matchesPart && matchesAlignment && matchesStatus;
    });
}

// Exporter les données
function exportData() {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jojo-characters.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Importer les données
function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
                if (confirm(`Voulez-vous remplacer toutes les données actuelles par les ${imported.length} personnage(s) importé(s) ?`)) {
                    characters = imported;
                    saveCharacters();
                    renderCharacters();
                    alert('Données importées avec succès !');
                }
            } else {
                alert('Format de fichier invalide !');
            }
        } catch (error) {
            alert('Erreur lors de l\'importation : ' + error.message);
        }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset pour permettre de réimporter le même fichier
}

// Effacer toutes les données
function clearAllData() {
    if (confirm('⚠️ Êtes-vous ABSOLUMENT sûr de vouloir effacer TOUTES les données ? Cette action est irréversible !')) {
        characters = [];
        localStorage.removeItem('jojoCharacters');
        renderCharacters();
        resetForm();
        alert('Toutes les données ont été effacées.');
    }
}

// Échapper le HTML pour éviter les injections XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fonctions globales pour les boutons onclick
window.editCharacter = editCharacter;
window.deleteCharacter = deleteCharacter;

