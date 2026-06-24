export const renderHome = (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ChellaBank-API - Espace Client Premium</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            emerald: { 500: '#10B981' },
                            gold: { 400: '#FBBF24', 500: '#F59E0B' },
                            dark: { 800: '#1E293B', 900: '#0F172A' }
                        }
                    }
                }
            }
        </script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            body { font-family: 'Poppins', sans-serif; background-color: #0F172A; color: #F8FAFC; }
            .glass-card { background: #1E293B; border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: #1E293B; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
            .hidden { display: none !important; }
            input, select { background-color: #0F172A !important; color: white !important; border-color: #334155 !important; }
        </style>
    </head>
    <body class="antialiased">

        <nav class="border-b border-gray-800 bg-dark-900/80 backdrop-blur-md sticky top-0 z-40">
            <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="bg-emerald-500/10 p-2 rounded-lg">
                        <i class="fa-solid fa-building-columns text-2xl text-emerald-500"></i>
                    </div>
                    <h1 class="text-2xl font-bold tracking-wide text-white">ChellaBank<span class="font-light text-gold-500">-API</span></h1>
                </div>
                <a href="/api-docs" target="_blank" class="text-gray-400 hover:text-emerald-500 transition text-sm flex items-center gap-2 font-medium">
                    <i class="fa-solid fa-code"></i> Developer API
                </a>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div class="lg:col-span-4 space-y-6">
                <div class="glass-card p-6">
                    <h2 class="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                        <i class="fa-solid fa-right-to-bracket text-emerald-500"></i> Accès Compte
                    </h2>
                    <select id="accountSelector" onchange="loadAccountDashboard()" class="w-full p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition">
                        <option value="">-- Sélectionner un profil --</option>
                    </select>
                </div>

                <div class="glass-card p-6">
                    <h2 class="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                        <i class="fa-solid fa-user-plus text-gold-500"></i> Nouveau Client
                    </h2>
                    <form id="createAccountForm" class="space-y-4">
                        <input type="text" id="newNom" placeholder="Nom complet" required class="w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500">
                        <input type="number" id="newSolde" placeholder="Dépôt initial (FCFA)" required class="w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500">
                        <button type="submit" class="w-full bg-emerald-500 text-dark-900 py-3 rounded-xl hover:bg-emerald-400 transition font-bold shadow-lg shadow-emerald-500/20">
                            Ouvrir le compte
                        </button>
                    </form>
                </div>
            </div>

            <div id="dashboard" class="lg:col-span-8 space-y-6 hidden">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition duration-500">
                            <i class="fa-brands fa-cc-visa text-8xl text-white"></i>
                        </div>
                        <div class="relative z-10">
                            <p class="text-gray-400 font-medium mb-1 flex items-center gap-2">
                                <i class="fa-solid fa-wallet text-gold-500"></i> Solde Disponible
                            </p>
                            <h2 class="text-4xl font-bold mb-8 text-emerald-500" id="displaySolde">0 FCFA</h2>
                            <div class="flex justify-between items-end">
                                <div>
                                    <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Titulaire du compte</p>
                                    <p class="font-semibold text-xl tracking-wide text-white" id="displayNom">Nom</p>
                                </div>
                                <p class="text-sm font-mono text-gray-400 bg-dark-900/50 px-3 py-1 rounded-lg border border-gray-700">ID: <span id="displayId">--</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card p-6 flex flex-col justify-between">
                        <h3 class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Synthèse du compte</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center p-3 bg-dark-900 rounded-xl border border-gray-800">
                                <div class="flex items-center gap-3">
                                    <div class="bg-emerald-500/10 p-2 rounded-lg text-emerald-500"><i class="fa-solid fa-arrow-trend-up"></i></div>
                                    <span class="text-gray-300">Total Entrées</span>
                                </div>
                                <span class="font-bold text-emerald-500" id="statEntrees">0 FCFA</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-dark-900 rounded-xl border border-gray-800">
                                <div class="flex items-center gap-3">
                                    <div class="bg-red-500/10 p-2 rounded-lg text-red-500"><i class="fa-solid fa-arrow-trend-down"></i></div>
                                    <span class="text-gray-300">Total Sorties</span>
                                </div>
                                <span class="font-bold text-red-500" id="statSorties">0 FCFA</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4">
                    <button onclick="openModal('depot')" class="glass-card p-4 hover:bg-gray-800 transition cursor-pointer text-emerald-500 font-semibold group border border-emerald-500/20">
                        <i class="fa-solid fa-circle-arrow-down text-2xl mb-2 block group-hover:scale-110 transition"></i> Dépôt
                    </button>
                    <button onclick="openModal('retrait')" class="glass-card p-4 hover:bg-gray-800 transition cursor-pointer text-red-400 font-semibold group border border-red-500/20">
                        <i class="fa-solid fa-circle-arrow-up text-2xl mb-2 block group-hover:scale-110 transition"></i> Retrait
                    </button>
                    <button onclick="openModal('virement')" class="glass-card p-4 hover:bg-gray-800 transition cursor-pointer text-gold-500 font-semibold group border border-gold-500/20">
                        <i class="fa-solid fa-money-bill-transfer text-2xl mb-2 block group-hover:scale-110 transition"></i> Virement
                    </button>
                </div>

                <div class="glass-card p-6">
                    <div class="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                        <h3 class="text-lg font-semibold text-white">Relevé d'opérations</h3>
                        <span class="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700" id="txCount">0 transaction</span>
                    </div>
                    <div id="historyList" class="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        </div>
                </div>
            </div>

            <div id="noAccountMsg" class="lg:col-span-8 glass-card p-12 text-center flex flex-col justify-center items-center h-full border border-gray-700 border-dashed">
                <div class="bg-dark-900 p-6 rounded-full mb-6 border border-gray-800">
                    <i class="fa-solid fa-fingerprint text-6xl text-gray-600"></i>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">Espace de Consultation</h2>
                <p class="text-gray-400 max-w-md">Sélectionnez un profil client à gauche pour accéder en toute sécurité à votre solde, vos statistiques et votre historique détaillé.</p>
            </div>

        </main>

        <div id="transactionModal" class="fixed inset-0 bg-dark-900/80 flex items-center justify-center z-50 hidden backdrop-blur-sm">
            <div class="bg-dark-800 border border-gray-700 rounded-3xl p-8 max-w-md w-full m-4 shadow-2xl">
                <div class="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    <h2 class="text-xl font-bold text-white flex items-center gap-2" id="modalTitle">Nouvelle Transaction</h2>
                    <button onclick="closeModal()" class="text-gray-500 hover:text-white transition"><i class="fa-solid fa-xmark text-xl"></i></button>
                </div>
                
                <form id="actionForm" class="space-y-5">
                    <input type="hidden" id="actionType">
                    
                    <div id="destinataireGroup" class="hidden">
                        <label class="block text-sm font-medium text-gray-400 mb-1">Compte Bénéficiaire</label>
                        <select id="actionToId" class="w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-gold-500"></select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">Montant de l'opération (FCFA)</label>
                        <input type="number" id="actionMontant" required class="w-full p-4 text-2xl font-bold rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center text-emerald-400">
                    </div>

                    <button type="submit" class="w-full bg-white text-dark-900 py-4 rounded-xl hover:bg-gray-200 transition font-bold text-lg mt-4">
                        Valider l'opération
                    </button>
                </form>
                <div id="actionMsgBox" class="mt-4 p-3 rounded-xl hidden text-center font-medium text-sm"></div>
            </div>
        </div>

        <script>
            let currentAccountId = null;
            let allAccounts = [];

            async function fetchAccounts() {
                const res = await fetch('/api/comptes');
                allAccounts = await res.json();
                
                const selector = document.getElementById('accountSelector');
                const destSelector = document.getElementById('actionToId');
                
                selector.innerHTML = '<option value="">-- Sélectionner un profil --</option>';
                destSelector.innerHTML = '<option value="">-- Sélectionner un bénéficiaire --</option>';

                allAccounts.forEach(c => {
                    selector.innerHTML += \`<option value="\${c.id}">\${c.nom} (ID: \${c.id})</option>\`;
                    destSelector.innerHTML += \`<option value="\${c.id}">\${c.nom}</option>\`;
                });
            }

            document.getElementById('createAccountForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const nom = document.getElementById('newNom').value;
                const solde = document.getElementById('newSolde').value;
                
                const res = await fetch('/api/comptes', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ nom, solde })
                });

                if(res.ok) {
                    e.target.reset();
                    await fetchAccounts();
                    
                    // Sélectionner automatiquement le nouveau compte
                    const newAccount = await res.json();
                    document.getElementById('accountSelector').value = newAccount.compte.id;
                    loadAccountDashboard();
                }
            });

            async function loadAccountDashboard() {
                const id = document.getElementById('accountSelector').value;
                const dashboard = document.getElementById('dashboard');
                const noAccountMsg = document.getElementById('noAccountMsg');

                if(!id) {
                    dashboard.classList.add('hidden');
                    noAccountMsg.classList.remove('hidden');
                    currentAccountId = null;
                    return;
                }

                currentAccountId = parseInt(id);
                dashboard.classList.remove('hidden');
                noAccountMsg.classList.add('hidden');

                const res = await fetch(\`/api/comptes/\${currentAccountId}/historique\`);
                const data = await res.json();
                
                const compte = allAccounts.find(c => c.id === currentAccountId);
                document.getElementById('displayNom').innerText = compte.nom;
                document.getElementById('displaySolde').innerText = new Intl.NumberFormat('fr-FR').format(compte.solde) + " FCFA";
                document.getElementById('displayId').innerText = compte.id;

                const historyList = document.getElementById('historyList');
                historyList.innerHTML = '';
                
                let totalEntrees = 0;
                let totalSorties = 0;

                if(!data.historique || data.historique.length === 0) {
                    document.getElementById('txCount').innerText = '0 transaction';
                    historyList.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fa-solid fa-folder-open text-3xl mb-3 opacity-50"></i><p>Aucune transaction récente.</p></div>';
                } else {
                    document.getElementById('txCount').innerText = \`\${data.historique.length} transactions\`;
                    
                    data.historique.reverse().forEach(op => {
                        const isPos = op.montant > 0;
                        const colorClass = isPos ? 'text-emerald-500' : 'text-red-400';
                        const bgIcon = isPos ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400';
                        const icon = op.type.includes('Création') ? 'fa-star' : 
                                     (op.type.includes('Virement') ? 'fa-money-bill-transfer' : 
                                     (isPos ? 'fa-arrow-down' : 'fa-arrow-up'));
                        const sign = isPos ? '+' : '';

                        if(isPos) totalEntrees += op.montant;
                        else totalSorties += Math.abs(op.montant);

                        historyList.innerHTML += \`
                            <div class="flex justify-between items-center p-4 bg-dark-900 rounded-xl border border-gray-800 hover:border-gray-600 transition group">
                                <div class="flex items-center gap-4">
                                    <div class="h-10 w-10 rounded-full flex items-center justify-center \${bgIcon}">
                                        <i class="fa-solid \${icon}"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-200 group-hover:text-white transition">\${op.type}</p>
                                        <p class="text-xs text-gray-500">\${op.date}</p>
                                    </div>
                                </div>
                                <p class="font-bold \${colorClass} text-lg">\${sign}\${new Intl.NumberFormat('fr-FR').format(op.montant)} FCFA</p>
                            </div>
                        \`;
                    });
                }

                document.getElementById('statEntrees').innerText = '+' + new Intl.NumberFormat('fr-FR').format(totalEntrees) + ' FCFA';
                document.getElementById('statSorties').innerText = '-' + new Intl.NumberFormat('fr-FR').format(totalSorties) + ' FCFA';
            }

            function openModal(type) {
                document.getElementById('transactionModal').classList.remove('hidden');
                document.getElementById('actionType').value = type;
                const msgBox = document.getElementById('actionMsgBox');
                msgBox.classList.add('hidden');
                document.getElementById('actionMontant').value = '';
                
                const titles = { 
                    'depot': '<i class="fa-solid fa-arrow-down text-emerald-500"></i> Dépôt d\\'espèces', 
                    'retrait': '<i class="fa-solid fa-arrow-up text-red-400"></i> Retrait d\\'espèces', 
                    'virement': '<i class="fa-solid fa-money-bill-transfer text-gold-500"></i> Virement Bancaire' 
                };
                document.getElementById('modalTitle').innerHTML = titles[type];

                if(type === 'virement') {
                    document.getElementById('destinataireGroup').classList.remove('hidden');
                } else {
                    document.getElementById('destinataireGroup').classList.add('hidden');
                }
            }

            function closeModal() {
                document.getElementById('transactionModal').classList.add('hidden');
            }

            document.getElementById('actionForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const type = document.getElementById('actionType').value;
                const montant = document.getElementById('actionMontant').value;
                const msgBox = document.getElementById('actionMsgBox');
                
                let url = '/api/transaction';
                let payload = { id: currentAccountId, montant: parseFloat(montant), type };

                if(type === 'virement') {
                    url = '/api/virement';
                    payload = {
                        fromId: currentAccountId,
                        toId: parseInt(document.getElementById('actionToId').value),
                        montant: parseFloat(montant)
                    };
                    if(payload.fromId === payload.toId) {
                        msgBox.className = 'mt-4 p-3 rounded-xl text-center font-medium text-sm bg-red-500/10 text-red-400 border border-red-500/20';
                        msgBox.innerText = "Vous ne pouvez pas faire un virement à vous-même.";
                        msgBox.classList.remove('hidden');
                        return;
                    }
                }

                const res = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload)
                });
                const result = await res.json();

                if(res.ok) {
                    closeModal();
                    await fetchAccounts(); 
                    loadAccountDashboard(); 
                } else {
                    msgBox.className = 'mt-4 p-3 rounded-xl text-center font-medium text-sm bg-red-500/10 text-red-400 border border-red-500/20';
                    msgBox.innerText = result.erreur;
                    msgBox.classList.remove('hidden');
                }
            });

            fetchAccounts();
        </script>
    </body>
    </html>
    `;
    res.send(html);
};